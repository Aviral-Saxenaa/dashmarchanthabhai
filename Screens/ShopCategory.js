import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import FontLoader from '../FontLoader';

const ShopCategory = ({ onSelectCategory }) => {
  const categories = [
    { id: 1, title: 'Groceries', image: 'https://img.freepik.com/free-photo/basket-full-vegetables_1112-316.jpg?w=900&t=st=1702494837~exp=1702495437~hmac=9f93f0a93433114767f417491e575776642d0e65b8a36bc87a3d5a57b66b3fcf' },
    { id: 2, title: 'Dairies', image: 'https://img.freepik.com/free-photo/dairy-products_114579-8756.jpg?w=360&t=st=1702494866~exp=1702495466~hmac=c3a709a1d6fac0fc7b8a2d7e5a74d2fc1c419ea2d29ba7348abd54a0939b5e26' },
    { id: 3, title: 'All in One Marts', image: 'https://th.bing.com/th/id/OIP.sOD_PdX_Mw1k5UnQu4uGmQHaE7?rs=1&pid=ImgDetMain' },
    // Add more categories as needed
  ];

  return (
    <FontLoader>
      <View style={styles.container}>
        <Text style={styles.heading}>Select Shop Category</Text>
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => onSelectCategory(category.title)}
            >
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 34,
    marginLeft: 20,
    fontFamily: "DMSansR",
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  categoryTitle: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#040D12',
    color: '#fff',
    textAlign: 'center',
    fontFamily: "DMSansR",
  },
});

export default ShopCategory;
