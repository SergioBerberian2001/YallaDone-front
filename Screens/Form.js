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

const redColor = "#FD2121";

const Form = ({ navigation, route }) => {
	const width = 280;
	const height = 35;
	const { isCreating } = route.params;
	const [isSigningUp, setIsSigningUp] = useState(true);
    useEffect(()=> {
        setIsSigningUp(isCreating);
    },[])
    
	const [user, setUser] = useState({
		id: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPass: "",
		birthday: "",
		phoneNumber: "",
	});
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [receiveEmails, setReceiveEmails] = useState(false);

	const handleIsSigningUp = () => {
		setIsSigningUp(true);
	};
	const handleIsSigningIn = () => {
		setIsSigningUp(false);
	};

	const navigateToOnboarding = () => {
		// setIsSigningUp(true),
		// navigation.navigate("Form");
		navigation.navigate("Onboarding");

	};

	const handleSignup = () => {
		if (handleError(user) === "") {
			setUser({
				id: "",
				email: "",
				password: "",
				confirmPass: "",
			});
		}
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
					{isSigningUp ? <Signup onNavigate={navigateToOnboarding}/> : <Login onNavigate={navigateToOnboarding}/>}
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
		backgroundColor: "rgba(0,0,0,0.2)",
		borderRadius: 10,
		padding: 2,
		marginHorizontal: 8,
		marginBottom: 32,
	},
	swapContainerOn: {
        flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F2F2F7",
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
		color: "black",
		fontFamily: "SF-medium",
		fontSize: 16,
	},
	container: {
		width: "100%",
	},
});
