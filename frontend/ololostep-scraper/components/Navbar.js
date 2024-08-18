"use client";

import React, { useState } from "react";
import { Book } from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const { theme } = useTheme();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between p-4 shadow-md ${
        theme === "light"
          ? "bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 text-gray-800"
          : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white"
      } z-50`}
    >
      <Link href="/" className="flex items-center space-x-4">
        <Book
          className={`h-8 w-8 ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
        />
        <span className="text-xl font-bold">Olostep</span>
      </Link>

      <div className="flex items-center gap-3">
        <ModeToggle />

        {isSignedIn && (
          <>
            <Link href="/start-olostep">
              <Button
                variant="outline"
                className={`${
                  theme === "light"
                    ? "bg-white text-black border-white transition-colors hover:bg-gray-100"
                    : "bg-gray-800 text-white border-gray-800 hover:bg-gray-700"
                }`}
              >
                Scrap
              </Button>
            </Link>

            <Link href="/my-data">
              <Button
                variant="outline"
                className={`${
                  theme === "light"
                    ? "bg-white text-black border-white transition-colors hover:bg-gray-100"
                    : "bg-gray-800 text-white border-gray-800 hover:bg-gray-700"
                }`}
              >
                My Data
              </Button>
            </Link>
          </>
        )}

        {!isSignedIn ? (
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="bg-white text-black border-white transition-colors"
            >
              Login
            </Button>
          </Link>
        ) : (
          <UserButton />
        )}

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 right-0 w-48 bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg p-4 rounded-lg z-10 overflow-y-auto">
          {isSignedIn && (
            <>
              <Link href="/start-scraping">
                <Button
                  variant="outline"
                  className={`${
                    theme === "light"
                      ? "bg-gray-800 text-white border-gray-800 hover:bg-gray-700"
                      : "bg-white text-black border-white hover:bg-gray-200"
                  }`}
                >
                  Start Scraping
                </Button>
              </Link>
              <Link href="/my-data">
                <Button
                  variant="outline"
                  className={`${
                    theme === "light"
                      ? "bg-gray-800 text-white border-gray-800 hover:bg-gray-700"
                      : "bg-white text-black border-white hover:bg-gray-200"
                  }`}
                >
                  My Data
                </Button>
              </Link>
            </>
          )}
          {!isSignedIn ? (
            <Link href="/sign-in">
              <Button
                variant="outline"
                className={`transition-colors ${
                  theme === "light"
                    ? "bg-gray-800 text-white border-gray-800 hover:bg-gray-700"
                    : "bg-white text-black border-white hover:bg-gray-200"
                }`}
              >
                Login
              </Button>
            </Link>
          ) : (
            <UserButton />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
