import { StyleSheet, Text, View, ImageBackground,ActivityIndicator,useWindowDimensions } from 'react-native'
import React from 'react';
import Logo from './Logo';
import myColors from '../utils/myColors';

const Loading = () => {
    const { width } = useWindowDimensions();
	const height = width / 8;
  return (
    <ImageBackground
				source={require("../assets/images/splash-bg.jpg")}
				style={styles.backgroundLoading}
			>
				<Logo width={width * 0.9} height={height * 0.9} />
				<ActivityIndicator size="large" color={myColors.white} />
			</ImageBackground>
  )
}

export default Loading

const styles = StyleSheet.create({
    backgroundLoading: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-evenly",
	},
})