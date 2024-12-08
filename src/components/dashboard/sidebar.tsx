"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Home,
  Settings,
  Store,
  Truck,
  Droplets,
  Menu,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Stores",
    icon: Store,
    href: "/dashboard/stores",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    label: "Inventory",
    icon: Droplets,
    href: "/dashboard/inventory",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r border-border bg-background">
      <ScrollArea className="flex-1 p-4">
        <nav className="flex flex-col gap-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                pathname === route.href && "bg-muted text-foreground"
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

export function MobileSidebar() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden p-2">
          <span className="sr-only">Open navigation menu</span>
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-background p-0">
        <SheetHeader className="p-4">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <Separator />
        <ScrollArea className="flex-1 p-4">
          <nav className="flex flex-col gap-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                  pathname === route.href && "bg-muted text-foreground"
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
