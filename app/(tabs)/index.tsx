import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Car, MapPin, Clock, Star, TrendingUp, Users, Wallet as WalletIcon } from 'lucide-react-native';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { mockDriverStats, mockPassengerStats, mockTrips, mockRideMatches } from '@/data/mockData';

export default function Home() {
  const { user, driver, passenger } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (!user) return null;

  const renderDriverDashboard = () => (
    <>
      {/* Driver Stats */}
      <Card style={styles.statsCard}>
        <Text style={styles.cardTitle}>Today's Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#EBF5FF' }]}>
              <TrendingUp size={24} color="#3B82F6" />
            </View>
            <Text style={styles.statValue}>₹{mockDriverStats.total_earnings}</Text>
            <Text style={styles.statLabel}>Total Earnings</Text>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#F0FDF4' }]}>
              <Car size={24} color="#10B981" />
            </View>
            <Text style={styles.statValue}>{mockDriverStats.total_trips}</Text>
            <Text style={styles.statLabel}>Total Trips</Text>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#FFF7ED' }]}>
              <Star size={24} color="#F97316" />
            </View>
            <Text style={styles.statValue}>{mockDriverStats.average_rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </Card>

      {/* Active Matches */}
      <Card style={styles.section}>
        <Text style={styles.cardTitle}>Pending Matches</Text>
        {mockRideMatches.filter(match => match.status === 'pending').length > 0 ? (
          mockRideMatches
            .filter(match => match.status === 'pending')
            .slice(0, 2)
            .map((match) => (
              <View key={match.match_id} style={styles.matchItem}>
                <View style={styles.matchHeader}>
                  <View style={styles.passengerInfo}>
                    <View style={styles.avatar}>
                      <Users size={20} color="#6B7280" />
                    </View>
                    <View>
                      <Text style={styles.passengerName}>{match.passenger_name}</Text>
                      <Text style={styles.passengerCount}>{match.passengers_count} passenger(s)</Text>
                    </View>
                  </View>
                  <Text style={styles.fareAmount}>₹{match.estimated_fare}</Text>
                </View>
                <View style={styles.routeInfo}>
                  <MapPin size={16} color="#10B981" />
                  <Text style={styles.routeText}>{match.pickup_location}</Text>
                </View>
                <View style={styles.routeInfo}>
                  <MapPin size={16} color="#EF4444" />
                  <Text style={styles.routeText}>{match.drop_location}</Text>
                </View>
                <View style={styles.matchActions}>
                  <Button
                    title="Accept"
                    onPress={() => {}}
                    variant="primary"
                    size="small"
                    style={styles.actionButton}
                  />
                  <Button
                    title="Decline"
                    onPress={() => {}}
                    variant="outline"
                    size="small"
                    style={styles.actionButton}
                  />
                </View>
              </View>
            ))
        ) : (
          <Text style={styles.emptyText}>No pending matches</Text>
        )}
      </Card>

      {/* Recent Trips */}
      <Card style={styles.section}>
        <Text style={styles.cardTitle}>Recent Trips</Text>
        {mockTrips.slice(0, 3).map((trip) => (
          <View key={trip.trip_id} style={styles.tripItem}>
            <View style={styles.tripHeader}>
              <Text style={styles.tripPassenger}>{trip.passenger_name}</Text>
              <View style={[styles.statusBadge, getStatusBadgeStyle(trip.status)]}>
                <Text style={[styles.statusText, getStatusTextStyle(trip.status)]}>
                  {trip.status.replace('_', ' ')}
                </Text>
              </View>
            </View>
            <Text style={styles.tripRoute}>
              {trip.pickup_location} → {trip.dropoff_location}
            </Text>
            <View style={styles.tripFooter}>
              <Text style={styles.tripDate}>
                {new Date(trip.start_time).toLocaleDateString()}
              </Text>
              <Text style={styles.tripAmount}>₹{trip.payment_amount}</Text>
            </View>
          </View>
        ))}
      </Card>
    </>
  );

  const renderPassengerDashboard = () => (
    <>
      {/* Quick Actions */}
      <Card style={styles.quickActions}>
        <Button
          title="Book a Ride"
          onPress={() => {}}
          variant="primary"
          size="large"
          style={styles.bookRideButton}
        />
      </Card>

      {/* Passenger Stats */}
      <Card style={styles.statsCard}>
        <Text style={styles.cardTitle}>Your Activity</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#EBF5FF' }]}>
              <Car size={24} color="#3B82F6" />
            </View>
            <Text style={styles.statValue}>{mockPassengerStats.total_trips}</Text>
            <Text style={styles.statLabel}>Total Trips</Text>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#F0FDF4' }]}>
              <WalletIcon size={24} color="#10B981" />
            </View>
            <Text style={styles.statValue}>₹{mockPassengerStats.total_spent}</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#FFF7ED' }]}>
              <Star size={24} color="#F97316" />
            </View>
            <Text style={styles.statValue}>{mockPassengerStats.average_rating}</Text>
            <Text style={styles.statLabel}>Your Rating</Text>
          </View>
        </View>
      </Card>

      {/* Available Matches */}
      <Card style={styles.section}>
        <Text style={styles.cardTitle}>Available Rides</Text>
        {mockRideMatches.slice(0, 2).map((match) => (
          <View key={match.match_id} style={styles.matchItem}>
            <View style={styles.matchHeader}>
              <View style={styles.driverInfo}>
                <View style={styles.avatar}>
                  <Car size={20} color="#6B7280" />
                </View>
                <View>
                  <Text style={styles.driverName}>{match.driver_name}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#F59E0B" />
                    <Text style={styles.ratingText}>{match.driver_rating}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.fareAmount}>₹{match.estimated_fare}</Text>
            </View>
            <Text style={styles.vehicleInfo}>{match.vehicle_model} • {match.vehicle_number}</Text>
            <View style={styles.routeInfo}>
              <MapPin size={16} color="#10B981" />
              <Text style={styles.routeText}>{match.pickup_location}</Text>
            </View>
            <View style={styles.routeInfo}>
              <MapPin size={16} color="#EF4444" />
              <Text style={styles.routeText}>{match.drop_location}</Text>
            </View>
            <Button
              title="Book This Ride"
              onPress={() => {}}
              variant="primary"
              size="small"
              style={styles.bookButton}
            />
          </View>
        ))}
      </Card>
    </>
  );

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return { backgroundColor: '#D1FAE5' };
      case 'in_progress':
        return { backgroundColor: '#DBEAFE' };
      case 'cancelled':
        return { backgroundColor: '#FEE2E2' };
      default:
        return { backgroundColor: '#F3F4F6' };
    }
  };

  const getStatusTextStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return { color: '#065F46' };
      case 'in_progress':
        return { color: '#1E40AF' };
      case 'cancelled':
        return { color: '#991B1B' };
      default:
        return { color: '#374151' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {new Date().getHours() < 12 ? 'Good Morning' : 
               new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening'}
            </Text>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
          <TouchableOpacity style={styles.profilePicture}>
            <Image
              source={{ uri: user.profile_picture }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Role Badge */}
        <View style={[styles.roleBadge, user.role === 'driver' ? styles.driverBadge : styles.passengerBadge]}>
          <Text style={styles.roleBadgeText}>
            {user.role === 'driver' ? '🚗 Driver Mode' : '👤 Passenger Mode'}
          </Text>
        </View>

        {user.role === 'driver' ? renderDriverDashboard() : renderPassengerDashboard()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  profilePicture: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  driverBadge: {
    backgroundColor: '#DBEAFE',
  },
  passengerBadge: {
    backgroundColor: '#D1FAE5',
  },
  roleBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  quickActions: {
    marginBottom: 16,
  },
  bookRideButton: {
    marginVertical: 8,
  },
  statsCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  matchItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  passengerCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  fareAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
  matchActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 8,
  },
  actionButton: {
    minWidth: 80,
  },
  bookButton: {
    marginTop: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 20,
  },
  tripItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  tripPassenger: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  tripRoute: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  tripAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
});