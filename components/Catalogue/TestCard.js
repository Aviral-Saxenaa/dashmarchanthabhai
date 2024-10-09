import React, { useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontLoader from '../../FontLoader';
import BottomSheet from '@gorhom/bottom-sheet'; // Import BottomSheet component

const TestCard = ({ 
  groupId, 
  productGroup, 
  shopItemDetails, 
  selectedVariant, 
  onChooseVariant, 
  onEditPress,
  openVariantBottomSheet 
}) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false); // State for BottomSheet visibility
  const bottomSheetRef = useRef(null); // Ref for BottomSheet component

  const hasVariants = productGroup.length > 1;

  const productName = selectedVariant.Product_Name;
  const productimg = selectedVariant.Product_Image;
  const stock = shopItemDetails[selectedVariant.ProductID]?.stock;
  const productWeight = shopItemDetails[selectedVariant.ProductID]?.weight;
  const discountedPrice = shopItemDetails[selectedVariant.ProductID]?.sp;
  const originalPrice = shopItemDetails[selectedVariant.ProductID]?.mrp;

  const stockIndicatorColor = stock === '0' ? '#e54836' : '#08a36d';

  const handleChooseVariant = (variant) => {
    setBottomSheetVisible(false);
    onChooseVariant(groupId, variant);
  };

  return (
    <FontLoader>
      <View style={{ height: 7 }}></View>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: productimg }} style={styles.productImage} />
        </View>
        <View style={styles.productInfoContainer}>
          <Text style={styles.productName}>{productName}</Text>
          <View style={styles.productDetailsContainer}>
            <View style={styles.productWeightContainer}>
              <Text style={styles.productWeightText}>{productWeight}</Text>
              {hasVariants && (
        <Button title="Choose" onPress={openVariantBottomSheet} /> 
      )}
            </View>
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                onPress={() => onEditPress(selectedVariant)}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>EDIT</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.discountedPrice}>₹{discountedPrice}</Text>
            <Text style={styles.originalPrice}>₹{originalPrice}</Text>
            <View style={{ flex: 1 }}></View>
            <View
              style={{
                backgroundColor: stockIndicatorColor,
                height: 15,
                width: 15,
                borderRadius: 100,
                alignSelf: 'center',
                marginRight: 20,
                borderColor: '#fce29a',
                borderWidth: 1,
              }}
            ></View>
          </View>
        </View>
      </View>

      {/* BottomSheet Component */}
    <BottomSheet
  index={bottomSheetVisible ? 1 : -1}
  enablePanDownToClose={true}
  ref={bottomSheetRef}
  snapPoints={['25%', '50%', '100%']} // Set last snap point to '100%'
  onChange={(index) => {
    if (index === -1) {
      setBottomSheetVisible(false);
    }
  }}
>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
            Product Variants
          </Text>
          {productGroup.map((variant) => (
            <TouchableOpacity
              key={variant.ProductID}
              onPress={() => handleChooseVariant(variant)}
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
              </View>
            </TouchableOpacity>
          ))}
          <Button title="Close" onPress={() => setBottomSheetVisible(false)} />
        </View>
      </BottomSheet>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 5,
    marginHorizontal: 8,
    marginVertical: 1,
    borderColor: '#030a11',
    borderWidth: 0.2,
  },
  imageContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: '24%',
    height: 90,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e6e9fb',
    borderWidth: 0.9,
    borderRadius: 5,
    padding: 5,
    marginTop: 2,
    marginBottom: 2,
  },
  productImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    borderWidth: 2,
    borderRadius: 10,
  },
  productInfoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    backgroundColor: 'transparent',
    fontSize: 15,
    fontFamily: 'DMSansR',
    height: 'full',
    flex: 1,
    display: 'flex',
    marginTop: 2,
    marginBottom: 2,
  },
  productDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productWeightContainer: {
    marginLeft: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F6F7',
    borderColor: 'black',
    borderWidth: 0.2,
    borderRadius: 1,
    paddingHorizontal: 5,
    marginTop: 3,
    marginBottom: 5,
    paddingVertical: 0,
  },
  productWeightText: {
    fontSize: 16,
    color: 'black',
    height: 27,
    paddingHorizontal: 5,
    fontFamily: 'DMSansR',
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
  addButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    marginRight: 5,
  },
  addButton: {
    borderRadius: 5,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000125',
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  addButtonTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#000125',
    fontSize: 14,
    fontFamily: 'DMSansB',
  },
  counterButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: '#00356a',
    borderRadius: 3,
    marginRight: 10,
    position: 'absolute',
    overflow: 'hidden',
  },
  priceContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 2,
    display: 'flex',
  },
  discountedPrice: {
    fontSize: 16,
    color: '#212121',
    marginTop: 2,
    fontFamily: 'DMSansSB',
    backgroundColor: 'transparent',
    marginLeft: 2,
  },
  originalPrice: {
    fontSize: 14,
    color: '#a2a2a5',
    textDecorationLine: 'line-through',
    marginTop: 2,
    marginLeft: 2,
    fontFamily: 'DMSansR',
    alignSelf: 'flex-end',
  },
});

export default TestCard;
