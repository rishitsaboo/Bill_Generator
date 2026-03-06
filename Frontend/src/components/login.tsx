import React, { useState } from "react";
import { Link } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
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

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login Failed");
      }

      console.log("Success", data);
      setError("");
    } catch (err: any) {
      setError(err.message);
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
          className="border-4 border-yellow-800 rounded-3xl p-4 w-[85vw] sm:w-80 md:w-96 text-yellow-900 placeholder:font-normal font-bold
          placeholder-gray-500 placeholder:font-serif placeholder:text-lg 
          focus:outline-none focus:ring-2 focus:ring-yellow-900"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border-4 border-yellow-800 rounded-3xl p-4 w-[85vw] sm:w-80 md:w-96 text-yellow-900 placeholder:font-normal font-bold
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