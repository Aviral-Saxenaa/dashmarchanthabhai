// StoreCategory.js
import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Alert, Text, Image, PermissionsAndroid } from "react-native";
import FontLoader from "../../FontLoader";

const StoreCategory = ({ categories, onSelectCategory }) => {
  const [selectedView, setSelectedView] = useState(categories[0]?.name || "All"); // Set the default category name

  const handleCategoryClick = (category) => {
    setSelectedView(category.name);
    onSelectCategory(category.name === "All" ? "" : category.name); // Pass empty string for "All" category
    Alert.alert(`You clicked category: ${category.name}`);
  };

  return (
    <FontLoader>
      <View style={{ backgroundColor:"#000125",paddingTop:5,paddingBottom:5,marginBottom:5}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Add "All" category */}
          <TouchableOpacity onPress={() => handleCategoryClick({ name: "All" })}>
            <View style={styles.categoryItem}>
              <Image
                style={styles.categoryImage}
                source={{ uri: "https://i.postimg.cc/QMT9L0JY/Blue-and-Grey-Minimalist-Elegant-Online-Shop-Logo.png" }}
              />
             
            </View>
            <Text style={[styles.categoryText, { fontFamily: selectedView === "All" ? "DMSansSB" : "DMSansR" }]}>All</Text>
          </TouchableOpacity>
          {/* Map through categories */}
          {categories.map((category) => (
            <TouchableOpacity key={category.name} onPress={() => handleCategoryClick(category)}>
              <View style={styles.categoryItem}>
                <Image style={styles.categoryImage} source={{ uri: category.image }} />
               
              </View>
              <Text style={[styles.categoryText, { fontFamily: selectedView === category.name ? "DMSansSB" : "DMSansR" }]}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </FontLoader>
  );
};

const styles = {
  categoryItem: {
    borderWidth: 0.1,
    borderColor: "e5e8fa",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    overflow: "hidden",
    height: 55,
    width: 55,
    marginHorizontal: 10,
    marginTop: 8,
    backgroundColor: "white",
    
    elevation: 0,borderWidth:0.3,padding:0
  },
  categoryImage: {
    height: "100%",
    width: "100%",
    zIndex: -1,
    resizeMode: "contain",
  },
  categoryText: {
    backgroundColor: "transparent",
    marginTop: 0,
    fontSize:12,alignSelf:'center',
    fontFamily: "DMSansR",
    alignSelf: "center",
    color: "#efefef",
  },
};

export default StoreCategory;
