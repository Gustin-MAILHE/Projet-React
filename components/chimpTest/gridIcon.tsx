import React from "react";
import { View, StyleSheet } from "react-native";

export default function GridIcon()
{
    return (
        <View style={styles.grid}>
            {[0,1,2,3].map(i => <View key={i} style={[styles.cell, i === 3 && styles.cellOutline]} />)}
        </View>
    );
}

const styles = StyleSheet.create({
    grid:
    {
        flexDirection: "row",
        flexWrap: "wrap",
        width: 88, height: 88,
        gap: 6,
        marginBottom: 28
    },
    cell:
    {
        width: 38,
        height: 38,
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.55)"
    },
    cellOutline:
    {
        backgroundColor: "transparent",
        borderWidth: 3,
        borderColor: "rgba(255,255,255,0.55)"
    },
});