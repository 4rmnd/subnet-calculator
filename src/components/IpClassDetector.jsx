import { useState } from 'react'
import { getIpClass } from '../utils/ipUtils'

const IpClassDetector = () => {
  const [ipAddress, setIpAddress] = useState('')
  const [ipClass, setIpClass] = useState('')
  const [error, setError] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)

  const handleDetectClass = () => {
    try {
      const detectedClass = getIpClass(ipAddress)
      setIpClass(detectedClass)
      setError('')
    } catch (err) {
      setError('IP Address tidak valid')
    }
  }

  const getClassDescription = (ipClass) => {
    const descriptions = {
      'A': 'Range: 1.0.0.0 - 126.255.255.255\nDefault Subnet Mask: 255.0.0.0',
      'B': 'Range: 128.0.0.0 - 191.255.255.255\nDefault Subnet Mask: 255.255.0.0',
      'C': 'Range: 192.0.0.0 - 223.255.255.255\nDefault Subnet Mask: 255.255.255.0',
      'D': 'Range: 224.0.0.0 - 239.255.255.255\nMulticast Address',
      'E': 'Range: 240.0.0.0 - 255.255.255.255\nReserved for Research'
    }
    return descriptions[ipClass] || ''
  }

  const resetDetector = () => {
    setIsSpinning(true)
    setTimeout(() => {
      setIpAddress('')
      setIpClass('')
      setError('')
      setIsSpinning(false)
    }, 800)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 p-8 bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl card-gradient-border animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-white drop-shadow-[0_0_8px_#D9D9D9] tracking-wide">Deteksi Kelas IP</h2>
        <button onClick={resetDetector} className={`p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all shadow-[0_0_8px_#D9D9D9] btn-reset-spin ${isSpinning ? 'btn-reset-spin-active' : ''}`}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <div className="space-y-8">
        <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn">
          <label className="block text-sm font-semibold text-[#D9D9D9] mb-2">IP Address</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="Contoh: 192.168.1.1"
              className="input-field bg-black/60 border border-[#D9D9D9] text-white font-mono focus:ring-2 focus:ring-[#D9D9D9] transition-all"
            />
            <button 
              onClick={handleDetectClass} 
              className="btn bg-gradient-to-r from-[#D9D9D9] to-white text-black font-bold shadow-[0_0_8px_#D9D9D9] hover:scale-105 transition-transform"
            >
              Deteksi Kelas
            </button>
          </div>
        </div>
        {error && (
          <div className="bg-red-900/40 text-red-300 p-4 rounded-lg text-sm card-gradient-border animate-fadeIn">
            {error}
          </div>
        )}
        {ipClass && !error && (
          <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#D9D9D9] to-white flex items-center justify-center shadow-[0_0_12px_#D9D9D9] animate-glow">
                <span className="text-2xl font-bold text-black">
                  {ipClass}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white drop-shadow-[0_0_8px_#D9D9D9]">
                Kelas {ipClass}
              </h3>
            </div>
            <pre className="bg-black/60 p-4 rounded-lg text-sm font-mono text-[#D9D9D9] whitespace-pre-wrap overflow-x-auto">
              {getClassDescription(ipClass)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default IpClassDetector 