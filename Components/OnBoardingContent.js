import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import myColors from '../myColors';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const OnBoardingContent = ({ item }) => {

  
    return (
      <View style={[styles.container, {SCREEN_WIDTH}]}>
        <Image
          source={item.image}
          style={[styles.image, {SCREEN_WIDTH, resizeMode:'contain'}]}
        />
        
        <View style={{flex:0.3}}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    paddingHorizontal: 16,
  },
  image: {
    flex:0.7,
    justifyContent:"center",
  },
  text: {
    fontSize: 20,
    fontFamily: 'SF-medium', 
    textAlign: 'center', 
    color:myColors.blue
  },
});

export default OnBoardingContent;
