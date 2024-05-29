import myColors from "./myColors";

// popupModes.js
const popupModes = {
	success: {
		title: "Success",
		message: "Operation completed successfully!",
		icon: "checkmark-circle",
		iconColor: "green",
        type: "success",
	},
	error: {
		title: "Error",
		message: "Something went wrong!",
		icon: "close-circle",
		iconColor: myColors.red,
        type: "error",
	},
	loginError: {
		title: "Error logging in",
		message: "Something went wrong! Please try logging in again",
		icon: "close-circle",
		iconColor: myColors.red,
        type: "error",
	},
	// Add more modes as needed
};

export default popupModes;
