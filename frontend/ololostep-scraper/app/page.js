import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="text-center mt-12 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 md:mb-8 text-indigo-900 dark:text-purple-500 light:text-indigo-400">
        Welcome to Ololostep
      </h1>
      <h2 className="text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-10 md:mb-12 text-purple-500 dark:text-indigo-400">
      Your one-stop solution for extracting and managing <br /> web data effortlessly.
      </h2>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Link href="/sign-up">
          <Button className="px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white dark:text-gray-200 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 dark:shadow-purple-900 transition duration-300 ease-in-out">
            Get Started
          </Button>
        </Link>
        <Link href="/">
          <Button className="px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-green-400 to-blue-500 text-gray-800 dark:text-gray-200 rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 dark:shadow-green-900 transition duration-300 ease-in-out">
            Learn More
          </Button>
        </Link>
        <Link href="/contact">
          <Button className="px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-yellow-400 to-red-500 text-gray-800 dark:text-gray-200 rounded-full shadow-lg hover:from-yellow-500 hover:to-red-600 dark:shadow-yellow-900 transition duration-300 ease-in-out">
            Contact Us
          </Button>
        </Link>
      </div>
    </section>
  );
}
