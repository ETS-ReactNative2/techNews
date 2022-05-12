import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screen imports
import LoginScreen from "./screens/login_screen/LoginScreen";
import RegScreen from "./screens/registration_screen/RegScreen";
import NewsScreen from "./screens/news_screen/NewsScreen";
import ProfileScreen from "./screens/profile_screen/ProfileScreen";
import NewsDetailsScreen from "./screens/details_screen/NewsDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{title='Login Screen'}}/>
        <Stack.Screen name="Registration" component={RegScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="Details" component={NewsDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
