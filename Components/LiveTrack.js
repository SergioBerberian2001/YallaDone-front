import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

const LiveTrack = (props) => {
	const { userLocation } = props;
	const [locationA, setLocationA] = useState(null);
	const [distance, setDistance] = useState(null);
	const [duration, setDuration] = useState(null);

	const locationB = {
		latitude: parseFloat(userLocation.latitude),
		longitude: parseFloat(userLocation.longitude),
	}; // Beirut, Lebanon

	useEffect(() => {
		const requestLocationPermission = async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.log("Location permission denied");
				return;
			}

			watchPosition();
		};

		const watchPosition = () => {
			Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.High,
					timeInterval: 1000,
					distanceInterval: 0,
				},
				(position) => {
					const { latitude, longitude } = position.coords;
					const newLocationA = { latitude, longitude };
					setLocationA(newLocationA);
					calculateDistanceAndTime(newLocationA, locationB);
				}
			);
		};

		requestLocationPermission();

		return () => {
			// Location.watchPositionAsync().remove();
		};
	}, []);

	const calculateDistanceAndTime = async (origin, destination) => {
		try {
			const response = await axios.get(
				`https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=AIzaSyAc49Hwp1GpYfugdEStZ93UP9qjPpxjr0o`
			);
			if (response.data.routes.length) {
				const route = response.data.routes[0].legs[0];
				setDistance(route.distance.text);
				setDuration(route.duration.text);
			} else {
				setDistance("No route found");
				setDuration("");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<MapView style={styles.map}>
				{locationA && <Marker coordinate={locationA} title="Driver Location" />}
				<Marker coordinate={locationB} title="User Location" />
			</MapView>
			<View style={styles.info}>
				<Text>Distance: {distance}</Text>
				<Text>Estimated Time: {duration}</Text> 
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	info: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 10,
		marginBottom: 20,
		alignItems: "center",
	},
});

export default LiveTrack;
