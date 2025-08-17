import { User, Driver, Passenger, DriverIntent, RideMatch, Trip, Notification, Wallet, WalletTransaction, DriverStats, PassengerStats } from '@/types/api';

// Mock current user - can be switched between driver and passenger
export const mockCurrentUser: User = {
  user_id: '8d3a0a4f-32a7-4b19-a82b-26c4e9a54f13',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+919876543210',
  role: 'driver', // Change this to 'passenger' to test passenger interface
  profile_picture: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
  is_verified: true,
  created_at: '2025-07-01T12:00:00Z',
  updated_at: '2025-08-01T12:00:00Z'
};

export const mockDriver: Driver = {
  driver_id: '9a7fbc3c-4d12-47b1-b6fc-28734a88e7e1',
  user_id: '8d3a0a4f-32a7-4b19-a82b-26c4e9a54f13',
  vehicle_model: 'Toyota Innova',
  vehicle_number: 'KA05AB1234',
  license_number: 'DL-2025-XYZ123',
  license_expiry: '2026-12-31T00:00:00.000Z',
  rating: 4.8,
  total_trips: 145,
  status: 'active',
  current_lat: 12.9716,
  current_lng: 77.5946
};

export const mockPassenger: Passenger = {
  passenger_id: 'p123-456-789',
  user_id: '8d3a0a4f-32a7-4b19-a82b-26c4e9a54f13',
  preferred_payment: 'wallet'
};

export const mockDriverIntents: DriverIntent[] = [
  {
    intent_id: 'intent-1',
    start_location: 'MG Road, Bangalore',
    end_location: 'Whitefield, Bangalore',
    start_lat: 12.9716,
    start_lng: 77.5946,
    end_lat: 12.9698,
    end_lng: 77.7499,
    start_time: '2025-08-20T10:00:00Z',
    available_seats: 3,
    recurrence: 'one_time',
    status: 'active',
    created_at: '2025-08-17T10:00:00Z'
  },
  {
    intent_id: 'intent-2',
    start_location: 'Koramangala, Bangalore',
    end_location: 'Electronic City, Bangalore',
    start_lat: 12.9279,
    start_lng: 77.6271,
    end_lat: 12.8456,
    end_lng: 77.6603,
    start_time: '2025-08-21T09:30:00Z',
    available_seats: 2,
    recurrence: 'daily',
    status: 'active',
    created_at: '2025-08-17T11:00:00Z'
  }
];

export const mockRideMatches: RideMatch[] = [
  {
    match_id: 'match-1',
    status: 'pending',
    pickup_location: 'Indiranagar, Bangalore',
    drop_location: 'Whitefield, Bangalore',
    passengers_count: 2,
    requested_time: '2025-08-20T10:15:00Z',
    driver_name: 'John Doe',
    passenger_name: 'Alice Johnson',
    vehicle_model: 'Toyota Innova',
    vehicle_number: 'KA05AB1234',
    driver_rating: 4.8,
    estimated_fare: 250.50
  },
  {
    match_id: 'match-2',
    status: 'accepted',
    pickup_location: 'BTM Layout, Bangalore',
    drop_location: 'Electronic City, Bangalore',
    passengers_count: 1,
    requested_time: '2025-08-21T09:45:00Z',
    driver_name: 'John Doe',
    passenger_name: 'Bob Smith',
    vehicle_model: 'Toyota Innova',
    vehicle_number: 'KA05AB1234',
    driver_rating: 4.8,
    estimated_fare: 180.00
  }
];

