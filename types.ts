// Local type definitions for frontend data structures
// Since backend is empty, we define types here for local state management

export interface MessMenu {
  date: bigint;
  breakfast: string[];
  lunch: string[];
  dinner: string[];
}

export interface LostFoundPost {
  id: string;
  title: string;
  description: string;
  timestamp: bigint;
  isFound: boolean;
}

export interface MarketplaceListing {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  timestamp: bigint;
  isForSale: boolean;
}

export interface TravelTrip {
  id: string;
  origin: string;
  destination: string;
  timestamp: bigint;
  participants: string[];
}

export interface Place {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  reviews: PlaceReview[];
}

export interface PlaceReview {
  userId: string;
  rating: number;
  comment: string;
}

export enum DayOfWeek {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export interface TimetableEntry {
  id: string;
  courseName: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  location: string;
}
