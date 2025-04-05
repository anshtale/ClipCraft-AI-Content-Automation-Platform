"use client"
 
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type React from "react"

export function ThemeProvider({
    children,
    ...props
  }: React.ComponentProps<typeof NextThemesProvider>){
    return (
        <div>
            <NextThemesProvider {...props}>
                {children}
            </NextThemesProvider>
        </div>
    )
}
