"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"

export default function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const steps = [
    {
      number: "01",
      title: "Upload Your Document",
      description: "Drag and drop your document in any format - PDF, Word, Excel, and more.",
    },
    {
      number: "02",
      title: "Select Languages",
      description: "Choose from over 100 languages for source and target translations.",
    },
    {
      number: "03",
      title: "Get Perfect Translation",
      description: "Receive your translated document with preserved formatting in minutes.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-to-b from-blue-900/10 to-purple-900/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Simply upload your document, choose the target language, and let PolyvoxAI do the rest.
          </p>
        </div>

        <motion.div
          ref={ref}
          className="relative mx-auto max-w-4xl"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="backdrop-blur-xl bg-slate-800/20 border border-slate-700/50 rounded-3xl shadow-[0_0_25px_rgba(15,23,42,0.3)] overflow-hidden p-6">
            <div className="aspect-video relative">
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-xl backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500/20 to-teal-500/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-slate-700/30 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#38BDF8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 8L16 12L10 16V8Z"
                        fill="#38BDF8"
                        stroke="#38BDF8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-300">Video demonstration will play here</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                <div className="backdrop-blur-xl bg-slate-800/20 border border-slate-700/50 rounded-2xl p-6 h-full shadow-[0_0_15px_rgba(15,23,42,0.2)] hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all group">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent opacity-30 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-300">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="text-teal-500/50" size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

