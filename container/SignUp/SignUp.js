import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Switch,
} from 'react-native';
  import * as ImagePicker from "expo-image-picker";
import { apiCall } from '../../config/api';
import { useAuth } from '../../hooks/AuthContext';

const { width } = Dimensions.get("window");


const SignUp = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // Step 1 data
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Step 2 data
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [lifestyleInterest, setLifestyleInterest] = useState([]);
  const [mineGoals, setMineGoals] = useState([]);
  const [otherInfo, setOtherInfo] = useState('');
  const [spendMostOn, setSpendMostOn] = useState([]);

  const handleNextStep = () => {
    if (!email || !phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setStep(2);
  };

// Inside the SignUp component
const pickImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission needed", "Please allow access to your photo library.");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (!result.canceled) {
    setImageUrl(result.assets[0].uri);
  }
};

  const handleSignup = async () => {
    if (!fullName || !dob || !ageRange) {
      Alert.alert('Error', 'Please fill in required fields');
      return;
    }

    const signupData = {
      fullName,
      email,
      phone,
      dob,
      isStudent,
      ageRange,
      imageUrl,
      lifestyleInterest,
      mineGoals,
      otherInfo,
      spendMostOn,
      preferences: {
        trackGoalCompletion: true,
        seeHowOthersSave: true,
        shareStreaksChallenges: false
      }
    };

    setLoading(true);
    console.log('📋 Sign Up Data:', signupData);
    const response = await apiCall('/create/user', 'POST', signupData);
    console.log('📋 Sign Up Response:', response);
    setLoading(false);

    if (response.status === 201) {
      Alert.alert('Success', 'Account created! Check your email for password.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } else if (response.status === 500) {
      Alert.alert('Error', 'This email already exists');
    } else {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  if (step === 1) {
    return (
      <View style={styles.container}>
      
          <Text style={styles.title}>Sign Up</Text>
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.linkText}>
              Have an account? <Text style={styles.linkTextBold}>Sign In</Text>
            </Text>
          </TouchableOpacity>
          <Text style={styles.linkTextBold}>Step 1 of 2</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={styles.logBtn} onPress={handleNextStep}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>

          
        </View>
    
    );
  }

  return (
    <ScrollView
  style={{ flex: 1 }}
  contentContainerStyle={styles.container}
>
        <Text style={styles.title}>Complete Profile</Text>
        <Text style={styles.subtitle}>Step 2 of 2</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (YYYY-MM-DD)"
            value={dob}
            onChangeText={setDob}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Age Range (e.g., 18-25)"
            value={ageRange}
            onChangeText={setAgeRange}
          />
          
         <View style={{ marginTop: 15, alignItems: "center" }}>
  {imageUrl ? (
    <Image
      source={{ uri: imageUrl }}
      style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 10 }}
    />
  ) : (
    <Text style={{ color: "#777", marginBottom: 10 }}>No profile image selected</Text>
  )}
  <TouchableOpacity style={styles.logBtn} onPress={pickImage}>
    <Text style={styles.btnText}>
      {imageUrl ? "Change Image" : "Select Profile Image"}
    </Text>
  </TouchableOpacity>
</View>

          
          <TextInput
            style={styles.input}
            placeholder="Other Info (optional)"
            value={otherInfo}
            onChangeText={setOtherInfo}
            multiline
            numberOfLines={3}
          />
        </View>

      <View style={styles.switchContainer}>
  <Text style={styles.checkboxLabel}>I am a student</Text>
  <Switch
    trackColor={{ false: "#ccc", true: "#F0C0BE" }}
    thumbColor={isStudent ? "#fff" : "#f4f3f4"}
    ios_backgroundColor="#ccc"
    onValueChange={() => setIsStudent(!isStudent)}
    value={isStudent}
  />
</View>


        <TouchableOpacity 
          style={[styles.logBtn, loading && styles.buttonDisabled]}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.logBtn}
          onPress={() => setStep(1)}
        >
          <Text style={styles.btnText}>Back to Step 1</Text>
        </TouchableOpacity>
      
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
     container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  textWrapper:{
    marginTop:20,
    marginBottom:10,
    width:300,
    height:60,
    textAlign:"left",
    justifyContent:"space-between",
  },
  title:{
    color:"#1C1825",
    fontSize: 24,
    fontWeight:"bold",
    fontFamily:"Ouicksand",
    marginBottom:20,
  },
  linkText:{
    color:"#757575", 
    fontWeight:"medium", 
    fontSize:16,
    marginBottom:15,
  },
    linkTextBold:{
    color:"#1C1825",
    fontWeight:"bold",
    fontSize:18,
  },
  input: {
    backgroundColor: "#FFEAE9",
    borderRadius: 10,
    width: width * 0.8,
    padding: 12,
    marginTop: 15,
  },
  logBtn: {
    backgroundColor: "#F0C0BE",
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    width: width * 0.8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16 },

  switchContainer: {
  flexDirection: "row",
  marginTop:15,
  alignItems: "center",
  justifyContent: "space-evenly",
  width: width * 0.8,
  paddingVertical: 15,
  backgroundColor:"#CFD3D8",
  borderRadius:10,
},

checkboxLabel: {
  fontSize: 16,
  color: "#1C1825",
  fontWeight: "500",
},
})