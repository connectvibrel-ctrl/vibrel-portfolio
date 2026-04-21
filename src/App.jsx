import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Services from './pages/Services'
import Work from './pages/Work'
import Contact from './pages/Contact'
import PageTransition from './components/PageTransition'
import './App.css'

function App() {
  const location = useLocation()

  useEffect(() => {
    // Reset scroll position to top of the page on route change
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <div className="noise-overlay" />
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path="/"        element={<PageTransition><Home /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/work"    element={<PageTransition><Work /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </>
  )
}

export default App
