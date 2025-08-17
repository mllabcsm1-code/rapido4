export interface User {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  role: 'driver' | 'passenger';
  profile_picture: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Driver {
  driver_id: string;
  user_id: string;
  vehicle_model: string;
  vehicle_number: string;
  license_number: string;
  license_expiry: string;
  rating: number;
  total_trips: number;
  status: 'active' | 'inactive' | 'offline';
  current_lat?: number;
  current_lng?: number;
}

export interface Passenger {
  passenger_id: string;
  user_id: string;
  preferred_payment: 'wallet' | 'card' | 'cash';
}

export interface DriverIntent {
  intent_id: string;
  start_location: string;
  end_location: string;
  start_lat: number;
  start_lng: number;
  end_lat: number;
  end_lng: number;
  start_time: string;
  available_seats: number;
  recurrence: 'one_time' | 'daily' | 'weekly';
  status: 'active' | 'inactive' | 'cancelled';
  created_at: string;
}

export interface RideMatch {
  match_id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  pickup_location: string;
  drop_location: string;
  passengers_count: number;
  requested_time: string;
  driver_name: string;
  passenger_name: string;
  vehicle_model: string;
  vehicle_number: string;
  driver_rating: number;
  estimated_fare: number;
}

export interface Trip {
  trip_id: string;
  status: 'started' | 'in_progress' | 'completed' | 'cancelled';
  start_time: string;
  end_time?: string;
  pickup_location: string;
  dropoff_location: string;
  driver_name?: string;
  passenger_name?: string;
  driver_phone?: string;
  passenger_phone?: string;
  vehicle_model?: string;
  vehicle_number?: string;
  payment_amount: number;
  payment_method: 'wallet' | 'card' | 'cash';
  payment_status: 'pending' | 'paid' | 'refunded';
  total_distance_km?: number;
}

export interface Notification {
  notification_id: string;
  type: 'ride_request' | 'ride_match' | 'trip_update' | 'payment' | 'rating' | 'system';
  status: 'unread' | 'read' | 'archived';
  message: string;
  user_name?: string;
  user_profile?: string;
  created_at: string;
}

export interface Wallet {
  wallet_id: string;
  balance: number;
  currency: string;
}

export interface WalletTransaction {
  transaction_id: string;
  type: 'credit' | 'debit' | 'refund';
  amount: number;
  description: string;
  created_at: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface DriverStats {
  total_trips: number;
  total_earnings: string;
  average_rating: number;
  completed_trips: number;
  cancelled_trips: number;
}

export interface PassengerStats {
  total_trips: number;
  total_spent: string;
  average_rating: string;
  total_rides_this_month: number;
  total_spent_this_month: string;
}