// TransactionSection.tsx
// Section displaying recent transactions with filtering options

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: number;
  iconName: keyof typeof Ionicons.glyphMap;
}

const TransactionSection = () => {
  const [activeFilter, setActiveFilter] = useState('Accounts');

  const transactions: Transaction[] = [
    {
      id: 1,
      name: 'HBO',
      date: 'Today',
      amount: -6.27,
      iconName: 'tv',
    },
    {
      id: 2,
      name: 'Spotify',
      date: 'Yesterday',
      amount: -9.99,
      iconName: 'musical-notes',
    },
    {
      id: 3,
      name: 'Ane Clothing',
      date: 'Yesterday',
      amount: -36.89,
      iconName: 'shirt',
    },
    {
      id: 4,
      name: 'Dentist Clinic',
      date: 'May 17th',
      amount: -104.00,
      iconName: 'medical',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRANSACTIONS</Text>
      
      <View style={styles.filters}>
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'Accounts' && styles.activeFilter]}
          onPress={() => setActiveFilter('Accounts')}
        >
          <Text style={[styles.filterText, activeFilter === 'Accounts' && styles.activeFilterText]}>
            Accounts
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'Credit Card' && styles.activeFilter]}
          onPress={() => setActiveFilter('Credit Card')}
        >
          <Text style={[styles.filterText, activeFilter === 'Credit Card' && styles.activeFilterText]}>
            Credit Card
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'Others' && styles.activeFilter]}
          onPress={() => setActiveFilter('Others')}
        >
          <Text style={[styles.filterText, activeFilter === 'Others' && styles.activeFilterText]}>
            Others
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.transactionList}>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <View style={styles.transactionIcon}>
                <Ionicons name={transaction.iconName} size={24} color="#fff" />
              </View>
              <View>
                <Text style={styles.transactionName}>{transaction.name}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
            </View>
            <Text style={styles.transactionAmount}>
              {transaction.amount < 0 ? '-' : '+'}£{Math.abs(transaction.amount).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  title: {
    color: '#ffffff80',
    fontSize: 14,
    marginBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  activeFilter: {
    backgroundColor: '#1a1b3b',
  },
  filterText: {
    color: '#ffffff80',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#fff',
  },
  transactionList: {
    backgroundColor: '#ffffff08',
    borderRadius: 16,
    padding: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#ffffff20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  transactionDate: {
    color: '#ffffff80',
    fontSize: 14,
  },
  transactionAmount: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TransactionSection; 