import { View, Image } from "react-native";
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
    <View className="flex-1">
      <Image
        source={require("../assets/images/splash.png")}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
  );
}
