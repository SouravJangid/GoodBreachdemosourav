import React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { setItem } from "../utils/AsyncStorage";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;

export default function OnBoardingScreen() {
    const navigation = useNavigation();

    const handleDone = () => {
        navigation.navigate("Login");
        setItem("onboarded", "1");
    };

    const doneButton = ({ ...props }) => (
        <View style={{ width: width, alignItems: "center", marginTop: -50 }}>
            <TouchableOpacity style={styles.getStartedButton} {...props}>
                <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );

    const skipButton = ({ ...props }) => (
        <TouchableOpacity style={styles.getSkipButton} {...props}>
            <Text style={styles.getSkipText}>Skip</Text>
        </TouchableOpacity>
    );

    const nextButton = ({ ...props }) => (
        <View style={{ width: 85, height: 99, marginBottom: 30 }}>
            <TouchableOpacity style={styles.circleButton} {...props}>
                <Image source={require("../assets/images/next_arrow.png")} />
            </TouchableOpacity>
        </View>
    );

    const renderImage = (source) => (
        <View style={styles.imageWrapper}>
            <View style={styles.bottomPink} />
            <View style={styles.curve} />
            <Image source={source} style={styles.image} resizeMode="contain" />
        </View>
    );

    const Dot = ({ selected }) => (
        <View
            style={{
                marginBottom: 170,
                height: 8,
                width: selected ? 24 : 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor: selected ? "#F26A6A" : "#C4C4C4",
            }}
        />
    );

    return (
        <Onboarding
            onDone={handleDone}
            onSkip={handleDone}
            DotComponent={Dot}
            NextButtonComponent={nextButton}
            DoneButtonComponent={doneButton}
            SkipButtonComponent={skipButton}
            bottomBarHighlight={false}
            containerStyles={{ paddingHorizontal: 15 }}
            pages={[
                {
                    backgroundColor: "white",
                    image: renderImage(require("../assets/images/image_1.png")),
                    title: (
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Save Mindfully</Text>
                            <Text style={styles.subText}>
                                Cut out small daily expenses and turn them into big wins
                            </Text>
                        </View>
                    ),
                    subtitle: "",
                },
                {
                    backgroundColor: "white",
                    image: renderImage(require("../assets/images/Group 123 1.png")),
                    title: (
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Track Progress Easily</Text>
                            <Text style={styles.subText}>
                                Visual dashboards and milestones for each goal
                            </Text>
                        </View>
                    ),
                    subtitle: "",
                },
                {
                    backgroundColor: "white",
                    image: renderImage(require("../assets/images/Group 124 1.png")),
                    title: (
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Bank Level Security</Text>
                            <Text style={styles.subText}>
                                Your savings are secure, encrypted, and protected
                            </Text>
                        </View>
                    ),
                    subtitle: "",
                },
            ]}
        />
    );
}
const styles = StyleSheet.create({
    imageWrapper: {
        width: width,
        height: height * 0.5,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    bottomPink: {
        position: "absolute",
        top: -width * 0.6,
        width: width * 2,
        height: width * 1.8,
        borderBottomLeftRadius: width,
        borderBottomRightRadius: width,
        backgroundColor: "#FFE9E8",
        zIndex: 0,
    },
    curve: {
        position: "absolute",
        top: -width * 0.55,
        width: width * 2,
        height: width * 1.6,
        borderBottomLeftRadius: width,
        borderBottomRightRadius: width,
        backgroundColor: "#F0C0BE",
        zIndex: 1,
    },
    image: {
        width: isTablet ? 400 : 280,
        height: isTablet ? 420 : 300,
        zIndex: 2,
        marginTop: isTablet ? 100 : 80,
    },
    textContainer: {
        flex: 1,
        marginTop: isTablet ? 40 : 20,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: isTablet ? 60 : 30,
    },
    title: {
        fontSize: isTablet ? 36 : 28,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    subText: {
        fontSize: isTablet ? 22 : 18,
        color: "#A0A0A0",
        textAlign: "center",
        lineHeight: 30,
    },
    circleButton: {
        height: 56,
        width: 56,
        backgroundColor: "#F2A2A2",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    getStartedButton: {
        paddingVertical: 14,
        paddingHorizontal: isTablet ? 40 : 30,
        backgroundColor: "#F26A6A",
        borderRadius: 10,
        marginBottom: 30,
    },
    getStartedText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: isTablet ? 18 : 16,
    },
    getSkipButton: {
        width: 112,
        height: 99,
        justifyContent: "center",
        alignItems: "center",
        marginTop:-80,
    },
    getSkipText: { 
        fontSize: 20, 
        fontWeight: "semibold", 
        color: "#A0A0A0" },
});
