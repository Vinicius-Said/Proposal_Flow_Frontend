"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  BarChart3, 
  FileText, 
  Settings, 
  Users, 
  Upload,
  Shield,
  CreditCard
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Automação", href: "/dashboard/automation", icon: Upload },
  { name: "OCR", href: "/dashboard/ocr", icon: FileText },
  { name: "Documentos", href: "/dashboard/documents", icon: FileText },
  { name: "Usuários", href: "/dashboard/users", icon: Users },
  { name: "Planos", href: "/dashboard/plans", icon: CreditCard },
  { name: "Configurações", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">Operadora</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
