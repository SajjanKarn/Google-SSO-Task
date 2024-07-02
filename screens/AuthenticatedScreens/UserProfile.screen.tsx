import { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { SafeAreaWrapper } from "../../components";
import AuthContext from "../../context/AuthContext";

export default function UserProfile() {
  const { user, logout } = useContext(AuthContext);

  return (
    <SafeAreaWrapper className="flex-1">
      <View className="flex-1 bg-white">
        <View className="w-full bg-sky-500 justify-center items-center py-3">
          <Text className="text-white text-xl">Profile</Text>
        </View>

        <View className="w-full h-[90%] px-5 pt-5">
          <View className=" bg-sky-100 p-5 shadow-md h-full rounded-2xl">
            <View className="flex-row">
              <View className="w-20 h-20 mr-3">
                <Image
                  source={{
                    uri: user?.picture || "https://i.pravatar.cc/300",
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  className="rounded-full"
                />
              </View>
              <View className="flex-col justify-evenly">
                <Text className="font-bold text-lg">
                  {user?.name || "John Doe"}
                </Text>
                <Text className="text-sm">{user?.email || ""}</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              className="bg-red-500 w-full h-12 mt-5 rounded-md flex-row justify-center items-center"
              onPress={logout}
            >
              <Text className="text-white text-lg">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
}
