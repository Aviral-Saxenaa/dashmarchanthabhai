import React, { useState } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import FontLoader from '../../FontLoader';

const CustomSwitch = () => {
  const [isToggled, setIsToggled] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];

  const handleToggle = () => {
    Animated.timing(animatedValue, {
      toValue: isToggled ? 0 : 1,
      duration: 300,
      useNativeDriver: true
    }).start();
    setIsToggled(!isToggled);
  };

  const backgroundColorInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fa5a55', '#66be84']
  });

  return (
    <FontLoader>
    <TouchableOpacity onPress={handleToggle} style={{ flexDirection: 'row', width: 120, height: 35, borderRadius: 25, backgroundColor: backgroundColorInterpolation, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.Text style={{ position: 'absolute', left: 10, opacity: animatedValue, fontSize: 14, fontWeight: '500', color: 'white',fontFamily:"DMSansR" }}>{'ONLINE'}</Animated.Text>
      <Animated.View style={{ transform: [{ translateX: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [-39, 39] }) }] }}>
        <View style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: 'white' }} />
      </Animated.View>
      <Animated.Text style={{ position: 'absolute', right: 10, opacity: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }), fontSize: 14, fontWeight: '500', color: 'white' ,fontFamily:"DMSansR"}}>{'OFFLINE'}</Animated.Text>
    </TouchableOpacity>
    </FontLoader>
  );
};

export default CustomSwitch;
