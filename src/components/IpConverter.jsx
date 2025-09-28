import { useState } from 'react'
import { ipToBinary, binaryToIp } from '../utils/ipUtils'

const IpConverter = () => {
  const [ipAddress, setIpAddress] = useState('')
  const [binaryIp, setBinaryIp] = useState('')
  const [error, setError] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)

  const handleIpToBinary = () => {
    try {
      const result = ipToBinary(ipAddress)
      setBinaryIp(result)
      setError('')
    } catch (err) {
      setError('IP Address tidak valid')
    }
  }

  const handleBinaryToIp = () => {
    try {
      const result = binaryToIp(binaryIp)
      setIpAddress(result)
      setError('')
    } catch (err) {
      setError('Format biner tidak valid')
    }
  }

  const resetConverter = () => {
    setIsSpinning(true)
    setTimeout(() => {
      setIpAddress('')
      setBinaryIp('')
      setError('')
      setIsSpinning(false)
    }, 800)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 p-8 bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl card-gradient-border animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-white drop-shadow-[0_0_8px_#D9D9D9] tracking-wide">Konversi IP Address</h2>
        <button onClick={resetConverter} className={`p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all shadow-[0_0_8px_#D9D9D9] btn-reset-spin ${isSpinning ? 'btn-reset-spin-active' : ''}`}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <div className="space-y-8">
        <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn">
          <label className="block text-sm font-semibold text-[#D9D9D9] mb-2">IP Address (Desimal)</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="Contoh: 192.168.1.1"
              className="input-field bg-black/60 border border-[#D9D9D9] text-white font-mono focus:ring-2 focus:ring-[#D9D9D9] transition-all"
            />
            <button onClick={handleIpToBinary} className="btn bg-gradient-to-r from-[#D9D9D9] to-white text-black font-bold shadow-[0_0_8px_#D9D9D9] hover:scale-105 transition-transform">
              Konversi ke Biner
            </button>
          </div>
        </div>
        <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn">
          <label className="block text-sm font-semibold text-[#D9D9D9] mb-2">IP Address (Biner)</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={binaryIp}
              onChange={(e) => setBinaryIp(e.target.value)}
              placeholder="Contoh: 11000000.10101000.00000001.00000001"
              className="input-field bg-black/60 border border-[#D9D9D9] text-white font-mono focus:ring-2 focus:ring-[#D9D9D9] transition-all"
            />
            <button onClick={handleBinaryToIp} className="btn bg-gradient-to-r from-[#D9D9D9] to-white text-black font-bold shadow-[0_0_8px_#D9D9D9] hover:scale-105 transition-transform">
              Konversi ke Desimal
            </button>
          </div>
        </div>
        {error && (
          <div className="bg-red-900/40 text-red-300 p-4 rounded-lg text-sm shadow-[0_0_8px_#D9D9D9] animate-fadeIn">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default IpConverter 