import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer id="footer" className="backdrop-blur-xl bg-slate-900/30 border-t border-slate-800/50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                PolyvoxAI
              </span>
            </Link>
            <p className="mt-4 text-slate-300">
              Advanced AI document translation with human-like fluency across 100+ languages.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-teal-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-500 hover:text-teal-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-500 hover:text-teal-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-500 hover:text-teal-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-500 hover:text-teal-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#product-showcase" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Interface
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-slate-300 hover:text-teal-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#why-choose" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Why Choose Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#product-showcase" className="text-slate-300 hover:text-teal-400 transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="#why-choose" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#call-to-action" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-300 hover:text-teal-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} PolyvoxAI. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link href="#" className="text-slate-500 hover:text-teal-400 text-sm transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-500 hover:text-teal-400 text-sm transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-500 hover:text-teal-400 text-sm transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

