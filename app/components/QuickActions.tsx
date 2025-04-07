// QuickActions.tsx
// Quick action tiles for common banking operations

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const QuickActions = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tile}>
        <View style={styles.iconContainer}>
          <Ionicons name="document-text-outline" size={24} color="#1a1b3b" />
        </View>
        <Text style={styles.tileText}>Get{'\n'}Statement</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tile}>
        <View style={styles.iconContainer}>
          <Ionicons name="scan-outline" size={24} color="#1a1b3b" />
        </View>
        <Text style={styles.tileText}>Scan &{'\n'}Pay</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tile}>
        <View style={styles.iconContainer}>
          <Ionicons name="gift-outline" size={24} color="#1a1b3b" />
        </View>
        <Text style={styles.tileText}>Rewards &{'\n'}Benefits</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  tile: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '31%',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  tileText: {
    color: '#1a1b3b',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default QuickActions; 