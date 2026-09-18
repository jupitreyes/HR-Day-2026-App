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
          "inline-flex w-full items-center justify-center border-2 px-6 py-4 text-xl font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-retro-cyan focus:ring-offset-2 focus:ring-offset-retro-bg disabled:opacity-50 disabled:cursor-not-allowed font-heading",
          {
            "border-retro-pink bg-retro-pink text-white hover:bg-retro-pink/80": variant === "primary",
            "border-retro-cyan bg-transparent text-retro-cyan hover:bg-retro-cyan/10": variant === "ghost",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
