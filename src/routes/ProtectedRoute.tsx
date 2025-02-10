import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ element }: { element: JSX.Element }) => {
  return sessionStorage.getItem("adminMail") ? (
    element
  ) : (
    <Navigate to="/BadRequest" />
  );
};

const ProtectedContractRoute = ({ element }: { element: JSX.Element }) => {
  return sessionStorage.getItem("contractorMail") ? (
    element
  ) : (
    <Navigate to="/BadRequest" />
  );
};

const ProtectedInterpreterRoute = ({ element }: { element: JSX.Element }) => {
  return sessionStorage.getItem("interpreterMail") ? (
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
