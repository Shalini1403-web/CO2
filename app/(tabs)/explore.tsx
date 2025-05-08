import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ScrollView, Modal
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ExploreScreen() {
  const [location, setLocation] = useState('London');
  const [locationDropdownVisible, setLocationDropdownVisible] = useState(false);

  const [restaurantImages, setRestaurantImages] = useState<Record<string, string>>({});
  const [evStationImages, setEvStationImages] = useState<Record<string, string>>({});

  const locations = ['London', 'Manchester', 'Birmingham', 'Leeds'];

  const restaurants = [
    { id: 'r1', name: 'Vegan & co', rating: 4.5, time: '20–30 min', image: 'https://example.com/wagamama.jpg' },
    { id: 'r2', name: 'Farmer J', rating: 4.3, time: '25–35 min' },
    { id: 'r3', name: 'Nando’s', rating: 4.7, time: '20–30 min' },
  ];

  const evStations = [
    { id: 'ev1', name: 'Shell Recharge', types: ['CCS', 'Type 2'], available: true },
    { id: 'ev2', name: 'Tesla Supercharger', types: ['Tesla'], available: false },
  ];

  const handleImagePick = async (id: string, type: 'restaurant' | 'ev') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      if (type === 'restaurant') {
        setRestaurantImages(prev => ({ ...prev, [id]: uri }));
      } else {
        setEvStationImages(prev => ({ ...prev, [id]: uri }));
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.locationLabel}>Deliver now</Text>
        <TouchableOpacity onPress={() => setLocationDropdownVisible(!locationDropdownVisible)}>
          <Text style={styles.currentLocation}>
            {location} <Icon name="arrow-drop-down" size={20} />
          </Text>
        </TouchableOpacity>
      </View>

      {/* Location Dropdown */}
      {locationDropdownVisible && (
        <View style={styles.dropdown}>
          {locations.map(loc => (
            <TouchableOpacity key={loc} onPress={() => {
              setLocation(loc);
              setLocationDropdownVisible(false);
            }}>
              <Text style={styles.dropdownItem}>{loc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#AAA" />
        <TextInput
          placeholder="Search for restaurants, EV stations..."
          style={styles.searchInput}
        />
      </View>

      {/* Restaurants */}
      <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
      <FlatList
        horizontal
        data={restaurants}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => handleImagePick(item.id, 'restaurant')}>
            <View style={styles.card}>
              <Image
                source={{ uri: restaurantImages[item.id] || 'D:\projects\CO2\nandos.jpg' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>⭐ {item.rating}</Text>
              <Text style={styles.cardTime}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* EV Stations */}
      <Text style={styles.sectionTitle}>EV Charging Stations</Text>
      <FlatList
        horizontal
        data={evStations}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => handleImagePick(item.id, 'ev')}>
            <View style={styles.card}>
              <Image
                source={{ uri: evStationImages[item.id] || '"D:\projects\CO2\ev_1.jpg"' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>Types: {item.types.join(', ')}</Text>
              <Text style={{
                color: item.available ? '#00C853' : '#D32F2F',
                fontSize: 14,
              }}>
                {item.available ? 'Available' : 'Unavailable'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#1a1b3b',
  },
  header: {
    marginTop: 50,
    marginBottom: 10,
  },
  locationLabel: {
    color: '#888',
    fontSize: 12,
  },
  currentLocation: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  dropdown: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    elevation: 2,
  },
  dropdownItem: {
    paddingVertical: 10,
    fontSize: 16,
    borderBottomWidth: 0.5,
    borderColor: '#EEE',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#FFF',
  },
  card: {
    width: 160,
    backgroundColor: '#FFF',
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    padding: 10,
    alignItems: 'center',
    elevation: 1,
  },
  cardImage: {
    width: 120,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  cardTime: {
    fontSize: 13,
    color: '#999',
  },
});
