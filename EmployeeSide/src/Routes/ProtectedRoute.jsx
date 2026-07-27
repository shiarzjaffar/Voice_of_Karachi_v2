import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const employee = localStorage.getItem("employee");

  if (!employee) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;