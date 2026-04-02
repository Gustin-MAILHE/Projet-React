import { Home } from "@/components/home/home";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import {SafeAreaProvider} from "react-native-safe-area-context";


const HomeScreen = () => (
    <SafeAreaProvider>
        <Header/>
        <Home/>
        <Footer/>
    </SafeAreaProvider>
)

export default HomeScreen;