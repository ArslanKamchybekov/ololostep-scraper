import Link from "next/link";
import { Button } from "./ui/button";
import { useTheme } from 'next-themes';

const HeroSection = () => {
  const { theme } = useTheme();

  return (
    <section
      className={`hero min-h-screen p-8 flex items-center justify-center ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-800 text-gray-100"
      }`}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
        <p className="text-lg mb-6">Explore the best features of our application and get started now!</p>
        <div className="flex justify-center gap-4">
          <Link href="/about">
            <Button variant="solid" className="bg-blue-500 text-white">
              About
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="outline" className="border-blue-500 text-blue-500">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
