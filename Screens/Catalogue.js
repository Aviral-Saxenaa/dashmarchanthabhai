
import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, } from 'react-native';
import { Client, Databases, Query } from 'appwrite'; // Import the Query module
import { SafeAreaView, StatusBar, Dimensions } from 'react-native';
// import { useState } from 'react';
import NavBarCatalogue from '../components/Catalogue/NavBarCatalogue';

import SearchBarCatalogue from '../components/Catalogue/SearchBarCatalogue';
import CatalogueCategory from '../components/Catalogue/CatalogueCategory';

import CatalogueItemCard from '../components/Catalogue/CatalogueItemCard';
import FontLoader from '../FontLoader';
const { width } = Dimensions.get('window');




const StoreScreen = () => {

//-------------------------test---------------------------------------------------
 const storeid = '200';
const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  console.log(storeid)

  // ----------------------Manually Set the storeid ------------------------
  // const [storeid, setStoreid] = useState('');

  // useEffect(() => {
  //   setStoreid('020');
  // }, []); // Run this once on mount to set the initial value of storeid
  
  // ------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      const client = new Client();
      client.setEndpoint('https://cloud.appwrite.io/v1');
      client.setProject('65773c8581b895f83d40');

      const databases = new Databases(client);
      const collectionId = 'ItemsDB';

      try {
        const response = await databases.listDocuments(
          'data-level-1',
          collectionId,
          [Query.search("SPrice", storeid)]
        );

        console.log(response);
        setItems(response.documents);

        const uniqueCategories = Array.from(new Set(response.documents.map((item) => item['Item-Category'])));
        const categoryData = uniqueCategories.map((category) => ({
          name: category,
          image: response.documents.find((item) => item['Item-Category'] === category)['Category-Image'],
        }));

        setCategories(categoryData);
        setSelectedCategory(categoryData[0]?.name || '');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [storeid]); // Run this whenever storeid changes

  const filteredItems = selectedCategory ? items.filter((item) => item['Item-Category'] === selectedCategory) : items;




//-------------------------test closed---------------------------------------------------


    // const [selectedCategory, setSelectedCategory] = useState(null);
    return (
      <FontLoader>
        <SafeAreaView style={{ flex: 1,backgroundColor:'#f2f2f2' }}>
            <StatusBar backgroundColor="#000125" barStyle="light-content" />
            
            <NavBarCatalogue storeName="Bigbasket" />
            <SearchBarCatalogue/>
            <CatalogueCategory categories={categories} onSelectCategory={setSelectedCategory}/>

            {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : items.length === 0 ? (
        <Text>No items found.</Text>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => {
            const spriceArray = item['SPrice'].split(',').map(pair => pair.split(':'));
            const valueForStore = spriceArray.find(pair => pair[0] === storeid);
            const valueStore = valueForStore ? valueForStore[1] : null;

            return (
              <CatalogueItemCard
                id={item.$id}
                pid={item['Item-ID']}
                title={item['Item-Name']}
                price={valueStore}
                discountPrice={item['Item-MRP']}
                image={item['Item-Image']}
                weight={item['Item-Weight']}
              />
            );
          }}
        />
      )}
            

            {/* Rest of your screen components go here */}
        </SafeAreaView>
        </FontLoader>
    );
};

export default StoreScreen;
