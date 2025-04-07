// BalanceCard.tsx
// Card component displaying account balance and quick action buttons

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BalanceCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Good Evening</Text>
      <Text style={styles.name}>John Doe</Text>
      
      <View style={styles.card}>
        <Text style={styles.balanceLabel}>Account Balance</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceAmount}>£2,235.11</Text>
          <Text style={styles.balanceCents}>45</Text>
          <TouchableOpacity>
            <Ionicons name="copy-outline" size={20} color="#ffffff80" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.accountNumber}>01 - 00 - 02 | 12345678</Text>
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.actionText}>Add money</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="card" size={20} color="#fff" />
            <Text style={styles.actionText}>Card</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="stats-chart" size={20} color="#fff" />
            <Text style={styles.actionText}>Graph View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  greeting: {
    color: '#ffffff80',
    fontSize: 16,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#0d8a59',
    borderRadius: 16,
    padding: 20,
  },
  balanceLabel: {
    color: '#ffffff80',
    fontSize: 14,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  balanceCents: {
    color: '#ffffff80',
    fontSize: 16,
    marginTop: 4,
  },
  accountNumber: {
    color: '#ffffff80',
    fontSize: 14,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff20',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 14,
  },
});

export default BalanceCard; 