import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import myColors from "../myColors";

const MyAccountButton = (props) => {
	const { text } = props;
	return (
		<TouchableOpacity style={styles.button}>
			<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	);
};

export default MyAccountButton;

const styles = StyleSheet.create({
    button:{
        width:"90%",
        aspectRatio:9/2,
        backgroundColor:myColors.blue,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,
    },
    text:{
       fontFamily:"SF-bold",
       fontSize:20,
       color:myColors.white,
    }
});
