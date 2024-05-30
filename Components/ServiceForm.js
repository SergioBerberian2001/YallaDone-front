import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import myColors from "../utils/myColors";

const ServiceForm = (props) => {
	const { order } = props;
	//  {"IsFav": 0,
	// "category": "Car",
	// "created_at": "2024-05-28T14:02:38.000000Z",
	// "image": "../assets/images/service-image.png",
	// "isEmergency": 0,
	// "price": 50,
	// "service_description": "This service is made to help you make car detailing for your car while you are relaxed and doing your thing without worrying about it",
	// "service_id": 1,
	// "service_name": "Car Detailing",
	// "updated_at": "2024-05-28T14:02:38.000000Z"}
	return (
		<View style={styles.container}>
			<View style={styles.imageCont}>
				<Image source={require("../assets/images/service-image.png")} style={styles.image}/>
			</View>
			<View style={styles.textCont}>
				<Text style={styles.title}>{order.service_name}</Text>
				<Text style={styles.desc}>{order.service_description}</Text>
				<Text style={styles.price}>${order.price}.00</Text>
			</View>
		</View>
	);
};

export default ServiceForm;

const styles = StyleSheet.create({
	container: {
		width: "90%",
		borderRadius: 10,
		borderWidth: 1,
        borderColor:myColors.blue
	},
    imageCont:{
        width: "100%",
        aspectRatio: 365 / 193,
        alignItems:"center",
        justifyContent:"center"
    },
    image:{
       height:"100%",
       aspectRatio:1, 
    },
    textCont:{
        backgroundColor:myColors.blue,
        borderBottomRightRadius:9,
        borderBottomLeftRadius:9,
        justifyContent:"space-between",
        padding:8
    },
    title:{
        color:myColors.white,
        fontSize:20,
        fontFamily:"SF-bold",
        padding:4,
    },
    desc:{
        color:myColors.white,
        fontSize:12,
        fontFamily:"SF-medium",
        padding:4,
    },
    price:{
        color:myColors.white,
        fontSize:12,
        fontFamily:"SF-medium",
        alignSelf:"flex-end",
        padding:4,
    },
});
