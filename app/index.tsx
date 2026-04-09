// app/index.tsx
import { Header } from "@/components/header/header";
import { Home } from "@/components/home/home";
import { Footer } from "@/components/footer/footer";
import {SafeAreaView} from "react-native";

export default function Index() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Home />
        </SafeAreaView>
    );
}
