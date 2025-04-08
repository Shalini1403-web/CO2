import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Dimensions,
  StatusBar,
  SafeAreaView
} from 'react-native';

// Types for data structures
const SCHEMES = [
  {
    id: "ccl",
    icon: "🔋",
    title: "Climate Change Levy",
    subtitle: "92% off electricity taxes",
    category: "energy",
    color: "#4CAF50",
    details: {
      description: "Tax relief for industrial/commercial energy use.",
      eligibility: [
        "Industrial/commercial sectors",
        "Charities exempt",
        "CHP scheme participants"
      ],
      discounts: [
        "92% electricity discount",
        "86% gas/solid fuels discount"
      ],
      actionLink: "https://www.gov.uk/climate-change-levy"
    }
  },
  {
    id: "plastic-tax",
    icon: "🧴",
    title: "Plastic Packaging Tax",
    subtitle: "£223.69/tonne rate",
    category: "waste",
    color: "#2196F3",
    details: {
      description: "Tax on plastic packaging with <30% recycled content.",
      threshold: "≥10 tonnes/year",
      exemptions: [
        "Medical packaging",
        "Reusable containers"
      ],
      actionLink: "https://www.gov.uk/plastic-packaging-tax"
    }
  },
  {
    id: "capital-allowances",
    icon: "💸",
    title: "Capital Allowances",
    subtitle: "Claim up to £1M",
    category: "investment",
    color: "#673AB7",
    details: {
      description: "Tax relief for green business investments.",
      allowances: [
        {
          type: "Annual Investment Allowance (AIA)",
          value: "£1,000,000 maximum"
        },
        {
          type: "100% First-Year Allowance",
          value: "Full cost deduction"
        },
        {
          type: "Super-Deduction",
          value: "130% relief (2021-2023)"
        }
      ],
      eligibleAssets: [
        "Energy-efficient equipment",
        "Low-emission vehicles",
        "Green technology"
      ],
      actionLink: "https://www.gov.uk/capital-allowances"
    }
  },
  {
    id: "landfill-tax",
    icon: "🚯",
    title: "Landfill Tax",
    subtitle: "£126.15/tonne standard",
    category: "waste",
    color: "#FF9800",
    details: {
      description: "Tax on waste sent to landfill sites.",
      rates: [
        "Standard: £126.15/tonne",
        "Lower (inert waste): £4.05/tonne"
      ],
      exemptions: [
        "Recycling activities",
        "Quarry restoration"
      ],
      actionLink: "https://www.gov.uk/landfill-tax"
    }
  },
  {
    id: "aggregates-levy",
    icon: "🪨",
    title: "Aggregates Levy",
    subtitle: "£2.08/tonne",
    category: "construction",
    color: "#795548",
    details: {
      description: "Tax on sand, gravel and rock extraction.",
      exemptions: [
        "Exported materials",
        "Agricultural use"
      ],
      actionLink: "https://www.gov.uk/aggregates-levy"
    }
  },
  {
    id: "cps",
    icon: "⚡",
    title: "Carbon Price Support",
    subtitle: "Low-carbon energy incentive",
    category: "energy",
    color: "#00BCD4",
    details: {
      description: "Encourages low-carbon electricity generation.",
      appliesTo: [
        "Gas generators",
        "Coal power plants"
      ],
      actionLink: "https://www.gov.uk/carbon-price-support"
    }
  }
];

