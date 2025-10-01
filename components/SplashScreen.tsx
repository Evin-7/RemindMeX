import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient colors={["#ffffff", "#86efac"]} style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("../assets/icons/MainLogo.png")}
          className="w-60 h-60 mb-6"
          resizeMode="contain"
        />
        <Text className="mt-8 text-lg text-brand font-poppins-bold text-center px-6">
          “Stay organized. Stay ahead. Stay stress-free.”
        </Text>
        <Text className="mt-2 text-base font-poppins-italic text-brand text-center px-6">
          — Your daily companion, RemindMeX
        </Text>
      </View>
    </LinearGradient>
  );
}
