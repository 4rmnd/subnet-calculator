import { useState } from 'react'
import { calculateNetworkId, calculateBroadcast, cidrToSubnetMask } from '../utils/ipUtils'

const NetworkCalculator = () => {
  const [ipAddress, setIpAddress] = useState('')
  const [cidr, setCidr] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)

  const handleCalculate = () => {
    try {
      if (!ipAddress || !cidr) {
        throw new Error('IP Address dan CIDR harus diisi')
      }

      const cidrNum = parseInt(cidr)
      if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
        throw new Error('CIDR harus antara 0-32')
      }

      const subnetMask = cidrToSubnetMask(cidrNum)
      const networkId = calculateNetworkId(ipAddress, subnetMask)
      const broadcast = calculateBroadcast(networkId, subnetMask)

      const firstHost = networkId.split('.')
      firstHost[3] = parseInt(firstHost[3]) + 1
      
      const lastHost = broadcast.split('.')
      lastHost[3] = parseInt(lastHost[3]) - 1

      setResult({
        networkId,
        broadcast,
        subnetMask,
        firstHost: firstHost.join('.'),
        lastHost: lastHost.join('.'),
        totalHosts: Math.pow(2, 32 - cidrNum) - 2
      })
      setError('')
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  const resetCalculator = () => {
    setIsSpinning(true)
    setTimeout(() => {
      setIpAddress('')
      setCidr('')
      setResult(null)
      setError('')
      setIsSpinning(false)
    }, 800)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-8 bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl card-gradient-border animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-white drop-shadow-[0_0_8px_#D9D9D9] tracking-wide">Network Calculator</h2>
        <button
          onClick={resetCalculator}
          className={`p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all shadow-[0_0_8px_#D9D9D9] btn-reset-spin ${isSpinning ? 'btn-reset-spin-active' : ''}`}
          title="Reset calculator"
        >
          <svg 
            className="w-5 h-5 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
        </button>
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn">
            <label className="block text-sm font-semibold text-[#D9D9D9] mb-2">IP Address</label>
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="Contoh: 192.168.1.0"
              className="input-field bg-black/60 border border-[#D9D9D9] text-white font-mono focus:ring-2 focus:ring-[#D9D9D9] transition-all"
            />
          </div>
          <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn">
            <label className="block text-sm font-semibold text-[#D9D9D9] mb-2">CIDR (0-32)</label>
            <input
              type="number"
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              placeholder="Contoh: 24"
              min="0"
              max="32"
              className="input-field bg-black/60 border border-[#D9D9D9] text-white font-mono focus:ring-2 focus:ring-[#D9D9D9] transition-all"
            />
          </div>
        </div>
        <button onClick={handleCalculate} className="btn bg-gradient-to-r from-[#D9D9D9] to-white text-black font-bold shadow-[0_0_8px_#D9D9D9] hover:scale-105 transition-transform w-full">
          Hitung
        </button>
        {error && (
          <div className="bg-red-900/40 text-red-300 p-4 rounded-lg text-sm shadow-[0_0_8px_#D9D9D9] animate-fadeIn">
            {error}
          </div>
        )}
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn">
              <label className="block text-sm font-semibold text-[#D9D9D9] mb-2">Network ID</label>
              <div className="font-mono text-white text-lg drop-shadow-[0_0_8px_#D9D9D9]">{result.networkId}</div>
            </div>
            <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn">
              <label className="block text-sm font-semibold text-[#D9D9D9] mb-2">Broadcast</label>
              <div className="font-mono text-white text-lg drop-shadow-[0_0_8px_#D9D9D9]">{result.broadcast}</div>
            </div>
            <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn">
              <label className="block text-sm font-semibold text-[#D9D9D9] mb-2">Subnet Mask</label>
              <div className="font-mono text-white text-lg drop-shadow-[0_0_8px_#D9D9D9]">{result.subnetMask}</div>
            </div>
            <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn">
              <label className="block text-sm font-semibold text-[#D9D9D9] mb-2">Total Host</label>
              <div className="font-mono text-white text-lg drop-shadow-[0_0_8px_#D9D9D9]">{result.totalHosts.toLocaleString()}</div>
            </div>
            <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn">
              <label className="block text-sm font-semibold text-[#D9D9D9] mb-2">First Host</label>
              <div className="font-mono text-white text-lg drop-shadow-[0_0_8px_#D9D9D9]">{result.firstHost}</div>
            </div>
            <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn">
              <label className="block text-sm font-semibold text-[#D9D9D9] mb-2">Last Host</label>
              <div className="font-mono text-white text-lg drop-shadow-[0_0_8px_#D9D9D9]">{result.lastHost}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NetworkCalculator 