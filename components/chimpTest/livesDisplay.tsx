import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LivesDisplay({ lives, max }: { lives: number; max: number })
{
    return (
        <View style={styles.row}>
            {Array.from({ length: max }, (_, i) => (
                <Text key={i} style={[styles.heart, i >= lives && styles.heartEmpty]}>
                    {
                        i < lives ? "❤️" : "🖤"
                    }
                </Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row:
    {
        flexDirection: "row",
        gap: 6,
        marginBottom: 8
    },
    heart:
    {
        fontSize: 22
    },
    heartEmpty:
    {
        opacity: 0.35
    },
});