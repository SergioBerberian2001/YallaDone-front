import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import myColors from "../../utils/myColors";
import NewsListItem from "../../Components/NewsListItem";
import axios from "axios";

const News = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://192.168.1.100:8000/api/getNews");

                let fetchedNews = response.data;

                // Sort the fetched news by updated_date
                fetchedNews.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

                setNewsItems(fetchedNews);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                if (error.response) {
                    console.error("Status:", error.response.status);
                    console.error("Data:", error.response.data);
                }
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Latest News</Text>
            <FlatList
                style={styles.list}
                data={newsItems}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => `${item.news_id}`}
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: myColors.white,
    },
    loadingText: {
        fontFamily: "SF-medium",
        color: myColors.blue,
        fontSize: 18,
    },
    list: {
        width: '100%',
    },
});
