import products from "./products.json";

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  dailyRate: number;
  weeklyRate: number;
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories?: string[];
}

export const categories: Category[] = [
  { id: "audio", name: "Audio", subcategories: ["Audio Recorder Rentals", "Lavalier Rentals", "Boom Microphone Rentals", "Boom Poles Rentals", "Cable: TRS Rentals", "Cable: XLR Rentals", "Audio Accessories"] },
  { id: "camera-bodies", name: "Camera Bodies", subcategories: ["Cinema Camera Body Rentals", "DSLR/ Mirrorless Camera Body Rentals"] },
  { id: "camera-lenses", name: "Camera Lenses", subcategories: ["Cinema Lens Rentals", "DSLR/ Mirrorless Lens Rentals"] },
  { id: "camera-support", name: "Camera Support", subcategories: ["Battery Rentals", "Cinema Camera Accessories", "Wireless Video Rentals", "Lens Adaptor Rentals", "Glass Filter Rentals", "Follow and Zoom Control Rentals", "Gimbal Rentals", "Mattebox Rentals", "Media and Data Rentals", "Monitor Rentals", "Teleprompter Rentals", "Tripod Rentals"] },
  { id: "dmx", name: "DMX", subcategories: [] },
  { id: "dollies", name: "Dollies", subcategories: [] },
  { id: "electric-distro", name: "Electric & Distro", subcategories: [] },
  { id: "expendables", name: "Expendables", subcategories: ["Practical Bulbs", "Gel Rolls", "Tape"] },
  { id: "filters", name: "Filters", subcategories: [] },
  { id: "fog-haze", name: "Fog/Haze Effects", subcategories: [] },
  { id: "follow-focus", name: "Follow Focus", subcategories: [] },
  { id: "gimbals", name: "Gimbals", subcategories: [] },
  { id: "grip-support", name: "Grip Support", subcategories: ["Stand Rentals", "Grip", "Fabric Rentals", "Overhead Frame Rentals", "Car Rigging Rentals", "Reflectors & CRLS Rentals", "Dolly Rentals", "Fog & Haze Rentals", "Hardware Rentals", "Carts"] },
  { id: "lighting-modifiers", name: "Lighting Modifiers", subcategories: [] },
  { id: "lights", name: "Lights", subcategories: ["Lamp Rentals", "Lighting Modifier Rentals", "Electric & Distro Rentals", "DMX Rentals"] },
  { id: "matte-boxes", name: "Matte Boxes", subcategories: [] },
  { id: "media", name: "Media", subcategories: [] },
  { id: "monitors", name: "Monitors", subcategories: [] },
  { id: "motion-control", name: "Motion Control", subcategories: ["Sisu C31: Moco Robot Studio"] },
  { id: "overhead-frames", name: "Overhead Frames", subcategories: [] },
  { id: "photo-lighting", name: "Photo Lighting", subcategories: ["On-Camera Flash Rentals", "Strobe Modifier Rentals", "Strobe Pack Rentals", "Strobe Remote Rentals"] },
  { id: "pipe-rails", name: "Pipe & Rails", subcategories: [] },
  { id: "polaroid", name: "Polaroid", subcategories: ["Polaroid Camera Rentals"] },
  { id: "production", name: "Production", subcategories: ["Projector Rentals", "Walkies and Com Rentals", "Tent Rentals"] },
  { id: "production-supplies", name: "Production Supplies", subcategories: [] },
  { id: "projectors", name: "Projectors", subcategories: [] },
  { id: "rags-fabrics", name: "Rags/Fabrics", subcategories: [] },
  { id: "seamless", name: "Seamless", subcategories: [] },
  { id: "stands", name: "Stands", subcategories: [] },
  { id: "teleprompters", name: "Teleprompters", subcategories: [] },
  { id: "tripods", name: "Tripods", subcategories: [] },
  { id: "wireless-video", name: "Wireless Video", subcategories: [] },
];

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "LensBaby Composer Pro II with Sweet 35 Optic for PL",
    category: "camera-lenses",
    dailyRate: 10,
    weeklyRate: 50,
  },
  {
    id: "2",
    name: "DEAD – 3′ HDMI Cable",
    category: "camera-support",
    dailyRate: 3,
    weeklyRate: 15,
  },
  {
    id: "3",
    name: "OConnor Standard Legs: Spreader",
    category: "tripods",
    dailyRate: 0,
    weeklyRate: 0,
  },
  {
    id: "4",
    name: "OConnor 2065 Tripod Kit",
    category: "tripods",
    dailyRate: 350,
    weeklyRate: 1400,
  },
  {
    id: "5",
    name: "Telescoping Stirrup w/ Pipe Clamp 2′-4′",
    category: "grip-support",
    dailyRate: 6,
    weeklyRate: 30,
  },
  {
    id: "6",
    name: "Sony MRW-G1 CFexpress Type B/XQD Memory Card Reader",
    category: "media",
    dailyRate: 10,
    weeklyRate: 50,
  },
  {
    id: "7",
    name: "Arri 15.5″: Scrim Bag",
    category: "lighting-modifiers",
    dailyRate: 0,
    weeklyRate: 0,
  },
  {
    id: "8",
    name: "Dell 7700 HD Projector: Case",
    category: "projectors",
    dailyRate: 0,
    weeklyRate: 0,
  },
  {
    id: "9",
    name: "JL Fisher Model 11 Dolly Package",
    category: "dollies",
    dailyRate: 400,
    weeklyRate: 1600,
  },
  {
    id: "10",
    name: "Sachtler Cine 30 Head With Standard Size 150mm Legs",
    category: "tripods",
    dailyRate: 125,
    weeklyRate: 500,
  },
  {
    id: "11",
    name: "Schneider 4 x 5.65″ 0.3 ND Filter Pouch",
    category: "filters",
    dailyRate: 0,
    weeklyRate: 0,
  },
  {
    id: "12",
    name: "Formatt-Hitech 4 x 5.65″ Firecrest ND 1.2 Pouch",
    category: "filters",
    dailyRate: 0,
    weeklyRate: 0,
  },
  {
    id: "13",
    name: "Arri Alexa Mini LF Camera Body",
    category: "camera-bodies",
    dailyRate: 1200,
    weeklyRate: 4800,
  },
  {
    id: "14",
    name: "Canon C300 Mark III Camera Body",
    category: "camera-bodies",
    dailyRate: 450,
    weeklyRate: 1800,
  },
  {
    id: "15",
    name: "Zeiss CP.3 35mm T2.1 Lens",
    category: "camera-lenses",
    dailyRate: 150,
    weeklyRate: 600,
  },
  {
    id: "16",
    name: "Kino Flo Celeb 400 DMX LED Light",
    category: "lights",
    dailyRate: 85,
    weeklyRate: 340,
  },
  {
    id: "17",
    name: "C-Stand with Gobo Arm",
    category: "grip-support",
    dailyRate: 12,
    weeklyRate: 60,
  },
  {
    id: "18",
    name: "Sennheiser MKH 416 Shotgun Microphone",
    category: "audio",
    dailyRate: 45,
    weeklyRate: 180,
  },
];


