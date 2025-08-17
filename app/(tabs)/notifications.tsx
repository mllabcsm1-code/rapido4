import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Bell, Info, Gift, AlertTriangle, Check } from "lucide-react-native";

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Alice Johnson",
      message: 'commented on your latest post: "Great insights!"',
      time: "2 hours ago",
      type: "user",
      unread: true,
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: 2,
      title: "System Update",
      message: "Your account security settings have been updated.",
      time: "5 hours ago",
      type: "system",
      unread: true,
      avatar: null,
    },
    {
      id: 3,
      title: "Bob Williams",
      message: "started following you.",
      time: "1 day ago",
      type: "user",
      unread: false,
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: 4,
      title: "Promo Team",
      message: "Get 20% off your next purchase this week only!",
      time: "2 days ago",
      type: "promo",
      unread: true,
      avatar: null,
    },
    {
      id: 5,
      title: "App Notification",
      message: "Scheduled maintenance from 2 AM to 4 AM tonight.",
      time: "3 days ago",
      type: "system",
      unread: false,
      avatar: null,
    },
    {
      id: 6,
      title: "Charlie Brown",
      message: "sent you a new message in chat.",
      time: "4 days ago",
      type: "user",
      unread: false,
      avatar: "https://i.pravatar.cc/100?img=7",
    },
  ]);

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "system":
        return <Info size={20} color="#6B7280" />;
      case "promo":
        return <Gift size={20} color="#6B7280" />;
      case "alert":
        return <AlertTriangle size={20} color="#6B7280" />;
      default:
        return <Bell size={20} color="#6B7280" />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Bell size={22} color="#374151" style={styles.headerIcon} />
      </View>

      {/* Mark all as read */}
      <TouchableOpacity
        style={styles.markAllButton}
        onPress={handleMarkAllAsRead}
      >
        <Text style={styles.markAllText}>Mark All as Read</Text>
      </TouchableOpacity>

      {/* Notification list */}
      <ScrollView style={styles.list}>
        {notifications.map((n) => (
          <View key={n.id} style={styles.card}>
            {/* unread dot */}
            {n.unread && <View style={styles.unreadDot} />}

            {/* Left avatar or icon */}
            {n.avatar ? (
              <Image source={{ uri: n.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.iconCircle}>{getIcon(n.type)}</View>
            )}

            {/* Texts */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{n.title}</Text>
              <Text style={styles.message}>{n.message}</Text>
              <Text style={styles.time}>{n.time}</Text>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionBtn}>
                <Check size={18} color="#10B981" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Bell size={18} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handleDelete(n.id)}
              >
                <AlertTriangle size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  headerIcon: {
    position: "absolute",
    right: 0,
  },
  markAllButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  markAllText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  list: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: "flex-start",
    position: "relative",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    position: "absolute",
    left: 6,
    top: 6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  message: {
    fontSize: 13,
    color: "#374151",
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    marginLeft: 8,
  },
  actionBtn: {
    marginLeft: 8,
  },
});
