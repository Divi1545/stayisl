// Mock data for development when backend is not available
import { Service } from './types';

export const mockServices: Service[] = [
  {
    id: 1,
    name: 'Luxury Beach Villa - Galle',
    description: 'Experience paradise in this stunning beachfront villa in Galle. Features 4 spacious bedrooms, infinity pool, private beach access, and breathtaking ocean views. Perfect for families or groups seeking a luxurious coastal retreat.',
    type: 'stays',
    basePrice: 450,
    currency: 'USD',
    location: 'Galle, Southern Province',
    images: [
      'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=800',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    ],
    amenities: ['Private Pool', 'Beach Access', 'WiFi', 'Air Conditioning', 'Kitchen', 'Parking'],
    maxCapacity: 8,
    rating: 4.9,
    reviewsCount: 127,
    available: true,
    vendorId: 1,
    businessName: 'Coastal Paradise Villas',
  },
  {
    id: 2,
    name: 'Sigiriya Rock Fortress Day Tour',
    description: 'Embark on an unforgettable journey to the ancient Sigiriya Rock Fortress, a UNESCO World Heritage site. Includes professional guide, entrance fees, and traditional lunch. Learn about Sri Lanka\'s rich history and culture.',
    type: 'tours',
    basePrice: 85,
    currency: 'USD',
    location: 'Sigiriya, Central Province',
    images: [
      'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800',
      'https://images.unsplash.com/photo-1604486707950-ed2e2e59f3e0?w=800',
    ],
    amenities: ['Professional Guide', 'Entrance Fees', 'Lunch Included', 'Hotel Pickup', 'Air-conditioned Vehicle'],
    maxCapacity: 15,
    rating: 4.8,
    reviewsCount: 89,
    available: true,
    vendorId: 2,
    businessName: 'Heritage Tours Lanka',
  },
  {
    id: 3,
    name: 'Luxury SUV with Driver - Colombo',
    description: 'Travel in comfort with our premium SUV rental service including an experienced driver. Perfect for exploring Colombo and surrounding areas. All-inclusive pricing with fuel and insurance covered.',
    type: 'vehicles',
    basePrice: 120,
    currency: 'USD',
    location: 'Colombo',
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    ],
    amenities: ['Professional Driver', 'Fuel Included', 'Insurance', 'WiFi', 'Air Conditioning', 'Child Seats Available'],
    maxCapacity: 6,
    rating: 4.7,
    reviewsCount: 156,
    available: true,
    vendorId: 3,
    businessName: 'Elite Travels',
  },
  {
    id: 4,
    name: 'Ayurveda Wellness Retreat - Kandy',
    description: 'Rejuvenate your mind, body, and soul with our authentic Ayurveda wellness program. Includes daily consultations, personalized treatments, organic meals, and yoga sessions in the peaceful hills of Kandy.',
    type: 'wellness',
    basePrice: 200,
    currency: 'USD',
    location: 'Kandy, Central Province',
    images: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
    ],
    amenities: ['Ayurveda Treatments', 'Yoga Classes', 'Organic Meals', 'Spa Access', 'Meditation Sessions', 'Doctor Consultation'],
    maxCapacity: 2,
    rating: 5.0,
    reviewsCount: 43,
    available: true,
    vendorId: 4,
    businessName: 'Serenity Wellness Center',
  },
  {
    id: 5,
    name: 'Ella Hiking & Tea Plantation Tour',
    description: 'Discover the beauty of Ella with this full-day hiking and tea plantation tour. Visit Little Adam\'s Peak, Nine Arch Bridge, and a working tea factory. Experience stunning mountain views and learn about Ceylon tea production.',
    type: 'tours',
    basePrice: 75,
    currency: 'USD',
    location: 'Ella, Uva Province',
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800',
    ],
    amenities: ['Professional Guide', 'Tea Tasting', 'Lunch', 'Hotel Pickup', 'Bottled Water'],
    maxCapacity: 12,
    rating: 4.9,
    reviewsCount: 201,
    available: true,
    vendorId: 2,
    businessName: 'Heritage Tours Lanka',
  },
  {
    id: 6,
    name: 'Boutique Hotel in Colombo Fort',
    description: 'Stay in the heart of Colombo at our charming boutique hotel. Blend of colonial architecture and modern amenities. Walking distance to major attractions, restaurants, and shopping districts.',
    type: 'stays',
    basePrice: 150,
    currency: 'USD',
    location: 'Colombo Fort, Western Province',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    ],
    amenities: ['WiFi', 'Breakfast Included', 'Rooftop Bar', 'Fitness Center', 'Concierge', 'Airport Transfer'],
    maxCapacity: 2,
    rating: 4.6,
    reviewsCount: 312,
    available: true,
    vendorId: 5,
    businessName: 'Fort Heritage Hotels',
  },
  {
    id: 7,
    name: 'Whale Watching Tour - Mirissa',
    description: 'Witness the majestic blue whales and playful dolphins on this unforgettable whale watching tour from Mirissa. Early morning departure for the best sightings. Includes breakfast and experienced marine biologist guide.',
    type: 'tours',
    basePrice: 95,
    currency: 'USD',
    location: 'Mirissa, Southern Province',
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
    amenities: ['Marine Biologist Guide', 'Breakfast', 'Life Jackets', 'Binoculars', 'Hotel Pickup'],
    maxCapacity: 20,
    rating: 4.8,
    reviewsCount: 178,
    available: true,
    vendorId: 6,
    businessName: 'Ocean Adventures Lanka',
  },
  {
    id: 8,
    name: 'Luxury Sedan with Driver',
    description: 'Premium sedan car rental with professional chauffeur service. Ideal for business trips, airport transfers, or comfortable city tours. Flexible hourly or daily rates available.',
    type: 'vehicles',
    basePrice: 80,
    currency: 'USD',
    location: 'Colombo',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    ],
    amenities: ['Professional Driver', 'Fuel Included', 'Insurance', 'WiFi', 'Air Conditioning'],
    maxCapacity: 4,
    rating: 4.7,
    reviewsCount: 94,
    available: true,
    vendorId: 3,
    businessName: 'Elite Travels',
  },
];

// Function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const getMockServices = async (): Promise<Service[]> => {
  await delay(500); // Simulate network delay
  return mockServices;
};

export const getMockService = async (id: number): Promise<Service | null> => {
  await delay(300);
  return mockServices.find(s => s.id === id) || null;
};

export const searchMockServices = async (filters: any): Promise<Service[]> => {
  await delay(400);
  let filtered = [...mockServices];

  if (filters.type) {
    filtered = filtered.filter(s => s.type === filters.type);
  }
  if (filters.location) {
    filtered = filtered.filter(s => 
      s.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(s => s.basePrice >= filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(s => s.basePrice <= filters.maxPrice);
  }

  return filtered;
};


