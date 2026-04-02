import React from "react";
import { TouchableOpacity, Text, ViewStyle } from "react-native";
import { Cell as CellType } from "../../constants/chimpTest";

interface Props
{
    cell?: CellType;
    phase: "memorize" | "recall";
    isTapped: boolean;
    isWrong: boolean;
    cellSize: number;
    onPress: (cell: CellType) => void;
}

export default function Cell({ cell, phase, isTapped, isWrong, cellSize, onPress }: Props)
{
    const style: ViewStyle[] = [
        {
            width: cellSize,
            height: cellSize,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            margin: 3
        },
        cell ? (isWrong ? { backgroundColor: "#e74c3c" }
                : isTapped ? { backgroundColor: "rgba(255,255,255,0.08)" }
                    : { backgroundColor: "#3498db" })
            : { backgroundColor: "transparent" }
    ];

    return (
        <TouchableOpacity
            disabled={!cell || isTapped}
            onPress={() => cell && onPress(cell)}
            style={style}
            activeOpacity={cell ? 0.7 : 1}
        >
            {
                phase === "memorize" && cell &&
                <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18 }}>{cell.number} </Text>
            }
        </TouchableOpacity>
    );
}