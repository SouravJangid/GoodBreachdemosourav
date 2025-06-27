import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import LoginScreen from "../container/Login/LoginScreen";
import SignUp from '../container/SignUp/SignUp';
import Profile from '../container/Profile/Profile';
import DashBoard from '../container/DashBoard/DashBoard';
import HomeScreen from "../screens/HomeScreen";
import CreateGoal from '../container/Goal/CreateGoal';
// import Goal from "../container/Goal/Goal"
import { useEffect,useState } from "react";
import { getItem } from "../utils/AsyncStorage";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("onboarded");
    if (onboarded === "1") {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            component={OnBoardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name="CreateGoal"
            component={CreateGoal}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          /> 
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name="DashBoard"
            component={DashBoard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Onboarding"
            component={OnBoardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          /> 
           <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="DashBoard"
            component={DashBoard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name="CreateGoal"
            component={CreateGoal}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}