// HomeScreen.tsx
// Main screen component that displays the user's banking information
// Including balance, quick actions, and recent transactions

import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TopNavbar from '../components/TopNavbar';
import BalanceCard from '../components/BalanceCard';
import QuickActions from '../components/QuickActions';
import TransactionSection from '../components/TransactionSection';
import CarbonGraphs from '../components/CarbonGraphs';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView}>
        <TopNavbar />
        <View style={styles.content}>
          <BalanceCard />
          <QuickActions />
          <TransactionSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b3b',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});

export default HomeScreen; 