// FontLoader.js

import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';

const FontLoader = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'DMSansR': require('./assets/fonts/DMSans-Regular.ttf'),
        'DMSansSB': require('./assets/fonts/DMSans-SemiBold.ttf'),
        'DMSansB': require('./assets/fonts/DMSans-Bold.ttf'),
        
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return null; // or a loading indicator
  }

  return <>{children}</>;
};

export default FontLoader;
