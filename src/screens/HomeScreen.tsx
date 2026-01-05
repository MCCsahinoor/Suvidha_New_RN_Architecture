import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView, 
} from 'react-native';

function HomeScreen() {
  return ( 
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome to Suvidha!</Text>
          <Text style={styles.description}>
            This is your home screen. You can navigate using the drawer menu.
          </Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Getting Started</Text>
            <Text style={styles.cardText}>
              Swipe from the left edge or tap the menu icon to open the drawer
              navigation.
            </Text>
          </View>
        </View>
      </ScrollView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default HomeScreen;

