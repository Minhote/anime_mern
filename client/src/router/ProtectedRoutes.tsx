import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export default function ProtectedRoutes({ children }: { children: any }) {
  const { authenticated } = useAuthStore();

  if (!authenticated) {
    return <Navigate to={"/"} replace />;
  }

  return children;
}
