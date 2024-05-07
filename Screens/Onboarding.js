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
import myColors from "../myColors";
import OnBoardingContent from "../Components/OnBoardingContent";
import slides from "../assets/data/slides";
import Paginator from "../Components/Paginator";

const Onboarding = ({ navigation, route }) => {
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
		if (currentIndex < slides.length - 1) {
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

	if (!slides) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size="large" color="#00ff00" />
			</SafeAreaView>
		);
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.logo}>
				<Logo width={width} height={height} />
			</View>
			<View style={styles.listView}>
				<FlatList
					data={slides}
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

			<Paginator data={slides} scrollX={scrollX} />

			<View style={styles.bottomView}>
				<TouchableOpacity style={styles.buttons} onPress={handleNavigation}>
					<Text style={styles.buttonsText}>Skip</Text>
				</TouchableOpacity>
				{isLast ? (
					<TouchableOpacity onPress={handleNavigation} style={styles.buttons}>
						<Text style={styles.buttonsText}>Done</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={scrollTo} style={styles.buttons}>
						<Text style={styles.buttonsText}>Next</Text>
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
