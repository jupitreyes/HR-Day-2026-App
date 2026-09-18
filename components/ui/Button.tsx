import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex w-full items-center justify-center px-6 py-4 text-xl font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-retro-cyan focus:ring-offset-2 focus:ring-offset-[#0B0A10] disabled:opacity-50 disabled:cursor-not-allowed font-heading",
          {
            "bg-retro-pink text-white hover:bg-retro-pink/90 hover:shadow-[0_0_15px_rgba(232,38,181,0.6)] hover:scale-[1.02] border border-retro-pink/50": variant === "primary",
            "bg-glass border border-retro-cyan/30 text-retro-cyan hover:bg-retro-cyan/10 hover:shadow-[0_0_10px_rgba(61,224,210,0.3)]": variant === "ghost",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
