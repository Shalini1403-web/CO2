import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

// Dummy data for the graphs
const weeklyData = {
  Mon: 4,
  Tue: 2,
  Wed: 4,
  Thu: 6,
  Fri: 3,
  Sat: 5,
  Sun: 4,
};

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

    return (
      <View style={styles.circularContainer}>
        <Svg width={center * 2} height={center * 2}>
          {/* Background circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#4CAF50"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
          />
        </Svg>
        <View style={styles.circularContent}>
          <Text style={styles.circularValue}>{Math.round(dailyProgress * 200)}kg</Text>
          <Text style={styles.circularLabel}>Today</Text>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={dailyProgress}
            onValueChange={setDailyProgress}
            minimumTrackTintColor="#4CAF50"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#4CAF50"
          />
        </View>
      </View>
    );
  };

  const renderBarGraph = (isMonthly = false) => {
    const maxValue = Math.max(...Object.values(weeklyData));
    const progress = isMonthly ? monthlyProgress : weeklyProgress;
    const setProgress = isMonthly ? setMonthlyProgress : setWeeklyProgress;
    
    return (
      <View style={styles.graphContainer}>
        <View style={styles.barGraphContainer}>
          {Object.entries(weeklyData).map(([day, value], index) => {
            const height = (value / maxValue) * 150 * progress;
            const isWeekend = day === 'Sat' || day === 'Sun';
            
            return (
              <View key={day} style={styles.barColumn}>
                <View style={[styles.bar, { height, backgroundColor: isWeekend ? '#FF4081' : '#4CAF50' }]} />
                <Text style={styles.barLabel}>{day}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={progress}
            onValueChange={setProgress}
            minimumTrackTintColor="#4CAF50"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#4CAF50"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {TABS.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === index && styles.activeTab]}
            onPress={() => setActiveTab(index)}
          >
            <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Graph Content */}
      <View style={styles.graphContent}>
        {activeTab === 0 && renderCircularProgress()}
        {activeTab === 1 && renderBarGraph()}
        {activeTab === 2 && renderBarGraph(true)}
      </View>
    </View>
  );
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