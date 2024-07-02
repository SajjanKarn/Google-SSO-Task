import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfile from "../screens/AuthenticatedScreens/UserProfile.screen";

const AuthStack = createStackNavigator();

const UnAuthNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Profile"
          component={UserProfile}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default UnAuthNavigation;
