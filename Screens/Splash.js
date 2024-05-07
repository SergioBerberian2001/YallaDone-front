import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TouchableOpacity,
	useWindowDimensions
} from "react-native";
import React, { useState,useEffect } from "react";
import Logo from "../Components/Logo";
import myColors from "../myColors";
import axios from "axios";

const Splash = ({ navigation, route } ) => {
	const { width } = useWindowDimensions();
	const height = width / 8;
	// const [isSigningUp,setIsSigningUp] = useState(false)
	const [mydata,setmydata] = useState()

	useEffect(() => {
		console.log("hello1");
		const fetchData = async () => {
			console.log("hello2");
			try {
				console.log("hello3");
				const response = await axios.get('http://192.168.1.112:8000/api/login');
				console.log("hel222lo");
				console.log("hello");
				console.log(response.data);
				setmydata(response.data);
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
	
	

	  

	const navigateToSignup = () => {
		// setIsSigningUp(true),
		// navigation.navigate("Form");
		navigation.navigate("Form", { isCreating: true });

	};

	const navigateToLogin = () => {
		// setIsSigningUp(false),
		// navigation.navigate("Form");
		navigation.navigate("Form", { isCreating: false });
	};


	return (
		<ImageBackground
			source={require("../assets/images/splash-bg.jpg")}
			style={styles.background}
		>
			<View style={styles.main}>
				<Logo width={width * 0.75} height={height * 0.75} />
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
