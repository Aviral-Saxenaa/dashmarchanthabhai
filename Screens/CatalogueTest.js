import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet ,TouchableOpacity,TextInput} from 'react-native';
import { Client, Databases, Query } from 'appwrite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TestCard from '../components/Catalogue/TestCard';
import BottomSheet from '@gorhom/bottom-sheet';

// Replace with your actual Appwrite collection IDs
const GLOBAL_PRODUCTS_COLLECTION_ID = '664f1ca60037dad0be9c';
const SHOP_ITEMS_COLLECTION_ID = 'Shop_ItemsDB_testing';

const CatalogueTest = () => {
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [modalProductGroup, setModalProductGroup] = useState(null);
    const [searchText, setSearchText] = useState(''); // State for search text
  const [products, setProducts] = useState([]);
  const [bottomSheetGroupId, setBottomSheetGroupId] = useState(null); 
  const [shopItemDetails, setShopItemDetails] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const bottomSheetRef = useRef(null);
  const variantBottomSheetRef = useRef(null);
  const shopId = '200';
  const client = new Client();
  client.setEndpoint('https://cloud.appwrite.io/v1');
  client.setProject('65773c8581b895f83d40');
  const databases = new Databases(client);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const shopData = await databases.listDocuments(
          'data-level-1',
          SHOP_ITEMS_COLLECTION_ID,
          [Query.equal('SHOP_ID', shopId)]
        );

        if (shopData.total === 0) {
          console.error('Shop not found or no data for this shop.');
          return;
        }

        const productIds = new Set();
        shopData.documents[0]['Shop_Items-SP'].forEach((item) => {
          const [productId] = item.split(':');
          productIds.add(productId.trim());
        });

        const productPromises = [...productIds].map((productId) =>
          databases.listDocuments(
            'data-level-1',
            GLOBAL_PRODUCTS_COLLECTION_ID,
            [Query.equal('ProductID', productId)]
          )
        );
        const productResponses = await Promise.all(productPromises);
        const allProducts = productResponses.flatMap((res) => res.documents);

        const groupedProducts = {};
        allProducts.forEach((product) => {
          const [prefix] = product.ProductID.split('.');
          if (!groupedProducts[prefix]) {
            groupedProducts[prefix] = [];
          }
          groupedProducts[prefix].push(product);
        });

        const shopItemPromises = [...productIds].map((productId) =>
          databases.listDocuments(
            'data-level-1',
            SHOP_ITEMS_COLLECTION_ID,
            [Query.equal('SHOP_ID', shopId)]
          )
        );
        const shopItemResponses = await Promise.all(shopItemPromises);
        const shopItemData = shopItemResponses.flatMap((res) => res.documents);

        const shopItemDetailsMap = {};
        shopItemData.forEach((item) => {
          item['Shop_Items-SP'].forEach((shopItem) => {
            const [productId, sp] = shopItem.split(':');
            shopItemDetailsMap[productId.trim()] = {
              ...shopItemDetailsMap[productId.trim()],
              sp,
            };
          });
          item['Shop_Items-MRP'].forEach((shopItem) => {
            const [productId, mrp] = shopItem.split(':');
            shopItemDetailsMap[productId.trim()] = {
              ...shopItemDetailsMap[productId.trim()],
              mrp,
            };
          });
          item['Shop_Items-Weight'].forEach((shopItem) => {
            const [productId, weight] = shopItem.split(':');
            shopItemDetailsMap[productId.trim()] = {
              ...shopItemDetailsMap[productId.trim()],
              weight,
            };
          });
          item['Shop_Items-Stocks'].forEach((shopItem) => {
            const [productId, stock] = shopItem.split(':');
            shopItemDetailsMap[productId.trim()] = {
              ...shopItemDetailsMap[productId.trim()],
              stock,
            };
          });
        });

        setProducts(Object.values(groupedProducts));
        setShopItemDetails(shopItemDetailsMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, [shopId]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const uniqueCategories = [
    'All',
    ...new Set(products.flatMap((group) => group[0].Product_Category)),
  ];

  const filteredProducts = products.filter((group) => {
    const matchesCategory = selectedCategory === 'All' || group.some((product) => product.Product_Category === selectedCategory);
    const matchesSearch = searchText === '' || group.some((product) => product.Product_Name.toLowerCase().includes(searchText.toLowerCase()));
    return matchesCategory && matchesSearch; 
  });

    const handleChooseVariant = (groupId, variant) => {
        setSelectedVariants((prevVariants) => ({
          ...prevVariants,
          [groupId]: variant,
        }));
        setBottomSheetVisible(false); 
        variantBottomSheetRef.current?.close();
      };

    const openVariantBottomSheet = (groupId, productGroup) => {
    setBottomSheetGroupId(groupId); // Set groupId in state
    setModalProductGroup(productGroup);
    setBottomSheetVisible(true);
  };

  const handleEditPress = (product) => {
    setSelectedProduct(product);
    bottomSheetRef.current?.expand();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View>

      <TextInput 
          style={styles.searchInput}
          placeholder="Search by product name..."
          value={searchText}
          onChangeText={setSearchText}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 30 }}
        >
          {uniqueCategories.map((category) => (
            <View key={category} style={{ marginRight: 10 }}>
              <Button
                title={category}
                onPress={() => handleCategoryPress(category)}
              />
            </View>
          ))}
        </ScrollView>

        {filteredProducts.map((productGroup, index) => {
          const groupId = productGroup[0].ProductID.split('.')[0];
          return (
            <TestCard
            key={index}
            groupId={groupId}
            productGroup={productGroup}
            shopId={shopId}
            shopItemDetails={shopItemDetails}
            selectedVariant={selectedVariants[groupId] || productGroup[0]}
            onChooseVariant={handleChooseVariant}
            onEditPress={handleEditPress}
            openVariantBottomSheet={() => openVariantBottomSheet(groupId, productGroup)}
          />
          );
        })}
      </View>



      <BottomSheet
          ref={variantBottomSheetRef}
          index={bottomSheetVisible ? 0 : -1}
          snapPoints={['50%']} // Adjust snap points as needed
          onClose={() => setBottomSheetVisible(false)}
          enablePanDownToClose={true}
         
        >
          <View style={{ padding: 20 }}>
            {modalProductGroup && (
              <>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
                  Product Variants
                </Text>
                {modalProductGroup.map((variant) => {
              const variantDetails = shopItemDetails[variant.ProductID];
              return (
                <TouchableOpacity
                  key={variant.ProductID}
                  onPress={() => handleChooseVariant(bottomSheetGroupId, variant)}
                  style={{
                    borderBottomWidth: 1,
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={{ uri: variant.Product_Image }}
                    style={{ width: 80, height: 80, marginRight: 10 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text>{variant.Product_Name}</Text>
                    {/* Display MRP, SP, and Weight */}
                    {variantDetails && (
                      <>
                        <Text>MRP: ₹{variantDetails.mrp}</Text> 
                        <Text>Selling Price: ₹{variantDetails.sp}</Text>
                        <Text>Weight: {variantDetails.weight}</Text> 
                      </>
                    )}
                     </View>
                </TouchableOpacity>
              );
            })}
          </>
        )}
      </View>
    </BottomSheet>


      <BottomSheet
        ref={bottomSheetRef}
        index={selectedProduct ? 0 : -1} // Control visibility based on selectedProduct
        snapPoints={['25%', '50%', '90%']}
        onClose={() => setSelectedProduct(null)}
        enablePanDownToClose={true}
      >
        <View style={{ padding: 20 }}>
          {selectedProduct && (
            <>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
                Edit Product Details
              </Text>
              <Text>Product Name: {selectedProduct.Product_Name}</Text>
              <Text>Product ID: {selectedProduct.ProductID}</Text>
              <Text>Category: {selectedProduct.Product_Category}</Text>
              <Text>Image URL: {selectedProduct.Product_Image}</Text>
              <Text>MRP: {shopItemDetails[selectedProduct.ProductID]?.mrp}</Text>
              <Text>Selling Price: {shopItemDetails[selectedProduct.ProductID]?.sp}</Text>
              <Text>Stock: {shopItemDetails[selectedProduct.ProductID]?.stock}</Text>
              <Text>Weight: {shopItemDetails[selectedProduct.ProductID]?.weight}</Text>
              {/* Add more details as required */}
            </>
          )}
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
    // ... [Your existing styles]
    searchInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      padding: 10,
      borderRadius: 5,
    },
  });

export default CatalogueTest;
