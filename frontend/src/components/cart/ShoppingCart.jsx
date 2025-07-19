"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, X, ArrowLeft } from "lucide-react";
import { Container } from "../shared/Container";
import Link from "next/link";

const ShoppingCart = () => {
  const router = useRouter();

  const [cartBooks, setCartBooks] = useState([
    {
      id: 1,
      title: "When We Believed in Mermaids",
      author: "Barbara O'Neal",
      format: "Paperback",
      price: 380,
      quantity: 1,
      image: "/images/products/1.jpg",
    },
  ]);

  const toggleCart = () => {
    setCartBooks(
      cartBooks.length > 0
        ? []
        : [
            {
              id: 1,
              title: "When We Believed in Mermaids",
              author: "Barbara O'Neal",
              format: "Paperback",
              price: 380,
              quantity: 1,
              image: "/images/products/1.jpg",
            },
          ]
    );
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartBooks(cartBooks.filter((book) => book.id !== id));
    } else {
      setCartBooks(
        cartBooks.map((book) =>
          book.id === id ? { ...book, quantity: newQuantity } : book
        )
      );
    }
  };

  const removeItem = (id) => {
    setCartBooks(cartBooks.filter((book) => book.id !== id));
  };

  const resetCart = () => {
    setCartBooks([]);
  };

  const getTotal = () => {
    return cartBooks.reduce(
      (total, book) => total + book.price * book.quantity,
      0
    );
  };

  if (cartBooks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <BookOpen className="w-20 h-20 text-gray-600 mb-6" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Your cart is currently empty.
        </h2>
        <p className="text-gray-500 mb-6 text-sm text-center max-w-md">
          Looks like you haven't added any books yet. Explore our collection and
          find your next favorite read!
        </p>
        <Link
          href={"/shop"}
          //   onClick={toggleCart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition"
        >
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="py-10">
          {/* Top Header with Back Button */}
          <div className="flex items-center justify-between mb-10">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-gray-700 hover:text-indigo-600 border border-gray-300 hover:border-indigo-500 transition px-4 py-2 rounded-md text-sm font-medium bg-white shadow-sm"
            >
              <ArrowLeft size={18} />
              <span>Back </span>
            </button>

            <button
              onClick={toggleCart}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Toggle Demo Cart State
            </button>
          </div>

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Your Cart ({cartBooks.length})
            </h1>
          </div>

          {/* Cart Content */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Book List */}
            <div className="flex-1 space-y-6">
              {cartBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row items-center gap-6 shadow-sm"
                >
                  {/* Remove */}
                  <button
                    onClick={() => removeItem(book.id)}
                    className="self-start md:self-center text-red-500 hover:text-red-700"
                  >
                    <X />
                  </button>

                  {/* Book Image */}
                  <div className="w-24 h-32 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                    <p className="text-xs text-gray-500">{book.format}</p>
                    <p className="text-sm font-semibold text-gray-800">
                      ৳ {book.price}
                    </p>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button
                      onClick={() => updateQuantity(book.id, book.quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 bg-white text-gray-800 text-sm">
                      {book.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(book.id, book.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right text-sm font-medium text-gray-700 min-w-[80px]">
                    ৳ {book.price * book.quantity}
                  </div>
                </div>
              ))}

              {/* Total Section */}
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={resetCart}
                  className="text-sm  px-5 py-2 bg-[#252F3D] text-white rounded-sm hover:text-red-600 transition"
                >
                  Clear Cart
                </button>
                <div className="text-lg font-semibold text-gray-800">
                  Total: ৳ {getTotal()}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="w-full lg:w-80 bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 text-center">
                Order Summary
              </h2>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Items</span>
                <span className="text-gray-800 font-medium">
                  {cartBooks.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total</span>
                <span className="text-green-600 font-bold text-lg">
                  ৳ {getTotal()}
                </span>
              </div>
              <div>
                <Link href={"/checkout"}>
                  {" "}
                  <button
                    href={"/checkout"}
                    className="w-full bg-[#252F3D] text-white py-3 rounded hover:text-green-600 hover:bg-[#1f2835] transition"
                  >
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShoppingCart;
