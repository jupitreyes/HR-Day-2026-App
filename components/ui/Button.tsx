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
          "inline-flex w-full items-center justify-center px-6 py-4 text-xl font-bold uppercase tracking-widest transition-all duration-75 focus:outline-none focus:ring-4 focus:ring-retro-cyan focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed font-heading active:translate-y-[4px] active:shadow-none",
          {
            "bg-retro-pink text-white border-4 border-white shadow-[6px_6px_0px_rgba(0,255,255,0.6)] hover:brightness-110": variant === "primary",
            "bg-black border-4 border-retro-cyan text-retro-cyan shadow-[6px_6px_0px_rgba(255,0,255,0.6)] hover:bg-retro-cyan/10": variant === "ghost",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
