import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost', size?: 'default' | 'sm' | 'lg' }>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    
    const variants = {
      primary: "bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20",
      secondary: "bg-muted-strong/10 text-foreground hover:bg-muted-strong/20",
      outline: "bg-background border border-muted-strong/30 text-muted hover:text-foreground hover:border-accent/50",
      ghost: "hover:bg-accent/5 text-muted hover:text-foreground"
    }

    const sizes = {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 text-xs",
      lg: "h-12 px-8 text-lg"
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
