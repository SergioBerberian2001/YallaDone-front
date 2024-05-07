import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	SafeAreaView,
	useWindowDimensions,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Logo from "./Components/Logo";
import Splash from "./Screens/Splash";
import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import Form from "./Screens/Form";
import Onboarding from "./Screens/Onboarding";
import Home from "./Screens/Home";
import OTP from "./Screens/OTP";
import DrawerScreen from "./Screens/Drawer/DrawerScreen";

const Stack = createNativeStackNavigator();

// SplashScreen.preventAutoHideAsync();

export default function App() {
	const { width } = useWindowDimensions();
	const height = width / 8;
	const [fontsLoaded, fontError] = useFonts({
		SF: require("./assets/fonts/SF-pro-regular.otf"),
		"SF-bold": require("./assets/fonts/SF-pro-bold.otf"),
		"SF-medium": require("./assets/fonts/SF-pro-medium.otf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			return (
				<SafeAreaView style={styles.container}>
					<Logo width={width / 2} height={height / 2} />
					<ActivityIndicator size="large" color="#00ff00" />
				</SafeAreaView>
			);
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return (
			<SafeAreaView style={styles.container}>
				<Logo width={width * 0.75} height={height * 0.75} />
				<ActivityIndicator size="large" color="#00ff00" />
			</SafeAreaView>
		);
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
				<Stack.Screen
					name="OTP"
					component={OTP}
					options={{
						title: "OTP Screen",
						headerStyle: {
							backgroundColor: "#000000",
						},
						headerTintColor: "#fff",
					}}
				/>
				<Stack.Screen
					name="DrawerScreen"
					component={DrawerScreen}
					options={{ title: "Drawer Screen", headerShown: false }}
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
