import React, { useState, useEffect } from "react";
import { StyleSheet, Platform, ActivityIndicator, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import myColors from "../utils/myColors";

const MyMap = (props) => {
	const { updateCoordinates, initialLocation } = props;

	const [isLoading, setIsLoading] = useState(true);
	const [coordinates, setCoordinates] = useState(null);
	const [region, setRegion] = useState(null);

	useEffect(() => {
		if (region) {
			updateCoordinates(region.latitude, region.longitude);
		}
	}, [region]);

	useEffect(() => {
		const initializeRegion = async () => {
			if (initialLocation.longitude != "" && initialLocation.latitude != "") {
				console.log(initialLocation);
				setRegion({
					latitude: initialLocation.latitude,
					longitude: initialLocation.longitude,
					latitudeDelta: 0.09,
					longitudeDelta: 0.04,
				});
				setCoordinates({
					latitude: initialLocation.latitude,
					longitude: initialLocation.longitude,
				});
				setIsLoading(false);
			} else {
				let { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== "granted") {
					console.log("Location permission denied");
					return;
				}

				let location = await Location.getCurrentPositionAsync({
					accuracy: Location.Accuracy.High,
				});
				const { latitude, longitude } = location.coords;
				setRegion({
					latitude,
					longitude,
					latitudeDelta: 0.09,
					longitudeDelta: 0.04,
				});
				setCoordinates({ latitude, longitude });
				setIsLoading(false);
			}
		};

		initializeRegion();
	}, []);

	const handlePress = (event) => {
		const { nativeEvent } = event;
		const { latitude, longitude } = nativeEvent.coordinate;
		setCoordinates({ latitude, longitude });
		setRegion({
			latitude,
			longitude,
			latitudeDelta: 0.09,
			longitudeDelta: 0.04,
		});
	};

	if (isLoading) {
		return (
			<View style={styles.container}>
				<MapView style={styles.map} region={region} onPress={handlePress}>
					{coordinates && (
						<Marker coordinate={coordinates} title="Your Location" />
					)}
				</MapView>
				<View style={styles.loaderView}>
					<ActivityIndicator size="large" color={myColors.white} />
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<MapView style={styles.map} region={region} onPress={handlePress}>
				{coordinates && (
					<Marker coordinate={coordinates} title="Your Location" />
				)}
			</MapView>
		</View>
	);
};

export default MyMap;

const styles = StyleSheet.create({
	map: {
		width: "90%",
		aspectRatio: 2.5,
		alignSelf: "center",
		borderRadius: 20,
		marginBottom: 10,
	},
	container: {
		flex: 1,
	},
	loaderView: {
		width: "90%",
		aspectRatio: 2.5,
		alignSelf: "center",
		borderRadius: 20,
		marginBottom: 10,
		backgroundColor: "rgba(0,0,0,0.4)",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		zIndex: 100,
	},
});
