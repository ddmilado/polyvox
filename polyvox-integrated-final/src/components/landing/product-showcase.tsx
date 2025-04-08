"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const showcaseItems = [
    {
      id: "dashboard",
      title: "Intuitive Dashboard",
      description:
        "Manage all your translation projects from a single, elegant interface with real-time status updates.",
      image: "/placeholder.svg?height=600&width=800&text=PolyvoxAI+Dashboard",
    },
    {
      id: "editor",
      title: "Advanced Editor",
      description:
        "Edit and refine translations with our powerful context-aware editor that suggests improvements in real-time.",
      image: "/placeholder.svg?height=600&width=800&text=PolyvoxAI+Editor",
    },
    {
      id: "analytics",
      title: "Detailed Analytics",
      description: "Track usage, performance, and quality metrics with comprehensive analytics and reporting tools.",
      image: "/placeholder.svg?height=600&width=800&text=PolyvoxAI+Analytics",
    },
    {
      id: "mobile",
      title: "Mobile Experience",
      description:
        "Access your translations on the go with our responsive mobile interface designed for professionals.",
      image: "/placeholder.svg?height=600&width=800&text=PolyvoxAI+Mobile",
    },
  ]

  return (
    <section id="product-showcase" className="py-20 relative">
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-gradient-to-tr from-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
            Product Showcase
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore the powerful features and elegant interface of PolyvoxAI.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-800/30 backdrop-blur-md p-1 rounded-xl border border-slate-700/50 mb-8">
              {showcaseItems.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-teal-500/20 data-[state=active]:text-white data-[state=active]:shadow-[0_0_10px_rgba(56,189,248,0.2)] rounded-lg"
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {showcaseItems.map((item) => (
              <TabsContent key={item.id} value={item.id}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                    <p className="text-slate-300 mb-6">{item.description}</p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-slate-300">
                        <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                        Intuitive user interface
                      </li>
                      <li className="flex items-center text-slate-300">
                        <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                        Real-time collaboration
                      </li>
                      <li className="flex items-center text-slate-300">
                        <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                        Cloud synchronization
                      </li>
                    </ul>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-3xl blur-xl"></div>
                    <div className="relative backdrop-blur-xl bg-slate-800/20 border border-slate-700/50 rounded-3xl shadow-[0_0_25px_rgba(15,23,42,0.3)] overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={`PolyvoxAI ${item.title}`}
                        className="w-full h-auto opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

