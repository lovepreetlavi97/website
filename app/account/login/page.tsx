'use client'

import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('IN');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-center text-2xl font-bold mb-2">Enter Mobile Number</h2>
          <p className="text-center text-gray-600 mb-6">We will send you an OTP to verify your number</p>
          <form className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <select
                className="h-full px-3 py-2 bg-white border-none outline-none text-lg"
                value={country}
                onChange={e => setCountry(e.target.value)}
                style={{ minWidth: 60 }}
              >
                <option value="IN">🇮🇳 +91</option>
                <option value="US">🇺🇸 +1</option>
                <option value="UK">🇬🇧 +44</option>
                {/* Add more countries as needed */}
              </select>
              <input
                type="tel"
                className="flex-1 px-3 py-2 text-lg border-0 outline-none"
                placeholder="Phone number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                maxLength={10}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              Request OTP <span className="text-xl">→</span>
            </button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-3 text-gray-400 text-sm">Or Login Using</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-lg font-medium hover:bg-gray-50 transition-colors mb-4 cursor-pointer">
            <FaWhatsapp className="text-green-500 text-2xl" /> WhatsApp
          </button>
          <div className="text-center mb-2">
            <a href="#" className="text-pink-600 underline text-sm hover:text-pink-700">Having trouble logging in.</a>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            I accept that I have read &amp; understood <br />
            <a href="#" className="underline">Privacy Policy and T&amp;Cs.</a>
          </p>
        </div>
      </main>
    </div>
  );
} 