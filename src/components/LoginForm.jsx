"use client";

import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Button from "./ui/Button";

export default function LoginForm() {
  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { redirect: true, callbackUrl: "/products" });
      // toast.success("✅ Logged in successfully!");
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
      callbackUrl: "/products", // redirect after login
    });

    if (res?.error) {
      toast.error("❌ Invalid credentials!");
    } else {
      toast.success("✅ Logged in successfully!");
    }
  };

  return (
    <div className="flex items-center justify-center bg-base-100 min-h-screen w-full">
      <div className="bg-base-200 p-8 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Login Next Gadget
        </h1>

        {/* Credentials Login */}
        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
            suppressHydrationWarning
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <Button type="submit" variant="primary" size="lg" className="w-full">
            Login
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center text-gray-500">OR</div>

        {/* Google Sign in Button */}
        <div>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            Continue with Google
          </Button>
        </div>

        {/* Register Link */}
        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
