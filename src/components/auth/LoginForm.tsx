import { useState } from "react";
import "./style/common.css";
import "./style/UserRegistartion.css";
import { useUserContext } from "../../../hooks/UserContextHook";

function LoginForm() {
  const { signIn, isLoading } = useUserContext();

  const [ssn, setSsn] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    switch (id) {
      case "ssn":
        setSsn(value);
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
    // alert(`SSN: ${ssn}, Password: ${password}`);
    signIn({ socialSecurityNumber: ssn, password });
    // if (user?.user) {
    //   navigate("/to some page");
    // }
  };

  return (
    <div className="authComps">
      <div className="authImage">Image</div>
      <form className="authForms" autoComplete="off" onSubmit={handleSubmit}>
        <div className="authFormBody">
          <div className="authFormHeader">
            <h3>Login</h3>
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
