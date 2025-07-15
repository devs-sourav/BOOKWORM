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
import { registerUser, clearError } from "@/store/slices/authSlice";
import AuthGuard from "@/components/AuthGuard";

export default function RegistrationPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "General",
    password: "",
    rememberMe: false,
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Clear Redux error when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

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

    // Name validation - check for empty or whitespace-only
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Name can only contain letters and spaces";
    }

    // Email validation - check for empty or whitespace-only
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    } else if (formData.email.trim().length > 100) {
      newErrors.email = "Email must be less than 100 characters";
    }

    // Password validation - check for empty or whitespace-only
    if (!formData.password || !formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (formData.password.length > 128) {
      newErrors.password = "Password must be less than 128 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = "Please select a role";
    } else if (!["General", "Author"].includes(formData.role)) {
      newErrors.role = "Please select a valid role";
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
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        role: formData.role.toLowerCase(), // Convert to lowercase to match backend
        password: formData.password, // Don't trim password as it might contain intentional spaces
      };

      const result = await dispatch(registerUser(userData)).unwrap();

      // Success toast
      toast.success(
        "Registration successful! Please check your email to verify account.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        role: "General",
        password: "",
        rememberMe: false,
      });

      // Navigate to login page after 1 second
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      // Error is already handled by Redux and useEffect
      console.error("Registration error:", error);
    }
  };

  return (
    // <AuthGuard requireAuth={false}>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Side */}
        <div className="w-full md:w-1/2 relative hidden md:block">
          <Image src={bg} alt="Bookstore" fill className="object-cover" />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-white px-4 sm:px-8 md:px-16 py-10">
          <div className="w-full max-w-md">
            <Link className="w-full flex justify-center" href="/">
              <div className="max-w-[260px] mb-10">
                <Image src={logo} alt="logo" quality={100} />
              </div>
            </Link>

            <p className="text-gray-500 mt-4 mb-5 text-center">Welcome here!</p>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Register to your account
            </h2>

            <form className="w-full" onSubmit={handleSubmit}>
              {/* Name Field */}
              <label className="block text-sm text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full p-3 mb-1 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  validationErrors.name ? "border-red-500" : "border-gray-200"
                }`}
                disabled={loading}
                maxLength={50}
              />
              {validationErrors.name && (
                <p className="text-red-500 text-xs mb-3">
                  {validationErrors.name}
                </p>
              )}

              {/* Email Field */}
              <label className="block text-sm text-gray-700 mb-1 mt-4">
                E-mail *
              </label>
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

              {/* Role Field */}
              <label className="block text-sm text-gray-700 mb-1 mt-4">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full p-3 mb-1 border cursor-pointer rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  validationErrors.role ? "border-red-500" : "border-gray-200"
                }`}
                disabled={loading}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="General">General</option>
                <option value="Author">Author</option>
              </select>
              {validationErrors.role && (
                <p className="text-red-500 text-xs mb-3">
                  {validationErrors.role}
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

              {/* Remember Me */}
              <div className="flex items-center mb-6 mt-4">
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-5 py-3 rounded-md font-semibold transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                {loading ? "Registering..." : "Register"}
              </button>

              {/* Login Button */}
              <Link href="/login" className="block mt-5">
                <button
                  type="button"
                  className="w-full border border-blue-600 text-blue-600 py-3 rounded-md font-semibold hover:bg-blue-50 transition"
                  disabled={loading}
                >
                  Login
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    // </AuthGuard>
  );
}