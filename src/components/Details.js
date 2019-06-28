import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { toaster } from './Toaster';

type Props = {};
export default class Details extends Component<Props> {
    
  constructor(props) {
    super(props);

    this.displayChartPoints = this.displayChartPoints.bind(this);
  }
  
  displayChartPoints(value, dataset, getColor) {
    alert(value);
  }

  render() {
    let sampleData = [
      {
        seriesName: 'series1',
        data: [
          {x: '2018-02-01', y: 30},
          {x: '2018-02-02', y: 200},
          {x: '2018-02-03', y: 170},
          {x: '2018-02-04', y: 250},
          {x: '2018-02-05', y: 10}
        ],
        color: '#297AB1'
      },
      {
        seriesName: 'series2',
        data: [
          {x: '2018-02-01', y: 20},
          {x: '2018-02-02', y: 100},
          {x: '2018-02-03', y: 140},
          {x: '2018-02-04', y: 550},
          {x: '2018-02-05', y: 40}
        ],
        color: 'yellow'
      }
    ];

    return (
      <View style={styles.container}>
        <Text>Detalles</Text>
        <LineChart onDataPointClick={(value, dataset, getColor) => this.displayChartPoints}
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ],
              color: (opacity = 1) => `rgba(204, 68, 39, ${opacity})`, // optional
              strokeWidth: 2 // optional
            },{
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ],
              color: (opacity = 1) => `rgba(39, 66, 204, ${opacity})`, // optional
              strokeWidth: 2 // optional
            }],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel={'$'}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  }
});