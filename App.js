import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Splash from "./Screens/Splash";
import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import Form from "./Screens/Form";
import Onboarding from "./Screens/Onboarding";
import Home from "./Screens/Home";

const Stack = createNativeStackNavigator();


  

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded, fontError] = useFonts({
		"SF": require("./assets/fonts/SF-pro-regular.otf"),
		"SF-bold": require("./assets/fonts/SF-pro-bold.otf"),
		"SF-medium": require("./assets/fonts/SF-pro-medium.otf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		<NavigationContainer>
			<Stack.Navigator
				onLayout={onLayoutRootView}
				initialRouteName="Splash"
				screenOptions={{ headerShown: false, headerStyle: { height: 0 } }}
			>
				<Stack.Screen
					name="Splash"
					component={Splash}
					options={{
						title: "Splash Screen",
						headerStyle: {
							backgroundColor: "#000000",
						},
						headerTintColor: "#fff",
					}}
				/>
				<Stack.Screen
					name="Onboarding"
					component={Onboarding}
					options={{
						title: "Onboarding Screen",
						headerStyle: {
							backgroundColor: "#000000",
						},
						headerTintColor: "#fff",
					}}
				/>
				<Stack.Screen
					name="Form"
					component={Form}
					options={{
						title: "Form",
						headerStyle: {
							backgroundColor: "#000000",
						},
						headerTintColor: "#fff",
					}}
				/>
				<Stack.Screen
					name="Signup"
					component={Signup}
					options={{
						title: "Signup",
						headerStyle: {
							backgroundColor: "#000000",
						},
						headerTintColor: "#fff",
					}}
				/>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{
						title: "Login",
						headerStyle: {
							backgroundColor: "#000000",
						},
						headerTintColor: "#fff",
					}}
				/>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{
						title: "Home Screen",
						headerStyle: {
							backgroundColor: "#000000",
						},
						headerTintColor: "#fff",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	sfText: {
		fontFamily: "SF",
	},
	sfBold: {
		fontFamily: "SF-bold",
	},
});
