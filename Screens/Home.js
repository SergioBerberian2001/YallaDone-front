import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { React, useState } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import myColors from "../myColors";
import ServiceHome from "../Components/ServiceHome";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NotificationsSheet from "../Components/NotificationsSheet";


const windowWidth = Dimensions.get("window").width;
const Home = () => {
	const [activeItemIndex, setActiveItemIndex] = useState(0);
	const [showNotifications, setShowNotifications] = useState(false);
	const carousel = [
		{ id: 0, image: require("../assets/images/carousel.jpeg") },
		{ id: 1, image: require("../assets/images/carousel.jpeg") },
		{ id: 2, image: require("../assets/images/splash-bg.jpg") },
	];
	const [services, setServices] = useState([
		{
			service_id: 0,
			service_name: "Car Detailing",
			service_description:
				"This service is made to help you make car detailing for your car while you are relaxed and doing your thing without worrying about it",
			category: "Car",
			price: 20.0,
			isEmergency: false,
			isFav: false,
		},
		{
			service_id: 1,
			service_name: "Oil Change",
			service_description:
				"This service is made to help you make car detailing for your car while you are relaxed and doing your thing without worrying about it",
			category: "Car",
			price: 20.0,
			isEmergency: false,
			isFav: false,
		},
		{
			service_id: 2,
			service_name: "Personal Driver",
			service_description:
				"This service is made to help you make car detailing for your car while you are relaxed and doing your thing without worrying about it",
			category: "Transportation",
			price: 20.0,
			isEmergency: false,
			isFav: false,
		},
		{
			service_id: 3,
			service_name: "Personal Driver",
			service_description:
				"This service is made to help you make car detailing for your car while you are relaxed and doing your thing without worrying about it",
			category: "Transportation",
			price: 20.0,
			isEmergency: false,
			isFav: false,
		},
		{
			service_id: 4,
			service_name: "Paperwork",
			service_description:
				"This service is made to help you make car detailing for your car while you are relaxed and doing your thing without worrying about it",
			category: "Paperwork",
			price: 20.0,
			isEmergency: false,
			isFav: false,
		},
		{
			service_id: 5,
			service_name: "Paperwork for Car",
			service_description:
				"This service is made to help you make car detailing for your car while you are relaxed and doing your thing without worrying about it",
			category: "Paperwork",
			price: 20.0,
			isEmergency: false,
			isFav: false,
		},
		{
			service_id: 6,
			service_name: "Grocery Store Delivery",
			service_description:
				"This service is made to help you make car detailing for your car while you are relaxed and doing your thing without worrying about it",
			category: "Delivery",
			price: 20.0,
			isEmergency: false,
			isFav: false,
		},
		{
			service_id: 7,
			service_name: "Package Delivery",
			service_description:
				"This service is made to help you make car detailing for your car while you are relaxed and doing your thing without worrying about it",
			category: "Delivery",
			price: 20.0,
			isEmergency: false,
			isFav: false,
		},
	]);

	const toggleNotifications = () => {
		setShowNotifications(!showNotifications);
	};

	function filterByCategory(data, category) {
		return data.filter((item) => item.category === category);
	}

	const onToggleFavorite = (serviceId, isFav) => {
		setServices(
			services.map((service) =>
				service.service_id === serviceId ? { ...service, isFav } : service
			)
		);
	};

	return (
		<GestureHandlerRootView style={styles.container}>
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.container}>
					<View style={styles.topView}>
						<MaterialCommunityIcons
							name="menu"
							color={myColors.blue}
							size={32}
						/>
						<TouchableOpacity onPress={toggleNotifications}>
							<MaterialCommunityIcons
								name="bell"
								color={myColors.blue}
								size={32}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.carouselView}>
						<FlatList
							style={styles.carousel}
							horizontal
							data={carousel}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<View style={styles.carouselImageView}>
									<Image source={item.image} style={styles.carouselImage} />
								</View>
							)}
							snapToInterval={windowWidth} // Replace with actual item width
							decelerationRate="fast"
							showsHorizontalScrollIndicator={false}
							onMomentumScrollEnd={(event) => {
								const currentIndex =
									event.nativeEvent.contentOffset.x / windowWidth;
								setActiveItemIndex(Math.floor(currentIndex));
							}}
						/>
						<View style={styles.dotsContainer}>
							{carousel.map((_, index) => (
								<View
									key={index}
									style={[
										styles.dot,
										index === activeItemIndex && styles.activeDot,
									]}
								/>
							))}
						</View>
					</View>
					<View style={styles.emergencyView}>
						<TouchableOpacity style={styles.emergencyButton}>
							<Text style={styles.emergencyText}>Emergency Services</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.serviceView}>
						<View style={styles.serviceTopView}>
							<Text style={styles.serviceText}>Car Services</Text>
							<View style={styles.serviceTopView}>
								<Text style={styles.serviceText}>See More</Text>
								<MaterialCommunityIcons
									name="arrow-right"
									color={myColors.blue}
									size={18}
								/>
							</View>
						</View>
						<View style={styles.service}>
							<FlatList
								style={styles.carousel}
								horizontal
								showsHorizontalScrollIndicator={false}
								data={filterByCategory(services, "Car")}
								keyExtractor={(item) => item.service_id.toString()}
								renderItem={({ item }) => (
									<ServiceHome
										service={item}
										onToggleFavorite={onToggleFavorite}
									/>
								)}
							/>
						</View>
					</View>
					<View style={styles.serviceView}>
						<View style={styles.serviceTopView}>
							<Text style={styles.serviceText}>Transportation Services</Text>
							<View style={styles.serviceTopView}>
								<Text style={styles.serviceText}>See More</Text>
								<MaterialCommunityIcons
									name="arrow-right"
									color={myColors.blue}
									size={18}
								/>
							</View>
						</View>
						<View style={styles.service}>
							<FlatList
								style={styles.carousel}
								horizontal
								showsHorizontalScrollIndicator={false}
								data={filterByCategory(services, "Transportation")}
								keyExtractor={(item) => item.service_id.toString()}
								renderItem={({ item }) => (
									<ServiceHome
										service={item}
										onToggleFavorite={onToggleFavorite}
									/>
								)}
							/>
						</View>
					</View>
					<View style={styles.serviceView}>
						<View style={styles.serviceTopView}>
							<Text style={styles.serviceText}>Paperwork Services</Text>
							<View style={styles.serviceTopView}>
								<Text style={styles.serviceText}>See More</Text>
								<MaterialCommunityIcons
									name="arrow-right"
									color={myColors.blue}
									size={18}
								/>
							</View>
						</View>
						<View style={styles.service}>
							<FlatList
								style={styles.carousel}
								horizontal
								showsHorizontalScrollIndicator={false}
								data={filterByCategory(services, "Paperwork")}
								keyExtractor={(item) => item.service_id.toString()}
								renderItem={({ item }) => (
									<ServiceHome
										service={item}
										onToggleFavorite={onToggleFavorite}
									/>
								)}
							/>
						</View>
					</View>
					<View style={styles.serviceView}>
						<View style={styles.serviceTopView}>
							<Text style={styles.serviceText}>Delivery Services</Text>
							<View style={styles.serviceTopView}>
								<Text style={styles.serviceText}>See More</Text>
								<MaterialCommunityIcons
									name="arrow-right"
									color={myColors.blue}
									size={18}
								/>
							</View>
						</View>
						<View style={styles.service}>
							<FlatList
								style={styles.carousel}
								horizontal
								showsHorizontalScrollIndicator={false}
								data={filterByCategory(services, "Delivery")}
								keyExtractor={(item) => item.service_id.toString()}
								renderItem={({ item }) => (
									<ServiceHome
										service={item}
										onToggleFavorite={onToggleFavorite}
									/>
								)}
							/>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
			{ showNotifications && <NotificationsSheet onToggle={toggleNotifications}/>}
		</GestureHandlerRootView>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	topView: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		padding: 8,
	},
	carouselImageView: {
		width: windowWidth,
		paddingVertical: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	carouselImage: {
		width: "90%",
		height: 180,
		borderRadius: 10,
	},

	dotsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginBottom: 8,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 5,
		marginHorizontal: 3,
		backgroundColor: myColors.red,
	},
	activeDot: {
		backgroundColor: myColors.blue,
	},
	emergencyView: {
		width: "100%",
		alignItems: "center",
		marginVertical: 8,
	},
	emergencyButton: {
		alignItems: "center",
		paddingVertical: 16,
		paddingHorizontal: 24,
		borderRadius: 10,
		backgroundColor: myColors.red,
	},
	emergencyText: {
		fontFamily: "SF-bold",
		color: "white",
		fontSize: 24,
	},
	serviceView: {
		width: "100%",
	},
	serviceTopView: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 8,
		marginVertical: 4,
	},
	serviceText: {
		color: myColors.blue,
		fontFamily: "SF-medium",
		fontSize: 16,
	},
	service: {
		// shadowColor: "#000000",
		// shadowOpacity: 0.5,
		// shadowRadius: 5,
		// shadowOffset: { width: 3, height: 3 },
	},
});
