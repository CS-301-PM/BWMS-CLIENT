import { useEffect, useState } from "react";
import "./style/common.css";
import "./style/UserRegistartion.css";
import { useUserContext } from "../../../hooks/UserContextHook";

function UserRegistration() {
  const { user, signUp, isLoading, error } = useUserContext();

  // const [phone, setPhone] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [ssn, setSsn] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [hasAdminAccess, setHasAdminAccess] = useState<boolean>(false);
  const rawNewUserData = {
    fullname,
    socialSecurityNumber: ssn,
    role,
    department,
    password,
    confirmPassword,
  };

  useEffect(() => {
    if (user) {
      setHasAdminAccess(user.hasAdmin);
    }
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    switch (id) {
      case "fullname":
        setFullname(value);
        break;
      case "ssn":
        setSsn(value);
        break;
      case "role":
        setRole(value);
        break;
      case "department":
        setDepartment(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // alert(
    //   `Fullname: ${fullname}, SSN: ${ssn}, Role: ${role}, Department: ${department}, Password: ${password}, Confirm Password: ${confirmPassword}`
    // );
    signUp({ ...rawNewUserData });
  };

  return (
    <div className="authComps">
      <div className="authImage">Image</div>
      <form className="authForms" autoComplete="off" onSubmit={handleSubmit}>
        <div className="authFormBody">
          <div className="authFormHeader">
            <h3>Register user</h3>
          </div>

          <div className="eachInputField mb-1">
            <div className="form-floating">
              <input
                name="fullname"
                type="text"
                className="form-control"
                id="fullname"
                value={fullname}
                onChange={handleChange}
                placeholder="fullname"
              />
              <label htmlFor="fullname">Fullname</label>
            </div>
            <div id="fullnameError" className="eachInputErrorMessageBox"></div>
          </div>

          <div className="eachInputField mb-1">
            <div className="form-floating">
              <input
                name="ssn"
                type="number"
                className="form-control"
                id="ssn"
                value={ssn}
                onChange={handleChange}
                placeholder="ssn"
              />
              <label htmlFor="ssn">SSN</label>
            </div>
            <div id="ssnError" className="eachInputErrorMessageBox"></div>
          </div>

          {/* ROLE */}
          <div className="eachInputField mb-1">
            <div className="form-floating">
              <select
                className="form-select"
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                aria-label="Floating label select example"
              >
                <option value="">Select role</option>
                {hasAdminAccess && <option value="admin">Admin</option>}
                {!hasAdminAccess && (
                  <>
                    <option value="manager">Manager</option>
                    <option value="operator">Operator</option>
                    <option value="department">Department</option>
                  </>
                )}
              </select>
              <label htmlFor="role">Role</label>
            </div>
            <div id="roleError" className="eachInputErrorMessageBox"></div>
          </div>

          {/* DEPARTMENT - only show if role is 'department' */}
          {role === "department" && (
            <div className="eachInputField mb-1">
              <div className="form-floating">
                <select
                  className="form-select"
                  name="department"
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  aria-label="Floating label select example"
                >
                  <option value="">Select department</option>
                  <option value="registrar">Registrar’s Office</option>
                  <option value="admissions">Admissions Office</option>
                  <option value="academics">Academic Affairs</option>
                  <option value="finance">Finance Department</option>
                  <option value="ict">ICT Services</option>
                </select>
                <label htmlFor="department">Department</label>
              </div>
              <div
                id="departmentError"
                className="eachInputErrorMessageBox"
              ></div>
            </div>
          )}

          <div className="eachInputField mb-1">
            <div className="form-floating">
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={handleChange}
                placeholder="password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div id="passwordError" className="eachInputErrorMessageBox"></div>
          </div>

          <div className="eachInputField mb-1">
            <div className="form-floating">
              <input
                name="confirmPassword"
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="confirmPassword"
              />
              <label htmlFor="confirmPassword">Confirm</label>
            </div>
            <div id="confirmError" className="eachInputErrorMessageBox"></div>
          </div>

          <input
            type="submit"
            value={"Register"}
            className="btn btn-secondary btn-sm authSubmitForm"
            disabled={isLoading}
          />
        </div>
        <div className="authFormFooter"></div>
      </form>
    </div>
  );
}

export default UserRegistration;
