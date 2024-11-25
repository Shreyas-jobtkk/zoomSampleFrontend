import NavRoutes from "./routes/NavRoutes.js";
import AppMenuRoutes from "./routes/AdminMenuRoutes.js";
import AdministratorListRoutes from "./routes/AdministratorListRoutes.js";
import CompanyListRoutes from "./routes/CompanyListRoutes.js";
import StoreListRoutes from "./routes/StoreListRoutes.js";
import InterpretersListRoutes from "./routes/InterpretersListRoutes.js";

const AppRoutes2: React.FC = () => {
  return (
    <div>
      <AppMenuRoutes />
      <AdministratorListRoutes />
      <CompanyListRoutes />
      <StoreListRoutes />
      <InterpretersListRoutes />
      <NavRoutes />
    </div>
  );
};

export default AppRoutes2;
