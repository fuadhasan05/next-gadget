"use client";

import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { redirect: true, callbackUrl: "/dashboard/add-product" });
      toast.success("✅ Logged in successfully!");
    } catch (err) {
      toast.error("❌ Google login failed!");
    }
  };

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard/add-product", // redirect after login
    });

    if (res?.error) {
      toast.error("❌ Invalid credentials!");
    } else {
      toast.success("✅ Logged in successfully!");
    }
  };

  return (
    <div className="flex items-center justify-center bg-base-100 min-h-screen w-full">
      <div className="bg-base-200 p-8 rounded-xl shadow-md max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {/* Credentials Login */}
        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center text-gray-500">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-gray-600 text-white py-2 rounded-lg"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}