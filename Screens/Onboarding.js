import {
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
  LayoutAnimation
} from "react-native";
import React, { useState, useEffect } from "react";
import Logo from "../Components/Logo";
import myColors from "../myColors";
import OnBoardingContent from "../Components/OnBoardingContent";

const Onboarding = ({ navigation, route }) => {
	const width = 280;
	const height = 35;
	const [countNumber, setCountNumber] = useState(0);
	const images = [
		{
			image: require("../assets/images/onboarding/onboarding-1.png"),
			text: "YallaDone can help you with your boring daily tasks by providing you their best services that can help you save time or even take your day off to do whatever you want, instead of working",
		},
		{
			image: require("../assets/images/onboarding/onboarding-2.png"),
			text: "YallaDone can help you with your boring daily tasks by providing you their best services that can help you save time or even take your day off to do whatever you want, instead of working",
		},
		{
			image: require("../assets/images/onboarding/onboarding-3.png"),
			text: "YallaDone can help you with your boring daily tasks by providing you their best services that can help you save time or even take your day off to do whatever you want, instead of working",
		},
		{
			image: require("../assets/images/onboarding/onboarding-4.png"),
			text: "YallaDone can help you with your boring daily tasks by providing you their best services that can help you save time or even take your day off to do whatever you want, instead of working",
		},
		{
			image: require("../assets/images/onboarding/onboarding-5.png"),
			text: "YallaDone can help you with your boring daily tasks by providing you their best services that can help you save time or even take your day off to do whatever you want, instead of working",
		},
	];

	const handleNext = () => {
    LayoutAnimation.Presets.easeInEaseOut;
		setCountNumber(countNumber + 1);
	};

	const handleSkip = () => {
		navigation.navigate("Home");
	};

  const renderDots = () => {
    return (
      <View style={styles.dotsView}>
        {images.map((_, index) => (
          <View key={index} style={index === countNumber ? styles.activeDot : styles.dot} />
        ))}
      </View>
    );
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Apply transition globally
  }, [])

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.logoView}>
				<Logo width={width} height={height} />
			</View>
      <View style={styles.componentView}>
			<OnBoardingContent screen={images[countNumber]} />
      </View>
			{renderDots()}
			<View style={styles.buttonsView}>
				<TouchableOpacity>
					<Text style={styles.buttonsText} onPress={handleSkip}>
						Skip
					</Text>
				</TouchableOpacity>
				{countNumber == 4 ? (
					<TouchableOpacity>
						<Text style={styles.buttonsText} onPress={handleSkip}>
							Done
						</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity>
						<Text style={styles.buttonsText} onPress={handleNext}>
							Next
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</SafeAreaView>
	);
};

export default Onboarding;

const styles = StyleSheet.create({
	container: {
		backgroundColor: myColors.white,
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
	},
	buttonsView: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 32,
		paddingVertical: 16,
	},
	buttonsText: {
		color: myColors.blue,
		fontSize: 20,
		fontFamily: "SF-medium",
	},
	dotsView: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	dot: {
		height: 6,
		width: 6,
		backgroundColor: "black",
		margin: 8,
		borderRadius: 10,
	},
	activeDot: {
		height: 24,
		width: 6,
		backgroundColor: "black",
		margin: 8,
		borderRadius: 10,
	},
	logoView: {
		paddingTop: 16,
	},
  componentView:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:500,
  }
});
