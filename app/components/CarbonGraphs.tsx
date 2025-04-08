import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';



const TABS = ['Daily', 'Weekly', 'Monthly'];

const CarbonGraphs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [dailyProgress, setDailyProgress] = useState(0.75);
  const [weeklyProgress, setWeeklyProgress] = useState(0.6);
  const [monthlyProgress, setMonthlyProgress] = useState(0.45);

  const renderCircularProgress = () => {
    const radius = 80;
    const strokeWidth = 10;
    const center = radius + strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference * (1 - dailyProgress);

  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    margin: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#1a1b3b',
    fontWeight: '600',
  },
  graphContent: {
    alignItems: 'center',
    minHeight: 300,
  },
  graphContainer: {
    width: '100%',
    alignItems: 'center',
  },
  circularContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularContent: {
    position: 'absolute',
    alignItems: 'center',
  },
  circularValue: {
    fontSize: 36,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  circularLabel: {
    fontSize: 16,
    color: '#666',
  },
  barGraphContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 200,
    width: '100%',
    paddingHorizontal: 10,
  },
  barColumn: {
    alignItems: 'center',
    width: 30,
  },
  bar: {
    width: 8,
    borderRadius: 4,
  },
  barLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default CarbonGraphs; 