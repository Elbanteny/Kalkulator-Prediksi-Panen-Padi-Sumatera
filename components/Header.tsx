"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", text: "Beranda" },
  { href: "/prediction", text: "Kalkulator" },
  { href: "/tentang-kami", text: "Tentang Kami" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full top-0 z-50 bg-transparent mt-3">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center focus:outline-none">
            <Image
              alt="logo"
              src="/images/Logo.png"
              width={120}
              height={40}
              className="h-auto w-auto transition-transform duration-300 ease-in-out hover:scale-105"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center bg-black border border-white rounded-full px-4 py-2">
          <ul className="flex items-center space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-4 py-1 rounded-full transition-colors font-medium text-sm ${
                      isActive
                        ? "bg-white text-black"
                        : "text-white hover:underline hover:underline-offset-4 hover:decoration-green-500"
                    }`}
                  >
                    {link.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex-1 flex justify-end md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-green-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            aria-label="Buka menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>

        {/* Placeholder for centering desktop nav */}
        <div className="hidden md:flex flex-1 justify-end"></div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col items-center py-4">
            {navLinks.map((link) => (
              <li key={link.href} className="w-full">
                <Link
                  href={link.href}
                  className="block text-center py-2 text-green-800 hover:bg-green-50 w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
