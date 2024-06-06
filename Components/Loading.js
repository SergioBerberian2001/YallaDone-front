import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	ActivityIndicator,
	useWindowDimensions,
	Animated,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Logo from "./Logo";
import { myColors, myDarkColors } from "../utils/myColors";

const Loading = (props) => {
	const { isSplash, isNew, onLogin, onSignup } = props;
	const { width } = useWindowDimensions();
	const height = width / 8;

	// Animated values
	const logoOpacity = useRef(new Animated.Value(0)).current;
	const textOpacity = useRef(new Animated.Value(0)).current;
	const indicatorOpacity = useRef(new Animated.Value(0)).current;

	isSplash &&
		useEffect(() => {
			// Sequence of animations
			Animated.sequence([
				// Logo fade in
				Animated.timing(logoOpacity, {
					toValue: 1,
					duration: 800,
					useNativeDriver: true,
				}),
				// Text fade in
				Animated.timing(textOpacity, {
					toValue: 1,
					duration: 800,
					useNativeDriver: true,
				}),
				// Delay for activity indicator
				Animated.delay(800),
				// Activity indicator fade in
				Animated.timing(indicatorOpacity, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true,
				}),
			]).start();
		}, [logoOpacity, textOpacity, indicatorOpacity]);

	return (
		<ImageBackground
			source={require("../assets/images/splash-bg.jpg")}
			style={styles.backgroundLoading}
		>
			<Animated.View
				style={[styles.logoView, isSplash && { opacity: logoOpacity }]}
			>
				<Logo width={width * 0.9} height={height * 0.9} />
			</Animated.View>
			{isSplash && (
				<Animated.View
					style={[styles.textView, isSplash && { opacity: textOpacity }]}
				>
					<Text style={styles.text}>Focus on what matters</Text>
					<Text style={styles.text}>We handle the rest.</Text>
				</Animated.View>
			)}
			{isNew ? (
				<Animated.View
					style={[
						styles.buttonsView,
						isSplash && { opacity: indicatorOpacity },
					]}
				>
					<TouchableOpacity style={styles.buttons} onPress={onSignup}>
						<Text style={styles.buttonsText}>Sign up</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.buttons} onPress={onLogin}>
						<Text style={styles.buttonsText}>Sign in</Text>
					</TouchableOpacity>
				</Animated.View>
			) : (
				<Animated.View
					style={[
						styles.indicatorView,
						isSplash && { opacity: indicatorOpacity },
					]}
				>
					<ActivityIndicator size="large" color={myColors.white} />
				</Animated.View>
			)}
		</ImageBackground>
	);
};

export default Loading;

const styles = StyleSheet.create({
	backgroundLoading: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: "25%",
	},
	text: {
		fontFamily: "SF-bold",
		color: "#FFFFFF",
		fontSize: 26,
	},
	logoView: {
		flex: 0.3,
		paddingBottom: "10%",
		justifyContent: "center",
	},
	textView: {
		flex: 0.3,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	buttonsView: {
		flex: 0.4,
		width: "100%",
		justifyContent: "flex-end",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	indicatorView: {
		flex: 0.4,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	buttons: {
		backgroundColor: "#FFFFFF",
		width: "100%",
		alignItems: "center",
		marginBottom: 16,
		padding: 24,
		borderRadius: 8,
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
	},
	buttonsText: {
		fontFamily: "SF-bold",
		color: "#2F3D7E",
		fontSize: 18,
	},
});
