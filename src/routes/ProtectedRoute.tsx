import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ element }: { element: JSX.Element }) => {
  return sessionStorage.getItem("adminNo") ? (
    element
  ) : (
    <Navigate to="/BadRequest" />
  );
};

const ProtectedContractRoute = ({ element }: { element: JSX.Element }) => {
  return sessionStorage.getItem("contractorNo") ? (
    element
  ) : (
    <Navigate to="/BadRequest" />
  );
};

const ProtectedInterpreterRoute = ({ element }: { element: JSX.Element }) => {
  return sessionStorage.getItem("interpreterNo") ? (
    element
  ) : (
    <Navigate to="/BadRequest" />
  );
};

export default {
  ProtectedAdminRoute,
  ProtectedContractRoute,
  ProtectedInterpreterRoute,
};
