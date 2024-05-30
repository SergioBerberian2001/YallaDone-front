import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import myColors from "../utils/myColors";
import { Ionicons } from "react-native-vector-icons";

//{"brand": "Visa",
// "complete": true,
// "expiryMonth": 12,
// "expiryYear": 28,
// "last4": "4242",
// "postalCode": "1809",
// "validCVC": "Valid",
// "validExpiryDate": "Valid",
// "validNumber": "Valid"}
const SCREEN_WIDTH = Dimensions.get("window").width;
const VisaCard = (props) => {
	const { cardDetails } = props;
	return (
		<View style={styles.container}>
			<LinearGradient
				colors={[myColors.blue, myColors.red]}
				start={{ x: 0.1, y: 0.1 }}
				end={{ x: 1, y: 1 }}
				style={styles.gradient}
			>
				<View>
					<Image
						source={require("../assets/images/visa.png")}
						style={styles.imageVisa}
					/>
				</View>
				<View style={styles.cardNbr}>
					<Text style={styles.title}>Card Number</Text>
					<View style={styles.row}>
						<View style={styles.dotCont}>
							<Ionicons name="ellipse" color={"#FFFFFF"} size={10} />
              <Ionicons name="ellipse" color={"#FFFFFF"} size={10} />
              <Ionicons name="ellipse" color={"#FFFFFF"} size={10} />
              <Ionicons name="ellipse" color={"#FFFFFF"} size={10} />
						</View>
            <View style={styles.dotCont}>
							<Ionicons name="ellipse" color={"#FFFFFF"} size={10} />
              <Ionicons name="ellipse" color={"#FFFFFF"} size={10} />
              <Ionicons name="ellipse" color={"#FFFFFF"} size={10} />
              <Ionicons name="ellipse" color={"#FFFFFF"} size={10} />
						</View>
            <View style={styles.dotCont}>
							<Ionicons name="ellipse" color={"#FFFFFF"} size={10} />
              <Ionicons name="ellipse" color={"#FFFFFF"} size={10} />
              <Ionicons name="ellipse" color={"#FFFFFF"} size={10} />
              <Ionicons name="ellipse" color={"#FFFFFF"} size={10} />
						</View>

						{cardDetails && cardDetails.last4 ? (
							<Text style={styles.title}>{cardDetails.last4}</Text>
						) : (
							<Text style={styles.title}>----</Text>
						)}
					</View>
				</View>
				<View style={styles.valid}>
					<Text style={styles.title}>Valid Thru</Text>
					<View style={styles.row}>
						{cardDetails && cardDetails.expiryMonth ? (
							<Text style={styles.title}>{cardDetails.expiryMonth}/</Text>
						) : (
							<Text style={styles.title}>MM/</Text>
						)}
						{cardDetails && cardDetails.expiryYear ? (
							<Text style={styles.title}>{cardDetails.expiryYear}</Text>
						) : (
							<Text style={styles.title}>YY</Text>
						)}
					</View>
				</View>
			</LinearGradient>
			<LinearGradient
				colors={[myColors.blue, myColors.red]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={styles.gradientSecond}
			>
				<View style={styles.blackLine}></View>
				<View style={styles.cvvCont}>
					<Text style={styles.cvv}>CVC </Text>
					{cardDetails && cardDetails.validCVC === "Valid" ? (
						<Text style={styles.cvvInfo}>Valid</Text>
					) : (
						<Text style={styles.cvvInfo}>Not Valid</Text>
					)}
				</View>
			</LinearGradient>
		</View>
	);
};

export default VisaCard;

const styles = StyleSheet.create({
	container: {
		marginBottom: SCREEN_WIDTH * 0.1 + 8,
	},
	gradient: {
		borderRadius: 15,
		width: SCREEN_WIDTH * 0.7,
		aspectRatio: 264 / 140,
		zIndex: 10,
		justifyContent: "space-between",
	},
	gradientSecond: {
		borderRadius: 15,
		width: SCREEN_WIDTH * 0.7,
		aspectRatio: 264 / 140,
		alignSelf: "flex-end",
		position: "absolute",
		zIndex: 0,
		top: SCREEN_WIDTH * 0.1,
		marginBottom: SCREEN_WIDTH * 0.1,
		alignItems: "flex-end",
	},
	title: {
		fontFamily: "SF-medium",
		color: "white",
	},
	blackLine: {
		width: "100%",
		height: "20%",
		backgroundColor: "black",
		marginTop: "15%",
	},
	cvvCont: {
		marginTop: "10%",
		alignItems: "center",
		marginRight: 10,
		width: "20%",
	},
	cvvInfo: {
		fontFamily: "SF-medium",
		color: "white",
	},
	cvv: {
		fontFamily: "SF-bold",
		color: "white",
	},
	imageVisa: {
		width: 30,
		height: 20,
		alignSelf: "flex-end",
		margin: 8,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
    
	},
	valid: {
		alignSelf: "flex-end",
		alignItems: "center",
		margin: 8,
	},
	cardNbr: {
		margin: 8,
	},
  dotCont:{
    flexDirection: "row",
		alignItems: "center",
    marginRight:4
  }
});
