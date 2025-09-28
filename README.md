# Subnet Calculator

![Subnet Calculator]

A modern, user-friendly subnet calculator web application built with React and Vite. This tool helps network administrators, IT students, and professionals perform various IP addressing calculations quickly and efficiently.

## Features

### IP Converter
Easily convert between decimal IP addresses and their binary representations. The tool validates inputs and provides clear error messages for invalid formats.

### IP Class Detector
Identify the class of an IP address (A, B, C, D, or E) and view detailed information about each class, including address ranges and default subnet masks.

### Network Calculator
Calculate essential network parameters from an IP address and CIDR notation, including:
- Network ID
- Broadcast address
- First and last usable host addresses
- Total number of usable hosts
- Subnet mask in decimal format

### Subnet Calculator
Convert between CIDR notation and subnet masks. Includes a handy reference table of common subnet configurations with their corresponding host capacities.

### VLSM Calculator
Implement Variable Length Subnet Masking to efficiently allocate address space based on specific network requirements. Features include:
- Automatic subnet calculation based on host requirements
- Manual CIDR assignment option for advanced users
- Detailed subnet allocation results with network IDs, broadcast addresses, and usable IP ranges

### Network Visualization
Create visual representations of your network topology with an interactive diagram. Export your network diagrams as PNG images or PDF documents for documentation and presentations.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/subnet-calculator.git
   cd subnet-calculator
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

## Technologies Used

- **React** - UI library for building the user interface
- **Vite** - Next-generation frontend tooling for faster development
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router** - For navigation between different calculator tools
- **ReactFlow** - For interactive network visualization diagrams
- **html-to-image & jsPDF** - For exporting visualizations and reports

## Project Structure

```
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── IpClassDetector.jsx
│   │   ├── IpConverter.jsx
│   │   ├── Navigation.jsx
│   │   ├── NetworkCalculator.jsx
│   │   ├── NetworkVisualization.jsx
│   │   ├── SubnetCalculator.jsx
│   │   └── VlsmCalculator.jsx
│   ├── context/          # React context for state management
│   │   └── ThemeContext.jsx
│   ├── utils/            # Utility functions
│   │   ├── exportUtils.js
│   │   └── ipUtils.js
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
└── index.html            # HTML template
```

## Usage Tips

- For the IP Converter, ensure you enter valid IP addresses in the format `xxx.xxx.xxx.xxx`
- When using the VLSM Calculator, arrange your subnets from largest to smallest for optimal allocation
- The Network Visualization tool works best for networks with up to 20 subnets
- Use the export functionality to save your calculations for documentation purposes

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve this tool.