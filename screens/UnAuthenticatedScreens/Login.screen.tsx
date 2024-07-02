import { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";

import { SafeAreaWrapper } from "../../components";
import AuthContext from "../../context/AuthContext";

export default function LoginScreen() {
  const { promptAsync } = useContext(AuthContext);

  return (
    <SafeAreaWrapper>
      <View className="relative flex-1">
        <View className="absolute top-0 right-5 flex-col justify-center items-center">
          <TouchableOpacity activeOpacity={0.5}>
            <Feather name="info" size={28} color="#93C5FD" />
          </TouchableOpacity>
        </View>
        <View className="bg-sky-200/75 w-[200%] h-[80%] absolute top-0 right-3 rotate-[60deg] -z-20" />
        <View className="bg-sky-400 w-[200%] h-[50%] absolute bottom-0 -left-20 -rotate-45 -z-10" />

        <View className="flex-1 items-center pt-20">
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: "50%", height: "100%", objectFit: "contain" }}
          />
        </View>

        <View className="flex-1 flex-col justify-end items-center mt-5 px-5 pb-10">
          <TouchableOpacity
            activeOpacity={0.5}
            className="w-full bg-white h-16 rounded-md flex-row justify-evenly items-center shadow-md"
            onPress={() => promptAsync && promptAsync()}
          >
            <Ionicons name="logo-google" size={30} color="#DB4437" />
            <Text className="text-lg text-black font-medium">
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5} className="mt-5">
            <Text className="text-lg text-white font-semibold underline">
              Terms of Use
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaWrapper>
  );
}
