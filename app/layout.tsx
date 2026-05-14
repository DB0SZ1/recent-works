import "./globals.css"
import { geistSans, geistMono, pacifico } from "@/lib/fonts"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  )
}