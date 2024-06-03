import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { parseISO } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import axios from "axios";
import { Ionicons } from "react-native-vector-icons";
import { getBearerToken } from "../utils/bearer";
import myColors from "../utils/myColors";

const OrderListItem = (props) => {
	const { notification } = props;
	// const inputTimestamp = "2024-05-30T19:20:49.000000Z";
	const timeZone = "America/New_York";

	// Step 1: Parse the input timestamp
	const date = parseISO(notification.created_at);

	// Step 2: Convert the timestamp to the desired time zone
	//   const zonedDate = utcToZonedTime(date, timeZone);

	// Step 3: Format the timestamp into the desired output format
	const formattedDate = format(date, "dd/MM/yyyy - hh:mm a");

	const handleShowIcon = () => {
		if (notification.type === "order") {
			return "car-outline";
		} else if (notification.type === "email") {
			return "mail-outline";
		}
	};
	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.leftCont}>
                <View style={styles.icon}>
				<Ionicons name={handleShowIcon()} color={myColors.blue} size={40} /></View>
			</View>
			<View style={styles.rightCont}>
				<View style={styles.topCont}>
					<Text style={styles.title}>{notification.title}</Text>
					{!notification.isRead && <View style={styles.dot}></View>}
				</View>
				<Text style={styles.description}>{notification.description}</Text>
				<Text style={styles.date}>{formattedDate}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default OrderListItem;

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        
        width:"100%"
    },
    dot:{
        width:8,
        height:8,
        backgroundColor:myColors.red,
        borderRadius:"100%"
    },
    topCont:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        justifyContent:"space-between"
    },
    leftCont:{
        width:"15%",
        alignItems:"center",
        justifyContent:"center"
    },
    rightCont:{
        width:"85%",
        padding:8,
        borderBottomWidth:1,
        borderColor:"#c1c1c1"
    },
    title:{
        fontSize:18,
        fontFamily:"SF-medium",
        color:myColors.blue,
        paddingVertical:4
    },
    description:{
        fontSize:14,
        fontFamily:"SF",
        color:"#717171",
        paddingBottom:4

    },
    date:{
        fontSize:14,
        fontFamily:"SF",
        color:"#717171",
        alignSelf:"flex-end"
    }
});
