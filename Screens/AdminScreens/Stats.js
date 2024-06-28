import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	ScrollView,
	SafeAreaView,
	StyleSheet,
	ActivityIndicator,
	useWindowDimensions,
} from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import Logo from "../../Components/Logo";
import { myColors } from "../../utils/myColors";

const Stats = () => {
	const { width } = useWindowDimensions();
	const height = width / 8;
	const [analysis, setAnalysis] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get("http://192.168.1.100:5000/analyze")
			.then((response) => {
				setAnalysis(response.data);
			})
			.catch((error) => {
				setError(error.message);
			});
	}, []);

	if (error) {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.errorText}>Error: {error}</Text>
			</SafeAreaView>
		);
	}

	if (!analysis) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
				<Text style={styles.loadingText}>Loading...</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.logoView}>
					<Logo width={width * 0.7} height={height * 0.7} />
				</View>
				<View style={styles.section}>
					<Ionicons name="people" size={24} color={myColors.blue} />
					<Text style={styles.sectionText}>
						Number of users: {analysis["Number of users"]}
					</Text>
				</View>
				<View style={styles.section}>
					<Ionicons name="calendar" size={24} color={myColors.blue} />
					<Text style={styles.sectionText}>
						Average age of users: {analysis["Average age of users"]}
					</Text>
				</View>
				<View style={styles.section}>
					<Ionicons name="trophy" size={24} color={myColors.blue} />
					<Text style={styles.sectionText}>
						Best-selling service: {analysis["Best-selling service"]}
					</Text>
				</View>
				<View style={styles.section}>
					<Ionicons name="location" size={24} color={myColors.blue} />
					<Text style={styles.sectionText}>
						Most frequent city using the app:{" "}
						{analysis["Most frequent city using the app"]}
					</Text>
				</View>
				<View style={styles.section}>
					<Ionicons name="card" size={24} color={myColors.blue} />
					<Text style={styles.sectionText}>
						Most Popular Payment Method:{" "}
						{analysis["Most Popular Payment Method"]}
					</Text>
				</View>

				<Text style={styles.header}>Monthly Income:</Text>
				{Object.entries(analysis["Monthly Income"]).map(([month, income]) => (
					<Text key={month} style={styles.incomeText}>
						{month}: {income}
					</Text>
				))}

				<Text style={styles.header}>Daily Income:</Text>
				{Object.entries(analysis["Daily Income"]).map(([day, income]) => (
					<Text key={day} style={styles.incomeText}>
						{day}: {income}
					</Text>
				))}

				<Text style={styles.header}>Payment Methods Count:</Text>
				{Object.entries(analysis["Payment Methods Count"]).map(
					([method, count]) => (
						<Text key={method} style={styles.incomeText}>
							{method}: {count}
						</Text>
					)
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f0f0f0",
		padding: 10,
	},
	errorText: {
		color: "red",
		fontSize: 18,
		textAlign: "center",
		marginVertical: 20,
	},
	loadingText: {
		fontSize: 18,
		textAlign: "center",
		marginVertical: 10,
	},
	section: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		backgroundColor: "#fff",
		marginVertical: 5,
		borderRadius: 5,
		elevation: 1,
	},
	sectionText: {
		fontSize: 16,
		marginLeft: 10,
		fontFamily: "SF",
		color: myColors.blue,
	},
	header: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 20,
		margin: 10,
		color: myColors.blue,
		fontFamily: "SF-bold",
	},
	incomeText: {
		fontSize: 16,
		marginVertical: 2,
		color: myColors.blue,
		fontFamily: "SF-medium",
		marginLeft: 14,
	},
	logoView: {
		alignSelf: "center",
		margin: 16,
	},
});

export default Stats;
