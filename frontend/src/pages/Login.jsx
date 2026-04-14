import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      {/* 🌌 Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500 blur-[120px] opacity-30"></div>

      {/* ⚡ Card */}
      <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse">

        <div className="bg-gray-900 rounded-2xl p-8 w-80">

          <h2 className="text-white text-2xl font-bold mb-6">
            Login
          </h2>

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-gray-800 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-gray-800 text-white outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-white text-black py-2 rounded hover:scale-105 transition"
          >
            Get Started
          </button>

          <p className="text-gray-400 mt-4 text-sm text-center">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-cyan-400 cursor-pointer"
            >
              Register
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}