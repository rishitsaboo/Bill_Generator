import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../api/authApi";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const data = await loginUser(formData);

      if (!data?.token) {
        throw new Error(data?.message || "Login failed");
      }

      localStorage.setItem("auth_token", data.token);
      setError("");
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        className="flex flex-col pt-45 gap-5 items-center w-full max-w-md pt-6"
        onSubmit={handleSubmit}
      >
        {error && (
          <p className="text-red-600 text-sm font-semibold">{error}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border-4 border-yellow-800 rounded-3xl p-4 w-64 sm:w-80 md:w-96 text-yellow-900 placeholder:font-normal font-bold
          placeholder-gray-500 placeholder:font-serif placeholder:text-lg 
          focus:outline-none focus:ring-2 focus:ring-yellow-900"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border-4 border-yellow-800 rounded-3xl p-4 w-64 sm:w-80 md:w-96 text-yellow-900 placeholder:font-normal font-bold
          placeholder-gray-500 placeholder:font-serif placeholder:text-lg
          focus:outline-none focus:ring-2 focus:ring-yellow-900 "
        />

        <button
          type="submit"
          className="w-32 sm:w-40 py-3 sm:py-4
          font-serif font-bold text-lg sm:text-xl
          bg-yellow-900 text-white rounded-2xl
          shadow-md hover:bg-yellow-800 transition duration-300"
        >
          Login
        </button>
        <Link to="/register">
          <h2 className=" text-yellow-800 font-serif text-xl font-bold cursor-pointer hover:underline">
            Create Account
          </h2>
        </Link>
      </form>
    </div>
  );
};

export default Login;
