import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomHeader from "./customHeader";
import customContent from "./customContent";
import HomeScreen from "../Home";
import MyAccount from "./MyAccount";
import News from "./News";
import Terms from "./Terms";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";

const Drawer = createDrawerNavigator();

export default function App() {

	return (
		<Drawer.Navigator initialRouteName="Home" drawerContent={customContent}>
			<Drawer.Screen
				name="Home"
				component={HomeScreen}
				options={{
					header: (props) => <CustomHeader {...props} />,
				}}
			/>
			<Drawer.Screen
				name="MyAccount"
				component={MyAccount}
				options={{
					header: (props) => <CustomHeader {...props} />,
				}}
			/>
			<Drawer.Screen
				name="News"
				component={News}
				options={{
					header: (props) => <CustomHeader {...props} />,
				}}
			/>
			<Drawer.Screen
				name="Terms"
				component={Terms}
				options={{
					header: (props) => <CustomHeader {...props} />,
				}}
			/>
			<Drawer.Screen
				name="ContactUs"
				component={ContactUs}
				options={{
					header: (props) => <CustomHeader {...props} />,
				}}
			/>
			<Drawer.Screen
				name="AboutUs"
				component={AboutUs}
				options={{
					header: (props) => <CustomHeader {...props} />,
				}}
			/>
		</Drawer.Navigator>
	);
}
