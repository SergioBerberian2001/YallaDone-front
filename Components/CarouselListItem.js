import { StyleSheet, Text, View, Image, Dimensions, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { myColors, myDarkColors } from "../utils/myColors";

const windowWidth = Dimensions.get("window").width;
const CarouselListItem = (props) => {
	const { item, onNavigate } = props;

    // const truncateDescription = (text, maxLength) => {
	// 	return text.length > maxLength
	// 		? `${text.substring(0, maxLength)}...`
	// 		: text;
	// };

	// const truncatedDescription = truncateDescription(
	// 	service.service_description,
	// 	108
	// );

	return (
		<Pressable onPress={onNavigate}>
			<LinearGradient
				colors={["rgba(0,0,0,0)", myDarkColors.dirtyWhite]}
				
				style={styles.gradient}
			>
                <View style={styles.textView}>
                    <Text style={styles.title}>Specialized Car Services Now Available</Text>
                    <Text style={styles.description}>YallaDone now offers specialized car services including window tinting, car wrapping, and paint protection. Ensure your car looks its best with our expert services.</Text>
                </View>
            </LinearGradient>
			<Image source={item.image} style={styles.carouselImage} />
		</Pressable>
	);
};

export default CarouselListItem;

const styles = StyleSheet.create({
	carouselImage: {
		width: windowWidth,
		height: windowWidth / 2,
	},
	gradient: {
        width: windowWidth,
		height: windowWidth / 2,
        position:"absolute",
        zIndex:10,
        justifyContent:"flex-end"
    },
    textView:{
        height:"50%",
        width:"100%",
        paddingVertical:4,
        paddingHorizontal:8,
    },
    title:{
        color:myColors.white,
        fontFamily:"SF-bold",
        fontSize:16,
        marginBottom:4
    },
    description:{
        color:myColors.white,
        fontFamily:"SF",
        fontSize:16,
        lineHeight:20
    }
});
