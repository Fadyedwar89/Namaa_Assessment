import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";
import { jwtDecode } from "jwt-decode";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
  });
 const handleChange = (e) => {
   setServerErrors([]);

   setForm({
     ...form,
     [e.target.name]: e.target.value,
   });
 };
 const [serverErrors, setServerErrors] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerErrors([]);
    const newErrors = {};

    if (!form.displayName.trim()) {
      newErrors.displayName = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (form.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      await authService.register(form);

      const data = await authService.login({
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("displayName", data.displayName);
      localStorage.setItem("email", data.email);

      const decoded = jwtDecode(data.token);

      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      localStorage.setItem("role", role);

      navigate("/products");
    } catch (err) {
      const error = err.response?.data;

      if (error?.Errors) {
        setServerErrors(error.Errors);
      } else {
        setServerErrors([error?.ErrorMessage || "Registration Failed"]);
      }
    }
  };
  return (
    <section className="register-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-8 col-lg-6">
            <div className="card register-card shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Create Account</h2>
                  <p className="text-secondary">
                    Register to start using the system
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      name="displayName"
                      value={form.displayName}
                      onChange={handleChange}
                      className={`form-control form-control-lg ${
                        errors.displayName ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your Name"
                    />

                    {errors.displayName && (
                      <div className="invalid-feedback">
                        {errors.displayName}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`form-control form-control-lg ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your email"
                    />

                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className={`form-control form-control-lg ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Enter password"
                    />

                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <label className="form-label">Confirm Password</label>

                  <div className="mb-3">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`form-control form-control-lg ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      placeholder="Confirm password"
                    />

                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                  {serverErrors.length > 0 && (
                    <div className="alert alert-danger">
                      <ul className="mb-0">
                        {serverErrors.map((err, index) => (
                          <li key={index}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary w-100 py-2">
                    Register
                  </button>
                </form>

                <hr className="my-4" />

                <p className="text-center mb-0">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
