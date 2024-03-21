import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'

const Signup = () => {
  return (
    <ImageBackground
			source={require("../assets/images/splash-bg.jpg")}
			style={styles.background}
		>
      </ImageBackground>
  )
}

export default Signup

const styles = StyleSheet.create({
  background: {
		flex: 1,
		width: "100%",
		opacity: 1,
	},
})