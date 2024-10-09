import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import FontLoader from "../../FontLoader";
import Icon from 'react-native-vector-icons/Feather';

const SearchingView = () => {
  const [ripple1Opacity] = useState(new Animated.Value(0.2));
  const [ripple2Opacity] = useState(new Animated.Value(0.2));

  useEffect(() => {
    const animateRipple1 = Animated.loop(
      Animated.sequence([
        Animated.timing(ripple1Opacity, {
          toValue: 1,
          duration: 300, // Reduced duration for faster ripple
          useNativeDriver: true,
        }),
        Animated.timing(ripple1Opacity, {
          toValue: 0.2,
          duration: 300, // Reduced duration for faster ripple
          useNativeDriver: true,
        }),
      ])
    );

    const animateRipple2 = Animated.loop(
      Animated.sequence([
        Animated.timing(ripple2Opacity, {
          toValue: 1,
          duration: 300, // Reduced duration for faster ripple
          useNativeDriver: true,
        }),
        Animated.timing(ripple2Opacity, {
          toValue: 0.2,
          duration: 300, // Reduced duration for faster ripple
          useNativeDriver: true,
        }),
      ])
    );

    animateRipple1.start();
    animateRipple2.start();

    return () => {
      animateRipple1.stop();
      animateRipple2.stop();
    };
  }, [ripple1Opacity, ripple2Opacity]);

  const handleRefresh = () => {
    console.log("searching");
  };

  return (
    <FontLoader>
      <View style={styles.container}>
        <View style={styles.circle}>
          <Animated.View style={[styles.ripple, { opacity: ripple1Opacity }]} />
          <Animated.View style={[styles.ripple, { opacity: ripple2Opacity }]} />
        </View>
        <Text style={styles.text}>wait a while..searching orders</Text>
        <TouchableOpacity onPress={handleRefresh}>
          <Icon name="refresh-ccw" size={24} color="#000125" style={{backgroundColor:'#fff',borderRadius:50}} />
        </TouchableOpacity>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2048fa',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,paddingHorizontal:5,margin:10,marginTop:2
  },
  circle: {
    width: 23,
    height: 23,
    borderRadius: 46,
    overflow: 'hidden', // Clip overflowing content
    marginRight: 10,marginLeft:5
  },
  ripple: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 255, 0.2)', // Semi-transparent blue
    borderRadius: 20,
  },
  text: {
    fontSize: 15,
    color: '#3476ab',
    fontFamily: 'DMSansSB',
    flex: 1, // Add this line to make text take available space
  },
});

export default SearchingView;
