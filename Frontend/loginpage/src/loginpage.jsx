import { useState } from "react";
import axios from "axios";


export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const url = isLogin
        ? "http://localhost:4000/login"
        : "http://localhost:4000/signup";
      const res = await axios.post(url, form);
      setMessage(res.data.message || "Success");

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username || form.username);
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          {isLogin ? "Login" : "Signup"}
        </button>

        <p className="toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Need an account? Signup"
            : "Already have an account? Login"}
        </p>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

 
