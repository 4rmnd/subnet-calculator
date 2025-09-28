import { useState, useCallback, useRef } from 'react'
import ReactFlow, { 
  Background, 
  Controls,
  MiniMap,
  MarkerType
} from 'reactflow'
import 'reactflow/dist/style.css'
import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'
import { exportToPdf, exportToCsv } from '../utils/exportUtils'

const NetworkVisualization = () => {
  const flowRef = useRef(null)
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [networkData, setNetworkData] = useState({
    networkAddress: '',
    subnets: [{ name: '', hosts: '' }]
  })
  const [isSpinning, setIsSpinning] = useState(false)

  const addSubnet = () => {
    setNetworkData({
      ...networkData,
      subnets: [...networkData.subnets, { name: '', hosts: '' }]
    })
  }

  const updateSubnet = (index, field, value) => {
    const newSubnets = [...networkData.subnets]
    newSubnets[index][field] = value
    setNetworkData({
      ...networkData,
      subnets: newSubnets
    })
  }

  const removeSubnet = (index) => {
    if (networkData.subnets.length > 1) {
      const newSubnets = networkData.subnets.filter((_, i) => i !== index)
      setNetworkData({
        ...networkData,
        subnets: newSubnets
      })
    }
  }

  const generateVisualization = () => {
    const newNodes = []
    const newEdges = []
    
    // Root network node
    newNodes.push({
      id: 'network',
      data: { 
        label: (
          <div className="text-center">
            <div className="font-medium">Network</div>
            <div className="text-sm font-mono">{networkData.networkAddress}</div>
          </div>
        )
      },
      position: { x: 250, y: 0 },
      className: 'bg-black text-white dark:bg-white dark:text-black rounded-lg p-4 shadow-lg'
    })

    // Generate subnet nodes
    networkData.subnets.forEach((subnet, index) => {
      const nodeId = `subnet-${index}`
      newNodes.push({
        id: nodeId,
        data: { 
          label: (
            <div className="text-center">
              <div className="font-medium">{subnet.name}</div>
              <div className="text-sm">Hosts: {subnet.hosts}</div>
            </div>
          )
        },
        position: { x: index * 200, y: 150 },
        className: 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-lg p-4 shadow-md'
      })

      // Connect to root
      newEdges.push({
        id: `edge-${index}`,
        source: 'network',
        target: nodeId,
        type: 'smoothstep',
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        className: 'dark:stroke-white'
      })
    })

    setNodes(newNodes)
    setEdges(newEdges)
  }

  const exportToPNG = useCallback(() => {
    if (flowRef.current === null) return

    toPng(flowRef.current, {
      filter: (node) => {
        // Don't export React Flow utility elements
        const excludeClasses = ['react-flow__minimap', 'react-flow__controls']
        return !excludeClasses.some(className => 
          node.className?.includes(className)
        )
      }
    })
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = 'network-visualization.png'
      link.href = dataUrl
      link.click()
    })
  }, [])

  const exportToPDF = useCallback(() => {
    if (flowRef.current === null) return

    toPng(flowRef.current, {
      filter: (node) => {
        const excludeClasses = ['react-flow__minimap', 'react-flow__controls']
        return !excludeClasses.some(className => 
          node.className?.includes(className)
        )
      }
    })
    .then((dataUrl) => {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px'
      })

      const imgProps = pdf.getImageProperties(dataUrl)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save('network-visualization.pdf')
    })
  }, [])

  const resetVisualization = () => {
    setIsSpinning(true)
    setTimeout(() => {
      setNetworkData({
        networkAddress: '',
        subnets: [{ name: '', hosts: '' }]
      })
      setNodes([])
      setEdges([])
      setIsSpinning(false)
    }, 800)
  }

  return (
    <div className="max-w-4xl mx-auto overflow-visible p-0 pb-16 bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl card-gradient-border animate-fadeIn">
      <div className="flex justify-between items-center px-8 pt-8 mb-6">
        <h2 className="text-2xl font-extrabold text-white drop-shadow-[0_0_8px_#D9D9D9] tracking-wide">Visualisasi Jaringan</h2>
        <button
          onClick={resetVisualization}
          className={`p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all shadow-[0_0_8px_#D9D9D9] btn-reset-spin ${isSpinning ? 'btn-reset-spin-active' : ''}`}
          title="Reset visualization"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <div className="space-y-8 px-8 overflow-visible">
        <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn">
          <label className="block text-sm font-semibold text-[#D9D9D9] mb-2">Network Address</label>
          <input
            type="text"
            value={networkData.networkAddress}
            onChange={(e) => setNetworkData({ ...networkData, networkAddress: e.target.value })}
            placeholder="Contoh: 192.168.1.0"
            className="input-field bg-black/60 border border-[#D9D9D9] text-white font-mono focus:ring-2 focus:ring-[#D9D9D9] transition-all"
          />
        </div>
        <div className="bg-[#18181b] rounded-xl p-6 card-gradient-border animate-fadeIn space-y-4">
          <h3 className="text-lg font-semibold text-white drop-shadow-[0_0_8px_#D9D9D9]">Daftar Subnet</h3>
          {networkData.subnets.map((subnet, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={subnet.name}
                onChange={(e) => updateSubnet(index, 'name', e.target.value)}
                placeholder="Nama Subnet"
                className="input-field bg-black/60 border border-[#D9D9D9] text-white font-mono focus:ring-2 focus:ring-[#D9D9D9] transition-all"
              />
              <input
                type="number"
                value={subnet.hosts}
                onChange={(e) => updateSubnet(index, 'hosts', e.target.value)}
                placeholder="Jumlah Host"
                className="input-field bg-black/60 border border-[#D9D9D9] text-white font-mono focus:ring-2 focus:ring-[#D9D9D9] transition-all"
                min="1"
              />
              <button
                onClick={() => removeSubnet(index)}
                className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-all"
              >
                ✕
              </button>
            </div>
          ))}
          <button 
            onClick={addSubnet}
            className="btn bg-gradient-to-r from-[#D9D9D9] to-white text-black font-bold shadow-[0_0_8px_#D9D9D9] hover:scale-105 transition-transform"
          >
            + Tambah Subnet
          </button>
        </div>
        <button 
          onClick={generateVisualization}
          className="btn bg-gradient-to-r from-[#D9D9D9] to-white text-black font-bold shadow-[0_0_8px_#D9D9D9] hover:scale-105 transition-transform w-full"
        >
          Generate Visualisasi
        </button>

        <div ref={flowRef} className="h-[500px] w-full bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden mt-8">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            minZoom={0.5}
            maxZoom={1.5}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            className="!bg-transparent"
          >
            <Background gap={16} size={1} color="#CBD5E1" className="dark:!bg-gray-800" />
            <Controls className="!bg-white dark:!bg-gray-800 !shadow-lg" />
            <MiniMap className="!bg-white dark:!bg-gray-800 !shadow-lg" />
          </ReactFlow>
        </div>

        <div className="flex space-x-2">
          <button onClick={exportToPNG} className="btn btn-primary flex-1">
            Export PNG
          </button>
          <button onClick={exportToPDF} className="btn btn-primary flex-1">
            Export PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default NetworkVisualization 