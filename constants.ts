import { Category, Product, DemoProject } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'ProFlex Braided USB-C Cable',
    tagline: 'Engineered for durability and speed.',
    description: 'A premium nylon-braided USB-C to USB-C cable supporting 100W PD charging and 40Gbps data transfer. Customizable length and color patterns for OEM branding.',
    price: 4.50, // Wholesale unit estimate
    category: Category.CABLES_CONNECTORS,
    imageUrl: 'https://images.unsplash.com/photo-1603539278917-d5d1421f681d?q=80&w=2070&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1574315042629-411a00a221f7?q=80&w=2070&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1620700878206-8d626372337d?q=80&w=2070&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1605396559384-5f53c1555238?q=80&w=2070&auto=format&fit=crop',
    features: ['Dual-Band Wi-Fi', 'Matter Support', 'Low Power Consumption', 'OTA Update Ready'],
    specs: {
      'Chipset': 'Surja S-Series SoC',
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
    imageUrl: 'https://images.unsplash.com/photo-1599849929239-0824ba464195?q=80&w=2070&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1563770094-123cd20761e0?q=80&w=2070&auto=format&fit=crop',
    features: ['High-Temp Tolerance', 'Conformal Coating', 'Touch Controller', 'EMI Shielding'],
    specs: {
      'Layers': '6-Layer FR4',
      'Surface Finish': 'ENIG',
      'Operating Temp': '-40°C to 85°C',
      'Compliance': 'RoHS, IPC Class 3'
    }
  }
];

export const DEMOS: DemoProject[] = [
  {
    id: 'd1',
    title: 'Automated Cable Stress Testing',
    description: 'Inside our QA lab: How we ensure the ProFlex cables withstand over 10,000 bends using robotic stress arms.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    relatedProductIds: ['p1'],
    date: 'QA Protocol'
  },
  {
    id: 'd2',
    title: 'Smart Hotel Implementation',
    description: 'Case Study: Deploying 5,000 OmniControl remotes and IoT modules in a luxury hotel chain for centralized room management.',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2069&auto=format&fit=crop',
    relatedProductIds: ['p2', 'p4'],
    date: 'Case Study'
  },
  {
    id: 'd3',
    title: 'SMT Assembly Line Tour',
    description: 'A walkthrough of our state-of-the-art Surface Mount Technology (SMT) line where the GaNPrime adapters are manufactured.',
    imageUrl: 'https://images.unsplash.com/photo-1563770094-2792b02a9699?q=80&w=2069&auto=format&fit=crop',
    relatedProductIds: ['p3', 'p6'],
    date: 'Factory Tour'
  }
];