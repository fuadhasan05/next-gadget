"use client";

import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Button from "./ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { redirect: true, callbackUrl: "/" });
    } catch (err) {
      toast.error("❌ Google login failed!");
    }
  };

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("❌ Invalid credentials!");
      setIsLoading(false);
    } else {
      toast.success("✅ Logged in successfully!");
      // Force a hard refresh to ensure session is loaded
      window.location.href = "/";
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
            required
            suppressHydrationWarning={true} // Add this line
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
            required
            suppressHydrationWarning={true} // Also add to password field for consistency
          />
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
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
            disabled={isLoading}
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            Continue with Google
          </Button>
        </div>

        {/* Register Link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
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