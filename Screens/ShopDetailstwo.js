import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import FontLoader from '../FontLoader';
import { Client, Databases } from 'appwrite';
import { setShopDetails } from '../redux/actions/actions';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('65773c8581b895f83d40') // Your project ID
;

const databaseId = 'data-level-1'; // Replace with your actual database ID
const collectionId = 'CityDB'; // Replace with your actual collection ID

const ShopDetailstwo = () => {

    const navigation = useNavigation();
  const dispatch = useDispatch();
  const shopDetails = useSelector(state => state.login.shopDetails);
  console.log('object');
console.log(shopDetails);
  const [ticketSize, setTicketSize] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [startShopTime, setStartShopTime] = useState(false);
  const [endShopTime, setEndShopTime] = useState(false);
  const [startTimeDropdownVisible, setStartTimeDropdownVisible] = useState(false);
  const [endTimeDropdownVisible, setEndTimeDropdownVisible] = useState(false);
  const [cityDropdownVisible, setCityDropdownVisible] = useState(false);
  const [cities, setCities] = useState([]);


  const areFieldsFilled = () => {
    return startShopTime && endShopTime && ticketSize && selectedCity;
  };

  useEffect(() => {
    const getCities = async () => {
      try {
        const response = await databases.listDocuments(databaseId, collectionId);
        const cityDocuments = response.documents || [];
        console.log('City Documents:', cityDocuments);
  
        if (Array.isArray(cityDocuments)) {
          setCities(
            cityDocuments.map(document => {
              const id = document["$id"];
              const name = document['City-Name'];
              const cityid = document['City-ID'];
              console.log('City ID:', id, 'City Name:', name); // Log city ID and Name
  
              return {
                id,
                name,
                cityid
              };
            })
          );
        } else {
          console.error('City documents are not in the expected format:', cityDocuments);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
  
    getCities();
  }, []);

  // const handleSaveDetails = () => {
  //   console.log('Start Time:', startShopTime);
  //   console.log('End Time:', endShopTime);
  //   console.log('Ticket Size:', ticketSize);
  //   console.log('Selected City:', selectedCity);

  //   // Add your logic to save the details or navigate to the next screen

  //   Alert.alert('Success', 'Details saved successfully!');
  // };

  const handleSaveDetails = () => {
    // Assuming you have collected shop details in local state
    const newShopDetails = {
      openTime: startShopTime,
      closeTime: endShopTime,
      ticketSize,
      shopCity: selectedCity ? selectedCity.cityid : '',
      // ... Add other details as needed
    };

    // Dispatch the action to update the shop details in the Redux store
    dispatch(setShopDetails(newShopDetails));

    // ... Add your logic to save the details or navigate to the next screen

    Alert.alert('Success', 'Details saved successfully!');
    navigation.navigate('DeliveryLocation');
  };

  const toggleCityDropdown = () => {
    setCityDropdownVisible(!cityDropdownVisible);
  };

  const toggleStartTimeDropdown = () => {
    setStartTimeDropdownVisible(!startTimeDropdownVisible);
  };

  const toggleEndTimeDropdown = () => {
    setEndTimeDropdownVisible(!endTimeDropdownVisible);
  };

  const handleCitySelection = (city) => {
    console.log('Selected City:', city.name); // Log city name
    console.log('Selected City ID:', city.cityid); // Log city ID
    setSelectedCity(city);
    toggleCityDropdown();
  };

  const handleTimeSelection = (time, type) => {
    if (type === 'start') {
      toggleStartTimeDropdown();
      setStartShopTime(time);
    } else if (type === 'end') {
      toggleEndTimeDropdown();
      setEndShopTime(time);
    }
  };

  return (
    <FontLoader>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Enter Shop Details</Text>

        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 17, marginBottom: 22, marginTop: 10, fontWeight: '500' }}>Select Start Time of Shop</Text>
          <TouchableOpacity style={styles.cityDropdown} onPress={toggleStartTimeDropdown}>
            <Text>{startShopTime || 'Select Start Time'}</Text>
          </TouchableOpacity>

          {startTimeDropdownVisible && (
            <View style={styles.dropdownList}>
              <TouchableOpacity onPress={() => handleTimeSelection('6:00 AM', 'start')}>
                <Text style={styles.dropdownItem}>6:00 AM</Text>
              </TouchableOpacity>
              {/* Add more times as needed */}
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 17, marginBottom: 22, marginTop: 0, fontWeight: '500' }}>Select Closing Time of Shop</Text>
          <TouchableOpacity style={styles.cityDropdown} onPress={toggleEndTimeDropdown}>
            <Text>{endShopTime || 'Select Closing Time'}</Text>
          </TouchableOpacity>

          {endTimeDropdownVisible && (
            <View style={styles.dropdownList}>
              <TouchableOpacity onPress={() => handleTimeSelection('6:00 PM', 'end')}>
                <Text style={styles.dropdownItem}>6:00 PM</Text>
              </TouchableOpacity>
              {/* Add more times as needed */}
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 17, marginBottom: 22, marginTop: 10, fontWeight: '500' }}>Ticket Size</Text>
          <View style={styles.ticketSizeContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              placeholder='Enter Ticket size'
              style={styles.ticketSizeInput}
              onChangeText={(text) => setTicketSize(text)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 17, marginBottom: 22, marginTop: 10, fontWeight: '500' }}>Select City</Text>
          <TouchableOpacity style={styles.cityDropdown} onPress={toggleCityDropdown}>
            <Text>{selectedCity ? selectedCity.name : 'Select City'}</Text>
          </TouchableOpacity>

          {cityDropdownVisible && (
            <View style={styles.dropdownList}>
              {cities.map((city, index) => (
                <TouchableOpacity key={index} onPress={() => handleCitySelection(city)}>
                  <Text style={styles.dropdownItem}>{city.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, { opacity: areFieldsFilled() ? 1 : 0.5 }]}
          onPress={areFieldsFilled() ? handleSaveDetails : null}
          disabled={!areFieldsFilled()}
        >
          <Text style={styles.buttonText}>Save Details</Text>
        </TouchableOpacity>
      </ScrollView>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 35,
    marginTop: 20,
    fontFamily: 'DMSansR',
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  cityDropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  dropdownList: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    color: 'black',
    backgroundColor: 'white',
    zIndex: 2, // Ensure the dropdown item is rendered above other components
    borderColor: '#ccc', // Add a border color
    borderWidth: 0.5, // Add a border width
  },
  button: {
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'DMSansR',
  },
  ticketSizeContainer: {
    height: 45,
    width: '45%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  currencySymbol: {
    color: 'black',
    fontSize: 20,
    justifyContent: 'center',
    fontWeight: '800',
    marginLeft: 10,
  },
  ticketSizeInput: {
    marginLeft: 10,
    borderBottomWidth: 0.2,
    borderColor: 'grey',
    flex: 1,
  },
});

export default ShopDetailstwo;
