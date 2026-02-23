// TypeScript types for the application

export interface Service {
  id: number;
  name: string;
  description: string;
  type: 'stays' | 'tours' | 'vehicles' | 'wellness' | 'tickets' | 'products';
  basePrice: number;
  currency: string;
  location: string;
  images: string[];
  amenities: string[];
  maxCapacity: number;
  rating: number;
  reviewsCount: number;
  available: boolean;
  vendorId: number;
  businessName: string;
}

export interface BookingData {
  serviceId: number;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  startDate: string;
  endDate: string;
  guestsCount: number;
  totalPrice: number;
  specialRequests?: string;
  stripeSessionId?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface SearchFilters {
  type?: Service['type'];
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
  guests?: number;
  amenities?: string[];
}

export interface Package {
  services: Service[];
  totalPrice: number;
  discount?: number;
  startDate: string;
  endDate: string;
}