export const mockTrips: Trip[] = [
  {
    trip_id: 'trip-1',
    status: 'completed',
    start_time: '2025-08-15T10:00:00Z',
    end_time: '2025-08-15T10:30:00Z',
    pickup_location: 'MG Road, Bangalore',
    dropoff_location: 'Whitefield, Bangalore',
    driver_name: 'John Doe',
    passenger_name: 'Sarah Wilson',
    driver_phone: '+919876543210',
    passenger_phone: '+919876543211',
    vehicle_model: 'Toyota Innova',
    vehicle_number: 'KA05AB1234',
    payment_amount: 280.50,
    payment_method: 'wallet',
    payment_status: 'paid',
    total_distance_km: 18.5
  },
  {
    trip_id: 'trip-2',
    status: 'completed',
    start_time: '2025-08-14T14:30:00Z',
    end_time: '2025-08-14T15:15:00Z',
    pickup_location: 'Koramangala, Bangalore',
    dropoff_location: 'Electronic City, Bangalore',
    driver_name: 'John Doe',
    passenger_name: 'Mike Johnson',
    driver_phone: '+919876543210',
    passenger_phone: '+919876543212',
    vehicle_model: 'Toyota Innova',
    vehicle_number: 'KA05AB1234',
    payment_amount: 220.00,
    payment_method: 'card',
    payment_status: 'paid',
    total_distance_km: 14.2
  },
  {
    trip_id: 'trip-3',
    status: 'in_progress',
    start_time: '2025-08-17T16:00:00Z',
    pickup_location: 'HSR Layout, Bangalore',
    dropoff_location: 'Airport, Bangalore',
    driver_name: 'John Doe',
    passenger_name: 'Lisa Chen',
    driver_phone: '+919876543210',
    passenger_phone: '+919876543213',
    vehicle_model: 'Toyota Innova',
    vehicle_number: 'KA05AB1234',
    payment_amount: 450.00,
    payment_method: 'wallet',
    payment_status: 'pending'
  }
];

export const mockNotifications: Notification[] = [
  {
    notification_id: 'notif-1',
    type: 'ride_request',
    status: 'unread',
    message: 'You have a new ride request from Alice Johnson',
    user_name: 'Alice Johnson',
    user_profile: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    created_at: '2025-08-17T12:30:00Z'
  },
  {
    notification_id: 'notif-2',
    type: 'payment',
    status: 'unread',
    message: 'Payment of ₹280.50 received from Sarah Wilson',
    user_name: 'Sarah Wilson',
    user_profile: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    created_at: '2025-08-17T11:45:00Z'
  },
  {
    notification_id: 'notif-3',
    type: 'rating',
    status: 'read',
    message: 'You received a 5-star rating from Mike Johnson',
    user_name: 'Mike Johnson',
    user_profile: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    created_at: '2025-08-16T18:20:00Z'
  }
];

export const mockWallet: Wallet = {
  wallet_id: 'wallet-1',
  balance: 1250.75,
  currency: 'INR'
};

export const mockWalletTransactions: WalletTransaction[] = [
  {
    transaction_id: 'txn-1',
    type: 'credit',
    amount: 500.00,
    description: 'Money added via UPI',
    created_at: '2025-08-17T09:00:00Z',
    status: 'completed'
  },
  {
    transaction_id: 'txn-2',
    type: 'debit',
    amount: 280.50,
    description: 'Trip payment to Sarah Wilson',
    created_at: '2025-08-15T10:30:00Z',
    status: 'completed'
  },
  {
    transaction_id: 'txn-3',
    type: 'credit',
    amount: 220.00,
    description: 'Trip earning from Mike Johnson',
    created_at: '2025-08-14T15:15:00Z',
    status: 'completed'
  },
  {
    transaction_id: 'txn-4',
    type: 'refund',
    amount: 150.00,
    description: 'Refund for cancelled trip',
    created_at: '2025-08-13T16:45:00Z',
    status: 'completed'
  }
];

export const mockDriverStats: DriverStats = {
  total_trips: 145,
  total_earnings: '24,580.50',
  average_rating: 4.8,
  completed_trips: 140,
  cancelled_trips: 5
};

export const mockPassengerStats: PassengerStats = {
  total_trips: 28,
  total_spent: '4,250.75',
  average_rating: '4.9',
  total_rides_this_month: 6,
  total_spent_this_month: '850.25'
};