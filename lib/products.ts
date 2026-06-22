export interface Product {
  _id: string;
  title: string;
  category: string;
  priceText: string;
  badge?: string;
  imageUrl: string;
  specs: string[];
  slug: string;
  description?: string;
  brand?: string;
  origin?: string;
  warranty?: string;
  galleryUrls?: string[];
}

export const CATEGORIES = ["All","Amplifier","Turntable","Headphones","Speakers","DAC","Cables"];

// export const DEMO_PRODUCTS: Product[] = [
//   {
//     _id:"1", title:"Aurum One Integrated Amplifier", category:"Amplifier",
//     priceText:"$3,200", badge:"New Arrival", brand:"Aurum Audio", origin:"Germany", warranty:"3 Years",
//     imageUrl:"https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
//     galleryUrls:[
//       "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
//       "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
//       "https://images.unsplash.com/photo-1545454675-3531b543be5d",
//     ],
//     specs:["100W/ch · Class A/B","Dual VU meters · 4 balanced XLR inputs","Tube-hybrid pre-stage","S/N ratio: 102 dB","THD+N: < 0.003% at 1W","Frequency response: 5Hz–80kHz"],
//     description:"The Aurum One is the result of three years of engineering obsession. Combining a tube-hybrid pre-stage with a solid-state power section, it delivers the warmth and dimensionality of valves with the authority and control of transistors. Dual precision VU meters and four balanced XLR inputs make it the centrepiece of any serious listening room.",
//     slug:"aurum-one",
//   },
//   {
//     _id:"2", title:"Solstice Reference Turntable", category:"Turntable",
//     priceText:"$5,800", badge:"Flagship", brand:"Solstice", origin:"Japan", warranty:"5 Years",
//     imageUrl:"https://images.unsplash.com/photo-1461360228754-6e81c478b882",
//     galleryUrls:[
//       "https://images.unsplash.com/photo-1461360228754-6e81c478b882",
//       "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
//       "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
//     ],
//     specs:["Belt-drive · Carbon fibre tonearm","MC cartridge included · 33⅓ & 45 RPM","Acrylic platter · Adjustable feet","Motor speed stability: ±0.01%","Wow & flutter: 0.025% WRMS","Platter weight: 1.8 kg"],
//     description:"Precision-engineered in Japan, the Solstice Reference redefines what a belt-drive turntable can achieve. Its 1.8 kg acrylic platter and ultra-low-noise DC motor deliver a stable, silent foundation for your vinyl. The included carbon fibre tonearm and hand-selected moving-coil cartridge reveal detail in your records you never knew was there.",
//     slug:"solstice-turntable",
//   },
//   {
//     _id:"3", title:"Meridian Over-Ear Headphone", category:"Headphones",
//     priceText:"$1,850", brand:"Meridian", origin:"United Kingdom", warranty:"2 Years",
//     imageUrl:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
//     galleryUrls:[
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
//       "https://images.unsplash.com/photo-1484704849700-f032a568e944",
//       "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
//     ],
//     specs:["Planar magnetic · 50mm drivers","20Hz–40kHz · 99.5 dB/mW","Genuine leather pads · Aluminium frame","Impedance: 32 Ohm","Cable: 2m OFC copper, 3.5mm + 6.35mm","Weight: 385 g"],
//     description:"Handcrafted in the UK, the Meridian combines planar magnetic technology with aircraft-grade aluminium and hand-stitched genuine leather. The 50mm planar drivers deliver exceptional imaging and transient response that rewards critical listening for hours on end.",
//     slug:"meridian-headphone",
//   },
//   {
//     _id:"4", title:"Aria Floorstanding Speaker", category:"Speakers",
//     priceText:"$8,400 / pair", badge:"Limited", brand:"Aria Acoustics", origin:"Denmark", warranty:"10 Years",
//     imageUrl:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
//     galleryUrls:[
//       "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
//       "https://images.unsplash.com/photo-1545454675-3531b543be5d",
//       "https://images.unsplash.com/photo-1571330735066-03aaa9429d89",
//     ],
//     specs:["3-way · 4-driver array","40Hz–25kHz ±2dB · 92dB sensitivity","Real walnut veneer cabinet","Nominal impedance: 8 Ohm","Recommended amplifier power: 40–200W","H120 × W24 × D35 cm"],
//     description:"Sculpted in Denmark from genuine walnut veneer, the Aria floorstander is a statement in both form and acoustics. Its three-way, four-driver configuration — including a ribbon tweeter and dual bass drivers — produces a soundstage of extraordinary scale. Limited to 50 pairs worldwide per production run.",
//     slug:"aria-speaker",
//   },
//   {
//     _id:"5", title:"Clarity R-2R DAC", category:"DAC",
//     priceText:"$2,600", brand:"Clarity Labs", origin:"Switzerland", warranty:"3 Years",
//     imageUrl:"https://images.unsplash.com/photo-1587145820266-a5951ee6f620",
//     galleryUrls:[
//       "https://images.unsplash.com/photo-1587145820266-a5951ee6f620",
//       "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
//       "https://images.unsplash.com/photo-1519681393784-d120267933ba",
//     ],
//     specs:["R-2R ladder · DSD512 / PCM 768kHz","USB · Coaxial · Optical · I²S inputs","Dual mono topology · Tube output stage","Dynamic range: 130 dB","Output impedance: 100 Ohm","Power: 35W"],
//     description:"Swiss-made R-2R ladder DACs are the rarest and most musical digital-to-analogue converters available. The Clarity uses a discrete resistor ladder — eschewing chip-based conversion entirely — to produce an analogue presentation of unrivalled naturalness. The tube output stage adds the final measure of warmth.",
//     slug:"clarity-dac",
//   },
//   {
//     _id:"6", title:"Phantom Phono Preamplifier", category:"Amplifier",
//     priceText:"$1,400", brand:"Phantom Audio", origin:"United States", warranty:"2 Years",
//     imageUrl:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
//     galleryUrls:[
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
//       "https://images.unsplash.com/photo-1571330735066-03aaa9429d89",
//       "https://images.unsplash.com/photo-1619983081563-430f63602796",
//     ],
//     specs:["MM & MC compatible · All-discrete","Adjustable loading & gain","Low-noise toroidal transformer","RIAA accuracy: ±0.2dB","Input impedance: 47kΩ (MM) / adjustable (MC)","S/N ratio: 80 dB (MM) / 72 dB (MC)"],
//     description:"The Phantom is the phono stage we would buy with our own money. Fully discrete, zero feedback, built around a custom low-noise toroidal transformer. Adjustable loading and gain via rear-panel DIP switches means it pairs perfectly with virtually any cartridge on the market.",
//     slug:"phantom-phono",
//   },
//   {
//     _id:"7", title:"Zenith Reference Cables", category:"Cables",
//     priceText:"$380 / pair", brand:"Zenith", origin:"Netherlands", warranty:"Lifetime",
//     imageUrl:"https://images.unsplash.com/photo-1571330735066-03aaa9429d89",
//     galleryUrls:[
//       "https://images.unsplash.com/photo-1571330735066-03aaa9429d89",
//       "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
//     ],
//     specs:["99.999% OCC copper conductors","PTFE dielectric · Rhodium-plated connectors","1m, 1.5m, 2m lengths available","Capacitance: 47 pF/m","Shielding: Double braided copper","RCA & XLR versions"],
//     description:"Wires matter. The Zenith Reference interconnects use 99.999% monocrystalline copper conductors drawn through a single crystal growth process that eliminates grain boundaries which colour the sound. PTFE dielectric and rhodium-plated terminations complete a cable that gets out of the way and lets your equipment speak.",
//     slug:"zenith-cables",
//   },
//   {
//     _id:"8", title:"Nomad Portable DAC/Amp", category:"DAC",
//     priceText:"$680", badge:"New Arrival", brand:"Nomad Audio", origin:"South Korea", warranty:"1 Year",
//     imageUrl:"https://images.unsplash.com/photo-1484704849700-f032a568e944",
//     galleryUrls:[
//       "https://images.unsplash.com/photo-1484704849700-f032a568e944",
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
//     ],
//     specs:["ES9038Q2M SABRE DAC chip","4.4mm balanced + 3.5mm single-ended","PCM 768kHz / DSD256 support","Battery life: 8 hours","Output power: 400mW @ 32Ω balanced","Weight: 95 g"],
//     description:"The Nomad brings uncompromising desktop DAC/amp performance to your pocket. Built around the ESS SABRE ES9038Q2M, it drives even demanding headphones from a USB-C connection. Balanced 4.4mm Pentaconn output for those who demand the very best on the move.",
//     slug:"nomad-dac",
//   },
//   {
//     _id:"9", title:"Cascade Open-Back Headphone 1", category:"Headphones",
//     priceText:"$2,400", brand:"Cascade Audio", origin:"Austria", warranty:"3 Years",
//     imageUrl:"https://images.unsplash.com/photo-1546435770-a3e426bf472b",
//     galleryUrls:[
//       "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
//       "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a",
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
//     ],
//     specs:["Dynamic driver · 50mm beryllium-coated","5Hz–50kHz · 103 dB/mW","Magnesium alloy yoke · Lambskin ear pads","Impedance: 80 Ohm","Weight: 340 g without cable","Detachable 4-pin XLR cable included"],
//     description:"The Cascade represents the pinnacle of Austrian headphone engineering. Its 50mm beryllium-coated dynamic driver delivers a frequency response extending to 50kHz, while the open-back acoustic design creates a soundstage that rivals full-size loudspeakers. Lambskin leather pads ensure comfort during the longest sessions.",
//     slug:"cascade-headphone",
//   },
// ];
