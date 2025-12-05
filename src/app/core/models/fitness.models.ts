// src/app/core/models/booking.models.ts

export interface FitnessClass {
  id: string;
  cover_image: string | null;
  name: string;
  description: string;
  genre: string;
  base_price: string;
  default_duration_minutes: number;
  capacity: number;
  instructors: Instructor[];
  additional_notes: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;

  upcoming_sessions?: ClassSession[];
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  instagram_link: string;
  profile_image: string | null;
}

export interface ClassSession {
  id: string;

  /**
   * On most endpoints this will be a string id.
   * On the /my-bookings/ endpoint (and possibly others) this can be the full FitnessClass object.
   */
  fitness_class: string | FitnessClass;

  date: string;
  start_time: string;
  end_time: string;
  status: 'scheduled' | 'cancelled';
  created_at: string;
  capacity_override: number | null;
  price_override: string | null;
  capacity_effective: number;
  price_effective: string;
  spaces_left: number;
  created_from_rule: string | null;
}

export interface Booking {
  id: string;

  /**
   * Some endpoints may only send this (e.g. simple booking representations).
   * The /my-bookings/ endpoint may omit this and instead send a full class_session.
   */
  class_session_id?: string;

  status: 'booked' | 'cancelled' | 'no_show';
  payment_status: 'included' | 'pending' | 'paid' | 'void';
  attendance_status: 'unknown' | 'present' | 'absent' | 'no_show';

  created_at: string;

  /**
   * When returned by /my-bookings/, this will be populated and
   * class_session.fitness_class will be the full FitnessClass object.
   */
  class_session?: ClassSession & {
    fitness_class: FitnessClass;
  };

  /**
   * Optional convenience in case any endpoint flattens the fitness class
   * directly onto the booking.
   */
  fitness_class?: FitnessClass;
}

// Convenience types for the UI

export interface FitnessClassWithNextSession extends FitnessClass {
  next_session: ClassSession | null;
}

export interface BookingWithDetails extends Booking {
  // In UI code that uses this type, we assume these are present.
  class_session: ClassSession & {
    fitness_class: FitnessClass;
  };
  fitness_class?: FitnessClass;
}

export interface BookSessionResponse {
  booking: Booking;
  message?: string;
}
