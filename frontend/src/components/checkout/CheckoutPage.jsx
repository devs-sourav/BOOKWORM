"use client";
import { useState } from "react";
import { Trash2, MapPin, Truck, ShoppingCart } from "lucide-react";
import { Container } from "../shared/Container";
import Link from "next/link";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    zone: "",
    area: "",
    street: "",
    coupon: "",
    deliveryType: "inside-dhaka",
  });

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Black Panjabi-Pajama & Waistcoat Set",
      quantity: 1,
      price: 2000,
    },
    {
      id: 2,
      name: "Classic White Kurta with Embroidered Details",
      quantity: 2,
      price: 1500,
    },
    {
      id: 3,
      name: "Elegant Navy Blue Sherwani with Gold Accents",
      quantity: 1,
      price: 3500,
    },
  ]);

  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.zone) newErrors.zone = "Zone is required";
    if (!formData.area) newErrors.area = "Area is required";
    if (!formData.street.trim())
      newErrors.street = "Street address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      city: "",
      zone: "",
      area: "",
      street: "",
      coupon: "",
      deliveryType: "inside-dhaka",
    });
    setCouponApplied(false);
    setCouponDiscount(0);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && cartItems.length > 0) {
      console.log("Order placed:", formData);
      alert("Order placed successfully!");
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleApplyCoupon = () => {
    if (formData.coupon.toUpperCase() === "SAVE10") {
      setCouponDiscount(100);
      setCouponApplied(true);
      alert("Coupon applied successfully! ৳100 discount added.");
    } else if (formData.coupon) {
      alert("Invalid coupon code. Please try again.");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryCharge = formData.deliveryType === "inside-dhaka" ? 60 : 150;
  const total = subtotal + deliveryCharge - couponDiscount;

  return (
    <div className="min-h-screen bg-gray-50 py-8 lg:py-12">
      <Container className=" ">
        <div className="mb-8">
          <h1 className="text-center text-3xl font-bold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-center text-gray-600">
            Complete your order information below
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white p-6 lg:p-8 shadow-sm rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">1</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Contact Information
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    name="fullName"
                    onChange={handleChange}
                    value={formData.fullName}
                    placeholder="Enter your full name"
                    className={`border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    placeholder="+880 1xxx-xxxxxx"
                    className={`border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address (optional)
                  </label>
                  <input
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={formData.email}
                    placeholder="example@email.com"
                    className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white p-6 lg:p-8 shadow-sm rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">2</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Shipping Address
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <select
                    name="city"
                    onChange={handleChange}
                    value={formData.city}
                    className={`border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a city</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barisal">Barisal</option>
                  </select>
                  {errors.city && (
                    <p className="text-sm text-red-600 mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zone *
                  </label>
                  <select
                    name="zone"
                    onChange={handleChange}
                    value={formData.zone}
                    className={`border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.zone ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select zone</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="Central">Central</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                  </select>
                  {errors.zone && (
                    <p className="text-sm text-red-600 mt-1">{errors.zone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area *
                  </label>
                  <select
                    name="area"
                    onChange={handleChange}
                    value={formData.area}
                    className={`border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.area ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select area</option>
                    <option value="Mirpur">Mirpur</option>
                    <option value="Banani">Banani</option>
                    <option value="Gulshan">Gulshan</option>
                    <option value="Dhanmondi">Dhanmondi</option>
                    <option value="Uttara">Uttara</option>
                    <option value="Wari">Wari</option>
                  </select>
                  {errors.area && (
                    <p className="text-sm text-red-600 mt-1">{errors.area}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    name="street"
                    onChange={handleChange}
                    value={formData.street}
                    placeholder="House no, Road no, Block"
                    className={`border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.street ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.street && (
                    <p className="text-sm text-red-600 mt-1">{errors.street}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-white p-6 lg:p-8 shadow-sm rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Delivery Options
                </h2>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="inside-dhaka"
                    checked={formData.deliveryType === "inside-dhaka"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">Inside Dhaka</div>
                      <div className="text-sm text-gray-600">
                        Delivery within 24-48 hours
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-green-600">৳60</div>
                </label>

                <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="outside-dhaka"
                    checked={formData.deliveryType === "outside-dhaka"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Outside Dhaka</div>
                      <div className="text-sm text-gray-600">
                        Delivery within 3-5 business days
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-blue-600">৳150</div>
                </label>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="bg-white p-6 lg:p-8 shadow-sm rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Coupon Code
              </h3>
              <div className="flex gap-3">
                <input
                  name="coupon"
                  onChange={handleChange}
                  value={formData.coupon}
                  placeholder="Enter coupon code"
                  className="border border-gray-300 px-4 py-3 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ Coupon applied successfully!
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Reset Form
              </button>
              <button
                type="submit"
                disabled={cartItems.length === 0}
                className="bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors flex-1"
              >
                Place Order (৳{total})
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 lg:p-8 shadow-sm rounded-lg border border-gray-200 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg mb-4">Your cart is empty</p>
                  <div>
                    <Link href={"/shop"}>
                      {" "}
                      <button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition-colors">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start gap-3 pb-4 border-b border-gray-100"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-sm leading-tight mb-2">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="text-sm w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            ৳{item.price * item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>৳{subtotal}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Delivery Charge</span>
                      <span>৳{deliveryCharge}</span>
                    </div>

                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Coupon Discount</span>
                        <span>-৳{couponDiscount}</span>
                      </div>
                    )}

                    <hr className="my-4" />

                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-blue-600">৳{total}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Your personal data will be used to process your order and
                      support your experience throughout this website. By
                      placing an order, you agree to our{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        privacy policy
                      </a>
                      .
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
