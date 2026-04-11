import { createContext, useContext, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMe, useLogin, useLogout, useRegister, getGetMeQueryKey } from "@workspace/api-client-react";
import type { AuthUser, LoginBody, RegisterBody } from "@workspace/api-client-react";

interface AuthContextValue {
  user: AuthUser | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (body: LoginBody, options?: { onSuccess?: () => void; onError?: (err: Error) => void }) => void;
  register: (body: RegisterBody, options?: { onSuccess?: () => void; onError?: (err: Error) => void }) => void;
  logout: (options?: { onSuccess?: () => void }) => void;
  isPendingLogin: boolean;
  isPendingRegister: boolean;
  isPendingLogout: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useGetMe({
    query: {
      retry: false,
      staleTime: 5 * 60 * 1000,
      queryKey: getGetMeQueryKey(),
    },
  });

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const invalidateMe = () => queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });

  const login: AuthContextValue["login"] = (body, options) => {
    loginMutation.mutate({ data: body }, {
      onSuccess: () => {
        void invalidateMe();
        options?.onSuccess?.();
      },
      onError: (err: unknown) => options?.onError?.(err as Error),
    });
  };

  const register: AuthContextValue["register"] = (body, options) => {
    registerMutation.mutate({ data: body }, {
      onSuccess: () => {
        void invalidateMe();
        options?.onSuccess?.();
      },
      onError: (err: unknown) => options?.onError?.(err as Error),
    });
  };

  const logout: AuthContextValue["logout"] = (options) => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.clear();
        options?.onSuccess?.();
      },
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      isPendingLogin: loginMutation.isPending,
      isPendingRegister: registerMutation.isPending,
      isPendingLogout: logoutMutation.isPending,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
