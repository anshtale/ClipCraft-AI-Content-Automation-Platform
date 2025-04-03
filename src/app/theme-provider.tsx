"use client"
 
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type React from "react"

export function ThemeProvider({children} : {children : React.ReactNode}){
    return (
        <div>
            <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                {children}
            </NextThemesProvider>
        </div>
    )
}
