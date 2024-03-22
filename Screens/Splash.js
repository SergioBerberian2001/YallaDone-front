import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Logo from "../Components/Logo";

const Splash = ({ navigation, route } ) => {
	const width = 280;
	const height = 35;
	const [isSigningUp,setIsSigningUp] = useState(false)

	const navigateToSignup = () => {
		navigation.navigate("Signup");
	};

	const navigateToLogin = () => {
		navigation.navigate("Login");
	};


	return (
		<ImageBackground
			source={require("../assets/images/splash-bg.jpg")}
			style={styles.background}
		>
			<View style={styles.main}>
				<Logo width={width} height={height} />
				<Text style={styles.welcomeText}>
					Welcome to YALLA DONE. get ready to make your life easier. Get all the
					services you want, whenever you want. Sign up to get started
				</Text>
				<View style={styles.buttonsView}>
					<TouchableOpacity style={styles.buttons}
					onPress={navigateToSignup}>
						<Text style={styles.buttonsText}>Sign up</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.buttons}
					onPress={navigateToLogin}>
						<Text style={styles.buttonsText}>Sign in</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);
};

export default Splash;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		width: "100%",
		justifyContent: "space-around",
		alignItems: "center",
	},
	background: {
		flex: 1,
		width: "100%",
		opacity: 1,
	},
	welcomeText: {
		fontFamily:"SF-bold",
		color: "white",
		justifyContent: "center",
		paddingHorizontal: 16,
		textAlign: "center",
		fontSize: 18,
	},
	buttonsView:{
		width:"100%",
		justifyContent:"center",
		alignItems:"center",
		paddingHorizontal:16,
	},
	buttons:{
		//2F3D7E
		// backgroundColor:"#2F3D7E",
		// backgroundColor:"#F2F2F7",
		backgroundColor:"#FFFFFF",
		width:"100%",
		alignItems:"center",
		marginBottom:16,
		padding:24,
		borderRadius:8,
		shadowColor: '#000000', 
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: { width: 3, height: 3 },
	},
	buttonsText:{
		fontFamily:"SF-bold",
		color:"#2F3D7E",
		fontSize:18,
	},
});
