"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CheckCircle } from "lucide-react"

export default function WhyChoose() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const reasons = [
    {
      title: "Specialized for Document Translation",
      description:
        "Unlike general-purpose AI, PolyvoxAI is fine-tuned for documents, ensuring consistency and quality across long texts.",
    },
    {
      title: "Handles Complex Documents",
      description: "Maintains accuracy and coherence in lengthy or technical content where other tools fail.",
    },
    {
      title: "Broader Language Support",
      description:
        "Translates more languages, including less common ones, with native-like precision and cultural awareness.",
    },
    {
      title: "Formatting Preservation",
      description: "Keeps your document's layout intact, unlike generic tools that strip away formatting.",
    },
    {
      title: "Batch Processing Efficiency",
      description:
        "Translate multiple documents at once, saving time and effort while maintaining terminology consistency.",
    },
  ]

  return (
    <section id="why-choose" className="py-20 relative">
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-gradient-to-tr from-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div className="relative backdrop-blur-xl bg-slate-800/20 border border-slate-700/50 rounded-3xl shadow-[0_0_25px_rgba(15,23,42,0.3)] overflow-hidden">
                <img
                  src="/placeholder.svg?height=600&width=800&text=PolyvoxAI+vs+Others"
                  alt="PolyvoxAI vs Other Tools"
                  className="w-full h-auto opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
              Why Choose PolyvoxAI
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              PolyvoxAI outperforms general AI tools with specialized document translation capabilities that deliver
              superior results.
            </p>

            <div className="space-y-4">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  className="backdrop-blur-xl bg-slate-800/20 border border-slate-700/50 rounded-xl p-4 shadow-[0_0_15px_rgba(15,23,42,0.2)] hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-teal-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">{reason.title}</h3>
                      <p className="text-slate-300">{reason.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

