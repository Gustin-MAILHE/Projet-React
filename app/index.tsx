import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ChimpTest from "../components/chimpTest/chimpTest";

export default function App()
{
    const handleSaveScore = (score: number, mode: "easy" | "hard") => {
        console.log("Score sauvegardé :", score, "Mode :", mode);
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <ChimpTest onSaveScore={handleSaveScore} />
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
});
