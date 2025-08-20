import { useState } from "react";
import "./style/common.css";
import "./style/UserRegistartion.css";
import { useUserContext } from "../../../hooks/UserContextHook";

function LoginForm() {
  const { signIn, isLoading } = useUserContext();

  const [employeeId, setEmployeeId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    switch (id) {
      case "employeeId":
        setEmployeeId(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // alert(`Employee ID: ${employeeId}, Password: ${password}`);
    signIn({ employeeId, password } as any);
    // if (user?.user) {
    //   navigate("/to some page");
    // }
  };

  return (
    <div className="authComps">
      <div className="authImage">
        <i className="authIcons bi-shield-lock-fill"></i>
      </div>
      <form className="authForms" autoComplete="off" onSubmit={handleSubmit}>
        <div className="authFormBody">
          <div className="authFormHeader">
            <h3>Login</h3>
          </div>

          <div className="eachInputField mb-1">
            <div className="form-floating">
              <input
                name="employeeId"
                type="number"
                className="form-control"
                id="employeeId"
                value={employeeId}
                onChange={handleChange}
                placeholder="employeeId"
              />
              <label htmlFor="employeeId">Employee ID</label>
            </div>
            <div
              id="employeeIdError"
              className="eachInputErrorMessageBox"
            ></div>
          </div>

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

          <input
            type="submit"
            value="Login"
            className="btn btn-secondary btn-sm authSubmitForm"
            disabled={isLoading}
          />
        </div>
        <div className="authFormFooter"></div>
      </form>
    </div>
  );
}

export default LoginForm;
