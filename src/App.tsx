import { Dashboard } from './pages/Dashboard.tsx'
import { SignIn } from './pages/SignIn.tsx'
import Destination from './pages/Destination.tsx'
import User from './pages/Users.tsx'
import Vacation from './pages/Vacation.tsx'
import Booking from './pages/Booking.tsx'
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <User />
    </ThemeProvider>
  )
}

export default App
