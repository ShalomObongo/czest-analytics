import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center text-white p-4">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Calm and Zest Analytics
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-300">
          Streamline your water business operations with powerful analytics and intelligent management tools
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white w-full sm:w-auto"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700"
            >
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    title: "Natural Language",
    description: "Input transactions using natural language commands",
  },
  {
    title: "Multi-Store",
    description: "Manage multiple store locations effortlessly",
  },
  {
    title: "Real-time Analytics",
    description: "Get instant insights into your business performance",
  },
  {
    title: "Smart Reports",
    description: "Generate detailed reports with a single click",
  },
]
