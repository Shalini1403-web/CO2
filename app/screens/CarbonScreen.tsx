import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TopNavbar from '../components/TopNavbar';
import Svg, { Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

interface ActivityItemProps {
  title: string;
  subtitle: string;
  impact: string;
  color: string;
}

interface CardProps {
  id: number;
  type: string;
  title: string;
  value?: string;
  subtitle?: string;
  percentage?: number;
  month?: string;
  amount?: string;
  buttonText?: string;
  chartData?: {
    labels: string[];
    values: number[];
  };
}

const CarbonScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const cards: CardProps[] = [
    {
      id: 1,
      type: 'co2',
      title: 'Good job!',
      value: '148kg',
      subtitle: 'Today',
      percentage: 75, // Progress percentage for the gauge
    },
    {
      id: 2,
      type: 'chart',
      title: 'Weekly',
      month: 'March 2025',
      chartData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [30, 45, 65, 35, 55, 40, 60]
      }
    },
    {
      id: 3,
      type: 'balance',
      title: 'Green coins',
      value: '20🪙', // Using the Unicode coin icon (🪙)
      subtitle: 'Spend this month so far',
      amount: '300🪙',
      buttonText: 'Withdraw Green Coins'
    }
  ];

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / (CARD_WIDTH + 16));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  // Function to render progress circle gauge
  const CircleProgress = ({ percentage = 75, radius = 90, strokeWidth = 15 }) => {
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (percentage / 100) * circumference;
    
    return (
      <View style={styles.progressContainer}>
        <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth} viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius * 2 + strokeWidth}`}>
          {/* Background Circle */}
          <Circle
            cx={radius + strokeWidth/2}
            cy={radius + strokeWidth/2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke="#EEEEEE"
            fill="transparent"
          />
          
          {/* Progress Circle */}
          <Circle
            cx={radius + strokeWidth/2}
            cy={radius + strokeWidth/2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke="#FF6347"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            transform={`rotate(-90, ${radius + strokeWidth/2}, ${radius + strokeWidth/2})`}
          />
        </Svg>
        
        <View style={styles.centerText}>
          <Text style={styles.valueText}>148kg</Text>
          <Text style={styles.labelText}>Today</Text>
        </View>
      </View>
    );
  };
  
  // Function to render bar chart
  const BarChart = ({ data }: { data: { title: string, month: string, labels: string[], values: number[] } }) => {
    const maxValue = Math.max(...data.values) * 1.2;
    const barColors = ['#FFCC00', '#FF6347', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#E91E63'];
    
    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>{data.title}</Text>
          <Text style={styles.chartMonth}>{data.month}</Text>
        </View>
        <View style={styles.barChartContainer}>
          {data.values.map((value, index) => (
            <View key={index} style={styles.barItem}>
              <View style={styles.barWrapper}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: `${(value / maxValue) * 100}%`,
                      backgroundColor: barColors[index % barColors.length]
                    }
                  ]} 
                />
              </View>
              <Text style={styles.barLabel}>{data.labels[index]}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Function to render each card
  const renderCard = (card: CardProps) => {
    switch (card.type) {
      case 'co2':
        return (
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <CircleProgress percentage={card.percentage} />
          </View>
        );
      
      case 'chart':
        return (
          <View style={styles.cardContent}>
            {card.chartData && (
              <BarChart 
                data={{
                  title: card.title,
                  month: card.month || '',
                  labels: card.chartData.labels,
                  values: card.chartData.values
                }} 
              />
            )}
          </View>
        );
      
      case 'balance':
        return (
          <View style={styles.cardContent}>
            <Text style={styles.balanceTitle}>{card.title}</Text>
            <Text style={styles.balanceValue}>{card.value}</Text>
            <View style={styles.balanceSubtitleContainer}>
              <Text style={styles.balanceSubtitle}>{card.subtitle}</Text>
              <Text style={styles.balanceAmount}>{card.amount}</Text>
            </View>
            <TouchableOpacity style={styles.withdrawButton}>
              <Text style={styles.withdrawButtonText}>{card.buttonText}</Text>
            </TouchableOpacity>
          </View>
        );
      
      default:
        return null;
    }
  };

  // Pagination indicators for the card slider
  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      <TouchableOpacity 
        style={styles.arrowButton}
        onPress={() => {
          if (activeIndex > 0 && scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
              x: (activeIndex - 1) * (CARD_WIDTH + 16),
              animated: true
            });
          }
        }}
      >
        <Ionicons name="chevron-back" size={24} color="#999" />
      </TouchableOpacity>
      
      <View style={styles.dotContainer}>
        {cards.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.dot, 
              activeIndex === index ? styles.activeDot : null
            ]} 
          />
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.arrowButton}
        onPress={() => {
          if (activeIndex < cards.length - 1 && scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
              x: (activeIndex + 1) * (CARD_WIDTH + 16),
              animated: true
            });
          }
        }}
      >
        <Ionicons name="chevron-forward" size={24} color="#999" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TopNavbar />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Evening</Text>
        <Text style={styles.name}>John Doe</Text>
      </View>

      {/* Card Slider - Added here right after John Doe */}
      <View style={styles.cardSliderContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          contentContainerStyle={styles.sliderContainer}
          decelerationRate="fast"
        >
          {cards.map((card) => (
            <View key={card.id} style={styles.card}>
              {renderCard(card)}
            </View>
          ))}
        </ScrollView>
        
        {/* Pagination */}
        {renderPagination()}
      </View>


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
  // Card Slider Styles
  cardSliderContainer: {
    marginBottom: -25,
  },
  sliderContainer: {
    paddingHorizontal: 8,
  },
  card: {
    width: CARD_WIDTH,
    height: 280,
    marginHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  labelText: {
    fontSize: 16,
    color: '#999',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  arrowButton: {
    padding: 8,
  },
  dotContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  // Chart styles
  chartContainer: {
    flex: 1,
    paddingTop: 10,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chartMonth: {
    fontSize: 12,
    color: '#666',
  },
  barChartContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  barItem: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  barWrapper: {
    width: 20,
    height: '80%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 10,
  },
  barLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
  // Balance styles
  balanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  balanceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  balanceSubtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  withdrawButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  withdrawButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Existing styles
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