import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, FlatList, StyleSheet, Dimensions ,TouchableOpacity, ScrollView} from 'react-native';
import FontLoader from '../FontLoader';
import { useDispatch, useSelector } from 'react-redux';
import { setPhoneNumber } from '../redux/actions/actions';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {

  const dispatch = useDispatch();  
  const storePhoneNo = useSelector((state) => state.login.storePhoneNo); // Change 'phone' to 'login'
  const [mobileNumber, setMobileNumber] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageUrls = [
    'https://img.freepik.com/free-photo/glassblower-standing-with-arms-crossed-glassblowing-factory_107420-74222.jpg?w=360&t=st=1702493429~exp=1702494029~hmac=bf0246db3a3d931f9cb6d2f01c37f4e053363af49a7f0d85640df147adccaa95',
    'https://img.freepik.com/free-photo/attractive-man-glasses-is-working-his-own-clay-project_613910-21509.jpg?w=360&t=st=1702493554~exp=1702494154~hmac=7c85508ad4b6a5f0b7e43fd62996f325a35e4cbf93a7e8d4ad9617aadf7af752',
    'https://cdn.pixabay.com/photo/2023/04/11/10/44/chai-7916889_1280.jpg',
    'https://img.freepik.com/premium-photo/portrait-smiling-handsome-young-indian-tailor-using-application-smartphone-when-standing-atelier_274689-20046.jpg?w=360',
    'https://img.freepik.com/free-photo/bicycle-store-manager_1098-21312.jpg?w=360&t=st=1702493405~exp=1702494005~hmac=9e32bec23e717d1d141a8576f216961d403e8fcf091c5f762254212ffd596103'
  ];
  const navigation = useNavigation(); // Access navigation

  useEffect(() => {
    console.log('Phone number from Redux store:', storePhoneNo);
  }, [storePhoneNo]);


  const handleGetOTP = () => {
    // Handle logic for getting OTP
    console.log('Get OTP for mobile number:', mobileNumber);
    dispatch(setPhoneNumber(mobileNumber));
    navigation.navigate('ShopDetails');
   
  };

  const navigateToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const navigateToPrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  useEffect(() => {
    // Auto slide every 3 seconds (adjust the interval as needed)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <FontLoader>
      <ScrollView style ={{marginBottom:10}}>
    <View style={styles.container}>
      <View style={styles.topmostcontainer}>
        {/* Image Slider */}
        <FlatList
          data={imageUrls}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
          onEndReached={() => {
            // Add logic to reset FlatList to the beginning when it reaches the end
          }}
          onEndReachedThreshold={0.1}
          extraData={currentIndex}
          initialScrollIndex={currentIndex}
          key={currentIndex} // Force re-render when currentIndex changes
        />
      </View>

      {/* Image Indicators */}
      <View style={styles.indicatorsContainer}>
        {imageUrls.map((_, index) => (
          <View
            key={index}
            style={[styles.indicator, { backgroundColor: index === currentIndex ? '#007bff' : '#ccc' }]}
          />
        ))}
      </View>

      {/* Input for Mobile Number */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Your Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="numeric"
          value={mobileNumber}
          onChangeText={(text) => setMobileNumber(text)}
        />
      </View>

      {/* Get OTP Button */}
      <TouchableOpacity style={styles.button} onPress={handleGetOTP}>
        <Text style={styles.buttonText}>Get OTP</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </FontLoader>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
    marginBottom:10
  },
  topmostcontainer: {
    marginTop: 0,
  },
  image: {
    width,
    height: 500,
    resizeMode: 'cover',
  },
  indicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily:"DMSansR"
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '80%',
    marginLeft: 40,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily:"DMSansR"
  },
});

export default LoginScreen;
