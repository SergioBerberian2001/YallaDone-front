import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    SafeAreaView,
    Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import myColors from "../../utils/myColors";
import OrderListItem from "../../Components/OrderListItem";
import { Ionicons } from "react-native-vector-icons";
import axios from "axios";
import { getBearerToken } from "../../utils/bearer";

const OrdersHistory = ({ navigation, route }) => {
    const navigateBack = () => {
        navigation.goBack();
    };
    const [ordersHistory, setOrdersHistory] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getBearerToken();

                const response = await axios.get(
                    "http://192.168.1.100:8000/api/getOrderHistory",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                let fetchedOrders = response.data;

                // Sort the fetched orders by updated_at date
                fetchedOrders.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

                setOrdersHistory(fetchedOrders);
            } catch (error) {
                console.error("Error fetching data:", error);
                if (error.response) {
                    console.error("Status:", error.response.status);
                    console.error("Data:", error.response.data);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <SafeAreaView>
            <View
                style={Platform.OS === "ios" ? styles.topView : styles.topViewAndroid}
            >
                <TouchableOpacity style={styles.back} onPress={navigateBack}>
                    <Ionicons name="chevron-back" color={myColors.blue} size={32} />
                    <Text style={styles.topText}>Close</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.titleCont}>
                <Text style={styles.title}>Orders History</Text>
            </View>
            <View>
                <FlatList
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                    data={ordersHistory}
                    keyExtractor={(item) => item.order_id.toString()}
                    renderItem={({ item }) => <OrderListItem notification={item} />}
                />
            </View>
        </SafeAreaView>
    );
};

export default OrdersHistory;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontFamily: "SF-medium",
        color: myColors.blue,
    },
    titleCont: {
        paddingVertical: 4,
        width: "100%",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#c1c1c1",
    },
    topView: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    topViewAndroid: {
        marginLeft: 10,
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "8%",
    },
    back: {
        padding: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    topText: {
        fontSize: 16,
        fontFamily: "SF-medium",
        color: myColors.blue,
    },
    clear: {
        padding: 8,
    },
    list: {
        height: "70%",
    },
});
