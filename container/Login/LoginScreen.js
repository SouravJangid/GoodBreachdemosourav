import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
  Image,
  loading
} from 'react-native';
import { apiCall } from '../../config/api';
import { saveToStorage } from '../../utils/Storage';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // const handleLogin = async () => {
  //   const { status, data } = await apiCall('/user/login', 'POST', { email, password });

  //   if (status === 200) {
  //     Alert.alert('Error', 'An error occurred.');
  //   } else if (status === 400) {
  //     Alert.alert('Wrong Credentials');
  //   } else if (status === 201) {
  //     const user = data.data;
  //     await saveToStorage('user', user);
  //     navigation.navigate('Home');
  //   }
  // };
const handleLogin = async () => {
  try {
    const { status, data, error } = await apiCall('/user/login', 'POST', {
      email,
      password,
    });

    if (status === 201) {
      const user = data.data;
      await saveToStorage('user', user);
      navigation.navigate('Home');
    } else if (status === 400) {
      Alert.alert('Login Failed', data?.message ||error||'Invalid credentials');
    } else if (status === 401) {
      Alert.alert('Unauthorized', 'Please check your email and password');
      Alert.alert('Login Failed', data?.message || error||'Invalid credentials');
    } else if (status === 500) {
      // Alert.alert('Server Error', 'Something went wrong on our end.');
        Alert.alert('Server Error', data?.message ||error|| 'Something went wrong on our end.');
    } else {
      Alert.alert('Error', data?.message || error || 'Unknown error occurred');
    }
  } catch (e) {
    console.error('❌ Exception during login:', e);
    Alert.alert('Error', e.message || 'Unexpected error');
  }
};

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    
      <Image
        source={require('../../assets/images/Group 1.png')}
        style={{ width: 70, height: 70, marginBottom:30 }}
      />
      <Text style={styles.text}>Welcome Back To</Text>
      <Text style={styles.text}>Good Breach!</Text>
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
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity 
        style={[styles.logBtn, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.linkButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.linkText}>
          Don't have an account? <Text style={styles.linkTextBold}>Sign Up</Text>
        </Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#1C1825",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Ouicksand",
  },
  input: {
    backgroundColor: "#FFEAE9",
    borderRadius: 10,
    width: width * 0.8,
    padding: 12,
    marginTop: 15,
  },
  spacer: {
    height: 12,
  },
  logBtn: {
    backgroundColor: "#F0C0BE",
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    width: width * 0.8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16 },
  button: {
    marginTop: 15,
    flexDirection: 'row',
    backgroundColor: '#FFEAE9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 9999,
    width: 346,
  },
  linkText: {
    color: '#1C1825',
    fontSize: 16,
    fontWeight: 'medium',
  },
  linkTextBold: {
    fontWeight: "bold"
  }
});


  

//   return (
//     <View style={styles.container}>
//       <TextInput placeholder="Email" onChangeText={setEmail} />
//       <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// };


