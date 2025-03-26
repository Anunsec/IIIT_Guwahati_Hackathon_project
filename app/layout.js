import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import GoogleTranslate from "@/components/GoogleTranslate";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinEmpower",
  description: "One-stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />

          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h2 className="text-xl font-semibold">FinEmpower</h2>
                <p className="text-sm mt-2">One-stop Finance Platform</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Quick Links</h3>
                <ul className="mt-2 space-y-2">
                  <li><a href="#" className="hover:text-gray-400">About Us</a></li>
                  <li><a href="#" className="hover:text-gray-400">Features</a></li>
                  <li><a href="#" className="hover:text-gray-400">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium">Legal</h3>
                <ul className="mt-2 space-y-2">
                  <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-gray-400">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium">Follow Us</h3>
                <div className="flex space-x-4 mt-2">
                  <a href="#" aria-label="Facebook" className="hover:text-gray-400">
                    <FaFacebook />
                  </a>
                  <a href="#" aria-label="Twitter" className="hover:text-gray-400">
                    <FaTwitter />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Bottom Section with Google Translate */}
            <div className="flex flex-col items-center text-center mt-6 border-t border-gray-700 pt-4">
              <p className="text-sm">&copy; 2025 RunTime Errors. All rights reserved.</p>
              <p>Made with 💗 by RunTime Errors</p>

              {/* Google Translate Positioned Below */}
              <div className="mt-3">
                <GoogleTranslate />
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
