"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bg from "../../../../../public/images/auth/Picture.png";
import logo from "../../../../../public/images/logo/logo.png";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser, clearError } from "@/store/slices/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Clear Redux error when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); // or wherever authenticated users should go
    }
  }, [isAuthenticated, router]);

  // Show error toast if Redux error exists
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear validation errors when user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password || !formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Clear any previous errors
    dispatch(clearError());

    try {
      const credentials = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        rememberMe: formData.rememberMe,
      };

      const result = await dispatch(loginUser(credentials)).unwrap();

      // Success toast
      toast.success("Login successful! Welcome back.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset form
      setFormData({
        email: "",
        password: "",
        rememberMe: false,
      });

      // Navigation will be handled by the useEffect hook above
    } catch (error) {
      // Error is already handled by Redux and useEffect
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white px-4 sm:px-8 md:px-16 py-10">
        <div className="w-full max-w-md">
          <div className="w-full flex justify-center" >
            <div className="max-w-[260px] mb-10">
              <Image src={logo} alt="logo" quality={100} />
            </div>
          </div>

          <p className="text-gray-500 mt-4 mb-5 text-center">Welcome back!</p>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Login to your account
          </h2>

          <form className="w-full" onSubmit={handleSubmit}>
            {/* Email Field */}
            <label className="block text-sm text-gray-700 mb-1">E-mail *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@mail.com"
              className={`w-full p-3 mb-1 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                validationErrors.email ? "border-red-500" : "border-gray-200"
              }`}
              disabled={loading}
              maxLength={100}
            />
            {validationErrors.email && (
              <p className="text-red-500 text-xs mb-3">
                {validationErrors.email}
              </p>
            )}

            {/* Password Field */}
            <label className="block text-sm text-gray-700 mb-1 mt-4">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full p-3 pr-10 mb-1 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  validationErrors.password
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
                disabled={loading}
                maxLength={128}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                aria-label="Toggle password visibility"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {validationErrors.password && (
              <p className="text-red-500 text-xs mb-3">
                {validationErrors.password}
              </p>
            )}

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between mb-6 mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-2 accent-blue-600"
                  disabled={loading}
                />
                <label htmlFor="remember" className="text-sm text-blue-600">
                  Remember Me
                </label>
              </div>
              <Link 
                href="/forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-5 py-3 rounded-md font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Register Button */}
            <Link href="/registration" className="block mt-5">
              <button
                type="button"
                className="w-full border border-blue-600 text-blue-600 py-3 rounded-md font-semibold hover:bg-blue-50 transition"
                disabled={loading}
              >
                Register
              </button>
            </Link>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 relative hidden md:block">
        <Image src={bg} alt="Bookstore" fill className="object-cover" />
      </div>
    </div>
  );
}