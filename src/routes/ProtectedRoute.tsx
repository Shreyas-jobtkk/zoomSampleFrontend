import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return sessionStorage.getItem("adminMail") ? (
    element
  ) : (
    <Navigate to="/BadRequest" />
  );
};

export default ProtectedRoute;
