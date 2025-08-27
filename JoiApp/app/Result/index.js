import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useRouter } from 'expo-router';
import styles from './styles';

const { width } = Dimensions.get('window');

const ResultScreen = () => {
  const router = useRouter();

  // GAD-2 data
  const gad2Data = {
    labels: ['Session 1', 'Session 2', 'Session 3'],
    datasets: [
      {
        data: [2.0, 1.0, 1.0],
        color: (opacity = 1) => `rgba(147, 51, 234, ${opacity})`, // Purple line
        strokeWidth: 3,
      },
      {
        data: [1.0, 1.0, 1.9],
        color: (opacity = 1) => `rgba(220, 38, 38, ${opacity})`, // Red line
        strokeWidth: 3,
      },
    ],
  };

  // PHQ-2 data
  const phq2Data = {
    labels: ['Session 1', 'Session 2', 'Session 3'],
    datasets: [
      {
        data: [2.0, 2.0, 1.0],
        color: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`, // Gray line
        strokeWidth: 3,
      },
      {
        data: [2.0, 1.0, 1.0],
        color: (opacity = 1) => `rgba(234, 179, 8, ${opacity})`, // Yellow line
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
    },
    yAxisInterval: 0.5,
    fromZero: true,
    yAxisSuffix: '',
    yAxisLabel: '',
    formatYLabel: (value) => value.toString(),
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with blue background and light container for text */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContentContainer}>
          <Text style={styles.headerText}>Result</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* GAD-2 Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>GAD-2 Results</Text>
          <LineChart
            data={gad2Data}
            width={width - 40}
            height={160}
            chartConfig={chartConfig}
            bezier={false}
            style={styles.chart}
          />
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#9333ea' }]} />
              <Text style={styles.legendText}>지난 2주 동안, 너무 불안하거나 걱정이 많아서 괴로기 어려웠습니까?</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#dc2626' }]} />
              <Text style={styles.legendText}>지난 2주 동안, 너무 많은 걱정때문에 여러 가지 일에 집중하지 어려웠습니까?</Text>
            </View>
          </View>
        </View>

        {/* PHQ-2 Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>PHQ-2 Results</Text>
          <LineChart
            data={phq2Data}
            width={width - 40}
            height={160}
            chartConfig={chartConfig}
            bezier={false}
            style={styles.chart}
          />
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#6b7280' }]} />
              <Text style={styles.legendText}>지난 2주 동안 업무나 다른 활동을 할 때마다 즐거움의 전혀 없었습니까?</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#eab308' }]} />
              <Text style={styles.legendText}>지난 2주 동안 우울하거나, 절망적이거나, 희망이 없다고 느꼈습니까?</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Continue button at bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push('/survey')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResultScreen;