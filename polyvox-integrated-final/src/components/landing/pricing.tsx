"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function Pricing() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    "Unlimited document translations",
    "All 100+ languages supported",
    "Formatting preservation",
    "Batch processing",
    "Priority support",
    "API access",
  ]

  return (
    <section id="pricing" className="py-20 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-to-b from-blue-900/10 to-purple-900/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Professional-grade translations at a fraction of the cost of human translators.
          </p>
        </div>

        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="backdrop-blur-xl bg-slate-800/20 border border-slate-700/50 rounded-3xl shadow-[0_0_25px_rgba(15,23,42,0.3)] overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 bg-gradient-to-br from-blue-600/90 to-purple-600/90 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-2 text-white">Premium Plan</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-5xl font-bold text-white">$99</span>
                    <span className="ml-2 text-blue-100">/month</span>
                  </div>
                  <p className="text-blue-100 mb-8">Everything you need for professional document translation.</p>
                  <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 text-lg py-6 h-auto rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all">
                    Start Your Free Trial
                  </Button>
                  <p className="mt-4 text-sm text-blue-100 text-center">
                    No credit card required. Try one document for free.
                  </p>
                </div>
              </div>

              <div className="p-8 md:p-12 backdrop-blur-xl bg-slate-800/30">
                <h4 className="text-xl font-semibold text-white mb-6">What's included:</h4>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: 10 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 flex items-center justify-center shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <span className="ml-3 text-slate-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-slate-700/30">
                  <p className="text-slate-300">
                    Need a custom plan for your enterprise?{" "}
                    <a href="#" className="text-teal-400 font-medium hover:underline">
                      Contact us
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-300 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust PolyvoxAI for their document translation needs.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

