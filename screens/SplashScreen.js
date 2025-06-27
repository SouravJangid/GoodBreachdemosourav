import { View, Text, StyleSheet, Image } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>

        <Image
          source={require("../assets/images/Group 1.png")}
          style={styles.logoImg}
        />
        <Text style={styles.title}>Good Breach</Text>
        <Text style={styles.subtitle}>Financial freedom, simplified</Text>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FADADD",
    justifyContent: "center",
    alignItems: "center",
  },

  logoImg: {
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});
