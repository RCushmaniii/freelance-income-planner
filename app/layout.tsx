import type { Metadata } from 'next'
import { Space_Grotesk, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CushLabs Income Planner',
  description: 'Plan your income like a pro. Adjust your rate, hours, and taxes to see what you can realistically earn per year.',
  keywords: ['income planner', 'freelance calculator', 'hourly rate calculator', 'tax calculator'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const themeInitScript = `
(function(){
  try {
    var theme = null;

    var raw = localStorage.getItem('income-planner-storage');
    if (raw) {
      var data = JSON.parse(raw);
      theme = data && data.state && data.state.theme;
    }

    if (theme !== 'light' && theme !== 'dark') {
      if (window.matchMedia && typeof window.matchMedia === 'function') {
        theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      } else {
        theme = 'dark';
      }
    }

    var root = document.documentElement;
    var isLight = theme === 'light';
    root.classList.toggle('light', isLight);
    root.classList.toggle('dark', !isLight);
    root.style.colorScheme = isLight ? 'light' : 'dark';
  } catch (e) {}
})();
  `.trim()

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${sourceSerif.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
