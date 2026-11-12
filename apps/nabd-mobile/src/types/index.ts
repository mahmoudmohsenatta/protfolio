export type Lang = 'en' | 'ar';
export type Localized = { en: string; ar: string };

export type CategoryId = 'fitness' | 'wellness' | 'sports' | 'music' | 'arts' | 'entertainment';
export type City = 'riyadh' | 'jeddah';
export type Level = 'beginner' | 'intermediate' | 'advanced' | 'allLevels';
export type Vibe = 'calm' | 'energetic' | 'social' | 'creative';

export interface Venue {
  id: string;
  name: Localized;
  district: Localized;
  city: City;
  lat: number;
  lng: number;
}

export interface Activity {
  id: string;
  title: Localized;
  description: Localized;
  category: CategoryId;
  venueId: string;
  credits: number;
  durationMin: number;
  level: Level;
  rating: number;
  reviews: number;
  womenOnly?: boolean;
  family?: boolean;
  vibe: Vibe[];
  /** Daily start times, "HH:mm" (24h). */
  times: string[];
  /** Days of week the class runs (0 = Sunday). */
  days: number[];
  capacity: number;
  icon: string;
}

export interface Slot {
  activityId: string;
  start: string; // ISO
  spotsLeft: number;
}

export type BookingStatus = 'confirmed' | 'checkedIn' | 'cancelled';

export interface Booking {
  id: string;
  code: string;
  activityId: string;
  start: string; // ISO
  credits: number;
  status: BookingStatus;
  createdAt: string;
  checkedInAt?: string;
  reminderId?: string;
}

export type TxType = 'plan' | 'topUp' | 'booking' | 'refund';

export interface Transaction {
  id: string;
  type: TxType;
  credits: number; // + added, - spent
  amountSar?: number;
  ref?: string; // plan id or activity id
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: Localized;
  body: Localized;
  createdAt: string;
  read: boolean;
  icon: string;
  href?: string;
}

export type PlanId = 'starter' | 'active' | 'pro';

export interface Plan {
  id: PlanId;
  credits: number;
  priceSar: number;
  rollover: number;
  bookAheadDays: number;
  perks: ('friend' | 'priority')[];
  popular?: boolean;
}

export interface TopUp {
  id: string;
  credits: number;
  priceSar: number;
}

