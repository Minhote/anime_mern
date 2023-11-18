import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export default function PublicRoutes({ children }: { children: any }) {
  const { authenticated } = useAuthStore();

  return authenticated === false ? children : <Navigate to="/diario" />;
}
