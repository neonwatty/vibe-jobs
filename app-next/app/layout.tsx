import type { Metadata } from "next"
import { AuthProvider } from "@/contexts/AuthContext"
import "./globals.css"

export const metadata: Metadata = {
  title: "Vibe Jobs - AI-Native Job Board",
  description: "Find jobs that embrace AI tools. Show employers how you work with AI in your workflow.",
  openGraph: {
    title: "Vibe Jobs - AI-Native Job Board",
    description: "Find jobs that embrace AI tools. Show employers how you work with AI in your workflow.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Jobs - AI-Native Job Board",
    description: "Find jobs that embrace AI tools. Show employers how you work with AI in your workflow.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
