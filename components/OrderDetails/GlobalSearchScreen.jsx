import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import OrderItemCardMain from './OrderItemCardMain';
import SlidableScreen from './SlidableScreen';

const GlobalSearchScreen = () => {
  const [showSlidableScreen, setShowSlidableScreen] = useState(false);

  const handleAddButtonClick = () => {
    setShowSlidableScreen(true);
  };

  return (
    <View style={styles.container}>
      <OrderItemCardMain onAddButtonClick={handleAddButtonClick} />
      <OrderItemCardMain onAddButtonClick={handleAddButtonClick} />
      {showSlidableScreen && <SlidableScreen />}
    </View>
  );
};

export default GlobalSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
