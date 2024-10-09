import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontLoader from '../../FontLoader';

const Card = ({ iconName, backgroundColor, rotationDegree, title, textBg, mainText, subTitle, iconName1 }) => {
    return (
        <FontLoader>
        <TouchableOpacity style={{ width: '50%' }} activeOpacity={0.9} >
          <View
            style={{
              borderRadius: 10,
              backgroundColor: backgroundColor,
              margin: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            {/* First Row */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingTop: 5
                }}
              >
                <Text
                  style={{
                    marginLeft: 5,
                    textAlignVertical: "center",
                    color: "white",
                    fontFamily: "DMSansR",
                    fontSize: 14,
                    backgroundColor: textBg,
                    paddingHorizontal: 5,
                    textAlign: 'left',
                    alignSelf: "flex-start",
                    paddingVertical: 3,
                    borderRadius: 8
                  }}
                >
                  {title}
                </Text>
                <View
                  style={{
                    marginLeft: 10,
                    marginTop: 5,
                    width: 40,
                    backgroundColor: textBg,
                    height: 1,
                  }}
                ></View>
              </View>
              {iconName1 ? (
                <Icon1
                  name={iconName1}
                  style={{
                    textAlignVertical: 'top',
                    fontSize: 25,
                    color: "transparent",
                    marginRight: 1,
                    transform: [{ rotate: `${rotationDegree}deg` }],
                    marginRight: 5,marginTop:5
                  }}
                />
              ) : (
                <Icon
                  name={iconName}
                  style={{
                    textAlignVertical: 'top',
                    fontSize: 25,
                    color: "transparent",
                    marginRight: 1,
                    transform: [{ rotate: `${rotationDegree}deg` }],
                    marginRight: 5
                  }}
                />
              )}
            </View>
            {/* Second Row */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                paddingVertical: 8,
                paddingHorizontal: 10
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  textAlignVertical: "center",
                  marginRight: 10,
                  marginLeft: 5,
                  fontSize: 30,
                  color: "white",
                  fontFamily: "DMSansB",
                  letterSpacing: -0.2
                }}
              >
                {mainText}
              </Text>
  
              <View
                style={{ backgroundColor: "#eae2b7", width: 1, height: 40 }}
              ></View>
              <Text
                style={{
                  textAlign: "center",
                  textAlignVertical: "center",
                  marginLeft: 10,
                  fontSize: 20,
                  color: "#F4F4F4",
                  fontFamily: "DMSansR",
                  letterSpacing: -0.5
                }}
              >
                ₹ {subTitle}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </FontLoader>
    )
}

export default Card;