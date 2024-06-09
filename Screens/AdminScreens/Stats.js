import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';

const Stats = () => {
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://192.168.1.100:5000/analyze')
      .then(response => {
        setAnalysis(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return (
      <SafeAreaView>
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  if (!analysis) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
    <ScrollView>
      <Text>Number of users: {analysis['Number of users']}</Text>
      <Text>Average age of users: {analysis['Average age of users']}</Text>
      <Text>Best-selling service: {analysis['Best-selling service']}</Text>
      <Text>Most frequent city using the app: {analysis['Most frequent city using the app']}</Text>
      <Text>Most Popular Payment Method: {analysis['Most Popular Payment Method']}</Text>

      <Text>Monthly Income:</Text>
      {Object.entries(analysis['Monthly Income']).map(([month, income]) => (
        <Text key={month}>{month}: {income}</Text>
      ))}

      <Text>Daily Income:</Text>
      {Object.entries(analysis['Daily Income']).map(([day, income]) => (
        <Text key={day}>{day}: {income}</Text>
      ))}

      <Text>Payment Methods Count:</Text>
      {Object.entries(analysis['Payment Methods Count']).map(([method, count]) => (
        <Text key={method}>{method}: {count}</Text>
      ))}
    </ScrollView></SafeAreaView>
  );
}

export default Stats;