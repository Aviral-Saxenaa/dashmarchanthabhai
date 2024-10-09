import React from 'react';
import { View } from 'react-native';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import FontLoader from '../../FontLoader';

const screenWidth = Dimensions.get('window').width;

const Barchart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [33, 45, 28, 80, 99, 43],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#000125', // Light cyan
    backgroundGradientTo: '#000125',   // Lighter cyan
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(250, 250, 250, ${opacity})`,  // Teal bars
    labelColor: (opacity = 1) => `rgba(250, 250, 250, ${opacity})`, // Black labels
    barPercentage: 0.5,
    propsForLabels: {
      fontFamily: 'DMSansR',
      fontSize: 12,
    },
  };

  return (
    <FontLoader>
    <View>
      <LineChart
        data={data}
        width={screenWidth - 30}
        height={220}
        yAxisLabel="₹ "
        chartConfig={chartConfig}
        verticalLabelRotation={15}
        style={{ marginVertical: 8, borderRadius: 10, paddingRight: 40,fontFamily:'DMSansSB' }}
        bezier
      />
    </View>
    </FontLoader>
  );
};

export default Barchart;
