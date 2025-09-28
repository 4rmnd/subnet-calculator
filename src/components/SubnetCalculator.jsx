import { useState } from 'react'
import { cidrToSubnetMask, subnetMaskToCidr } from '../utils/ipUtils'

const SubnetCalculator = () => {
  const [cidr, setCidr] = useState('')
  const [subnetMask, setSubnetMask] = useState('')
  const [error, setError] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)

  const commonSubnets = [
    { cidr: 24, mask: '255.255.255.0', hosts: '254' },
    { cidr: 25, mask: '255.255.255.128', hosts: '126' },
    { cidr: 26, mask: '255.255.255.192', hosts: '62' },
    { cidr: 27, mask: '255.255.255.224', hosts: '30' },
    { cidr: 28, mask: '255.255.255.240', hosts: '14' },
    { cidr: 29, mask: '255.255.255.248', hosts: '6' },
    { cidr: 30, mask: '255.255.255.252', hosts: '2' },
  ]

  const handleCidrToSubnet = () => {
    try {
      const cidrNum = parseInt(cidr)
      if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
        throw new Error('CIDR harus antara 0-32')
      }
      setSubnetMask(cidrToSubnetMask(cidrNum))
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSubnetToCidr = () => {
    try {
      const cidrNum = subnetMaskToCidr(subnetMask)
      setCidr(cidrNum.toString())
      setError('')
    } catch (err) {
      setError('Format Subnet Mask tidak valid')
    }
  }

  const validateSubnetMask = (mask) => {
    const octets = mask.split('.')
    if (octets.length !== 4) return false
    
    const validValues = [0, 128, 192, 224, 240, 248, 252, 254, 255]
    let foundZero = false
    
    for (const octet of octets) {
      const num = parseInt(octet)
      if (!validValues.includes(num)) return false
      if (foundZero && num !== 0) return false
      if (num !== 255) foundZero = true
    }
    
    return true
  }

  const resetCalculator = () => {
    setIsSpinning(true)
    setTimeout(() => {
      setCidr('')
      setSubnetMask('')
      setError('')
      setIsSpinning(false)
    }, 800)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-8 bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl card-gradient-border animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-white drop-shadow-[0_0_8px_#D9D9D9] tracking-wide">Subnet Calculator</h2>
        <button onClick={resetCalculator} className={`p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all shadow-[0_0_8px_#D9D9D9] btn-reset-spin ${isSpinning ? 'btn-reset-spin-active' : ''}`}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn">
            <label className="block text-sm font-semibold text-[#D9D9D9] mb-2">CIDR (0-32)</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                value={cidr}
                onChange={(e) => setCidr(e.target.value)}
                placeholder="Contoh: 24"
                min="0"
                max="32"
                className="input-field bg-black/60 border border-[#D9D9D9] text-white font-mono focus:ring-2 focus:ring-[#D9D9D9] transition-all"
              />
              <button 
                onClick={handleCidrToSubnet} 
                className="btn bg-gradient-to-r from-[#D9D9D9] to-white text-black font-bold shadow-[0_0_8px_#D9D9D9] hover:scale-105 transition-transform"
              >
                Konversi ke Subnet
              </button>
            </div>
          </div>
          <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn">
            <label className="block text-sm font-semibold text-[#D9D9D9] mb-2">Subnet Mask</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={subnetMask}
                onChange={(e) => setSubnetMask(e.target.value)}
                placeholder="Contoh: 255.255.255.0"
                className="input-field bg-black/60 border border-[#D9D9D9] text-white font-mono focus:ring-2 focus:ring-[#D9D9D9] transition-all"
              />
              <button 
                onClick={handleSubnetToCidr} 
                className="btn bg-gradient-to-r from-[#D9D9D9] to-white text-black font-bold shadow-[0_0_8px_#D9D9D9] hover:scale-105 transition-transform"
              >
                Konversi ke CIDR
              </button>
            </div>
          </div>
        </div>
        {error && (
          <div className="bg-red-900/40 text-red-300 p-4 rounded-lg text-sm shadow-[0_0_8px_#D9D9D9] animate-fadeIn">
            {error}
          </div>
        )}
        <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn">
          <h3 className="text-lg font-semibold text-white mb-4 drop-shadow-[0_0_8px_#D9D9D9]">Tabel Referensi Subnet</h3>
          <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:mx-0 rounded-xl">
            <table className="min-w-full divide-y divide-[#D9D9D9]">
              <thead className="rounded-t-xl">
                <tr className="bg-black/60">
                  <th className="px-6 py-3 text-left text-sm font-bold text-[#D9D9D9] w-1/4">CIDR</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-[#D9D9D9] w-2/4">Subnet Mask</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-[#D9D9D9] w-1/4">Host Tersedia</th>
                </tr>
              </thead>
              <tbody className="bg-black/30 divide-y divide-[#D9D9D9] rounded-b-xl">
                {commonSubnets.map((subnet, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-white/10 transition-colors"
                  >
                    <td className="px-6 py-3 text-sm text-white font-mono whitespace-nowrap">/{subnet.cidr}</td>
                    <td className="px-6 py-3 text-sm text-white font-mono whitespace-nowrap">{subnet.mask}</td>
                    <td className="px-6 py-3 text-sm text-white font-mono whitespace-nowrap">{subnet.hosts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubnetCalculator 