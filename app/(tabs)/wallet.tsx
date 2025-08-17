import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, RefreshCw, CreditCard, Smartphone } from 'lucide-react-native';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { mockWallet, mockWalletTransactions } from '@/data/mockData';

export default function Wallet() {
  const [refreshing, setRefreshing] = useState(false);
  const [transactions] = useState(mockWalletTransactions);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleAddMoney = () => {
    Alert.alert('Add Money', 'This would open the payment interface');
  };

  const handleWithdraw = () => {
    Alert.alert('Withdraw Money', 'This would open the withdrawal interface');
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'credit':
        return <ArrowDownLeft size={20} color="#10B981" />;
      case 'debit':
        return <ArrowUpRight size={20} color="#EF4444" />;
      case 'refund':
        return <RefreshCw size={20} color="#3B82F6" />;
      default:
        return <WalletIcon size={20} color="#6B7280" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'credit':
      case 'refund':
        return '#10B981';
      case 'debit':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const formatAmount = (amount: number, type: string) => {
    const sign = type === 'debit' ? '-' : '+';
    return `${sign}₹${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return 'Today';
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return { backgroundColor: '#D1FAE5', color: '#065F46' };
      case 'pending':
        return { backgroundColor: '#FEF3C7', color: '#92400E' };
      case 'failed':
        return { backgroundColor: '#FEE2E2', color: '#991B1B' };
      default:
        return { backgroundColor: '#F3F4F6', color: '#374151' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Wallet</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Card */}
        <Card style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View style={styles.walletIconContainer}>
              <WalletIcon size={32} color="#3B82F6" />
            </View>
            <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
              <RefreshCw size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>₹{mockWallet.balance.toFixed(2)}</Text>
          
          <View style={styles.actionButtons}>
            <Button
              title="Add Money"
              onPress={handleAddMoney}
              variant="primary"
              size="medium"
              style={styles.actionButton}
            />
            <Button
              title="Withdraw"
              onPress={handleWithdraw}
              variant="outline"
              size="medium"
              style={styles.actionButton}
            />
          </View>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.quickActionsCard}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction} onPress={handleAddMoney}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#EBF5FF' }]}>
                <CreditCard size={24} color="#3B82F6" />
              </View>
              <Text style={styles.quickActionText}>Add via Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={handleAddMoney}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#F0FDF4' }]}>
                <Smartphone size={24} color="#10B981" />
              </View>
              <Text style={styles.quickActionText}>Add via UPI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={() => Alert.alert('Bank Transfer', 'Transfer to bank account')}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#FFF7ED' }]}>
                <ArrowUpRight size={24} color="#F97316" />
              </View>
              <Text style={styles.quickActionText}>Bank Transfer</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Transaction History */}
        <Card style={styles.transactionsCard}>
          <View style={styles.transactionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <View key={transaction.transaction_id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={styles.transactionIconContainer}>
                    {getTransactionIcon(transaction.type)}
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionDescription}>
                      {transaction.description}
                    </Text>
                    <Text style={styles.transactionDate}>
                      {formatDate(transaction.created_at)}
                    </Text>
                  </View>
                </View>
                <View style={styles.transactionRight}>
                  <Text
                    style={[
                      styles.transactionAmount,
                      { color: getTransactionColor(transaction.type) }
                    ]}
                  >
                    {formatAmount(transaction.amount, transaction.type)}
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusBadgeStyle(transaction.status).backgroundColor }
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusBadgeStyle(transaction.status).color }
                      ]}
                    >
                      {transaction.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No transactions yet</Text>
          )}
        </Card>

        {/* Wallet Statistics */}
        <Card style={styles.statsCard}>
          <Text style={styles.sectionTitle}>This Month</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#D1FAE5' }]}>
                <ArrowDownLeft size={20} color="#10B981" />
              </View>
              <Text style={styles.statLabel}>Money Added</Text>
              <Text style={styles.statValue}>
                ₹{transactions
                  .filter(t => t.type === 'credit' && new Date(t.created_at).getMonth() === new Date().getMonth())
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#FEE2E2' }]}>
                <ArrowUpRight size={20} color="#EF4444" />
              </View>
              <Text style={styles.statLabel}>Money Spent</Text>
              <Text style={styles.statValue}>
                ₹{transactions
                  .filter(t => t.type === 'debit' && new Date(t.created_at).getMonth() === new Date().getMonth())
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </Text>
            </View>
          </View>
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  balanceCard: {
    marginBottom: 16,
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  quickActionsCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
  },
  transactionsCard: {
    marginBottom: 16,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 32,
  },
  statsCard: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flex: 1,
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
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
});