"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Droplets, Building2, Clock, Shield, Zap, LineChart, Package, DollarSign, Truck, Settings2, TrendingUp, Activity } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Hero Section with 3D Animation */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0">
          <div className="water-ripple" />
        </div>
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-white relative z-10">
          <div className="max-w-4xl text-center space-y-8">
            <div className="inline-block animate-float">
              <Droplets className="h-20 w-20 text-blue-400 mb-6 mx-auto animate-pulse" />
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 pb-2 animate-fade-in">
              Calm and Zest Analytics
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              Transform your business with AI-powered analytics and smart management solutions. 
              Track inventory, monitor sales, and optimize operations across multiple locations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up delay-200">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white w-full sm:w-auto text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 hover:bg-slate-800 text-white w-full sm:w-auto text-lg px-8 py-6 rounded-xl"
                >
                  Watch Demo
                </Button>
              </Link>
            </div>

            <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-slate-400 animate-fade-in-up delay-300">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                <span>Multi-Store Management</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Preview Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Powerful Analytics Dashboard
            </h2>
            <p className="text-slate-400 text-lg">
              Get real-time insights into your business performance
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 pointer-events-none h-full" />
            <div className="rounded-xl border border-slate-700 shadow-2xl overflow-hidden transform perspective-1000 rotate-x-12 hover:rotate-x-0 transition-transform duration-500 bg-slate-900/90 backdrop-blur-sm">
              <div className="p-6">
                {/* Mock Dashboard Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-white">Business Overview</h3>
                    <p className="text-sm text-slate-400">Last 30 days performance</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm">Live</div>
                    <div className="px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-sm">Today</div>
                  </div>
                </div>

                {/* Mock Analytics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <Activity className="h-5 w-5 text-blue-500" />
                      </div>
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-400">Total Sales</p>
                      <p className="text-2xl font-bold text-white">2,543</p>
                      <p className="text-xs text-emerald-500">+12.5% from last month</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-emerald-500/10">
                        <DollarSign className="h-5 w-5 text-emerald-500" />
                      </div>
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-400">Revenue</p>
                      <p className="text-2xl font-bold text-white">KES 847,235</p>
                      <p className="text-xs text-emerald-500">+8.2% from last month</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <Package className="h-5 w-5 text-purple-500" />
                      </div>
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-400">Inventory Status</p>
                      <p className="text-2xl font-bold text-white">1,285 units</p>
                      <p className="text-xs text-emerald-500">Well stocked</p>
                    </div>
                  </div>
                </div>

                {/* Mock Chart */}
                <div className="relative h-[200px] mb-6">
                  <div className="absolute bottom-0 left-0 right-0 h-[180px] flex items-end gap-2">
                    {[65, 45, 75, 55, 85, 65, 75, 85, 95, 65, 75, 55].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-emerald-500 rounded-t-sm opacity-75" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-slate-700" />
                </div>

                {/* Mock Store List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-sm text-slate-300">Kilimani Store</span>
                    </div>
                    <span className="text-sm text-slate-400">854 sales</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-sm text-slate-300">South C Store</span>
                    </div>
                    <span className="text-sm text-slate-400">645 sales</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
            Comprehensive Business Management
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 transition-all duration-300 group hover:transform hover:scale-105"
              >
                <feature.icon className="h-12 w-12 text-blue-400 group-hover:text-emerald-400 transition-colors duration-300 mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6">{feature.description}</p>
                <ul className="space-y-2 text-sm text-slate-500">
                  {feature.capabilities.map((capability, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-white">
              Ready to Optimize Your Business?
            </h2>
            <p className="text-lg text-slate-300">
              Join hundreds of businesses already using Calm and Zest Analytics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white w-full sm:w-auto text-lg px-8 py-6 rounded-xl"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .water-ripple {
          background: radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          width: 100%;
          height: 100%;
          animation: ripple 10s infinite linear;
        }
        
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.3; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  )
}

const features = [
  {
    icon: LineChart,
    title: "Advanced Analytics",
    description: "Comprehensive analytics suite with real-time monitoring and intelligent insights.",
    capabilities: [
      "Real-time performance tracking",
      "Multi-store comparison",
      "Revenue trend analysis",
      "Profit margin optimization"
    ]
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Smart inventory tracking system for products and equipment.",
    capabilities: [
      "Automated reorder alerts",
      "Multi-category management",
      "Stock level optimization",
      "Equipment tracking"
    ]
  },
  {
    icon: Building2,
    title: "Multi-Store Operations",
    description: "Seamless management of multiple store locations from a single dashboard.",
    capabilities: [
      "Centralized control",
      "Store performance comparison",
      "Resource allocation",
      "Location-based analytics"
    ]
  },
  {
    icon: DollarSign,
    title: "Financial Insights",
    description: "Detailed financial analytics and reporting for better decision making.",
    capabilities: [
      "Revenue tracking",
      "Expense monitoring",
      "Profit analysis",
      "Financial forecasting"
    ]
  },
  {
    icon: Truck,
    title: "Delivery Management",
    description: "Efficient delivery tracking and management system.",
    capabilities: [
      "Real-time delivery tracking",
      "Driver management",
      "Route optimization",
      "Delivery analytics"
    ]
  },
  {
    icon: Settings2,
    title: "Smart Automation",
    description: "Automated processes and intelligent management tools.",
    capabilities: [
      "Natural language commands",
      "Automated reporting",
      "Smart notifications",
      "Process optimization"
    ]
  }
]

const stats = [
  {
    value: "99.9%",
    label: "System Uptime",
  },
  {
    value: "2M+",
    label: "Data Points Analyzed",
  },
  {
    value: "500+",
    label: "Active Businesses",
  },
  {
    value: "30%",
    label: "Average Cost Savings",
  },
]
