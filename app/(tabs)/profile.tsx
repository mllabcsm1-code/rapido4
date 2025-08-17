import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Alert, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, CreditCard as Edit3, Car, Star, TrendingUp, Wallet, Bell, Settings, LogOut, Shield, CircleHelp as HelpCircle } from 'lucide-react-native';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { mockDriverStats, mockPassengerStats } from '@/data/mockData';

export default function Profile() {
  const { user, driver, passenger, logout, switchRole } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'This would open the profile editing screen');
  };

  const handleSwitchRole = () => {
    const newRole = user?.role === 'driver' ? 'passenger' : 'driver';
    Alert.alert(
      'Switch Mode',
      `Switch to ${newRole} mode?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Switch',
          onPress: () => {
            switchRole(newRole);
            Alert.alert('Success', `Switched to ${newRole} mode`);
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout
        }
      ]
    );
  };

  if (!user) return null;

  const stats = user.role === 'driver' ? mockDriverStats : mockPassengerStats;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: user.profile_picture }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Edit3 size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
          
          <View style={styles.roleContainer}>
            <View style={[styles.roleBadge, user.role === 'driver' ? styles.driverBadge : styles.passengerBadge]}>
              <Text style={styles.roleBadgeText}>
                {user.role === 'driver' ? '🚗 Driver' : '👤 Passenger'}
              </Text>
            </View>
            {user.is_verified && (
              <View style={styles.verifiedBadge}>
                <Shield size={16} color="#10B981" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>

          <Button
            title={`Switch to ${user.role === 'driver' ? 'Passenger' : 'Driver'} Mode`}
            onPress={handleSwitchRole}
            variant="outline"
            size="small"
            style={styles.switchButton}
          />
        </Card>

        {/* Statistics */}
        <Card style={styles.statsCard}>
          <Text style={styles.cardTitle}>Your Stats</Text>
          {user.role === 'driver' ? (
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#EBF5FF' }]}>
                  <Car size={20} color="#3B82F6" />
                </View>
                <Text style={styles.statValue}>{stats.total_trips}</Text>
                <Text style={styles.statLabel}>Total Trips</Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#D1FAE5' }]}>
                  <TrendingUp size={20} color="#10B981" />
                </View>
                <Text style={styles.statValue}>₹{stats.total_earnings}</Text>
                <Text style={styles.statLabel}>Total Earnings</Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#FEF3C7' }]}>
                  <Star size={20} color="#F59E0B" />
                </View>
                <Text style={styles.statValue}>{stats.average_rating}</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>
          ) : (
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#EBF5FF' }]}>
                  <Car size={20} color="#3B82F6" />
                </View>
                <Text style={styles.statValue}>{stats.total_trips}</Text>
                <Text style={styles.statLabel}>Total Trips</Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#D1FAE5' }]}>
                  <Wallet size={20} color="#10B981" />
                </View>
                <Text style={styles.statValue}>₹{stats.total_spent}</Text>
                <Text style={styles.statLabel}>Total Spent</Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#FEF3C7' }]}>
                  <Star size={20} color="#F59E0B" />
                </View>
                <Text style={styles.statValue}>{stats.average_rating}</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>
          )}
        </Card>

        {/* Driver Details */}
        {user.role === 'driver' && driver && (
          <Card style={styles.driverCard}>
            <Text style={styles.cardTitle}>Vehicle Information</Text>
            <View style={styles.driverDetails}>
              <View style={styles.driverDetailItem}>
                <Text style={styles.driverDetailLabel}>Vehicle Model</Text>
                <Text style={styles.driverDetailValue}>{driver.vehicle_model}</Text>
              </View>
              <View style={styles.driverDetailItem}>
                <Text style={styles.driverDetailLabel}>Vehicle Number</Text>
                <Text style={styles.driverDetailValue}>{driver.vehicle_number}</Text>
              </View>
              <View style={styles.driverDetailItem}>
                <Text style={styles.driverDetailLabel}>License Number</Text>
                <Text style={styles.driverDetailValue}>{driver.license_number}</Text>
              </View>
              <View style={styles.driverDetailItem}>
                <Text style={styles.driverDetailLabel}>License Expiry</Text>
                <Text style={styles.driverDetailValue}>
                  {new Date(driver.license_expiry).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </Card>
        )}

        {/* Settings */}
        <Card style={styles.settingsCard}>
          <Text style={styles.cardTitle}>Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Bell size={20} color="#6B7280" />
              <Text style={styles.settingText}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Settings size={20} color="#6B7280" />
              <Text style={styles.settingText}>App Settings</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <HelpCircle size={20} color="#6B7280" />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
            <View style={styles.settingLeft}>
              <LogOut size={20} color="#EF4444" />
              <Text style={[styles.settingText, { color: '#EF4444' }]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </Card>

        {/* App Info */}
        <Card style={styles.infoCard}>
          <Text style={styles.infoText}>RideShare App v1.0.0</Text>
          <Text style={styles.infoSubtext}>Made with ❤️ for seamless ride sharing</Text>
        </Card>
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
    paddingTop: 16,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileHeader: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
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
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    gap: 4,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
  },
  switchButton: {
    marginTop: 8,
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
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  driverCard: {
    marginBottom: 16,
  },
  driverDetails: {
    gap: 12,
  },
  driverDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverDetailLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  driverDetailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  settingsCard: {
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#374151',
  },
  infoCard: {
    alignItems: 'center',
    marginBottom: 32,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});