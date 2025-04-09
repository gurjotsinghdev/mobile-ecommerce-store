"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max (256GB)",
    price: "$1,199",
    image: "https://www.dxomark.com/wp-content/uploads/medias/post-155689/Apple-iPhone-15-Pro-Max_-blue-titanium_featured-image-packshot-review.jpg"
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra (512GB)",
    price: "$1,299",
    image: "https://m.media-amazon.com/images/I/51VNyJFoKTL.jpg"
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro (128GB)",
    price: "$999",
    image: "https://shop.mobileklinik.ca/cdn/shop/files/GooglePixel8Pro-Black_500x500.png?v=1714141968"
  },
  {
    id: 4,
    name: "OnePlus 12 (256GB)",
    price: "$799",
    image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-12-1.jpg"
  },
  {
    id: 5,
    name: "Xiaomi 14 Ultra (512GB)",
    price: "$1,099",
    image: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-ultra-1.jpg"
  }
  
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState("");
  const router = useRouter();

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setNotification(`${product.name} added to cart.`);
    setTimeout(() => setNotification(""), 2000);
  };

  const goToCheckout = () => {
    const cartItems = encodeURIComponent(JSON.stringify(cart));
    router.push(`/checkout?cart=${cartItems}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 mb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png" alt="Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-gray-800">Mobile Store</h1>
          </div>
          <button
            onClick={goToCheckout}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Go to Checkout ({cart.length})
          </button>
        </div>
      </header>

      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded shadow z-50">
          {notification}
        </div>
      )}

      <main className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-lg text-gray-700 mb-4">${product.price}</p>
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}



import { useSearchParams } from "next/navigation";
export function Checkout() {
  const searchParams = useSearchParams();
  const cart = JSON.parse(searchParams.get("cart") || "[]");
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded shadow flex justify-between">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            ))}
            <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded">
              <h2 className="font-semibold text-lg">Order Placed</h2>
              <p>Your order has been placed with Cash on Delivery. We will contact you shortly.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
