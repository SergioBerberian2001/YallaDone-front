import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const OnBoardingContent = ({ screen }) => {

  
    return (
      <View style={styles.view}>
        <Image
          source={screen.image}
          style={styles.image}
        />
        <Text style={styles.text}>{screen.text}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:500,
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: '70%',
    
  },
  text: {
    fontSize: 20,
    fontFamily: 'SF', 
    textAlign: 'center', 
  },
});

export default OnBoardingContent;
