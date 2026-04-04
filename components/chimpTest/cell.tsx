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
    left: number;
    top: number;
    onPress: (cell: CellType) => void;
}

export default function Cell({ cell, phase, isTapped, isWrong, cellSize, left, top, onPress }: Props)
{
    let bgColor = "transparent";
    if (cell)
    {
        if (isWrong)
        {
            bgColor = "#e74c3c";
        }
        else if (isTapped)
        {
            bgColor = "rgba(255,255,255,0.08)";
        }
        else if (phase === "memorize")
        {
            bgColor = "#3498db";
        }
        else
        {
            bgColor = "#1a5276";
        }
    }

    return (
        <TouchableOpacity
            disabled={!cell || isTapped || isWrong}
            onPress={() => cell && onPress(cell)}
            activeOpacity={0.7}
            style={{
                position: "absolute",
                left,
                top,
                width: cellSize,
                height: cellSize,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: bgColor,
            }}
        >
            {phase === "memorize" && cell && (
                <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18 }}>
                    {cell.number}
                </Text>
            )}
        </TouchableOpacity>
    );
}