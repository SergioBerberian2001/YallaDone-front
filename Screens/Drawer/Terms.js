import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	ScrollView,
} from "react-native";
import React from "react";
import splashBg from "../../assets/images/splash-bg.jpg";
import { myColors, myDarkColors } from "../../utils/myColors";

const Terms = () => {
	return (
		<ImageBackground source={splashBg} style={styles.background}>
			<ScrollView style={styles.scrollView}>
				<Text style={styles.title}>Terms & Conditions</Text>
				<View style={styles.descriptionContainer}>
					<Text style={styles.sectionTitle}>YallaDone Mobile Application</Text>
					<Text style={styles.date}>
						Effective Date: Tuesday, June 25, 2024
					</Text>
					<Text style={styles.sectionTitle}>Welcome to YallaDone!</Text>

					<Text style={styles.description}>
						These Terms and Conditions govern your use of the YallaDone mobile
						application, which is owned and operated by YallaDone Inc. By
						accessing or using our App, you agree to be bound by these Terms. If
						you do not agree to these Terms, please do not use the App.
					</Text>
					<Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
					<Text style={styles.description}>
						By downloading, installing, or using the App, you agree to comply
						with and be legally bound by these Terms and our Privacy Policy. If
						you do not agree to these Terms, you must not use the App.
					</Text>
					<Text style={styles.sectionTitle}>2. Changes to Terms</Text>
					<Text style={styles.description}>
						We may update these Terms from time to time. If we make significant
						changes, we will notify you through the App or by other means. Your
						continued use of the App after such changes will constitute your
						acceptance of the revised Terms.
					</Text>
					<Text style={styles.sectionTitle}>3. Description of Services</Text>
					<Text style={styles.description}>
						YallaDone is a comprehensive mobile application that provides
						on-demand services, including but not limited to:
					</Text>
					<Text style={styles.description}>
						- Automotive maintenance (e.g., mechanic visits, oil changes,
						emergency rides)
					</Text>
					<Text style={styles.description}>
						- Non-automotive services (e.g., paperwork assistance, item
						delivery, transportation via taxi or personal driver)
					</Text>
					<Text style={styles.sectionTitle}>4. User Accounts</Text>
					<Text style={styles.description}>
						To access certain features of the App, you must create an account
						("Account"). You agree to provide accurate, current, and complete
						information during the registration process and to update such
						information to keep it accurate, current, and complete. You are
						responsible for safeguarding your Account credentials and for any
						activities or actions under your Account.
					</Text>
					<Text style={styles.sectionTitle}>5. Service Providers</Text>
					<Text style={styles.description}>
						YallaDone connects users with independent service providers
						("Service Providers"). We perform background checks and vetting
						processes to ensure Service Providers meet our standards. However,
						we do not guarantee the quality, safety, or legality of services
						provided by Service Providers.
					</Text>
					<Text style={styles.sectionTitle}>6. User Responsibilities</Text>
					<Text style={styles.description}>
						You agree to use the App and the services provided by Service
						Providers in a manner consistent with all applicable laws and
						regulations. You agree not to:
					</Text>
					<Text style={styles.description}>
						- Engage in any fraudulent, abusive, or unlawful activity
					</Text>
					<Text style={styles.description}>
						- Interfere with or disrupt the operation of the App or the networks
						or servers connected to the App
					</Text>
					<Text style={styles.description}>
						- Use the App for any purpose other than its intended use
					</Text>
					<Text style={styles.sectionTitle}>7. Fees and Payment</Text>
					<Text style={styles.description}>
						Certain services offered through the App may require payment. The
						fees for such services will be disclosed to you before you confirm
						your order. You agree to pay all fees and charges incurred in
						connection with your use of the App and the services. Payment
						processing services are provided by third-party payment processors,
						and your use of these services is subject to their terms and
						conditions.
					</Text>
					<Text style={styles.sectionTitle}>8. Cancellation and Refunds</Text>
					<Text style={styles.description}>
						Cancellation policies for services provided by Service Providers are
						subject to the terms set by each Service Provider. Please review the
						cancellation policy provided at the time of booking. Refunds, if
						applicable, will be processed in accordance with the Service
						Provider's policy.
					</Text>
					<Text style={styles.sectionTitle}>9. Intellectual Property</Text>
					<Text style={styles.description}>
						The App and its entire contents, features, and functionality are
						owned by the Company, its licensors, or other providers of such
						material and are protected by intellectual property laws. You may
						not copy, modify, distribute, or create derivative works based on
						the App or any part thereof.
					</Text>
					<Text style={styles.sectionTitle}>10. Limitation of Liability</Text>
					<Text style={styles.description}>
						To the fullest extent permitted by law, the Company shall not be
						liable for any indirect, incidental, special, consequential, or
						punitive damages, or any loss of profits or revenues, whether
						incurred directly or indirectly, or any loss of data, use, goodwill,
						or other intangible losses, resulting from:
					</Text>
					<Text style={styles.description}>
						- Your use of or inability to use the App
					</Text>
					<Text style={styles.description}>
						- Any conduct or content of any third party on the App
					</Text>
					<Text style={styles.description}>
						- Any content obtained from the App
					</Text>
					<Text style={styles.description}>
						- Unauthorized access, use, or alteration of your transmissions or
						content
					</Text>
					<Text style={styles.sectionTitle}>11. Indemnification</Text>
					<Text style={styles.description}>
						You agree to indemnify, defend, and hold harmless the Company and
						its affiliates, officers, directors, employees, agents, licensors,
						and suppliers from and against any claims, liabilities, damages,
						judgments, awards, losses, costs, expenses, or fees (including
						reasonable attorneys' fees) arising out of or relating to your
						violation of these Terms or your use of the App.
					</Text>
					<Text style={styles.sectionTitle}>12. Termination</Text>
					<Text style={styles.description}>
						We may terminate or suspend your Account and access to the App at
						our sole discretion, without prior notice or liability, for any
						reason, including if you breach these Terms. Upon termination, your
						right to use the App will immediately cease.
					</Text>
					<Text style={styles.sectionTitle}>13. Governing Law</Text>
					<Text style={styles.description}>
						These Terms are governed by and construed in accordance with the
						laws of [Your Country/State], without regard to its conflict of law
						principles.
					</Text>
					<Text style={styles.sectionTitle}>14. Dispute Resolution</Text>
					<Text style={styles.description}>
						Any disputes arising out of or relating to these Terms or the App
						shall be resolved through binding arbitration in accordance with the
						rules of the [Arbitration Association], rather than in court. The
						arbitration will be conducted in [Your City/State], unless otherwise
						agreed by both parties.
					</Text>
					<Text style={styles.sectionTitle}>15. Contact Information</Text>
					<Text style={styles.description}>
						If you have any questions about these Terms, please contact us at:
					</Text>
					<Text style={styles.description}>YallaDone Inc.</Text>
					<Text style={styles.description}>Zahle</Text>
					<Text style={styles.description}>Manara Building - 3rd floor</Text>
					<Text style={styles.description}>YallaDone.app@gmail.com</Text>
					<Text style={styles.description}>Contact Us: 08 - 808 808</Text>
					<Text style={styles.description}>
						By using the YallaDone mobile application, you acknowledge that you
						have read, understood, and agree to be bound by these Terms and
						Conditions.
					</Text>
				</View>
			</ScrollView>
		</ImageBackground>
	);
};

export default Terms;

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	scrollView: {
		flex: 1,
		width: "100%",
		padding: 8,
	},
	title: {
		alignSelf: "center",
		fontFamily: "SF-medium",
		color: myColors.blue,
		fontSize: 24,
		marginVertical: 16,
	},
	sectionTitle: {
		fontFamily: "SF-medium",
		color: myColors.white,
		fontSize: 20,
		marginVertical: 8,
	},
	date: {
		fontFamily: "SF-medium",
		color: myColors.white,
		fontSize: 16,
		marginVertical: 4,
	},
	description: {
		fontFamily: "SF",
		color: myColors.white,
		fontSize: 16,
		marginVertical: 4,
		paddingHorizontal: 4,
	},
	descriptionContainer: {
		backgroundColor: "rgba(47,61,126,0.6)",
		padding: 16,
		borderRadius: 10,
		paddingBottom:50
	},
});
