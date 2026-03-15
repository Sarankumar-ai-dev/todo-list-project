import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.fullname?.value?.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      if (!isLogin) {
        await axios.post("https://todo-list-project-ld8p.onrender.com/api/accounts/register/", {
          username: name,
          email: email,
          password: password,
        });
      }

      const res = await axios.post("https://todo-list-project-ld8p.onrender.com/api/token/", {
        username: isLogin ? email : name,
        password: password,
      });

      localStorage.setItem("token", res.data.access);
      localStorage.setItem("userName", isLogin ? email : name);
      localStorage.setItem("userEmail", email);

      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.detail || "Something went wrong. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {!isLogin && (
          <input name="fullname" type="text" placeholder="Full Name" required />
        )}

        <input name="email" type="text" placeholder="mail id or user name " required />
        <input name="password" type="password" placeholder="Password" required />

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="toggle-text">
          {isLogin ? "Don't have account? " : "Already have account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;