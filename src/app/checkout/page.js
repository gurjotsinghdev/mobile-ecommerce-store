"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const cart = JSON.parse(searchParams.get("cart") || "[]");
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const goBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 mb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
              alt="Logo"
              className="w-10 h-10"
            />
            <a href="/" className="text-2xl font-bold text-gray-800 hover:underline">
              Mobile Store
            </a>
          </div>
          <button
            onClick={goBack}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            ))}
            <div className="mt-4 text-right font-semibold text-xl">
              Total: ${total}
            </div>
            <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded">
              <h2 className="font-semibold text-lg">Order Placed</h2>
              <p>
                Your order has been placed with <strong>Cash on Delivery</strong>. We will contact you shortly.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
