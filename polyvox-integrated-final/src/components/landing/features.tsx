"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MessageSquare, Globe, Feather, FileText, Zap, Layers, CheckCircle } from "lucide-react"

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-blue-400" />,
      title: "Natural Fluency",
      description: "Translations that read like they were written by a human, not a machine.",
    },
    {
      icon: <Globe className="h-10 w-10 text-teal-400" />,
      title: "Wide Language Support",
      description: "Over 100 languages, including rare dialects and regional variations.",
    },
    {
      icon: <Feather className="h-10 w-10 text-purple-400" />,
      title: "Tone Preservation",
      description: "Maintains the original style, tone, and nuance of your content.",
    },
    {
      icon: <FileText className="h-10 w-10 text-blue-400" />,
      title: "Document Formatting",
      description: "Preserves the original layout, formatting, and design elements.",
    },
    {
      icon: <Zap className="h-10 w-10 text-teal-400" />,
      title: "Fast Processing",
      description: "Get translations in minutes, not hours or days, regardless of length.",
    },
    {
      icon: <Layers className="h-10 w-10 text-purple-400" />,
      title: "Batch Translation",
      description: "Translate multiple documents at once with consistent terminology.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="features" className="py-20 relative">
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-gradient-to-bl from-teal-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            PolyvoxAI combines cutting-edge AI with linguistic expertise to deliver unmatched translation quality.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="backdrop-blur-xl bg-slate-800/20 border border-slate-700/50 rounded-2xl p-6 shadow-[0_0_15px_rgba(15,23,42,0.2)] hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all group"
            >
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-xl p-4 inline-block mb-4 group-hover:scale-110 transition-transform border border-slate-700/30 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center p-1 backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-full shadow-[0_0_15px_rgba(15,23,42,0.2)]">
            <div className="flex items-center space-x-2 px-6 py-2">
              <CheckCircle className="h-5 w-5 text-teal-400" />
              <span className="text-slate-300">Context-aware translations</span>
            </div>
            <div className="flex items-center space-x-2 px-6 py-2">
              <CheckCircle className="h-5 w-5 text-teal-400" />
              <span className="text-slate-300">Technical terminology support</span>
            </div>
            <div className="flex items-center space-x-2 px-6 py-2">
              <CheckCircle className="h-5 w-5 text-teal-400" />
              <span className="text-slate-300">Continuous improvements</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

