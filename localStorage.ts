// Local storage utilities for persisting data without backend

const STORAGE_KEYS = {
  MESS_MENUS: 'campus_mess_menus',
  LOST_FOUND: 'campus_lost_found',
  MARKETPLACE: 'campus_marketplace',
  TRAVEL_TRIPS: 'campus_travel_trips',
  PLACES: 'campus_places',
  TIMETABLES: 'campus_timetables',
};

export function getFromStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export const storage = {
  // Mess Menus
  getMessMenus: () => getFromStorage<Record<string, any>>(STORAGE_KEYS.MESS_MENUS) || {},
  saveMessMenus: (menus: Record<string, any>) => saveToStorage(STORAGE_KEYS.MESS_MENUS, menus),

  // Lost & Found
  getLostFoundPosts: () => getFromStorage<any[]>(STORAGE_KEYS.LOST_FOUND) || [],
  saveLostFoundPosts: (posts: any[]) => saveToStorage(STORAGE_KEYS.LOST_FOUND, posts),

  // Marketplace
  getMarketplaceListings: () => getFromStorage<any[]>(STORAGE_KEYS.MARKETPLACE) || [],
  saveMarketplaceListings: (listings: any[]) => saveToStorage(STORAGE_KEYS.MARKETPLACE, listings),

  // Travel Trips
  getTravelTrips: () => getFromStorage<any[]>(STORAGE_KEYS.TRAVEL_TRIPS) || [],
  saveTravelTrips: (trips: any[]) => saveToStorage(STORAGE_KEYS.TRAVEL_TRIPS, trips),

  // Places
  getPlaces: () => getFromStorage<any[]>(STORAGE_KEYS.PLACES) || [],
  savePlaces: (places: any[]) => saveToStorage(STORAGE_KEYS.PLACES, places),

  // Timetables
  getTimetables: () => getFromStorage<Record<string, any[]>>(STORAGE_KEYS.TIMETABLES) || {},
  saveTimetables: (timetables: Record<string, any[]>) => saveToStorage(STORAGE_KEYS.TIMETABLES, timetables),
};
