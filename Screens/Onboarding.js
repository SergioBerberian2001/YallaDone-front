import {
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	LayoutAnimation,
	FlatList,
	Animated,
	Pressable,
	ActivityIndicator,
} from "react-native";
import React, { useState, useRef } from "react";
import Logo from "../Components/Logo";
import { myColors, myDarkColors } from "../utils/myColors";
import OnBoardingContent from "../Components/OnBoardingContent";
import Paginator from "../Components/Paginator";
import { useMyColorTheme } from "../utils/ThemeContext";

const Onboarding = ({ navigation, route }) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const slidesInfo = route.params;
	const width = 280;
	const height = 35;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLast, setIsLast] = useState(false);
	const scrollX = useRef(new Animated.Value(0)).current;
	const slidesRef = useRef(null);

	const viewableItemsChanged = useRef(({ viewableItems }) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	const scrollTo = () => {
		if (currentIndex < slidesInfo.length - 1) {
			slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
			if (currentIndex === 3) {
				setIsLast(true);
			}
		} else {
			handleNavigation();
		}
	};

	const handleNavigation = () => {
		navigation.navigate("DrawerScreen");
	};

	if (!slidesInfo) {
		return (
			<SafeAreaView style={theme.container}>
				<ActivityIndicator size="large" color="#00ff00" />
			</SafeAreaView>
		);
	}
	return (
		<SafeAreaView style={theme.container}>
			<View style={theme.logo}>
				<Logo width={width} height={height} />
			</View>
			<View style={theme.listView}>
				<FlatList
					data={slidesInfo}
					renderItem={({ item }) => <OnBoardingContent item={item} />}
					horizontal
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					bounce={false}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{ useNativeDriver: false }
					)}
					scrollEventThrottle={32}
					onViewableItemsChanged={viewableItemsChanged}
					viewabilityConfig={viewConfig}
					ref={slidesRef}
				/>
			</View>

			<Paginator data={slidesInfo} scrollX={scrollX} />

			<View style={theme.bottomView}>
				<TouchableOpacity style={theme.buttons} onPress={handleNavigation}>
					<Text style={theme.buttonsText}>Skip</Text>
				</TouchableOpacity>
				{isLast ? (
					<TouchableOpacity onPress={handleNavigation} style={theme.buttons}>
						<Text style={theme.buttonsText}>Done</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={scrollTo} style={theme.buttons}>
						<Text style={theme.buttonsText}>Next</Text>
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
		justifyContent: "space-around",
		alignItems: "center",
		paddingVertical: 20,
	},
	logo: {
		marginVertical: 12,
	},
	listView: {
		flex: 2,
	},
	bottomView: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
	},
	buttonsText: {
		fontFamily: "SF-medium",
		fontSize: 18,
		color: myColors.blue,
	},
	buttons: {
		padding: 6,
	},
});

const dark = StyleSheet.create({
	container: {
		backgroundColor: myDarkColors.white,
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
		paddingVertical: 20,
	},
	logo: {
		marginVertical: 12,
	},
	listView: {
		flex: 2,
	},
	bottomView: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
	},
	buttonsText: {
		fontFamily: "SF-medium",
		fontSize: 18,
		color: myDarkColors.blue,
	},
	buttons: {
		padding: 6,
	},
});
