import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "./api";

function Registration() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", { username, password });
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
      role="main"
    >
      <h1
        className="text-3xl font-bold mb-6 text-gray-800"
        role="heading"
        aria-level="1"
      >
        Sign Up
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded shadow-md"
        aria-label="Registration Form"
      >
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <label
          htmlFor="username"
          className="text-gray-700 font-semibold flex items-center justify-evenly"
        >
          Username
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded"
            required
            aria-required="true"
          />
        </label>

        <label
          htmlFor="password"
          className="text-gray-700 font-semibold flex items-center justify-evenly"
        >
          Password
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded"
            required
            aria-required="true"
          />
        </label>

        <button
          type="submit"
          className="relative left-12 bg-blue-600 text-white py-2 rounded hover:bg-blue-500 max-w-80"
          aria-label="Submit Registration"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
            aria-label="Go to Login Page"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Registration;
