import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@data-service";
import { ProtectedRouteProps } from "@global-interface";
const Index = ({ element }: ProtectedRouteProps) =>
  isAuthenticated() ? <Navigate to="/main" replace /> : element;

export default Index;
