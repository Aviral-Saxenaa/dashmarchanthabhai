import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import NavBar from "../components/Home/NavBar";
import FontLoader from "../FontLoader";
import Cardtwo from "../components/Home/Cardtwo";
import TotalSaleCard from "../components/Home/TotalSaleCard";
import DashRecommendCard from "../components/Home/DashRecommendCard";
import Barchart from "../components/Home/Barchart";
import BottomTabBar from "../components/BottomTabBar";

const StatsScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Last 6 Months");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    toggleModal();
    // Perform any additional actions based on the selected option
  };

  return (
    <FontLoader>
      <StatusBar backgroundColor="#000125" barStyle="light-content" />
      <NavBar />
      <View style={{height:'100%',backgroundColor:'#e7ecef'}}>

     
      <ScrollView
        style={{flex:1,backgroundColor:'#f3f4f6'}}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: "#000125",
           
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            paddingTop: 10,
         paddingBottom:50,paddingTop:15
          }}
        >
          <View style={{ alignItems: "center",backgroundColor:'#000125',paddingBottom:20 }}>
            <TotalSaleCard
              backgroundColor="#2d3683"
              iconName="money-bill-transfer"
              title="Total Sale"
              iconNametwo="angles-up"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}
          >
            <Cardtwo
              backgroundColor="#316bdf"
              iconName="arrow-down-circle"
              rotationDegree={45}
              title="Average Order Value"
              textBg="#2756b2" 
              mainText='2' 
              subTitle="600"
            />
            <Cardtwo
              backgroundColor="#f86d46"
              iconName="progress-check"
              rotationDegree={0}
              title="Minimum Order Value"
              textBg="#c65738" 
              mainText='2' 
              subTitle="600"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 0,
              paddingHorizontal: 5,
            }}
          >
            <Cardtwo
              backgroundColor="#35a99a"
              iconName="close-circle"
              rotationDegree={0}
              title="Total Products"
              textBg="#2a877b" 
              mainText='2' 
              subTitle="600"
            />
            <Cardtwo
              backgroundColor="#8bcb41"
              iconName="close-circle"
              rotationDegree={0}
              title="New Customer"
              textBg="#6fa234" 
              mainText='2' 
              subTitle="600"
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 80,
            // height: "45%",
          }}
        >
          {/* <DashRecommendCard
            backgroundColor="#131927"
            iconName="recommend"
            rotationDegree={0}
            title="Dash Recommendations"
          /> */}
          {/* Dropdown */}
          <View
            style={{
              flex: 1,
              paddingTop: 20,
              paddingBottom: 30,
            }}
          >
            <TouchableOpacity onPress={toggleModal}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 18,
                    marginRight: 10,
                    fontFamily:'DMSansSB'
                  }}
                >
                  {selectedOption}
                </Text>
                <Icon
                  name="arrow-down-drop-circle-outline"
                  style={{ fontSize: 18, color: "black", marginTop: 5 }}
                />
              </View>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={toggleModal}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                    elevation: 5,
                  }}
                >
                  <Pressable
                    onPress={() => handleOptionSelect("Last Month")}
                    style={{ paddingVertical: 10 }}
                  >
                    <Text>Last Month</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleOptionSelect("Last 3 Months")}
                    style={{ paddingVertical: 10 }}
                  >
                    <Text>Last 3 Months</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleOptionSelect("Last 6 Months")}
                    style={{ paddingVertical: 10 }}
                  >
                    <Text style={{fontFamily:'DMSansSB'}}>Last 6 Months</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            {/* Barchart component */}
            <Barchart />
          </View>
        </View>
      
      </ScrollView>
      </View>
    </FontLoader>
  );
};

export default StatsScreen;
