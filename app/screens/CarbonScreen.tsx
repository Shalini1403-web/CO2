import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TopNavbar from '../components/TopNavbar';
import CarbonGraphs from '../components/CarbonGraphs';

interface ActivityItemProps {
  title: string;
  subtitle: string;
  impact: string;
  color: string;
}

const CarbonScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <TopNavbar />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Evening</Text>
        <Text style={styles.name}>John Doe</Text>
      </View>

      {/* Carbon Graphs */}
      <CarbonGraphs />

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionTile}>
          <Ionicons name="document-text-outline" size={24} color="#1a1b3b" />
          <Text style={styles.actionText}>Get{'\n'}Statement</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionTile}>
          <Ionicons name="scan-outline" size={24} color="#1a1b3b" />
          <Text style={styles.actionText}>Scan &{'\n'}Pay</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionTile}>
          <Ionicons name="gift-outline" size={24} color="#1a1b3b" />
          <Text style={styles.actionText}>Rewards &{'\n'}Benefits</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>RECENT ACTIVITIES</Text>
        
        <View style={styles.activityList}>
          <ActivityItem 
            title="Organic Market"
            subtitle="Groceries / Today"
            impact="-2.1kg CO₂"
            color="#4CAF50"
          />
          <ActivityItem 
            title="Public Transport"
            subtitle="Transport / Today"
            impact="+1.5kg CO₂"
            color="#FF9800"
          />
          <ActivityItem 
            title="Gas Station"
            subtitle="Transport / Today"
            impact="+1.5kg CO₂"
            color="#F44336"
          />
          <ActivityItem 
            title="Organic Market"
            subtitle="Groceries / Today"
            impact="-2.1kg CO₂"
            color="#4CAF50"
          />
          
          <TouchableOpacity style={styles.viewMore}>
            <Text style={styles.viewMoreText}>+ View More</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Challenge Card Image */}
      <View style={styles.challengeContainer}>
        <TouchableOpacity>
          <Image 
            source={require('../../assets/images/carbon-free-challenge.png')}
            style={styles.challengeImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      {/* Eco Locations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ECO FRIENDLY LOCATIONS NEAR YOU</Text>
        <View style={styles.mapContainer}>
          <Image 
            source={require('../../assets/images/map-image.png')}
            style={styles.map}
            resizeMode="cover"
          />
          <View style={styles.mapOverlay}>
            <Text style={styles.mapText}>3 green locations nearby</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const ActivityItem = ({ title, subtitle, impact, color }: ActivityItemProps) => (
  <View style={styles.activityItem}>
    <View style={styles.activityLeft}>
      <View style={[styles.activityDot, { backgroundColor: color }]} />
      <View>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activitySubtitle}>{subtitle}</Text>
      </View>
    </View>
    <View style={styles.activityRight}>
      <Text style={[styles.activityImpact, { color }]}>{impact}</Text>
      <Ionicons name="camera-outline" size={20} color="#ffffff80" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b3b',
  },
  header: {
    padding: 16,
    paddingTop: 10,
  },
  greeting: {
    color: '#ffffff80',
    fontSize: 16,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreCard: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  scoreContent: {
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 24,
    color: '#1a1b3b',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  circularProgress: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 36,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#1a1b3b80',
  },
  navigationDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1a1b3b20',
  },
  activeDot: {
    backgroundColor: '#1a1b3b',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  actionTile: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '31%',
    alignItems: 'center',
  },
  actionText: {
    color: '#1a1b3b',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    color: '#ffffff80',
    fontSize: 14,
    marginBottom: 16,
  },
  activityList: {
    backgroundColor: '#ffffff08',
    borderRadius: 16,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activityTitle: {
    color: '#fff',
    fontSize: 16,
  },
  activitySubtitle: {
    color: '#ffffff80',
    fontSize: 14,
  },
  activityRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activityImpact: {
    fontSize: 16,
  },
  viewMore: {
    alignItems: 'center',
    paddingTop: 8,
  },
  viewMoreText: {
    color: '#ffffff80',
    fontSize: 14,
  },
  challengeContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeImage: {
    width: 343,  // Specific width for better control
    height: 180,
    borderRadius: 16,
  },
  mapContainer: {
    backgroundColor: '#ffffff08',
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
  },
  mapText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default CarbonScreen; 