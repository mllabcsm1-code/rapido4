import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Plus,
  MapPin,
  Users,
  Clock,
  RefreshCw,
  DollarSign,
  Phone,
  ArrowLeft,
} from "lucide-react-native";

export default function DriverIntentScreen() {
  const [intents, setIntents] = useState([
    {
      id: 1,
      from: "123 Main St, Anytown",
      to: "456 Oak Ave, Anytown",
      time: "Today, 8:30 AM",
      status: "Active",
      seats: 3,
      recurrence: "Every weekday",
      pickup: "8:25 AM",
      drop: "9:00 AM",
      distance: "5.2 km",
      fare: "$15.50",
      passenger: {
        name: "Jane Doe",
        phone: "+1 (555) 123-4567",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        status: "Match Confirmed",
      },
    },
  ]);

  const handleContact = (passenger: string) => {
    Alert.alert("Contact Passenger", `Calling ${passenger}...`);
  };

  const handleCancel = (id: number) => {
    Alert.alert("Cancel Ride", "Are you sure you want to cancel?", [
      { text: "No" },
      {
        text: "Yes",
        onPress: () => setIntents(intents.filter((i) => i.id !== id)),
      },
    ]);
  };

  const handleAddIntent = () => {
    Alert.alert("New Intent", "Here you can open a modal or navigate to a form.");
  };

  return (
    <LinearGradient colors={["#FFF7ED", "#FFFFFF"]} style={styles.gradient}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Alert.alert("Back pressed!")}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driver Intent</Text>
        <View style={{ width: 22 }} /> 
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {intents.map((intent) => (
          <View key={intent.id} style={styles.card}>
            {/* Route */}
            <View style={styles.routeRow}>
              <MapPin size={20} color="#F97316" />
              <Text style={styles.routeText}>{intent.from}</Text>
            </View>
            <View style={styles.routeRow}>
              <MapPin size={20} color="#F97316" />
              <Text style={styles.routeText}>{intent.to}</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.time}>{intent.time}</Text>
              <View style={styles.statusChip}>
                <Text style={styles.statusText}>{intent.status}</Text>
              </View>
            </View>

            {/* Ride Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ride Details</Text>
              <View style={styles.detailRow}>
                <Users size={18} color="#6B7280" />
                <Text style={styles.detailText}>
                  Available Seats {intent.seats}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <RefreshCw size={18} color="#6B7280" />
                <Text style={styles.detailText}>
                  Recurrence {intent.recurrence}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Clock size={18} color="#6B7280" />
                <Text style={styles.detailText}>Pickup {intent.pickup}</Text>
              </View>
              <View style={styles.detailRow}>
                <Clock size={18} color="#6B7280" />
                <Text style={styles.detailText}>Drop {intent.drop}</Text>
              </View>
              <View style={styles.detailRow}>
                <MapPin size={18} color="#6B7280" />
                <Text style={styles.detailText}>
                  Overlap Distance {intent.distance}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <DollarSign size={18} color="#6B7280" />
                <Text style={styles.detailText}>
                  Estimated Fare {intent.fare}
                </Text>
              </View>
            </View>

            {/* Passenger */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Matched Passenger</Text>
              <View style={styles.passengerRow}>
                <Image
                  source={{ uri: intent.passenger.avatar }}
                  style={styles.avatar}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.passengerName}>
                    {intent.passenger.name}
                  </Text>
                  <Text style={styles.passengerPhone}>
                    {intent.passenger.phone}
                  </Text>
                </View>
                <View style={styles.matchChip}>
                  <Text style={styles.matchText}>
                    {intent.passenger.status}
                  </Text>
                </View>
              </View>
            </View>

            {/* Buttons */}
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => handleContact(intent.passenger.name)}
            >
              <Phone size={18} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.signInText}>Contact Passenger</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleCancel(intent.id)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel Ride</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddIntent}>
        <Plus size={28} color="#fff" />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
  },
  scrollContent: { 
    padding: 24, 
    paddingBottom: 100, 
    alignItems: "center" 
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    width: "100%",
    maxWidth: 380, // keeps cards centered
  },
  routeRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  routeText: { fontSize: 15, marginLeft: 8, color: "#374151", flex: 1 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  time: { fontSize: 13, color: "#6B7280" },
  statusChip: {
    backgroundColor: "#DCFCE7",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: { color: "#15803D", fontWeight: "600", fontSize: 12 },
  section: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  detailRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  detailText: { marginLeft: 8, fontSize: 14, color: "#374151" },
  passengerRow: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  passengerName: { fontSize: 15, fontWeight: "600", color: "#111827" },
  passengerPhone: { fontSize: 13, color: "#6B7280" },
  matchChip: {
    borderWidth: 1,
    borderColor: "#F97316",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  matchText: { color: "#F97316", fontSize: 12, fontWeight: "600" },
  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F97316",
    borderRadius: 6,
    height: 40,
    marginTop: 14,
  },
  signInText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  cancelButton: { alignItems: "center", marginTop: 10 },
  cancelText: { color: "#EF4444", fontSize: 13, fontWeight: "500" },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
  },
});
