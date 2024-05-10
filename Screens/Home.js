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
	useWindowDimensions
} from "react-native";
import { React, useState, useEffect } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import myColors from "../myColors";
import ServiceHome from "../Components/ServiceHome";
import Logo from "../Components/Logo";
import { useNavigation } from '@react-navigation/native';
// import services from "../assets/data/services";
import axios from "axios";


const windowWidth = Dimensions.get("window").width;
const Home = ({ navigation, route }) => {
	const { width } = useWindowDimensions();
	const height = width / 8;
	const [isLoading,setIsLoading] = useState(true)
	const [services, setServices] = useState();
	const navigations = useNavigation();
	const [activeItemIndex, setActiveItemIndex] = useState(0);
	const carousel = [
		{ id: 0, image: require("../assets/images/carousel.jpeg") },
		{ id: 1, image: require("../assets/images/carousel.jpeg") },
		{ id: 2, image: require("../assets/images/splash-bg.jpg") },
	];

	useEffect(() => {
		
		const fetchData = async () => {
			try {
				const response = await axios.get('http://192.168.1.112:8000/api/getAllServices');
				// console.log(response.data);
				setServices(response.data);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
				if (error.response) {
					console.error('Status:', error.response.status);
					console.error('Data:', error.response.data);
				}
				console.log(mydata);
			}
		};
		
		fetchData();
	}, []);


	function filterByCategory(data, category) {
		return data.filter((item) => item.category === category);
	}

	const onToggleFavorite = (serviceId, isFav) => {
		// setServices(
		// 	services.map((service) =>
		// 		service.service_id === serviceId ? { ...service, isFav } : service
		// 	)
		// );
	};

	if(isLoading){
		return (
			<SafeAreaView style={styles.container}>
				<Logo width={width / 2} height={height / 2} />
				<ActivityIndicator size="large" color="#0000ff" />
			</SafeAreaView>
		);
	}
	return (
	
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.container}>
					
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
	carouselView: {
		marginTop:8,
	},
});
