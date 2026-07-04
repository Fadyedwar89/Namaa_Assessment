import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await authService.register(form);

      alert("Registration Successful");

      navigate("/Products");
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
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
                      className="form-control form-control-lg"
                      placeholder="Enter your Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>

                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                    />
                  </div>
                  <label className="form-label">Confirm Password</label>

                  <div className="mb-3">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-control form-control-lg"
                      placeholder="Confirm password"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-2">
                    Register
                  </button>
                </form>

                <hr className="my-4" />

                <p className="text-center mb-0">
                  Already have an account? <Link to="/Products">Login</Link>
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
