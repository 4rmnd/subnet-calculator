export const ipToBinary = (ip) => {
  const octets = ip.split('.')
  if (octets.length !== 4) throw new Error('Invalid IP')

  return octets
    .map(octet => {
      const num = parseInt(octet)
      if (isNaN(num) || num < 0 || num > 255) throw new Error('Invalid octet')
      return num.toString(2).padStart(8, '0')
    })
    .join('.')
}

export const binaryToIp = (binary) => {
  const octets = binary.split('.')
  if (octets.length !== 4) throw new Error('Invalid binary IP')

  return octets
    .map(octet => {
      if (octet.length !== 8 || !/^[01]+$/.test(octet)) throw new Error('Invalid binary octet')
      return parseInt(octet, 2).toString()
    })
    .join('.')
}

export const getIpClass = (ip) => {
  const firstOctet = parseInt(ip.split('.')[0])
  
  if (firstOctet >= 1 && firstOctet <= 126) return 'A'
  if (firstOctet >= 128 && firstOctet <= 191) return 'B'
  if (firstOctet >= 192 && firstOctet <= 223) return 'C'
  if (firstOctet >= 224 && firstOctet <= 239) return 'D'
  if (firstOctet >= 240 && firstOctet <= 255) return 'E'
  return 'Invalid'
}

export const calculateNetworkId = (ip, subnetMask) => {
  const ipOctets = ip.split('.').map(Number)
  const maskOctets = subnetMask.split('.').map(Number)
  
  return ipOctets
    .map((octet, i) => octet & maskOctets[i])
    .join('.')
}

export const calculateBroadcast = (networkId, subnetMask) => {
  const networkOctets = networkId.split('.').map(Number)
  const maskOctets = subnetMask.split('.').map(Number)
  
  return networkOctets
    .map((octet, i) => octet | (255 - maskOctets[i]))
    .join('.')
}

export const cidrToSubnetMask = (cidr) => {
  const bits = '1'.repeat(cidr) + '0'.repeat(32 - cidr)
  const octets = bits.match(/.{8}/g)
  return octets.map(octet => parseInt(octet, 2)).join('.')
}

export const subnetMaskToCidr = (subnetMask) => {
  return subnetMask.split('.')
    .map(octet => parseInt(octet))
    .map(num => num.toString(2).split('1').length - 1)
    .reduce((acc, curr) => acc + curr, 0)
} 