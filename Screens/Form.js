import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Logo from "../Components/Logo";
import Signup from "./Signup";
import Login from "./Login";
import myColors from "../utils/myColors";
import slides from "../assets/data/slides";

const Form = ({ navigation, route }) => {
	const width = 280;
	const height = 35;
	const slidesInfo = slides;
	const { isCreating } = route.params;
	const [isSigningUp, setIsSigningUp] = useState(true);
    useEffect(()=> {
        setIsSigningUp(isCreating);
    },[])
    

	const handleIsSigningUp = () => {
		setIsSigningUp(true);
	};
	const handleIsSigningIn = () => {
		setIsSigningUp(false);
	};

	const navigateToOTP = (user, token) => {
		// setIsSigningUp(true),
		// navigation.navigate("Form");
		
		navigation.navigate("OTP", {user, token});

	};

	const navigateToHome = () => {
		// setIsSigningUp(true),
		// navigation.navigate("Form");
		navigation.navigate("DrawerScreen");

	};


	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ImageBackground
				source={require("../assets/images/splash-bg.jpg")}
				style={styles.background}
			>
				<View style={styles.logoView}>
					<Logo width={width} height={height} />
				</View>
				<View style={styles.container}>{isSigningUp? 
					<View style={styles.swapMainContainer}>
                        
						<TouchableOpacity
							style={styles.swapContainerOn}
							onPress={handleIsSigningUp}
						>
							<Text style={styles.swapText}>Register</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.swapContainerOff}
							onPress={handleIsSigningIn}
						>
							<Text style={styles.swapText}>Login</Text>
						</TouchableOpacity>
					</View>: <View style={styles.swapMainContainer}>
                        
						<TouchableOpacity
							style={styles.swapContainerOff}
							onPress={handleIsSigningUp}
						>
							<Text style={styles.swapText}>Register</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.swapContainerOn}
							onPress={handleIsSigningIn}
						>
							<Text style={styles.swapText}>Login</Text>
						</TouchableOpacity>
					</View>
                    }
					{isSigningUp ? <Signup onNavigate={navigateToOTP}/> : <Login onNavigate={navigateToHome}/>}
				</View>
			</ImageBackground>
		</TouchableWithoutFeedback>
	);
};

export default Form;

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		opacity: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	logoView: {
		marginVertical: 64,
	},

	swapMainContainer: {
		flexDirection: "row",
		height: 38,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myColors.blue,
		borderRadius: 10,
		padding: 2,
		marginHorizontal: 8,
		marginBottom: 32,
	},
	swapContainerOn: {
        flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.4)",
		borderRadius: 8,
		height: "100%",
		marginHorizontal: 1,
	},
	swapContainerOff: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0,0)",
		borderRadius: 8,
		height: "100%",
		marginHorizontal: 1,
	},
	swapText: {
		color: myColors.dirtyWhite,
		fontFamily: "SF-medium",
		fontSize: 16,
	},
	container: {
		width: "100%",
	},
});
