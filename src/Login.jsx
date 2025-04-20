import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "./api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { username, password });

      // Store token & user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username);

      navigate("/tasks"); // redirect to task page
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Login failed. Please try again."
      );
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
        Login
      </h1>

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded shadow-md"
        aria-label="Login Form"
      >
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

        {errorMsg && (
          <p className="text-red-500 text-center text-sm">{errorMsg}</p>
        )}

        <button
          type="submit"
          className="relative left-12 bg-blue-600 text-white py-2 rounded hover:bg-blue-500 max-w-80"
          aria-label="Submit Login"
        >
          Login
        </button>

        <p className="text-sm text-center mt-2">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline"
            aria-label="Go to Signup Page"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
