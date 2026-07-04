import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await authService.login(loginData);

      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("displayName", data.displayName);

      const decoded = jwtDecode(data.token);

      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      localStorage.setItem("role", role);

      navigate("/Products");
    } catch (err) {
      console.log(err);

      setError("Invalid Email Or Password");
    }
  };

  return (
    <section className="login-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-7 col-lg-5">
            <div className="card login-card shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Welcome Back</h2>

                  <p className="text-secondary">Sign in to continue</p>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>

                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="example@email.com"
                      value={loginData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>

                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="********"
                      value={loginData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <button className="btn btn-primary w-100 py-2" type="submit">
                    Login
                  </button>
                </form>
                <div className="text-center mt-4">
                  <p>
                    Not a member?{" "}
                    <Link to="/register" className="text-decoration-none">
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