const CATEGORIES = [
  { id: "energy", name: "Energy", icon: "⚡" },
  { id: "waste", name: "Waste", icon: "🚯" },
  { id: "investment", name: "Investment", icon: "💸" },
  { id: "construction", name: "Construction", icon: "🪨" }
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = 180; // Base card height (when collapsed)
const EXPANDED_CARD_HEIGHT = 400; // Height when expanded
const CARD_VISIBLE_HEIGHT = 100; // Amount of card visible when stacked (reduced to show more cards)

export default function TaxReliefWallet() {
  const [activeTab, setActiveTab] = useState('relief'); // 'relief' or 'allowances'
  const [selectedCardId, setSelectedCardId] = useState(null);
  
  // Filter schemes for tax relief (energy and waste categories)
  const taxReliefSchemes = SCHEMES.filter(scheme => 
    scheme.category === 'energy' || scheme.category === 'waste'
  );

  // Filter schemes for allowances (investment and construction categories)
  const allowanceSchemes = SCHEMES.filter(scheme => 
    scheme.category === 'investment' || scheme.category === 'construction'
  );
  
  const currentSchemes = activeTab === 'relief' ? taxReliefSchemes : allowanceSchemes;
  
  // Create animation values for each card
  const animatedValues = useRef(
    SCHEMES.reduce((acc, scheme) => {
      acc[scheme.id] = new Animated.Value(0);
      return acc;
    }, {})
  ).current;
  
  // Handle card selection
  const toggleCard = (id) => {
    // If the same card is selected, close it
    if (selectedCardId === id) {
      Animated.spring(animatedValues[id], {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: false,
      }).start(() => {
        setSelectedCardId(null);
      });
    } else {
      // Close previously selected card if any
      if (selectedCardId) {
        Animated.spring(animatedValues[selectedCardId], {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: false,
        }).start();
      }
      
      // Open the selected card
      setSelectedCardId(id);
      Animated.spring(animatedValues[id], {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: false,
      }).start();
    }
  };
  
  const switchTab = (tab) => {
    // First reset any selected card
    if (selectedCardId) {
      Animated.spring(animatedValues[selectedCardId], {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: false,
      }).start();
      setSelectedCardId(null);
    }
    
    setActiveTab(tab);
  };

  const renderCards = () => {
    // Reverse the order for Apple Wallet-like stacking (bottom to top)
    return currentSchemes.map((scheme, index) => {
      const isSelected = selectedCardId === scheme.id;
      const totalCards = currentSchemes.length;
      
      // Position cards from bottom to top, with increasing visibility as index increases
      // This places each card higher than the previous one
      const topPosition = index === 0 ? 20 : 20 + ((index) * CARD_VISIBLE_HEIGHT);
      
      // Animation interpolations
      const expandHeight = animatedValues[scheme.id].interpolate({
        inputRange: [0, 1],
        outputRange: [CARD_HEIGHT, EXPANDED_CARD_HEIGHT]
      });
      
      const translateY = animatedValues[scheme.id].interpolate({
        inputRange: [0, 1],
        outputRange: [0, -1 * topPosition + 20] // Adjust to align top of expanded card
      });
      
      const opacity = animatedValues[scheme.id].interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.7, 1]
      });
      
      return (
        <Animated.View
          key={scheme.id}
          style={[
            styles.card,
            {
              backgroundColor: scheme.color,
              top: topPosition,
              zIndex: isSelected ? 100 : index, // Lower index cards are on bottom now
              height: expandHeight,
              transform: [{ translateY }]
            }
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={() => toggleCard(scheme.id)}
            style={styles.cardTouchable}
          >
            {/* Card Header (always visible) */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>{scheme.icon}</Text>
              <View style={styles.titleContainer}>
                <Text style={styles.cardTitle}>{scheme.title}</Text>
                <Text style={styles.cardSubtitle}>{scheme.subtitle}</Text>
              </View>
            </View>
            
            {/* Card Details (conditionally visible) */}
            <Animated.ScrollView
              style={[styles.detailsContainer, { opacity }]}
              contentContainerStyle={styles.detailsContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.detailText}>{scheme.details.description}</Text>
              
              {scheme.details.eligibility && (
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Eligibility:</Text>
                  {scheme.details.eligibility.map((item, i) => (
                    <Text key={i} style={styles.detailItem}>• {item}</Text>
                  ))}
                </View>
              )}
              
              {scheme.details.discounts && (
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Discounts:</Text>
                  {scheme.details.discounts.map((item, i) => (
                    <Text key={i} style={styles.detailItem}>• {item}</Text>
                  ))}
                </View>
              )}
              
              {scheme.details.threshold && (
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Threshold:</Text>
                  <Text style={styles.detailItem}>• {scheme.details.threshold}</Text>
                </View>
              )}
              
              {scheme.details.rates && (
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Rates:</Text>
                  {scheme.details.rates.map((item, i) => (
                    <Text key={i} style={styles.detailItem}>• {item}</Text>
                  ))}
                </View>
              )}
              
              {scheme.details.exemptions && (
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Exemptions:</Text>
                  {scheme.details.exemptions.map((item, i) => (
                    <Text key={i} style={styles.detailItem}>• {item}</Text>
                  ))}
                </View>
              )}
              
              {scheme.details.allowances && (
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Allowances:</Text>
                  {scheme.details.allowances.map((item, i) => (
                    <Text key={i} style={styles.detailItem}>• {item.type}: {item.value}</Text>
                  ))}
                </View>
              )}
              
              {scheme.details.eligibleAssets && (
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Eligible Assets:</Text>
                  {scheme.details.eligibleAssets.map((item, i) => (
                    <Text key={i} style={styles.detailItem}>• {item}</Text>
                  ))}
                </View>
              )}
              
              {scheme.details.appliesTo && (
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Applies To:</Text>
                  {scheme.details.appliesTo.map((item, i) => (
                    <Text key={i} style={styles.detailItem}>• {item}</Text>
                  ))}
                </View>
              )}
              
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Learn More</Text>
              </TouchableOpacity>
            </Animated.ScrollView>
          </TouchableOpacity>
        </Animated.View>
      );
    });
  };

  const headerTitle = activeTab === 'relief' ? 'Tax Relief Schemes' : 'Claim Allowances';
  const headerSubtitle = activeTab === 'relief' 
    ? 'Available for your business' 
    : 'Reduce your tax liability';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <Text style={styles.headerSubtitle}>{headerSubtitle}</Text>
      </View>
      
      <View style={styles.cardContainer}>
        {renderCards()}
      </View>
      
      <TouchableOpacity 
        style={styles.switchButton}
        onPress={() => switchTab(activeTab === 'relief' ? 'allowances' : 'relief')}
      >
        <Text style={styles.switchButtonText}>
          {activeTab === 'relief' ? 'View Claim Allowances' : 'View Tax Relief'}
        </Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 22,
    color: '#666',
    marginTop: 5,
    marginBottom: 5,
  },
  cardContainer: {
    flex: 1,
    position: 'relative',
    paddingTop: 20,
    marginHorizontal: 20,
    height: EXPANDED_CARD_HEIGHT + 200, // Ensure container is tall enough
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  cardTouchable: {
    width: '100%',
    height: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    height: CARD_HEIGHT,
  },
  cardIcon: {
    fontSize: 36,
    marginRight: 15,
  },
  titleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  cardSubtitle: {
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
    marginTop: 4,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  detailsContent: {
    paddingBottom: 20,
  },
  detailText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 12,
  },
  detailSection: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  detailItem: {
    color: 'white',
    fontSize: 15,
    marginBottom: 3,
    marginLeft: 5,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  switchButton: {
    backgroundColor: '#1A1A30',
    padding: 14,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  switchButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  }
});