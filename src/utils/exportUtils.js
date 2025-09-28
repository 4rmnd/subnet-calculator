import { jsPDF } from 'jspdf'

export const exportToPdf = (data, title) => {
  const pdf = new jsPDF()
  
  pdf.setFontSize(16)
  pdf.text(title, 20, 20)
  
  pdf.setFontSize(12)
  let y = 40

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'object') {
      pdf.text(`${key}:`, 20, y)
      y += 10
      Object.entries(value).forEach(([subKey, subValue]) => {
        pdf.text(`${subKey}: ${subValue}`, 30, y)
        y += 10
      })
    } else {
      pdf.text(`${key}: ${value}`, 20, y)
      y += 10
    }
  })

  pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`)
}

export const exportToCsv = (data) => {
  const rows = [
    Object.keys(data[0]),
    ...data.map(item => Object.values(item))
  ]
  
  const csvContent = rows
    .map(row => row.join(','))
    .join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'network-data.csv'
  link.click()
} 