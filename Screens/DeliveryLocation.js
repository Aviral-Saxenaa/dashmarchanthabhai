// Importing necessary dependencies
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontLoader from '../FontLoader';
import { Client, Databases, Query,ID } from "appwrite";
import { useDispatch, useSelector } from 'react-redux';
import { setShopDetails } from '../redux/actions/actions';
import { setPhoneNumber } from '../redux/actions/actions';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
// Setting up Appwrite client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65773c8581b895f83d40');

const databases = new Databases(client);

// HousingCard component to render individual housing cards
const HousingCard = ({ item, onSelect, isSelected }) => {
  return (
    <TouchableOpacity
      key={item.$id}
      onPress={() => onSelect(item['Housing-ID'])}
      style={{
        width: '100%',
        backgroundColor: isSelected ? '#3498db' : '#fff',
        padding: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 1,
        marginTop: 10,
      }}
    >
      <Text style={{ fontSize: 15, marginBottom: 10, fontFamily: "DMSansSB", color: isSelected ? '#fff' : 'black' }}>{item['Housing-Name']}</Text>
      <Text style={{ fontSize: 14, color: isSelected ? '#fff' : '#888' }}>{item['Housing-ID']}</Text>
    </TouchableOpacity>
  );
};

// Main DeliveryLocation component
const DeliveryLocation = () => {
  const navigation =useNavigation();
  const [data, setData] = useState([]);
  const [selectedHousingIDs, setSelectedHousingIDs] = useState([]);
  const dispatch = useDispatch(); // Redux dispatch function
  const shopDetails = useSelector(state => state.login.shopDetails); // Access shopDetails from Redux store // Access shopDetails from Redux store
  const shopPhone= useSelector(state => state.login.storePhoneNo); // Access shopDetails from Redux store // Access shopDetails from Redux store
  // Fetching data from Appwrite

  const shopCityCode = useSelector(state => state.login.shopDetails.shopCity);
  console.log(shopCityCode);
  useEffect(() => {
    const fetchData = async () => {
      const res = await databases.listDocuments(
        'data-level-1',
        'HousingDB',
        [
          Query.equal('Housing-CityCode', shopCityCode)
        ]
      );
      setData(res.documents);
    };

    fetchData();
  }, []);

  // Handling card selection
  const handleCardSelect = (housingID) => {
    const isSelected = selectedHousingIDs.includes(housingID);

    if (isSelected) {
      // Remove the card from the selection
      setSelectedHousingIDs(selectedHousingIDs.filter((id) => id !== housingID));
    } else {
      // Add the card to the selection
      setSelectedHousingIDs([...selectedHousingIDs, housingID]);
    }
  };

  const handleSaveAndContinue = async () => {
    // Update the shopDetails object with the selected housing IDs
    const updatedShopDetails = {
      ...shopDetails,
      housingIDs: selectedHousingIDs,
    };

    // Dispatch the action to save updated shopDetails in the Redux store
    dispatch(setShopDetails(updatedShopDetails));

    // Handle any additional actions or navigation logic
    console.log('Save & Continue pressed with selected housing IDs:', selectedHousingIDs);
    console.log('Updated shopDetails:', updatedShopDetails);
    console.log(shopDetails.housingIDs);
    console.log(shopPhone);


   try{
      const response = await databases.createDocument(
        'data-level-1', // Your database ID
        'StoresMain-DB', // Your collection ID
        ID.unique(),
       
        {
          'Mobile-Number': shopPhone,
          'Shop-Name': shopDetails.shopName,
          'Shop-Category'	: shopDetails.shopCategory,
          'Shop-PinCode': shopDetails.shopPinCode,
          'Shop-WhatsappNo': shopDetails.whatsappNo,
          'Shop-OpenTime': shopDetails.openTime,
          'Shop-CloseTime': shopDetails.closeTime,
          'Shop-TicketSize': shopDetails.ticketSize,
          'Shop-City': shopDetails.shopCity,
          'Shop-DeliveryArea': selectedHousingIDs ,// Assuming deliveryArea is a comma-separated string of selected housing IDs
          'Shop-ID': '0',
        }
      )

      navigation.navigate('ThankYouScreen')
      } catch (error) {
        console.error('Error creating document:', error);
        Alert.alert('Error', 'Failed to save details. Please try again.');
      }
    
    // navigation.navigate('ThankYouScreen')
    // Handle any additional actions or navigation logic
    // console.log('Save & Continue pressed with selected housing IDs:', selectedHousingIDs);
    // console.log(shopDetails);

   

  };

  return (
    <FontLoader>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />
      {/* ... Updated header code ... */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 1,
          backgroundColor: '#3498db', // Blue color
          height: '60px',
          marginTop:0
        }}
      >
        {/* Updated TouchableOpacity with 80% width and centered */}
        <TouchableOpacity
          style={{
            backgroundColor: '#3498db',
            borderRadius: 50,
            padding: 10,
            margin: 5,
            width: '10%', // 80% width
            alignItems: 'center', // Centered
          }}
        >
          <Icon name="chevron-back-outline" size={25} color="white" />
        </TouchableOpacity>

        {/* Updated TouchableOpacity with 80% width and centered */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            flexGrow: 2,
            marginLeft:20
          }}
        >
          <Text style={{ fontSize: 15, color: 'white', fontWeight: '800' ,fontFamily:"DMSansSB"}}>
          Select your delivery areas
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 5,
            shadowColor: '#ababb2',
            shadowOffset: { width: 0, height: 0.3 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 5,
            paddingHorizontal: 10,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 10,
              borderColor: '#858484',
              borderWidth: 1,
              alignItems: 'center',
            }}
          >
            <Icon name="search" size={20} color="black" />
            <TextInput placeholder="Choose one or more locations" style={{ marginLeft: 10, fontFamily: "DMSansSB", width: 200 }} />
          </View>
        </View>

        {/* Rendering HousingCards */}
        {data.map((item) => (
          <HousingCard
            key={item.$id}
            item={item}
            onSelect={handleCardSelect}
            isSelected={selectedHousingIDs.includes(item['Housing-ID'])}
          />
        ))}

        {/* Render Save & Continue button when cards are selected */}
        {selectedHousingIDs.length > 0 && (
          <TouchableOpacity
            style={{
              backgroundColor: '#007bff',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              width: '70%',
              borderRadius: 5,
              marginTop: 20,
              alignSelf: 'center'
            }}
            onPress={handleSaveAndContinue}
          >
            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'DMSansR' }}>Save & Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    </FontLoader>
  );
};

export default DeliveryLocation;
