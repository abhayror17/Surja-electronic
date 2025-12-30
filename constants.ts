import { Category, Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'ProFlex Braided USB-C Cable',
    tagline: 'Engineered for durability and speed.',
    description: 'A premium nylon-braided USB-C to USB-C cable supporting 100W PD charging and 40Gbps data transfer. Customizable length and color patterns for OEM branding.',
    price: 4.50, // Wholesale unit estimate
    category: Category.CABLES_CONNECTORS,
    imageUrl: 'https://images.unsplash.com/photo-1544118849-c187bac3b663?q=80&w=2070&auto=format&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1606229338300-e1880a1b5722?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563770095-39d468f9a51d?q=80&w=2070&auto=format&fit=crop'
    ],
    features: ['Reinforced Strain Relief', 'E-Marker Chip', '10,000+ Bend Lifespan', 'Custom Logo Molding'],
    specs: {
      'Length': '1m / 2m / 3m Custom',
      'Material': 'Double-Braided Nylon',
      'Power Delivery': 'Up to 100W (5A/20V)',
      'Certification': 'USB-IF Certified'
    }
  },
  {
    id: 'p2',
    name: 'OmniControl Smart Remote',
    tagline: 'Universal control for the modern home.',
    description: 'White-label smart remote control featuring voice command support, backlit keys, and universal IR/RF compatibility. Ideal for Smart TV and Set-Top Box manufacturers.',
    price: 12.00,
    category: Category.CONSUMER_ELECTRONICS,
    imageUrl: 'https://images.unsplash.com/photo-1635338870719-7555898d248b?q=80&w=2070&auto=format&fit=crop',
    features: ['Voice Assistant Mic', 'Bluetooth 5.2 & IR', 'Programmable Hotkeys', 'Anti-Microbial Coating'],
    specs: {
      'Range': '15m (Bluetooth) / 10m (IR)',
      'Battery': '2x AAA or Rechargeable Li-ion',
      'Keys': '42 Silicone Keys',
      'Housing': 'ABS Plastic (Recycled options)'
    }
  },
  {
    id: 'p3',
    name: 'GaNPrime 65W Adapter',
    tagline: 'Compact power, maximum efficiency.',
    description: 'Next-gen Gallium Nitride (GaN) power adapter. 50% smaller than standard chargers with superior thermal management. Available with interchangeable regional plugs.',
    price: 15.50,
    category: Category.POWER_SOLUTIONS,
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=2070&auto=format&fit=crop',
    features: ['GaN Technology', 'Foldable Prongs', 'Multi-Device Charging', 'Over-Voltage Protection'],
    specs: {
      'Input': '100-240V ~ 50/60Hz',
      'Output Ports': '2x USB-C, 1x USB-A',
      'Efficiency': '>93%',
      'Dimensions': '50 x 50 x 28 mm'
    }
  },
  {
    id: 'p4',
    name: 'IoT SenseModule X1',
    tagline: 'The brain of your smart device.',
    description: 'Integrated PCB module for smart home appliances. Features Wi-Fi, BLE, and temperature/humidity sensing capabilities on a compact footprint.',
    price: 8.75,
    category: Category.COMPONENTS_PCB,
    imageUrl: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=2070&auto=format&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=2070&auto=format&fit=crop'
    ],
    features: ['Dual-Band Wi-Fi', 'Matter Support', 'Low Power Consumption', 'OTA Update Ready'],
    specs: {
      'Chipset': 'Suraj S-Series SoC',
      'Connectivity': 'Wi-Fi 6, BLE 5.3',
      'IO Ports': 'GPIO, I2C, UART',
      'Size': '22mm x 18mm'
    }
  },
  {
    id: 'p5',
    name: 'VisionStream 4K Stick',
    tagline: 'Turn-key streaming solution.',
    description: 'A powerful Android TV streaming dongle ready for branding. Supports 4K HDR, Dolby Atmos, and comes with a customizable launcher.',
    price: 28.00,
    category: Category.CONSUMER_ELECTRONICS,
    imageUrl: 'https://images.unsplash.com/photo-1544896796-01584282531e?q=80&w=2070&auto=format&fit=crop',
    features: ['4K HDR10+', 'Google Assistant', 'Chromecast Built-in', 'Custom Boot Logo'],
    specs: {
      'OS': 'Android TV 12',
      'Storage': '8GB / 16GB eMMC',
      'RAM': '2GB DDR4',
      'Video Output': 'HDMI 2.1'
    }
  },
  {
    id: 'p6',
    name: 'Industrial Control Panel PCB',
    tagline: 'Rugged reliability for machinery.',
    description: 'Custom PCB assembly designed for industrial HMIs. Resistant to vibration, dust, and extreme temperatures.',
    price: 45.00,
    category: Category.COMPONENTS_PCB,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    features: ['High-Temp Tolerance', 'Conformal Coating', 'Touch Controller', 'EMI Shielding'],
    specs: {
      'Layers': '6-Layer FR4',
      'Surface Finish': 'ENIG',
      'Operating Temp': '-40°C to 85°C',
      'Compliance': 'RoHS, IPC Class 3'
    }
  },
 
  {
    id: 'p7',
    name: 'AeroBuds ANC TWS',
    tagline: 'Silence the noise. Focus on sound.',
    description: 'White-label true wireless earbuds with Active Noise Cancellation and low-latency gaming mode. Designed for mass consumer electronics brands.',
    price: 18.00,
    category: Category.CONSUMER_ELECTRONICS,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=2070&auto=format&fit=crop',
    features: ['Active Noise Cancellation', 'Low-Latency Mode', 'Touch Controls', 'Custom Logo Case'],
    specs: {
      'Bluetooth': '5.3',
      'Battery Life': '6h + 24h Case',
      'Drivers': '10mm Dynamic',
      'Charging': 'USB-C Fast Charge'
    }
  },

  {
    id: 'p8',
    name: 'MagSnap Wireless Charger',
    tagline: 'Snap. Charge. Go.',
    description: 'Magnetic wireless charging pad optimized for iPhone and Qi-enabled devices. Ultra-slim aluminum housing for premium OEM branding.',
    price: 9.50,
    category: Category.POWER_SOLUTIONS,
    imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=2070&auto=format&fit=crop',
    features: ['MagSafe-Compatible', 'Overheat Protection', 'Foreign Object Detection', 'Slim Aluminum Body'],
    specs: {
      'Output': '15W Max',
      'Standard': 'Qi Certified',
      'Input': 'USB-C',
      'Thickness': '6.8mm'
    }
  },

  {
    id: 'p9',
    name: 'FlexDock USB-C Hub',
    tagline: 'One port. Total expansion.',
    description: 'Compact USB-C hub with HDMI, USB-A, SD card, and PD charging pass-through. Ideal for laptops and tablets.',
    price: 14.25,
    category: Category.CABLES_CONNECTORS,
    imageUrl: 'https://images.unsplash.com/photo-1616578273577-7b4cfc8b7d6a?q=80&w=2070&auto=format&fit=crop',
    features: ['4K HDMI Output', 'PD Pass-Through', 'Plug & Play', 'Aluminum Shell'],
    specs: {
      'HDMI': '4K @ 60Hz',
      'USB Ports': '2x USB-A 3.0',
      'Card Reader': 'SD / microSD',
      'Power': '100W PD Input'
    }
  },

  {
    id: 'p10',
    name: 'Smart Energy Meter PCB',
    tagline: 'Measure smarter. Save energy.',
    description: 'Embedded PCB solution for smart energy meters with real-time monitoring and cloud connectivity support.',
    price: 22.00,
    category: Category.COMPONENTS_PCB,
    imageUrl: 'https://images.unsplash.com/photo-1581092334651-ddf26d9c9b02?q=80&w=2070&auto=format&fit=crop',
    features: ['Real-Time Monitoring', 'Secure MCU', 'Low Power Design', 'OTA Firmware'],
    specs: {
      'MCU': 'ARM Cortex-M4',
      'Connectivity': 'Wi-Fi / NB-IoT',
      'Accuracy': 'Class 1',
      'Voltage Range': '110–240V'
    }
  },

  {
    id: 'p11',
    name: 'SolarCharge Power Bank',
    tagline: 'Power from the sun.',
    description: 'Rugged solar-assisted power bank designed for outdoor and emergency use. Water-resistant with LED flashlight.',
    price: 16.75,
    category: Category.POWER_SOLUTIONS,
    imageUrl: 'https://images.unsplash.com/photo-1621343921010-4a35b3e0b50f?q=80&w=2070&auto=format&fit=crop',
    features: ['Solar Charging', 'Dual USB Output', 'IPX5 Water Resistance', 'LED Torch'],
    specs: {
      'Capacity': '20,000 mAh',
      'Input': 'Solar / USB-C',
      'Output': '2x USB-A',
      'Build': 'Rubberized ABS'
    }
  },

  {
    id: 'p12',
    name: 'EdgeCam AI Security Module',
    tagline: 'Vision with intelligence.',
    description: 'AI-enabled camera module for smart security systems with edge processing and facial recognition support.',
    price: 32.00,
    category: Category.COMPONENTS_PCB,
    imageUrl: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?q=80&w=2070&auto=format&fit=crop',
    features: ['Edge AI Processing', 'Low-Light Vision', 'Secure Boot', 'Compact Design'],
    specs: {
      'Sensor': '8MP CMOS',
      'Processor': 'AI SoC with NPU',
      'Video': '4K @ 30fps',
      'Interface': 'MIPI CSI-2'
    }
  }
];