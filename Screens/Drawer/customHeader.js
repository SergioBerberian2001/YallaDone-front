import { React, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	Dimensions,
	Platform,
} from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { myColors, myDarkColors } from "../../utils/myColors";
import Logo from "../../Components/Logo";
import NotificationsSheet from "../../Components/NotificationsSheet";
import { useMyColorTheme } from "../../utils/ThemeContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CustomHeader = ({ navigation }) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const width = SCREEN_WIDTH / 3;
	const height = width / 8;
	const [showNotifications, setShowNotifications] = useState(false);

	const openDrawer = () => {
		navigation.openDrawer(); // Opens the drawer
	};

	const toggleNotifications = () => {
		setShowNotifications(!showNotifications);
	};

	return (
		<SafeAreaView
			style={Platform.OS === "ios" ? theme.topView : theme.topViewAndroid}
		>
			<TouchableOpacity onPress={openDrawer} style={theme.buttons}>
				<MaterialCommunityIcons
					name="menu"
					color={isDarkMode ? myDarkColors.black : myColors.blue}
					size={32}
				/>
			</TouchableOpacity>
			{isDarkMode ? <Logo width={width} height={height} color="#FFFFFF"/> : <Logo width={width} height={height}/>}
			<TouchableOpacity style={theme.buttons} onPress={toggleNotifications}>
				<MaterialCommunityIcons
					name="bell"
					color={isDarkMode ? myDarkColors.black : myColors.blue}
					size={32}
				/>
			</TouchableOpacity>
			{showNotifications && (
				<NotificationsSheet onToggle={toggleNotifications} />
			)}
		</SafeAreaView>
	);
};

export default CustomHeader;

const styles = StyleSheet.create({
	topView: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: myColors.white,
		shadowColor: "#000000",
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: { width: 1, height: 1 },
	},
	topViewAndroid: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: myColors.white,
		shadowColor: "#000000",
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: { width: 1, height: 1 },
		paddingTop: "8%",
	},
	buttons: {
		paddingHorizontal: 16,
		paddingBottom: 6,
	},
});

const dark = StyleSheet.create({
	topView: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: myDarkColors.white,
		shadowColor: "#000000",
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: { width: 1, height: 1 },
	},
	topViewAndroid: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: myDarkColors.white,
		shadowColor: "#000000",
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: { width: 1, height: 1 },
		paddingTop: "8%",
	},
	buttons: {
		paddingHorizontal: 16,
		paddingBottom: 6,
	},
});
