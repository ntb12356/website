import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import {
  useGetPatientAppointments,
  useCancelPatientAppointment,
  useGetPatientProfile,
  useUpdatePatientProfile,
  getGetPatientAppointmentsQueryKey,
  getGetPatientProfileQueryKey,
} from "@workspace/api-client-react";
import { format } from "date-fns";
import { CalendarDays, Clock, Stethoscope, User, LogOut } from "lucide-react";
import type { Appointment } from "@workspace/api-client-react";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

function AppointmentCard({
  appt,
  onCancel,
  isCancelling,
}: {
  appt: Appointment;
  onCancel: (id: number) => void;
  isCancelling: boolean;
}) {
  const canCancel = appt.status === "pending" || appt.status === "confirmed";
  return (
    <Card className="border border-border">
      <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-primary" />
            <span className="font-semibold">{appt.service}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[appt.status] ?? "bg-gray-100 text-gray-700"}`}>
              {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              {format(new Date(appt.date), "MMMM d, yyyy")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {appt.timeSlot}
            </span>
          </div>
          {appt.notes && (
            <p className="text-sm text-muted-foreground italic">"{appt.notes}"</p>
          )}
        </div>
        {canCancel && (
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 text-destructive border-destructive/30 hover:bg-destructive/5"
            disabled={isCancelling}
            onClick={() => onCancel(appt.id)}
          >
            {isCancelling ? "Cancelling…" : "Cancel"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { user, isLoading: isAuthLoading, logout } = useAuth();
  const { toast } = useToast();

  // Profile edit state
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  const { data: appointmentsData, isLoading: isLoadingAppts, refetch: refetchAppts } =
    useGetPatientAppointments({ query: { enabled: !!user, queryKey: getGetPatientAppointmentsQueryKey() } });

  const { data: profile, isLoading: isLoadingProfile, refetch: refetchProfile } =
    useGetPatientProfile({ query: { enabled: !!user, queryKey: getGetPatientProfileQueryKey() } });

  const cancelMutation = useCancelPatientAppointment();
  const updateProfileMutation = useUpdatePatientProfile();

  // Redirect unauthenticated users
  if (!isAuthLoading && !user) {
    navigate("/login");
    return null;
  }

  const handleCancel = (id: number) => {
    setCancellingId(id);
    cancelMutation.mutate({ id }, {
      onSuccess: () => {
        toast({ title: "Appointment cancelled", description: "Your appointment has been cancelled." });
        void refetchAppts();
      },
      onError: () => {
        toast({ title: "Error", description: "Could not cancel appointment.", variant: "destructive" });
      },
      onSettled: () => setCancellingId(null),
    });
  };

  const handleSaveName = () => {
    if (!newName.trim()) return;
    updateProfileMutation.mutate({ data: { name: newName.trim() } }, {
      onSuccess: () => {
        toast({ title: "Profile updated", description: "Your name has been updated." });
        setEditingName(false);
        void refetchProfile();
      },
      onError: () => {
        toast({ title: "Error", description: "Could not update profile.", variant: "destructive" });
      },
    });
  };

  const upcomingAppts = (appointmentsData?.appointments ?? []).filter(
    (a) => a.status === "pending" || a.status === "confirmed",
  );
  const pastAppts = (appointmentsData?.appointments ?? []).filter(
    (a) => a.status === "completed" || a.status === "cancelled",
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24 px-4 container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-serif font-bold">
              {isAuthLoading ? <Skeleton className="h-8 w-48" /> : `Welcome, ${user?.name}`}
            </h1>
            <p className="text-muted-foreground mt-1">Manage your appointments and profile</p>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild size="sm" variant="outline" className="rounded-full">
              <Link href="/book">+ New Appointment</Link>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full text-muted-foreground"
              onClick={() => logout({ onSuccess: () => navigate("/") })}
            >
              <LogOut className="w-4 h-4 mr-1" /> Sign out
            </Button>
          </div>
        </div>

        <Tabs defaultValue="appointments">
          <TabsList className="mb-8">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <div className="space-y-8">
              <section>
                <h2 className="text-lg font-semibold mb-4">Upcoming</h2>
                {isLoadingAppts ? (
                  <div className="space-y-3">
                    {[1, 2].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
                  </div>
                ) : upcomingAppts.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-border rounded-2xl text-muted-foreground">
                    <CalendarDays className="w-8 h-8 mx-auto mb-3 opacity-40" />
                    <p>No upcoming appointments.</p>
                    <Button asChild size="sm" className="mt-4 rounded-full">
                      <Link href="/book">Book now</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcomingAppts.map((a) => (
                      <AppointmentCard
                        key={a.id}
                        appt={a}
                        onCancel={handleCancel}
                        isCancelling={cancellingId === a.id && cancelMutation.isPending}
                      />
                    ))}
                  </div>
                )}
              </section>

              {pastAppts.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold mb-4">Past</h2>
                  <div className="space-y-3">
                    {pastAppts.map((a) => (
                      <AppointmentCard
                        key={a.id}
                        appt={a}
                        onCancel={handleCancel}
                        isCancelling={cancellingId === a.id && cancelMutation.isPending}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="max-w-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" /> Your Profile
                </CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoadingProfile ? (
                  <div className="space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      {editingName ? (
                        <div className="flex gap-2">
                          <Input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder={profile?.name}
                            autoFocus
                          />
                          <Button
                            size="sm"
                            onClick={handleSaveName}
                            disabled={updateProfileMutation.isPending}
                          >
                            {updateProfileMutation.isPending ? "Saving…" : "Save"}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditingName(false)}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between border border-border rounded-md px-3 py-2 bg-secondary/30">
                          <span>{profile?.name ?? user?.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-primary h-auto p-0 hover:underline"
                            onClick={() => {
                              setNewName(profile?.name ?? user?.name ?? "");
                              setEditingName(true);
                            }}
                          >
                            Edit
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <div className="flex items-center border border-border rounded-md px-3 py-2 bg-secondary/30 text-muted-foreground">
                        {profile?.email ?? user?.email}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Role</Label>
                      <div className="flex items-center border border-border rounded-md px-3 py-2 bg-secondary/30">
                        <Badge variant="secondary" className="capitalize">
                          {profile?.role ?? user?.role}
                        </Badge>
                      </div>
                    </div>

                    {profile?.createdAt && (
                      <p className="text-xs text-muted-foreground">
                        Member since {format(new Date(profile.createdAt), "MMMM yyyy")}
                      </p>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
