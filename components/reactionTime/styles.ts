import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1a1a2e",
        gap: 28,
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        color: "#fff",
        letterSpacing: 2,
    },
    light: {
        width: 180,
        height: 180,
        borderRadius: 90,
        alignItems: "center",
        justifyContent: "center",
    },
    lightText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
        textAlign: "center",
    },
    button: {
        backgroundColor: "#35724a",
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "600",
    },
    bigButton: {
        backgroundColor: "#932c21",
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 12,
    },
    bigButtonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
    },
    resultBox: {
        alignItems: "center",
        gap: 6,
    },
    resultTime: {
        fontSize: 42,
        fontWeight: "700",
        color: "#fff",
    },
    resultLabel: {
        fontSize: 16,
        color: "#aaa",
    },
    best: {
        fontSize: 13,
        color: "#666",
    },
});