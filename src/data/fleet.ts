export interface Vehicle {
  id: string;
  name: string;
  category: string;
  dailyRate: number;
  image: string;
  transmission: string;
  seats: number;
  fuelType: string;
  driveType: string;
  luggageCapacity: string;
  description: string;
  whyWeChoseIt: string;
  limitedAvailability?: boolean;
}

export const vehicles: Vehicle[] = [
  {
    id: "mercedes-amg-gt",
    name: "Mercedes-AMG GT",
    category: "Sports",
    dailyRate: 4500,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
    transmission: "Automatic",
    seats: 2,
    fuelType: "Petrol",
    driveType: "Rear-Wheel Drive",
    luggageCapacity: "2 Medium Bags",
    description: "The Mercedes-AMG GT embodies the essence of driving pleasure with its handcrafted AMG 4.0L V8 biturbo engine and stunning design.",
    whyWeChoseIt: "Pure driving exhilaration meets everyday usability. The AMG GT delivers an unforgettable experience along Cape Town's coastal roads.",
    limitedAvailability: true,
  },
  {
    id: "range-rover-autobiography",
    name: "Range Rover Autobiography",
    category: "Luxury SUV",
    dailyRate: 5500,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop",
    transmission: "Automatic",
    seats: 5,
    fuelType: "Diesel",
    driveType: "All-Wheel Drive",
    luggageCapacity: "4 Large Bags",
    description: "The ultimate expression of luxury and capability, the Range Rover Autobiography offers unparalleled comfort and commanding presence.",
    whyWeChoseIt: "Whether navigating city streets or exploring the Winelands, the Autobiography delivers first-class comfort in any environment.",
  },
  {
    id: "porsche-911-carrera",
    name: "Porsche 911 Carrera S",
    category: "Sports",
    dailyRate: 4800,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    transmission: "PDK Automatic",
    seats: 4,
    fuelType: "Petrol",
    driveType: "Rear-Wheel Drive",
    luggageCapacity: "2 Small Bags",
    description: "An icon of automotive excellence, the 911 Carrera S delivers timeless design with cutting-edge performance technology.",
    whyWeChoseIt: "The 911 is more than a sports car - it's a statement. Perfect for those who appreciate automotive heritage and precision engineering.",
  },
  {
    id: "bentley-continental-gt",
    name: "Bentley Continental GT",
    category: "Grand Tourer",
    dailyRate: 7500,
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070&auto=format&fit=crop",
    transmission: "Automatic",
    seats: 4,
    fuelType: "Petrol",
    driveType: "All-Wheel Drive",
    luggageCapacity: "2 Large Bags",
    description: "Handcrafted luxury meets extraordinary performance. The Continental GT represents the pinnacle of grand touring excellence.",
    whyWeChoseIt: "For special occasions that demand the extraordinary. The Bentley transforms every journey into an unforgettable experience.",
    limitedAvailability: true,
  },
  {
    id: "bmw-x7",
    name: "BMW X7 M50i",
    category: "Luxury SUV",
    dailyRate: 4200,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    transmission: "Automatic",
    seats: 7,
    fuelType: "Petrol",
    driveType: "All-Wheel Drive",
    luggageCapacity: "5 Large Bags",
    description: "The flagship BMW SUV combines commanding presence with seven-seat versatility and M Performance dynamics.",
    whyWeChoseIt: "Ideal for families or groups seeking luxury without compromise. Spacious, powerful, and impeccably appointed.",
  },
  {
    id: "mercedes-s-class",
    name: "Mercedes-Benz S-Class",
    category: "Executive",
    dailyRate: 4000,
    image: "https://images.unsplash.com/photo-1622126807280-9b5b32b28e77?q=80&w=2070&auto=format&fit=crop",
    transmission: "Automatic",
    seats: 5,
    fuelType: "Petrol",
    driveType: "Rear-Wheel Drive",
    luggageCapacity: "3 Large Bags",
    description: "The benchmark for luxury sedans worldwide. The S-Class redefines automotive excellence with its innovative technology and supreme comfort.",
    whyWeChoseIt: "The ultimate executive transport. Perfect for business travel, airport transfers, or when discretion and sophistication are paramount.",
  },
];

export const categories = [...new Set(vehicles.map((v) => v.category))];
