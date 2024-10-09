import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, FlatList, ActivityIndicator, SafeAreaView, StatusBar, TouchableOpacity, Text, StyleSheet, Image, Modal, TextInput, Alert } from 'react-native';
import { Client, Databases, Query } from 'appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBarCatalogue from '../components/Catalogue/NavBarCatalogue';

import StoreCategory from '../components/Catalogue/StoreCategory';
import TestCard from '../components/Catalogue/TestCard';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBarCatalogue from '../components/Catalogue/SearchBarCatalogue';

const StoreScreen1 = ({ route }) => {
  const storeid = '200';
  const storename = 'BigBasket';

  const [showModal, setShowModal] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const sheetRef = useRef(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [selectedVariantDetails, setSelectedVariantDetails] = useState({}); 
  const [variantQuantities, setVariantQuantities] = useState({});

  const snapPoints = useMemo(() => ['35%', '35%', '35%'], []);

  const client = new Client();
  client.setEndpoint('https://cloud.appwrite.io/v1');
  client.setProject('65773c8581b895f83d40');
  const databases = new Databases(client);

  const handleOpenVariantSheet = useCallback((productId, variants) => {
    setSelectedProductId(productId);
    setSelectedVariants(variants);
    sheetRef.current?.expand();
  }, []);

  const handleCloseSheet = () => {
    sheetRef.current?.close();
  };

  const handleBuyVariant = useCallback((variant) => {
    setSelectedVariantDetails(prevDetails => ({
      ...prevDetails,
      [selectedProductId]: variant,
    }));
    handleCloseSheet();
  }, [selectedProductId]);

  const saveDataToAsyncStorage = async (data) => {
    try {
      const existingData = await AsyncStorage.getItem('storeData');
      let storeData = existingData ? JSON.parse(existingData) : {};
      const newData = {
        storeid,
        storename,
        itemsdata: Object.entries(data || variantQuantities)
          .filter(([_, quantity]) => quantity > 0)
          .map(([key, quantity]) => {
            const [productId, variantId] = key.split('-');
            return { productid: productId, variantid: variantId, qty: quantity };
          }),
      };
      storeData[storeid] = newData;
      await AsyncStorage.setItem('storeData', JSON.stringify(storeData));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const handleIncrementVariant = (variantId) => {
    setVariantQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [variantId]: (prevQuantities[variantId] || 0) + 1,
      };
      saveDataToAsyncStorage(newQuantities);
      return newQuantities;
    });
  };

  const handleDecrementVariant = (variantId) => {
    setVariantQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (newQuantities[variantId] > 0) {
        newQuantities[variantId] -= 1;
      }
      saveDataToAsyncStorage(newQuantities);
      return newQuantities;
    });
  };

  const fetchData = async () => {
    setShowModal(true);
    try {
      const shopItemsResponse = await databases.listDocuments(
        'data-level-1',
        'Shop_ItemsDB_testing',
        [Query.search('SHOP_ID', storeid)]
      );
      const shopItemsData = shopItemsResponse.documents[0];
      const shopItems = shopItemsData['Shop_Items-SP'];
      const shopStocks = shopItemsData['Shop_Items-Stocks'];
      const shopMRPs = shopItemsData['Shop_Items-MRP'];
      const shopWeights = shopItemsData['Shop_Items-Weight'];
  
      const productIds = [...new Set(shopItems.map((item) => item.split(':')[0].split('.')[0]))]; 
  
      const categoriesMap = {}; // To store unique categories
      const combinedItems = [];
  
      // Fetch and process each product individually
      for (const productId of productIds) { 
        try {
          const stringProductId = productId.toString(); // This might already be a string, but it's good to be explicit
          console.log(stringProductId);
          const productResponse = await databases.listDocuments(
            'data-level-1', 
            '664f1ca60037dad0be9c',
            [Query.equal('ProductID', stringProductId)] 
          );
  
          if (productResponse.documents.length > 0) { 
            const product = productResponse.documents[0];
  
            // Store category information for later use
            if (!categoriesMap[product.Product_Category]) {
              categoriesMap[product.Product_Category] = product['Category-Image'];
            }
  
            const variants = shopItems
              .filter((i) => i.split(':')[0].split('.')[0] === productId)
              .map((v) => { 
                // ... (Your existing logic for variant extraction)
              });
  
            combinedItems.push({
              productId,
              name: product.Product_Name,
              image: product.Product_Image,
              category: product.Product_Category,
              variants: variants,
            });
          }
        } catch (error) {
          console.error(`Error fetching product with ID ${productId}:`, error);
          // Handle errors gracefully, e.g., show an error message for that specific product
        }
      }
  
      const uniqueCategories = Object.keys(categoriesMap).map((category) => ({
        name: category,
        image: categoriesMap[category],
      }));
  
      setCategories(uniqueCategories);
      setItems(combinedItems);
      setLoading(false);
      setTimeout(() => {
        setShowModal(false);
        setDataFetched(true);
      }, 2000); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setItems([]);
      setLoading(false);
      setShowModal(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, [storeid]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#000125" barStyle="light-content" />
      <NavBarCatalogue storeName='Bigbasket' />
      <Modal
        transparent={true}
        animationType="fade"
        visible={showModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.modalText}>Fetching Data...</Text>
          </View>
        </View>
      </Modal>
      <SearchBarCatalogue />
      <StoreCategory categories={categories} onSelectCategory={handleCategorySelect} />
      {dataFetched && (
        <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
          {loading ? (
            <ActivityIndicator size="large" color="#c2c2c2" />
          ) : filteredItems.length === 0 ? (
            <Text>No items found</Text>
          ) : (
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.productId}
              renderItem={({ item }) => {
                const selectedVariantId = selectedVariantDetails[item.productId]?.variantId || item.variants[0].variantId;
                const variantKey = `${item.productId}-${selectedVariantId}`;
                return (
                  <TestCard
                    productid={item.productId}
                    productimg={item.image}
                    productName={item.name}
                    productWeight={selectedVariantDetails[item.productId]?.weight || item.variants[0].weight}
                    originalPrice={selectedVariantDetails[item.productId]?.mrp || item.variants[0].mrp}
                    discountedPrice={selectedVariantDetails[item.productId]?.price || item.variants[0].price}
                    showDropdown={false}
                    variants={item.variants}
                    onAddClick={(variants) => handleOpenVariantSheet(item.productId, variants)}
                    onEditClick={() => {
                      const preSelectedVariantId = selectedVariantDetails[item.productId]?.variantId || item.variants[0].variantId;
                      const preSelectedVariant = item.variants.find(variant => variant.variantId === preSelectedVariantId);
                      handleOpenEditSheet(item.productId, preSelectedVariant);
                    }}
                    quantity={variantQuantities[variantKey] || 0}
                    handleIncrement={() => handleIncrementVariant(variantKey)}
                    handleDecrement={() => handleDecrementVariant(variantKey)}
                    storeData={saveDataToAsyncStorage} 
                    stock={selectedVariantDetails[item.productId]?.stock || item.variants[0].stock}
                  />
                );
              }}
            />
          )}
        </View>
      )}
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={(index) =>
          setSelectedProductId(index > -1 ? selectedProductId : null)
        }
        enablePanDownToClose={true}
        backgroundStyle={styles.bottomSheetBackground} 
        handleComponent={() =>
          <View style={styles.closeLineContainer}>
            <View style={styles.closeLine}></View>
          </View>
        }
      >
        <BottomSheetScrollView contentContainerStyle={{ padding: 20, }}>
          <Text style={{ fontSize: 18, marginBottom: 10, fontFamily: 'DMSansSB', letterSpacing: -0.2, color: '#566573' }}>
            Select a variant:233
          </Text>
          {selectedVariants.map((variant) => (
            <TouchableOpacity
              key={variant.variantId}
              onPress={() => handleBuyVariant(variant)}
              style={styles.variantButton}
            >
              <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Icon2
                    name="weight"
                    size={20}
                    color='#566573'
                    style={{ marginTop: 5, marginRight: 10 }}
                  />
                  <Text style={styles.variantText}>{`${variant.weight}`}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', }}>
                  <Text style={styles.priceText}>{`  ₹ ${variant.price}`}</Text>
                  <Text style={{ ...styles.priceText, textDecorationLine: 'line-through', color: '#8d8c90', fontSize: 12, alignSelf: 'center', marginRight: 5 }}>{`₹ ${variant.mrp}`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  closeLineContainer: {
    alignSelf: 'center',
  },
  closeLine: {
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00356a',
    marginTop: 9,
  },
  bottomSheetBackground: {
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  variantButton: {
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginBottom: 10,
    display: 'flex',
    backgroundColor: "#f6f7f9",
    paddingHorizontal: 10
  },
  variantText: {
    fontSize: 15,
    fontFamily: 'DMSansSB',
    marginTop: 2,
    height: 30,
  },
  priceText: {
    fontSize: 16,
    color: "green",
    fontFamily: 'DMSansSB',
    marginRight: 10
  },
  itemImage: {
    width: 80, 
    height: 80, 
    marginRight: 10,
    borderRadius: 5, 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginTop: 10, 
    fontSize: 16,fontFamily:'DMSansSB'
  },
});

export default StoreScreen1;