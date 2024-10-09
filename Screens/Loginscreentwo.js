import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import FontLoader from '../FontLoader';
 
const LoginscreenTwo = () => {
  const [otp, setOtp] = useState(['', '', '', '']); // Array to store OTP in 4 boxes
 
  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
 
  const handleVerifyOTP = () => {
    const enteredOTP = otp.join(''); // Concatenate OTP from array
    // Replace the following with your logic to verify OTP
    const correctOTP = '1234'; // Example correct OTP
 
    if (enteredOTP === correctOTP) {
      // OTP is correct, navigate to the next screen or perform login logic
      Alert.alert('Success', 'OTP Verified. Logging in...');
      // Example navigation to the next screen
      // navigation.navigate('HomeScreen');
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };
 
  const handleInputChange = (index, value) => {
    // Update the OTP array when a box is filled
    const updatedOTP = [...otp];
    updatedOTP[index] = value;
    setOtp(updatedOTP);
 
    // Move to the next box automatically (if available)
    if (index < otp.length - 1 && value !== '') {
      inputRefs.current[index + 1]?.focus(); // Use optional chaining to check if the ref is defined
    }
  };
 
  return (
    <FontLoader>
    <View style={styles.container}>
      <Text style={styles.heading}>Enter OTP</Text>
      <Text style={styles.headtext}>OTP is needed for verification</Text>
      <Text style={styles.headtexttwo}>OTP has been sent to +91 8998887654 </Text>
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpBox}
            keyboardType="numeric"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleInputChange(index, text)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
    </FontLoader>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:100,
    marginLeft:40
  },
  headtext:{
        fontSize:18,
        fontFamily:"DMSansR"
  },
  headtexttwo:{
        marginTop:70,
        color:"grey",
        fontSize:13,
        fontFamily:"DMSansR"
  },
  heading: {
    fontSize: 38,
    marginBottom: 20,
    fontWeight:"800",
    fontFamily:"DMSansR"
  },
 
  button: {
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '80%',
    borderRadius: 5,
    marginTop:10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily:"DMSansR"
  },
  otpContainer: {
        flexDirection: 'row',
        justifyContent:"flex-start",
        marginTop:10,
 
      },
        otpBox: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        margin: 10,
        textAlign: 'center',
        fontSize: 18,
        },
});
 
export default LoginscreenTwo;