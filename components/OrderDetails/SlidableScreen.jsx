import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component
import ShopBar from './ShopBar';
import FontLoader from '../../FontLoader';

const WeightOrder = ({ weight, onPress, isSelected }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, isSelected ? styles.selected : null]}>
        <Text style={styles.text}>{weight}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SlidableScreen = () => {
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [isContentHidden, setContentHidden] = useState(false);

  const handleWeightOrderPress = (weight) => {
    setSelectedWeight(weight);
  };

  const toggleContentVisibility = () => {
    setContentHidden(!isContentHidden);
  };

  return (
    <FontLoader>
    <View style={{marginTop: 40,backgroundColor:"#F6F0F0",borderTopLeftRadius: 40,borderTopRightRadius: 40,elevation: 15,}}>
      <TouchableOpacity onPress={toggleContentVisibility}>
        <Icon name={isContentHidden ? "chevron-down-circle" : "chevron-up-circle"} size={30} color="#E68943" style={{marginBottom: 20, textAlign: "center"}} />
      </TouchableOpacity>
      {!isContentHidden && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', marginHorizontal: 20, marginBottom: 20 }}>
            <WeightOrder
              weight={"44gm"}
              onPress={() => handleWeightOrderPress("44gm")}
              isSelected={selectedWeight === "44gm"}
            />
            <WeightOrder
              weight={"120gm"}
              onPress={() => handleWeightOrderPress("120gm")}
              isSelected={selectedWeight === "120gm"}
            />
            <WeightOrder
              weight={"400gm"}
              onPress={() => handleWeightOrderPress("400gm")}
              isSelected={selectedWeight === "400gm"}
            />
            <WeightOrder
              weight={"500gm"}
              onPress={() => handleWeightOrderPress("500gm")}
              isSelected={selectedWeight === "500gm"}
            />
            <WeightOrder
              weight={"600gm"}
              onPress={() => handleWeightOrderPress("600gm")}
              isSelected={selectedWeight === "600gm"}
            />
          </View>
        </ScrollView>
      )}
      {!isContentHidden && (
        <ScrollView vertical showsVerticalScrollIndicator={false} style={{height: 315}}>
          <ShopBar/>
          <ShopBar/>
          <Text style={{fontFamily: "DMSansR", textAlign: "center", marginTop: 10}}>Explore More Shops ...
          <Icon name="chevron-down-sharp" size={20} color="#E68943" /></Text>
          <ShopBar/>
          <ShopBar/>
        </ScrollView>
      )}
    </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 13,
    borderColor: '#E68943', // Add border color here
    borderWidth: 1, // Add border width if needed
    
  },
  text: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  selected: {
    backgroundColor: '#E68943',
  },
});

export default SlidableScreen;
