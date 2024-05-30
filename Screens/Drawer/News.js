import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import news from "../../assets/data/news";
import myColors from "../../utils/myColors";
import NewsListItem from "../../Components/NewsListItem";

const News = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Latest News</Text>
			<FlatList
				style={styles.list}
				data={news}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => `${item.id}`}
				renderItem={({ item }) => <NewsListItem news={item} />}
			/>
		</View>
	);
};

export default News;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: myColors.white,
	},
	title: {
		fontFamily: "SF-medium",
		color: myColors.blue,
		fontSize: 24,
		margin: 16,
	},
});
