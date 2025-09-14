import { Link } from "react-router-dom";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import AppButton from "../../components/other/AppButton";
import RequestsPage from "../../components/other/RequestPage";
import { Role } from "../../types/User";

function Requests({ role }: { role: Role }) {
  return (
    <div className="">
      <RequestTableHeader
        title="Requests"
        subtitle="All pending and approved requests"
      >
        <Link
          to={
            role === "DEPARTMENT_DEAN"
              ? "/department/new_request"
              : role === "STORES_MANAGER"
              ? "/manager"
              : ""
          }
        >
          <AppButton variant="contained" color="primary">
            {role === "DEPARTMENT_DEAN" ? "Make Request" : "Reflresh"}
          </AppButton>
        </Link>
      </RequestTableHeader>
      <RequestsPage />
    </div>
  );
}

export default Requests;
