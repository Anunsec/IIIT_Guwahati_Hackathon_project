import { Inter } from "next/font/google";
import "./globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import GoogleTranslate from "@/components/GoogleTranslate";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import NextTopLoader from "nextjs-toploader";

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
          <NextTopLoader />
          <Header />

          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
                <div>
                  <h2 className="text-2xl font-semibold">FinEmpower</h2>
                  <p className="text-sm mt-2 text-gray-400">
                    One-stop Finance Platform
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Quick Links</h3>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-400 transition-colors duration-200"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-400 transition-colors duration-200"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-400 transition-colors duration-200"
                      >
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Legal</h3>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-400 transition-colors duration-200"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-400 transition-colors duration-200"
                      >
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Follow Us</h3>
                  <div className="flex justify-center md:justify-start space-x-4 mt-3">
                    <a
                      href="#"
                      aria-label="Facebook"
                      className="hover:text-gray-400 transition-colors duration-200 text-xl"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href="#"
                      aria-label="Twitter"
                      className="hover:text-gray-400 transition-colors duration-200 text-xl"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href="#"
                      aria-label="LinkedIn"
                      className="hover:text-gray-400 transition-colors duration-200 text-xl"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer Bottom Section */}
              <div className="mt-10 border-t border-gray-700 pt-5 text-center">
                <p className="text-sm text-gray-400">
                  &copy; 2025 RunTime Errors. All rights reserved.
                </p>
                <p className="text-sm text-gray-400">
                  Made with 💗 by RunTime Errors
                </p>

                {/* Google Translate */}
                <div className="mt-4">
                  <GoogleTranslate />
                </div>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
