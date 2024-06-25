import { useCallback, useContext, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	SafeAreaView,
	useWindowDimensions,
	Settings,
	StatusBar,
	Platform,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { myColors, myDarkColors } from "./utils/myColors";
import { useMyColorTheme } from "./utils/ThemeContext";
import GetIsDarkMode from "./Components/GetIsDarkMode";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import registerNNPushToken from "native-notify";

import Logo from "./Components/Logo";
import Splash from "./Screens/Splash";
import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import Form from "./Screens/Form";
import Onboarding from "./Screens/Onboarding";
import Home from "./Screens/Home";
import OTP from "./Screens/OTP";
import DrawerScreen from "./Screens/Drawer/DrawerScreen";
import OrderForm from "./Screens/OrderForm";
import Checkout from "./Screens/Checkout";
import CategoryServices from "./Screens/CategoryServices";
import AllCategories from "./Screens/AllCategories";

import MyProfile from "./Screens/My-Account.js/MyProfile";
import MyAddresses from "./Screens/My-Account.js/MyAddresses";
import OrdersHistory from "./Screens/My-Account.js/OrdersHistory";
import OrderInfo from "./Screens/My-Account.js/OrderInfo";
import MyPoints from "./Screens/My-Account.js/MyPoints";
import ChangePassword from "./Screens/My-Account.js/ChangePassword";
import MySettings from "./Screens/My-Account.js/MySettings";
import AddAddress from "./Screens/My-Account.js/AddAddress";
import Loading from "./Components/Loading";
import NotificationInfo from "./Screens/NotificationInfo";

import Stats from "./Screens/AdminScreens/Stats";

import { UserProvider } from "./utils/UserContext";
import { ThemeProvider } from "./utils/ThemeContext";
import { NotificationProvider } from "./utils/NotificationContext";

const Stack = createNativeStackNavigator();

// SplashScreen.preventAutoHideAsync();

export default function App() {
	registerNNPushToken(22079, "0SHDEOFDqVbkGIJv1q31GU");
	const { width } = useWindowDimensions();
	const height = width / 8;

	const [fontsLoaded, fontError] = useFonts({
		SF: require("./assets/fonts/SF-pro-regular.otf"),
		"SF-bold": require("./assets/fonts/SF-pro-bold.otf"),
		"SF-medium": require("./assets/fonts/SF-pro-medium.otf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			return <Loading />;
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return <Loading />;
	}

	// Function to handle incoming notifications
	const handleNotification = (notification) => {
		console.log(notification);
		// Handle incoming notifications here
	};

	return (
		<UserProvider>
			<ThemeProvider>
				<NotificationProvider>
					<NavigationContainer>
						<GetIsDarkMode />
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
								name="OrderForm"
								component={OrderForm}
								options={{
									title: "OrderForm Screen",
									headerStyle: {
										backgroundColor: "#000000",
									},
									headerTintColor: "#fff",
								}}
							/>

							<Stack.Screen
								name="Checkout"
								component={Checkout}
								options={{
									title: "Checkout Screen",
									headerStyle: {
										backgroundColor: "#000000",
									},
									headerTintColor: "#fff",
								}}
							/>
							<Stack.Screen
								name="CategoryServices"
								component={CategoryServices}
								options={{
									title: "CategoryServices Screen",
									headerStyle: {
										backgroundColor: "#000000",
									},
									headerTintColor: "#fff",
								}}
							/>
							<Stack.Screen
								name="AllCategories"
								component={AllCategories}
								options={{
									title: "AllCategories Screen",
									headerStyle: {
										backgroundColor: "#000000",
									},
									headerTintColor: "#fff",
								}}
							/>
							<Stack.Screen
								name="OrderInfo"
								component={OrderInfo}
								options={{
									title: "OrderInfo Screen",
									headerStyle: {
										backgroundColor: "#000000",
									},
									headerTintColor: "#fff",
								}}
							/>
							<Stack.Screen
								name="NotificationInfo"
								component={NotificationInfo}
								options={{
									title: "NotificationInfo Screen",
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

							<Stack.Screen
								name="MyProfile"
								component={MyProfile}
								options={{
									title: "MyProfile Screen",
									headerStyle: {
										backgroundColor: "#000000",
									},
									headerTintColor: "#fff",
								}}
							/>

							<Stack.Screen
								name="MyAddresses"
								component={MyAddresses}
								options={{
									title: "MyAddresses Screen",
									headerStyle: {
										backgroundColor: "#000000",
									},
									headerTintColor: "#fff",
								}}
							/>

							<Stack.Screen
								name="OrdersHistory"
								component={OrdersHistory}
								options={{
									title: "OrdersHistory Screen",
									headerStyle: {
										backgroundColor: "#000000",
									},
									headerTintColor: "#fff",
								}}
							/>

							<Stack.Screen
								name="MyPoints"
								component={MyPoints}
								options={{
									title: "MyPoints Screen",
									headerStyle: {
										backgroundColor: "#000000",
									},
									headerTintColor: "#fff",
								}}
							/>

							<Stack.Screen
								name="ChangePassword"
								component={ChangePassword}
								options={{
									title: "ChangePassword Screen",
									headerStyle: {
										backgroundColor: "#000000",
									},
									headerTintColor: "#fff",
								}}
							/>

							<Stack.Screen
								name="MySettings"
								component={MySettings}
								options={{
									title: "MySettings Screen",
									headerStyle: {
										backgroundColor: "#000000",
									},
									headerTintColor: "#fff",
								}}
							/>

							<Stack.Screen
								name="AddAddress"
								component={AddAddress}
								options={{
									title: "AddAddress Screen",
									headerStyle: {
										backgroundColor: "#000000",
									},
									headerTintColor: "#fff",
								}}
							/>
							<Stack.Screen
								name="Stats"
								component={Stats}
								options={{
									title: "Stats Screen",
									headerStyle: {
										backgroundColor: "#000000",
									},
									headerTintColor: "#fff",
								}}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</NotificationProvider>
			</ThemeProvider>
		</UserProvider>
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
