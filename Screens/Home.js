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
	ActivityIndicator,
	useWindowDimensions,
} from "react-native";
import { React, useState, useEffect, useContext, useCallback } from "react";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import { myColors, myDarkColors } from "../utils/myColors";
import ServiceHome from "../Components/ServiceHome";
import Logo from "../Components/Logo";
import { useNavigation } from "@react-navigation/native";
import Popup from "../Components/Popup";
import axios from "axios";
import Loading from "../Components/Loading";
import popupModes from "../utils/PopupModes";
import UserContext from "../utils/UserContext";
import { getBearerToken } from "../utils/bearer";
import { useFocusEffect } from "@react-navigation/native";
import { useMyColorTheme } from "../utils/ThemeContext";
import CarouselListItem from "../Components/CarouselListItem";

const windowWidth = Dimensions.get("window").width;
const Home = ({ navigation, route }) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const { user, clearUser } = useContext(UserContext);
	const { width } = useWindowDimensions();
	const height = width / 8;
	const [isLoading, setIsLoading] = useState(true);
	const [services, setServices] = useState();
	const navigations = useNavigation();
	const [reload, setReload] = useState(true);
	const [newsItems, setNewsItems] = useState([]);
	const [activeItemIndex, setActiveItemIndex] = useState(0);
	const carousel = [
		{ id: 0, image: require("../assets/images/detailing-wash.jpg") },
		{ id: 1, image: require("../assets/images/carousel.jpeg") },
		{ id: 2, image: require("../assets/images/detailing-wash.jpg") },
	];
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupData, setPopupData] = useState({});

	const showPopup = (mode) => {
		setPopupData(popupModes[mode]);
		setPopupVisible(true);
	};

	const handleClosePopup = () => {
		setPopupVisible(false);
	};

	const getFavServices = async () => {
		try {
			const token = await getBearerToken();
			const response = await axios.get(
				"http://192.168.1.100:8000/api/getFavService",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching favorite services:", error);
			if (error.response) {
				console.error("Status:", error.response.status);
				console.error("Data:", error.response.data);
			}
			return [];
		}
	};

	const getServices = async () => {
		try {
			const response = await axios.get(
				"http://192.168.1.100:8000/api/getAllServices"
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching all services:", error);
			if (error.response) {
				console.error("Status:", error.response.status);
				console.error("Data:", error.response.data);
			}
			return [];
		}
	};

	const mergeServices = async () => {
		const allServices = await getServices();
		const favServicesResponse = await getFavServices();

		// Extracting favorite service IDs
		const favServiceIds = favServicesResponse.map(
			(fav) => fav.service.service_id
		);

		// Mapping all services and marking favorites
		const combinedServices = allServices.map((service) => ({
			...service,
			isFavorite: favServiceIds.includes(service.service_id),
		}));

		// Filtering favorite and non-favorite services
		const favoriteServices = combinedServices.filter(
			(service) => service.isFavorite
		);
		const nonFavoriteServices = combinedServices.filter(
			(service) => !service.isFavorite
		);

		// Concatenating favorite services first
		const sortedServices = [...favoriteServices, ...nonFavoriteServices];

		// Removing duplicate services based on service_name
		const uniqueServices = sortedServices.filter(
			(service, index, self) =>
				index === self.findIndex((s) => s.service_name === service.service_name)
		);

		return uniqueServices;
	};

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				const mergedServices = await mergeServices();
				setServices(mergedServices);
				setIsLoading(false);
			};
			fetchData();
		}, [])
	);



	function filterByCategory(data, category) {
		return data.filter((item) => item.category === category);
	}

	const handleFavService = async (id) => {
		try {
			const token = await getBearerToken();
			const userData = {
				service_id: id,
			};
			const response = await axios.post(
				"http://192.168.1.100:8000/api/addFavService",
				userData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setReload(!reload);
			// console.log("Response:", response.data);
		} catch (error) {
			console.error("Error:", error);
			throw error; // Throw the error to be caught by the caller
		}
	};

	const onToggleFavorite = (serviceId, isFavorite) => {
		setServices(
			services.map((service) =>
				service.service_id === serviceId ? { ...service, isFavorite } : service
			)
		);
		handleFavService(serviceId);
	};

	const handleOrder = (order) => {
		navigation.navigate("OrderForm", order);
	};

	const navigateToCategory = (category, services) => {
		navigation.navigate("CategoryServices", {
			category,
			services,
			loadCategory: false,
		});
	};
	const navigateToEmergencyCategory = (category) => {
		const getEmergency = true;
		navigation.navigate("CategoryServices", {
			category,
			getEmergency,
			loadCategory: false,
		});
	};

	const navigateToNews = () => {
		navigation.navigate("News");
	}
	if (isLoading) {
		return <Loading />;
	}
	return (
		<SafeAreaView style={theme.container}>
			<ScrollView style={theme.container}>
				<View style={theme.carouselView}>
					<FlatList
						style={theme.carousel}
						horizontal
						data={carousel}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<View style={theme.carouselImageView}>
								<CarouselListItem item={item} onNavigate={navigateToNews}/>
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
					<View style={theme.dotsContainer}>
						{carousel.map((_, index) => (
							<View
								key={index}
								style={[
									theme.dot,
									index === activeItemIndex && theme.activeDot,
								]}
							/>
						))}
					</View>
				</View>
				<View style={theme.emergencyView}>
					<TouchableOpacity
						style={theme.emergencyButton}
						onPress={() => {
							navigateToEmergencyCategory("Emergency Services");
						}}
					>
						<Text style={theme.emergencyText}>Emergency Services</Text>
					</TouchableOpacity>
				</View>
				<View style={theme.serviceView}>
					<View style={theme.serviceTopView}>
						<Text style={theme.serviceText}>Car Services</Text>
						<TouchableOpacity
							style={theme.serviceTopView}
							onPress={() => {
								navigateToCategory(
									"Car Services",
									filterByCategory(services, "Car")
								);
							}}
						>
							<Text style={theme.serviceText}>See More</Text>
							<Ionicons
								name="chevron-forward-outline"
								color={isDarkMode? myDarkColors.blue : myColors.blue}
								size={20}
							/>
						</TouchableOpacity>
					</View>
					<View style={theme.service}>
						<FlatList
							style={theme.carousel}
							horizontal
							showsHorizontalScrollIndicator={false}
							data={filterByCategory(services, "Car")}
							keyExtractor={(item) => item.service_id.toString()}
							renderItem={({ item }) => (
								<ServiceHome
									service={item}
									onToggleFavorite={onToggleFavorite}
									onOrder={handleOrder}
									const
									showFav={true}
								/>
							)}
						/>
					</View>
				</View>
				<View style={theme.serviceView}>
					<View style={theme.serviceTopView}>
						<Text style={theme.serviceText}>Transportation Services</Text>
						<TouchableOpacity
							style={theme.serviceTopView}
							onPress={() => {
								navigateToCategory(
									"Transportation Services",
									filterByCategory(services, "Transportation")
								);
							}}
						>
							<Text style={theme.serviceText}>See More</Text>
							<Ionicons
								name="chevron-forward-outline"
								color={isDarkMode? myDarkColors.blue : myColors.blue}
								size={20}
							/>
						</TouchableOpacity>
					</View>
					<View style={theme.service}>
						<FlatList
							style={theme.carousel}
							horizontal
							showsHorizontalScrollIndicator={false}
							data={filterByCategory(services, "Transportation")}
							keyExtractor={(item) => item.service_id.toString()}
							renderItem={({ item }) => (
								<ServiceHome
									service={item}
									onToggleFavorite={onToggleFavorite}
									onOrder={handleOrder}
									const
									showFav={true}
								/>
							)}
						/>
					</View>
				</View>
				<View style={theme.serviceView}>
					<View style={theme.serviceTopView}>
						<Text style={theme.serviceText}>Paperwork Services</Text>
						<TouchableOpacity
							style={theme.serviceTopView}
							onPress={() => {
								navigateToCategory(
									"Paperwork Services",
									filterByCategory(services, "Paperwork")
								);
							}}
						>
							<Text style={theme.serviceText}>See More</Text>
							<Ionicons
								name="chevron-forward-outline"
								color={isDarkMode? myDarkColors.blue : myColors.blue}
								size={20}
							/>
						</TouchableOpacity>
					</View>
					<View style={theme.service}>
						<FlatList
							style={theme.carousel}
							horizontal
							showsHorizontalScrollIndicator={false}
							data={filterByCategory(services, "Paperwork")}
							keyExtractor={(item) => item.service_id.toString()}
							renderItem={({ item }) => (
								<ServiceHome
									service={item}
									onToggleFavorite={onToggleFavorite}
									onOrder={handleOrder}
									const
									showFav={true}
								/>
							)}
						/>
					</View>
				</View>
				<View style={theme.serviceView}>
					<View style={theme.serviceTopView}>
						<Text style={theme.serviceText}>Delivery Services</Text>
						<TouchableOpacity
							style={theme.serviceTopView}
							onPress={() => {
								navigateToCategory(
									"Delivery Services",
									filterByCategory(services, "Delivery")
								);
							}}
						>
							<Text style={theme.serviceText}>See More</Text>
							<Ionicons
								name="chevron-forward-outline"
								color={isDarkMode? myDarkColors.blue : myColors.blue}
								size={20}
							/>
						</TouchableOpacity>
					</View>
					<View style={theme.service}>
						<FlatList
							style={theme.carousel}
							horizontal
							showsHorizontalScrollIndicator={false}
							data={filterByCategory(services, "Delivery")}
							keyExtractor={(item) => item.service_id.toString()}
							renderItem={({ item }) => (
								<ServiceHome
									service={item}
									onToggleFavorite={onToggleFavorite}
									onOrder={handleOrder}
									const
									showFav={true}
								/>
							)}
						/>
					</View>
				</View>
			</ScrollView>
			<Popup
				visible={popupVisible}
				onClose={handleClosePopup}
				title={popupData.title}
				message={popupData.message}
				icon={popupData.icon}
				iconColor={popupData.iconColor}
				type={popupData.type}
			/>
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	carouselImageView: {
		width: windowWidth,
		paddingBottom: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	carouselImage: {
		width: windowWidth,
		height: windowWidth / 2,
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
	carouselView: {
		// marginTop: 8,
	},
	loadingcontainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-evenly",
	},
});

const dark = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: myDarkColors.white,
	},
	carouselImageView: {
		width: windowWidth,
		paddingBottom: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	carouselImage: {
		width: windowWidth,
		height: windowWidth / 2,
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
		backgroundColor: myDarkColors.red,
	},
	activeDot: {
		backgroundColor: myDarkColors.blue,
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
		backgroundColor: myDarkColors.red,
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
		color: myDarkColors.blue,
		fontFamily: "SF-medium",
		fontSize: 16,
	},
	carouselView: {
		// marginTop: 8,
	},
	loadingcontainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-evenly",
	},
});
