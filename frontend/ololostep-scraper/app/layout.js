import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import "./globals.css"; // Adjust the path if needed
import { Providers } from './Providers';

export const metadata = {
  title: "Olostep",
  description: "Olostep is a web scraping tool that extracts text from web pages.",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <br />
            <br />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
