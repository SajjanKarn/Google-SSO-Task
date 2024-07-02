import React, { createContext, useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import { ActivityIndicator, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: any;
  promptAsync?: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null as User | null,
  loading: false,
  error: null,
  promptAsync: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "664038520099-on182g40a9sfeho9seqjhdrg115ff1ui.apps.googleusercontent.com",
    webClientId:
      "664038520099-lr4um38v3lshvhkksnhettch5f3p3st6.apps.googleusercontent.com",
  });

  const logout = async () => {
    setAccessToken("");
    setUser(null);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("accessToken");
  };

  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedAccessToken = await AsyncStorage.getItem("accessToken");

        if (storedUser && storedAccessToken) {
          setUser(JSON.parse(storedUser));
          setAccessToken(storedAccessToken);
        }
      } catch (error) {
        throw new Error("Error loading stored auth");
      } finally {
        setLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      setAccessToken(authentication?.accessToken || "");
    }
  }, [response]);

  useEffect(() => {
    if (!accessToken) return;
    fetchUserInfo();
  }, [accessToken]);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://www.googleapis.com/userinfo/v2/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error.message);
      }

      setUser({
        id: result.id,
        email: result.email,
        name: result.name,
        picture: result.picture,
      });

      await AsyncStorage.setItem("user", JSON.stringify(result));
      await AsyncStorage.setItem("accessToken", accessToken);
    } catch (error) {
      setError(error);
      console.error("Error fetching user info", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        promptAsync,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
