import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Link href="/" style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#0088CC" />
          <Text style={styles.backText}>Card</Text>
        </Link>
        <Text style={styles.editButton}>Edit</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/images/profile-pic.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Shalini Yadav</Text>
        <Text style={styles.email}>Shalini@gmail.com</Text>
        <View style={styles.betaTag}>
          <Text style={styles.betaText}>PRO</Text>
        </View>
        <Text style={styles.userInfo}>
          Carbon Bank user #42,345{'\n'}
          since April 2025
        </Text>
      </View>

      {/* Address Section */}
      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionTitle}>HOME ADDRESS</Text>
        <View style={styles.addressRow}>
          <Text style={styles.addressText}>230 City Road, EC1V 2QY, London, United Kingdom</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      </TouchableOpacity>

      {/* Links Section */}
      <View style={styles.linksSection}>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>About Carbon Bank</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>App Version</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeAccountButton}>
          <Text style={styles.closeAccountText}>Close Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#0088CC',
    fontSize: 17,
    marginLeft: 4,
  },
  editButton: {
    color: '#0088CC',
    fontSize: 17,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  betaTag: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 8,
  },
  betaText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  linksSection: {
    backgroundColor: '#fff',
    marginTop: 20,
  },
  link: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  linkText: {
    fontSize: 16,
    color: '#000',
  },
  actionButtons: {
    marginTop: 20,
    paddingBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
  },
  closeAccountButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    alignItems: 'center',
  },
  closeAccountText: {
    color: '#FF3B30',
    fontSize: 16,
  },
});

export default ProfileScreen; 