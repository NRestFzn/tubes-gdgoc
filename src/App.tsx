import { Routes, Route } from "react-router-dom"
import { SignIn } from "./pages/SignIn"
import Destination from "./pages/Destination"
import User from "./pages/Users"
import Vacation from "./pages/Vacation"
import Booking from "./pages/Booking"
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Destination />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/destinations" element={<Destination />} />
        <Route path="/users" element={<User />} />
        <Route path="/vacations" element={<Vacation />} />
        <Route path="/bookings" element={<Booking />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
