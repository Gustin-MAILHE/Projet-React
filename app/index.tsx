// app/index.tsx
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "@/components/header/header";
import Home from "@/components/home/home";
import { Footer } from "@/components/footer/footer";

export default function Index() {
    return (
        <SafeAreaProvider>
            <Header />
            <Home />
            <Footer />
        </SafeAreaProvider>
    );
}
