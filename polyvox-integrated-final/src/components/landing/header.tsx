"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false)
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    {
      name: "Product",
      href: "#product-showcase",
      hasDropdown: true,
      dropdownItems: [
        { name: "Interface Tour", href: "#product-showcase" },
        { name: "Features", href: "#features" },
        { name: "How It Works", href: "#how-it-works" },
      ],
    },
    { name: "Why Choose Us", href: "#why-choose" },
    {
      name: "Resources",
      href: "#pricing",
      hasDropdown: true,
      dropdownItems: [
        { name: "Pricing", href: "#pricing" },
        { name: "Features", href: "#features" },
        { name: "Contact", href: "#call-to-action" },
        { name: "About", href: "#footer" },
      ],
    },
    { name: "Pricing", href: "#pricing" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-900/20 border-b border-slate-700/30 supports-[backdrop-filter]:bg-slate-900/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                PolyvoxAI
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.hasDropdown ? (
                  <button
                    className="flex items-center text-slate-300 hover:text-teal-300 transition-colors duration-300"
                    onClick={() => {
                      if (link.name === "Product") {
                        setIsProductDropdownOpen(!isProductDropdownOpen)
                        setIsResourcesDropdownOpen(false)
                      } else if (link.name === "Resources") {
                        setIsResourcesDropdownOpen(!isResourcesDropdownOpen)
                        setIsProductDropdownOpen(false)
                      }
                    }}
                  >
                    {link.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                ) : (
                  <Link href={link.href} className="text-slate-300 hover:text-teal-300 transition-colors duration-300">
                    {link.name}
                  </Link>
                )}

                {link.hasDropdown && (
                  <AnimatePresence>
                    {((link.name === "Product" && isProductDropdownOpen) ||
                      (link.name === "Resources" && isResourcesDropdownOpen)) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 rounded-md backdrop-blur-xl bg-slate-800/90 border border-slate-700/50 shadow-lg py-1 z-50"
                      >
                        {link.dropdownItems?.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-teal-300"
                            onClick={() => {
                              setIsProductDropdownOpen(false)
                              setIsResourcesDropdownOpen(false)
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800/50">
              Log in
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white border border-slate-700/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              Start Free Trial
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/50 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden backdrop-blur-xl bg-slate-900/70 border-b border-slate-700/30 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-teal-300 hover:bg-slate-800/30"
                        onClick={() => {
                          if (link.name === "Product") {
                            setIsProductDropdownOpen(!isProductDropdownOpen)
                            setIsResourcesDropdownOpen(false)
                          } else if (link.name === "Resources") {
                            setIsResourcesDropdownOpen(!isResourcesDropdownOpen)
                            setIsProductDropdownOpen(false)
                          }
                        }}
                      >
                        {link.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>

                      <AnimatePresence>
                        {((link.name === "Product" && isProductDropdownOpen) ||
                          (link.name === "Resources" && isResourcesDropdownOpen)) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4"
                          >
                            {link.dropdownItems?.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-teal-300 hover:bg-slate-800/30"
                                onClick={closeMenu}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-teal-300 hover:bg-slate-800/30"
                      onClick={closeMenu}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4 flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="justify-center text-slate-300 hover:text-white hover:bg-slate-800/50"
                >
                  Log in
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white justify-center border border-slate-700/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

