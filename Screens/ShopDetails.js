import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FontLoader from '../FontLoader';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setShopDetails } from '../redux/actions/actions';
import ShopCategory from './ShopCategory';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation


const ShopDetails = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tap to select category');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [shopName, setShopName] = useState('');
  const [shopPinCode, setShopPinCode] = useState('');
  const [whatsappNo, setWhatsappNo] = useState('');

  const [isFormVisible, setFormVisible] = useState(true);

  const savedShopDetails = useSelector((state) => state.login.shopDetails);

  const handleSaveDetails = () => {
    console.log('Shop Name:', shopName);
    console.log('Shop Pin Code:', shopPinCode);
    console.log('WhatsApp No:', whatsappNo);
    console.log('Shop Category:', selectedCategory);

    dispatch(setShopDetails({
      shopName,
      shopPinCode,
      whatsappNo,
      shopCategory: selectedCategory,
    }));

    Alert.alert('Success', 'Details saved successfully!');
    navigation.navigate('ShopDetailstwo'); 
  };

  useEffect(() => {
    console.log('Saved Shop Details:', savedShopDetails);
  }, [savedShopDetails]);

  const handleShopCategoryClick = () => {
    setFormVisible(false);
  };

  const handleCategorySelection = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setFormVisible(true);
  };

  return (
    <FontLoader>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Enter Details</Text>
        <Text style={styles.headblow}>Provide business details to get you started</Text>

        {isFormVisible && (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.givinginputs}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Shop Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter shop name"
                  value={shopName}
                  onChangeText={(text) => setShopName(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Shop Pin Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter shop pin code"
                  keyboardType="numeric"
                  value={shopPinCode}
                  onChangeText={(text) => setShopPinCode(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>WhatsApp No</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter WhatsApp number"
                  keyboardType="numeric"
                  value={whatsappNo}
                  onChangeText={(text) => setWhatsappNo(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Shop Category</Text>
                <TouchableOpacity onPress={() => handleShopCategoryClick()}>
                  <View style={styles.input}>
                    <Text style={styles.label}>{selectedCategory ? selectedCategory : 'Tap to select category'}</Text>
                  </View>
                </TouchableOpacity>

              </View>
            </View>
          </TouchableWithoutFeedback>
        )}

        {!isFormVisible && (
          <ShopCategory onSelectCategory={handleCategorySelection} />
        )}

        {isFormVisible && (
          <TouchableOpacity style={styles.button} onPress={handleSaveDetails}>
            <Text style={styles.buttonText}>Save Details</Text>
          </TouchableOpacity>
        )}
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
  headblow: {
    fontSize: 15,
    fontFamily: "DMSansR",
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    fontFamily: "DMSansR",
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "DMSansR",
  },
  givinginputs: {
    marginTop: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
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
    fontFamily: "DMSansB",
  },
});

export default ShopDetails;
