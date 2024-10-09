// StoreCategory.js
import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Alert, Text, Image } from 'react-native';
import FontLoader from '../../FontLoader';

const CatalogueCategory = ({ categories, onSelectCategory }) => {
  const [selectedView, setSelectedView] = useState(categories[0]?.name || ''); // Set the default category name

  const handleCategoryClick = (category) => {
    setSelectedView(category.name);
    onSelectCategory(category.name);
    Alert.alert(`You clicked category: ${category.name}`);
  };

  return (
    <FontLoader>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ backgroundColor: '#f2f2f2', maxHeight: 110 }}>
      {categories.map((category) => (
        <TouchableOpacity key={category.name} onPress={() => handleCategoryClick(category)}>
          <View style={{ margin: 10 }}>
            <View style={{ width: 55, height: 55, borderWidth: 1, borderColor: selectedView === category.name ? 'black' : 'lightgray', justifyContent: 'center', alignItems: 'center', borderRadius: 10, overflow: 'hidden' }}>
              {/* Use the source prop of Image component to set the background image */}
              <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', position: 'absolute', zIndex: -1 }} source={{ uri: category.image }} />
            </View>
            <Text style={{ textAlign: 'center', marginTop: 0,fontFamily:"DMSansR" }}>{category.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </FontLoader>
  );
};

export default CatalogueCategory;
