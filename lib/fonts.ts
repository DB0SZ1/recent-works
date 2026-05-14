import { Geist, Geist_Mono, Pacifico } from "next/font/google"

export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
})

export const fonts = {
  sans: geistSans,
  mono: geistMono,
  display: pacifico,
}