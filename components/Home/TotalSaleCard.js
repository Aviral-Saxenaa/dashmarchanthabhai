import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import FontLoader from '../../FontLoader';

const TotalSaleCard = ({ iconName, backgroundColor, title, iconNametwo }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Today');

  const handleDropdownPress = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);
    // Add any logic you want when an option is selected
  };

  return (
    <FontLoader>
      <View style={{ borderRadius: 10, backgroundColor: backgroundColor, height: 140, width: '97%', margin: 5, elevation: 5 }}>
        {/* First Row */}
        <View style={{ flex: 0.4, flexDirection: 'row',  }}>
          <View style={{ flex: 0.95, flexDirection: 'column', justifyContent: 'center' }}>
            <Text style={{ marginLeft: 10, textAlignVertical: 'center', color: 'white', fontFamily: "DMSansSB",fontSize:15,paddingTop:2 }}>{title}</Text>
            <View style={{ marginLeft: 10, marginTop: 5, width: 40, backgroundColor: '#574f4f', height: 1 }}></View>
          </View>
          <Icon name={iconName} style={{ textAlignVertical: 'center', fontSize: 20, color: 'white', marginRight: 1 }}></Icon>
        </View>

        {/* Second Row */}
        <View style={{ flex: 0.35, flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
          <TouchableOpacity onPress={handleDropdownPress} style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ textAlign: 'center', textAlignVertical: 'center', marginRight: 10, marginLeft: 10, fontSize: 15, fontWeight: 0, color: "#e5e5e5", fontFamily: "DMSansR" }}>{selectedOption}</Text>
            <Icon name='angle-down' style={{ fontSize: 18, color: "#e5e5e5", marginTop: 2 }}></Icon>
          </TouchableOpacity>
        </View>

        {/* Dropdown */}
        <Modal
          animationType="none"
          transparent={true}
          visible={isDropdownVisible}
          onRequestClose={() => {
            setDropdownVisible(!isDropdownVisible);
          }}
        >
          <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 155 ,marginLeft:80}}>
            <View style={{ width: 200, backgroundColor: '#332941', padding: 10, borderRadius: 10, elevation: 5}}>
              <Pressable onPress={() => handleOptionPress('Today')}>
                <Text style={{fontSize:18,color:"white",fontFamily:'DMSansR'}}>Today</Text>
              </Pressable>
              <Pressable onPress={() => handleOptionPress('Last Week')}>
                <Text style={{fontSize:18,color:"white",fontFamily:'DMSansR'}}>Last Week</Text>
              </Pressable>
              <Pressable onPress={() => handleOptionPress('Last Month')}>
                <Text style={{fontSize:18,color:"white",fontFamily:'DMSansR'}}>Last Month</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Third Row */}
        <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', marginBottom: 0, justifyContent: "space-between" }}>
          <Text style={{ textAlign: 'center', textAlignVertical: 'center', marginRight: 15, marginLeft: 10, fontSize: 25,  color: "white", fontFamily: "DMSansSB" }}>₹ 30,000</Text>
          <View style={{  backgroundColor: "#02bf61", height: 'auto', borderRadius: 10, flexDirection: "row", alignItems: "center", marginRight: 20, paddingHorizontal: 5 ,padding:2}}>
            <Icon name={iconNametwo} style={{ fontSize: 17, color: '#fff', marginRight: 6 ,padding:0}}></Icon>
            <Text style={{ fontSize: 14, fontFamily:'DMSansR',color:'#fff'}}>23% </Text>
            
          </View>
        </View>
      </View>
    </FontLoader>
  );
};

export default TotalSaleCard;
