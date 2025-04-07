import { Dashboard } from './pages/Dashboard.tsx'
import { SignIn } from './pages/SignIn.tsx'
import Page from './pages/page.tsx'
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Page />
    </ThemeProvider>
  )
}

export default App
