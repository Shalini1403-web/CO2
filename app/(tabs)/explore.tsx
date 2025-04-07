import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ExploreScreen() {
  const [location, setLocation] = useState('London');

  const categories = [
    { id: '1', name: 'Restaurants', image: 'https://via.placeholder.com/80' },
    { id: '2', name: 'EV Stations', image: 'https://via.placeholder.com/80' },
    { id: '3', name: 'Groceries', image: 'https://via.placeholder.com/80' },
    { id: '4', name: 'Pharmacies', image: 'https://via.placeholder.com/80' },
  ];

  const restaurants = [
    { id: '1', name: 'Vapiano', rating: 4.8, reviews: 500, distance: 0.7, image: 'https://via.placeholder.com/80' },
    { id: '2', name: 'Urban Kitchen', rating: 4.5, reviews: 300, distance: 1.2, image: 'https://via.placeholder.com/80' },
  ];

  const evStations = [
    { id: '1', name: 'Tesla Supercharger', rating: 4.9, reviews: 200, distance: 0.5, image: 'https://via.placeholder.com/80' },
    { id: '2', name: 'BP Chargemaster', rating: 4.2, reviews: 150, distance: 1.0, image: 'https://via.placeholder.com/80' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.time}>16:43</Text>
        <View style={styles.statusIcons}>
          <Icon name="signal-cellular-alt" size={16} color="#000" />
          <Icon name="battery-full" size={16} color="#00C2A8" />
        </View>
      </View>

      {/* Location Section */}
      <View style={styles.locationSection}>
        <View style={styles.locationSearchContainer}>
          <Icon name="location-on" size={20} color="#FF6B6B" />
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Enter location"
            style={styles.locationInput}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="search" size={20} color="#00C2A8" />
          </TouchableOpacity>
        </View>
        <View style={styles.locationInfo}>
          <Text style={styles.locationText}>Now</Text>
          <Text style={styles.locationCity}>{location}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#AAA" />
        <TextInput
          placeholder="Search for restaurants, EV stations or groceries"
          style={styles.searchInput}
        />
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <TouchableOpacity key={category.id} style={styles.categoryTile}>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <Text style={styles.categoryLabel}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Nearby Restaurants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
        {restaurants.map(restaurant => (
          <View key={restaurant.id} style={styles.featuredItem}>
            <Image source={{ uri: restaurant.image }} style={styles.featuredImage} />
            <View style={styles.featuredInfo}>
              <Text style={styles.featuredName}>{restaurant.name}</Text>
              <Text style={styles.featuredRating}>
                {Array(5).fill(null).map((_, i) => i < Math.floor(restaurant.rating) ? '★' : '☆').join('')}
                {restaurant.rating} ({restaurant.reviews})
              </Text>
              <Text style={styles.featuredDistance}>{restaurant.distance} miles away</Text>
            </View>
          </View>
        ))}
      </View>

      {/* EV Stations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EV Charging Stations</Text>
        {evStations.map(station => (
          <View key={station.id} style={styles.featuredItem}>
            <Image source={{ uri: station.image }} style={styles.featuredImage} />
            <View style={styles.featuredInfo}>
              <Text style={styles.featuredName}>{station.name}</Text>
              <Text style={styles.featuredRating}>
                {Array(5).fill(null).map((_, i) => i < Math.floor(station.rating) ? '★' : '☆').join('')}
                {station.rating} ({station.reviews})
              </Text>
              <Text style={styles.featuredDistance}>{station.distance} miles away</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 15,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
  },
  time: {
    fontSize: 14,
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  locationSection: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  locationSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  locationInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 10,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#888',
    marginRight: 10,
  },
  locationCity: {
    fontSize: 16,
    fontWeight: '500',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#888',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  categoryTile: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#FFF',
    padding: 5,
    textAlign: 'center',
  },
  featuredItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  featuredImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  featuredInfo: {
    flex: 1,
  },
  featuredName: {
    fontWeight: '600',
    marginBottom: 5,
  },
  featuredRating: {
    color: '#FFC107',
    marginBottom: 5,
  },
  featuredDistance: {
    color: '#888',
    fontSize: 14,
  },
});