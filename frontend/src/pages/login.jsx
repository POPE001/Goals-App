import { useState, useContext } from "react";
import { FaSignInAlt } from "react-icons/fa";
import authService from "../services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/userContext";
import LoadingContext from "../context/appLoadingContext";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const { setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const initialData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [validationErr, setvalidationErr] = useState({});
  const { email, password } = formData;

  const onChange = (eve) => {
    const { name, value } = eve.currentTarget;
    let loginData = { ...formData };
    loginData[name] = value;
    setFormData(loginData);
  };

  const onSubmit = async (eve) => {
    let errors = {};
    try {
      eve.preventDefault();
      setLoading(true);
      const userData = await authService.login(formData);
      setvalidationErr(errors);
      setUser(userData);
      setFormData(initialData);
      navigate("/", { replace: true });
    } catch (err) {
      setLoading(false);
      if (Array.isArray(err)) {
        for (const eachErr of err) {
          errors[eachErr.param] = eachErr.msg;
        }
      } else {
        toast.error(err.msg);
      }
      setvalidationErr(errors);
    }
  };

  return (
    <>
      <section className="heading">
        <h3>
          <FaSignInAlt className="signin-icon" />
          Login
        </h3>
        <p>Login & Start Setting Goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your Email"
              onChange={onChange}
              required
            />
            {validationErr.email && (
              <h4 className="error">{validationErr.email}</h4>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your Password"
              onChange={onChange}
              required
            />
            {validationErr.password && (
              <h4 className="error">{validationErr.password}</h4>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
