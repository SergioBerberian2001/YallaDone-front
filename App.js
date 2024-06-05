import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	SafeAreaView,
	useWindowDimensions,
	Settings,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import myColors from "./utils/myColors";

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
import MyPoints from "./Screens/My-Account.js/MyPoints";
import ChangePassword from "./Screens/My-Account.js/ChangePassword";
import MySettings from "./Screens/My-Account.js/MySettings";
import AddAddress from "./Screens/My-Account.js/AddAddress";
import Loading from "./Components/Loading";

import { UserProvider } from "./utils/UserContext";
import { ThemeProvider } from "./utils/ThemeContext";

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
			return <Loading />;
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return <Loading />;
	}
	return (
		<UserProvider>
			<ThemeProvider>
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
					</Stack.Navigator>
				</NavigationContainer>
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
