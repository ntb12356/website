import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import {
  useGetAdminStats,
  useGetAdminAppointments,
  useUpdateAdminAppointmentStatus,
  useGetAdminPatients,
  getGetAdminStatsQueryKey,
  getGetAdminAppointmentsQueryKey,
  getGetAdminPatientsQueryKey,
} from "@workspace/api-client-react";
import type { Appointment } from "@workspace/api-client-react";
import { format } from "date-fns";
import { CalendarDays, Users, ClipboardList, Clock, Search, LogOut } from "lucide-react";

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"] as const;
type AppointmentStatus = typeof STATUS_OPTIONS[number];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

function StatCard({ title, value, icon: Icon }: { title: string; value: number | undefined; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          {value === undefined ? (
            <Skeleton className="h-7 w-16 mt-1" />
          ) : (
            <p className="text-2xl font-bold">{value}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function AppointmentStatusSelect({
  appointment,
  onStatusChange,
  isUpdating,
}: {
  appointment: Appointment;
  onStatusChange: (id: number, status: AppointmentStatus) => void;
  isUpdating: boolean;
}) {
  return (
    <Select
      value={appointment.status}
      onValueChange={(v) => onStatusChange(appointment.id, v as AppointmentStatus)}
      disabled={isUpdating}
    >
      <SelectTrigger className="w-32 h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map((s) => (
          <SelectItem key={s} value={s} className="capitalize text-xs">
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function Admin() {
  const [, navigate] = useLocation();
  const { user, isLoading: isAuthLoading, logout } = useAuth();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // Redirect non-admins
  if (!isAuthLoading && (!user || user.role !== "admin")) {
    navigate("/");
    return null;
  }

  const { data: stats } = useGetAdminStats({ query: { enabled: user?.role === "admin", queryKey: getGetAdminStatsQueryKey() } });

  const { data: appointmentsData, isLoading: isLoadingAppts, refetch: refetchAppts } =
    useGetAdminAppointments(
      {
        page,
        limit: 20,
        search: search || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
      },
      { query: { enabled: user?.role === "admin", queryKey: getGetAdminAppointmentsQueryKey({ page, limit: 20, search: search || undefined, status: statusFilter !== "all" ? statusFilter : undefined }) } },
    );

  const { data: patientsData, isLoading: isLoadingPatients } =
    useGetAdminPatients({ query: { enabled: user?.role === "admin", queryKey: getGetAdminPatientsQueryKey() } });

  const updateStatus = useUpdateAdminAppointmentStatus();

  const handleStatusChange = (id: number, status: AppointmentStatus) => {
    setUpdatingId(id);
    updateStatus.mutate({ id, data: { status } }, {
      onSuccess: () => {
        toast({ title: "Status updated", description: `Appointment marked as ${status}.` });
        void refetchAppts();
      },
      onError: () => {
        toast({ title: "Error", description: "Could not update status.", variant: "destructive" });
      },
      onSettled: () => setUpdatingId(null),
    });
  };

  const totalPages = appointmentsData
    ? Math.ceil((appointmentsData.total ?? 0) / (appointmentsData.limit ?? 20))
    : 1;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24 px-4 container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage appointments and patients</p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-full text-muted-foreground self-start sm:self-auto"
            onClick={() => logout({ onSuccess: () => navigate("/") })}
          >
            <LogOut className="w-4 h-4 mr-1" /> Sign out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard title="Total Bookings" value={stats?.totalBookings} icon={ClipboardList} />
          <StatCard title="Today" value={stats?.todayBookings} icon={CalendarDays} />
          <StatCard title="Pending" value={stats?.pendingBookings} icon={Clock} />
          <StatCard title="Patients" value={stats?.totalPatients} icon={Users} />
        </div>

        <Tabs defaultValue="appointments">
          <TabsList className="mb-6">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email…"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Patient</th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Service</th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Date & Time</th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingAppts ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="border-t border-border">
                          <td className="px-4 py-3" colSpan={4}><Skeleton className="h-5 w-full" /></td>
                        </tr>
                      ))
                    ) : (appointmentsData?.appointments ?? []).length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                          No appointments found.
                        </td>
                      </tr>
                    ) : (
                      (appointmentsData?.appointments ?? []).map((appt) => (
                        <tr key={appt.id} className="border-t border-border hover:bg-secondary/20 transition-colors">
                          <td className="px-4 py-3">
                            <p className="font-medium">{appt.patientName}</p>
                            <p className="text-xs text-muted-foreground">{appt.patientEmail}</p>
                          </td>
                          <td className="px-4 py-3">{appt.service}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {format(new Date(appt.date), "MMM d, yyyy")} · {appt.timeSlot}
                          </td>
                          <td className="px-4 py-3">
                            <AppointmentStatusSelect
                              appointment={appt}
                              onStatusChange={handleStatusChange}
                              isUpdating={updatingId === appt.id && updateStatus.isPending}
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/20">
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {totalPages} — {appointmentsData?.total ?? 0} total
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                      Previous
                    </Button>
                    <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients">
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Name</th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Email</th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Appointments</th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Member Since</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingPatients ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="border-t border-border">
                          <td className="px-4 py-3" colSpan={4}><Skeleton className="h-5 w-full" /></td>
                        </tr>
                      ))
                    ) : (patientsData?.patients ?? []).length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                          No patients yet.
                        </td>
                      </tr>
                    ) : (
                      (patientsData?.patients ?? []).map((p) => (
                        <tr key={p.id} className="border-t border-border hover:bg-secondary/20 transition-colors">
                          <td className="px-4 py-3 font-medium">{p.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">{p.email}</td>
                          <td className="px-4 py-3">
                            <Badge variant="secondary">{p.appointmentCount}</Badge>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {p.createdAt ? format(new Date(p.createdAt), "MMM d, yyyy") : "—"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
