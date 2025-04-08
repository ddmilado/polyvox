"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="call-to-action" className="py-20 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
      </div>

      <motion.div
        ref={ref}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600/80 to-purple-600/80 rounded-3xl shadow-[0_0_30px_rgba(37,99,235,0.3)] overflow-hidden backdrop-blur-sm">
          <div className="relative p-8 md:p-12">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute inset-0 backdrop-blur-sm bg-slate-900/10"></div>

            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Transform Your Document Translations?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Start your free trial today and experience the power of AI-driven translation that reads like it was
                written by a native speaker.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-6 h-auto rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all">
                  Start Your Free Trial
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10 text-lg px-8 py-6 h-auto rounded-xl backdrop-blur-md"
                >
                  Schedule a Demo
                </Button>
              </div>
              <p className="mt-6 text-sm text-blue-100">No credit card required. Try one document for free.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

