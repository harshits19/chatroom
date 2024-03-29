import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import ModalProvider from "@/components/providers/ModalProvider"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { SocketProvider } from "@/components/providers/SocketProvider"
import QueryProvider from "@/components/providers/QueryProvider"
import { cn } from "@/lib/utils"

const openSans = Open_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chatroom",
  description: "Your personalized rooms for chatting with close friends.",
  icons: {
    icon: "/ico1.png",
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(openSans.className, "")}>
          <ThemeProvider attribute="class" defaultTheme="dark" storageKey="chatroom" enableSystem={false}>
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>{children}</QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
export default RootLayout
