// ThankYouScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontLoader from '../FontLoader';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ThankYouScreen = () => {
  const shopDetails = useSelector((state) => state.login.shopDetails);
  return (
    <FontLoader>
    <View style={styles.container}>
      <Icon name="check-circle" size={50} color="green" style={{ marginBottom: 30 }} />
      <Text style={styles.heading}>Thank You!</Text>
      <Text style={styles.message}>Your details have been submitted successfully.</Text>
      <Text style={styles.messagebtm}>If you have any query you can get in touch</Text>
      <TouchableOpacity
        onPress={() => {
          // Handle button press
          console.log('Button pressed!');
          console.log(shopDetails);
        }}
        style={styles.chatButton}
      >
        <Icon name="chat-outline" size={25} color="blue" style={{ marginRight: 10 }} />
        <Text style={styles.buttonText}>Enter V-Code</Text>
      </TouchableOpacity>
    </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily:"DMSansR"
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily:"DMSansR"
  },
  messagebtm: {
    fontSize: 15,
    width: '70%',
    textAlign: 'center',
    marginBottom: 50,
    marginTop:200,
    fontFamily:"DMSansR"
  },
  chatButton: {
    backgroundColor: 'white',
    padding: 10,
    paddingHorizontal:20,
    borderRadius: 5,
    borderWidth: 1, // Add border width
    borderColor: 'blue', // Add border color
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 16,
    fontWeight:"500",
    fontFamily:"DMSansR"
  },
});

export default ThankYouScreen;
