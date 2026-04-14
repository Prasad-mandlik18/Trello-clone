import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", { email, password });

      alert("Registered!");
      navigate("/");
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      {/* Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500 blur-[120px] opacity-30"></div>

      {/* Card */}
      <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse">

        <div className="bg-gray-900 rounded-2xl p-8 w-80">

          <h2 className="text-white text-2xl font-bold mb-6">
            Register
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
            onClick={handleRegister}
            className="w-full bg-white text-black py-2 rounded hover:scale-105 transition"
          >
            Create Account
          </button>

          <p className="text-gray-400 mt-4 text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-pink-400 cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}