import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useMyColorTheme } from '../utils/ThemeContext'
import { myColors, myDarkColors } from '../utils/myColors'
const Category = () => {
const { isDarkMode } = useMyColorTheme();
const theme = isDarkMode ? dark : styles;
  return (
    <View>
      <Text>Category</Text>
    </View>
  )
}

export default Category

const styles = StyleSheet.create({})
const dark = StyleSheet.create({})