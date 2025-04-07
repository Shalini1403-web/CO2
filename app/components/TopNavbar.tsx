// TopNavbar.tsx
// Navigation bar component with burger menu, logo, search and theme toggle

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

const TopNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isCarbon = pathname.includes('carbon');
  const slideAnim = useRef(new Animated.Value(isCarbon ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: isCarbon ? 1 : 0,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();
  }, [isCarbon]);

  const handleToggle = () => {
    if (!isCarbon) {
      // @ts-ignore - Expo Router typing issue
      router.push('/carbon');
    } else {
      // @ts-ignore - Expo Router typing issue
      router.push('/');
    }
  };

  const backgroundColor = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#6B57D2', '#4CAF50']
  });

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22] // Sliding distance
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.menuButton}
        accessibilityRole="button"
        accessibilityLabel="Menu"
      >
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>
      
      <View style={styles.logo}>
        <Text style={styles.logoText}>CARBON BANK</Text>
      </View>

      <View style={styles.rightButtons}>
        <TouchableOpacity 
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Search"
        >
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={handleToggle}
          style={styles.switchContainer}
          accessibilityRole="switch"
          accessibilityLabel={isCarbon ? "Switch to banking view" : "Switch to carbon view"}
          accessibilityState={{ checked: isCarbon }}
        >
          <Animated.View style={[styles.switchTrack, { backgroundColor }]}>
            <Animated.View style={[styles.switchThumb, { transform: [{ translateX }] }]}>
              {isCarbon ? (
                <Ionicons name="footsteps" size={14} color="#4CAF50" />
              ) : (
                <Text style={styles.poundSign}>£</Text>
              )}
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  menuButton: {
    padding: 8,
  },
  logo: {
    flex: 1,
    alignItems: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  switchContainer: {
    marginLeft: 8,
    padding: 4,
  },
  switchTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  poundSign: {
    color: '#6B57D2',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TopNavbar; 