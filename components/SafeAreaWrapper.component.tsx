import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  className?: string;
  statusBarStyle?: "auto" | "inverted" | "light" | "dark";
}

const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
  children,
  className,
  statusBarStyle = "auto",
}) => {
  return (
    <SafeAreaView className={className || "flex-1"}>
      {children}

      {statusBarStyle && <StatusBar style={statusBarStyle} />}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;
