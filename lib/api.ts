// API client for vendor backend
import { Service, BookingData, SearchFilters } from './types';
import { getMockServices, getMockService, searchMockServices } from './mock-data';

const VENDOR_API_URL = process.env.NEXT_PUBLIC_VENDOR_API_URL || 'https://www.islandloafvendor.com';
const VENDOR_API_KEY = process.env.VENDOR_API_KEY || '';
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  ...(VENDOR_API_KEY && { 'Authorization': `Bearer ${VENDOR_API_KEY}` }),
});

export class VendorAPI {
  // Fetch all services
  static async getServices(): Promise<Service[]> {
    // Use mock data if enabled or if API fails
    if (USE_MOCK_DATA) {
      console.log('Using mock data for services');
      return getMockServices();
    }

    try {
      const response = await fetch(`${VENDOR_API_URL}/api/public/services`, {
        cache: 'no-store',
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        console.warn('API failed, falling back to mock data');
        return getMockServices();
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching services, using mock data:', error);
      return getMockServices();
    }
  }

  // Get single service by ID
  static async getService(id: number): Promise<Service | null> {
    // Use mock data if enabled or if API fails
    if (USE_MOCK_DATA) {
      return getMockService(id);
    }

    try {
      const response = await fetch(`${VENDOR_API_URL}/api/public/services/${id}`, {
        cache: 'no-store',
      });
      
      if (!response.ok) {
        console.warn('API failed, falling back to mock data');
        return getMockService(id);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching service, using mock data:', error);
      return getMockService(id);
    }
  }

  // Search services
  static async searchServices(filters: SearchFilters): Promise<Service[]> {
    // Use mock data if enabled or if API fails
    if (USE_MOCK_DATA) {
      return searchMockServices(filters);
    }

    try {
      const params = new URLSearchParams();
      
      if (filters.type) params.append('type', filters.type);
      if (filters.location) params.append('location', filters.location);
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.guests) params.append('guests', filters.guests.toString());
      
      const response = await fetch(
        `${VENDOR_API_URL}/api/public/search?${params.toString()}`,
        { cache: 'no-store' }
      );
      
      if (!response.ok) {
        console.warn('API failed, falling back to mock data');
        return searchMockServices(filters);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error searching services, using mock data:', error);
      return searchMockServices(filters);
    }
  }

  // Check availability
  static async checkAvailability(
    serviceId: number,
    startDate: string,
    endDate: string
  ): Promise<boolean> {
    try {
      const params = new URLSearchParams({
        serviceId: serviceId.toString(),
        startDate,
        endDate,
      });
      
      const response = await fetch(
        `${VENDOR_API_URL}/api/public/availability?${params.toString()}`,
        { cache: 'no-store' }
      );
      
      if (!response.ok) {
        throw new Error('Failed to check availability');
      }
      
      const data = await response.json();
      return data.available;
    } catch (error) {
      console.error('Error checking availability:', error);
      return false;
    }
  }

  // Create booking
  static async createBooking(bookingData: Partial<BookingData>): Promise<any> {
    try {
      const response = await fetch(`${VENDOR_API_URL}/api/public/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create booking');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  // Confirm booking after payment
  static async confirmBooking(
    stripeSessionId: string,
    paymentIntentId: string
  ): Promise<any> {
    try {
      const response = await fetch(`${VENDOR_API_URL}/api/public/bookings/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stripeSessionId,
          status: 'confirmed',
          paymentStatus: 'paid',
          stripePaymentIntentId: paymentIntentId,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to confirm booking');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error confirming booking:', error);
      throw error;
    }
  }

  // Get booking by reference
  static async getBooking(email: string, reference: string): Promise<any> {
    try {
      const params = new URLSearchParams({ email, reference });
      
      const response = await fetch(
        `${VENDOR_API_URL}/api/public/bookings/lookup?${params.toString()}`,
        { cache: 'no-store' }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch booking');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching booking:', error);
      return null;
    }
  }
}

