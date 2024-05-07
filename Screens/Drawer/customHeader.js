import {React, useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity,SafeAreaView, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import myColors from "../../myColors";
import Logo from "../../Components/Logo";
import NotificationsSheet from "../../Components/NotificationsSheet";



const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CustomHeader = ({ navigation }) => {
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
		<SafeAreaView style={styles.topView}>
			<TouchableOpacity onPress={openDrawer} style={styles.buttons}>
				<MaterialCommunityIcons name="menu" color={myColors.blue} size={32} />
			</TouchableOpacity>
            <Logo width={width} height={height} />
			<TouchableOpacity style={styles.buttons} onPress={toggleNotifications}>
				<MaterialCommunityIcons name="bell" color={myColors.blue} size={32} />
			</TouchableOpacity>
            { showNotifications && <NotificationsSheet onToggle={toggleNotifications}/>}
		</SafeAreaView>
	);
};

export default CustomHeader;

const styles = StyleSheet.create({
	topView: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
        alignItems:"center",
        backgroundColor: myColors.white,
        shadowColor: "#000000",
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: { width: 1, height: 1 },
	},
    buttons:{
        paddingHorizontal: 16,
        paddingBottom:6
    }
});
