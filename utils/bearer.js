import * as SecureStore from "expo-secure-store";

export const saveBearerToken = async (token) => {
	try {
		await SecureStore.setItemAsync("bearerToken", token);
	} catch (error) {
		console.error("Error saving token:", error);
	}
};

export const getBearerToken = async () => {
	try {
		const token = await SecureStore.getItemAsync("bearerToken");
		return token;
	} catch (error) {
		console.error("Error retrieving token:", error);
		return null; // Or handle error differently
	}
};

export const logout = async () => {
	try {
		await SecureStore.deleteItemAsync("bearerToken");
		// Optionally, clear other user data stored securely
	} catch (error) {
		console.error("Error deleting token:", error);
	}
};
