import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Navigation from './components/Navigation'
import IpConverter from './components/IpConverter'
import IpClassDetector from './components/IpClassDetector'
import NetworkCalculator from './components/NetworkCalculator'
import SubnetCalculator from './components/SubnetCalculator'
import VlsmCalculator from './components/VlsmCalculator'
import NetworkVisualization from './components/NetworkVisualization'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white transition-colors duration-200 overflow-x-hidden backdrop-blur-md bg-opacity-30">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-8 max-w-4xl backdrop-blur-md bg-opacity-30">
          <Routes>
            <Route path="/konversi-ip" element={<IpConverter />} />
            <Route path="/deteksi-kelas" element={<IpClassDetector />} />
            <Route path="/network-calculator" element={<NetworkCalculator />} />
            <Route path="/subnet-calculator" element={<SubnetCalculator />} />
            <Route path="/vlsm-calculator" element={<VlsmCalculator />} />
            <Route path="/visualisasi" element={<NetworkVisualization />} />
            <Route path="*" element={<Navigate to="/konversi-ip" replace />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App 