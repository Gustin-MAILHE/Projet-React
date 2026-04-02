import { View, Text } from "react-native";
import { styles } from "@/app/styles";
import { GameState } from "@/hooks/useReactionGame";

interface Props {
    gameState: GameState;
    reactionTime: number | null;
}

/**
 * Central light circle
 * Changes color according to its state : grey (idle/done), red (waiting), green (go).
 */
export function LightCircle({ gameState, reactionTime }: Props) {
    function getColor() {
        if (gameState === "go")      return "#2ecc71";
        if (gameState === "waiting") return "#e74c3c";
        return "#555";
    }

    function getText() {
        if (gameState === "go")      return "APPUIE !";
        if (gameState === "waiting") return "Attends...";
        if (gameState === "done")    return `${reactionTime} ms`;
        return "Prêt ?";
    }

    return (
        <View style={[styles.light, { backgroundColor: getColor() }]}>
            <Text style={styles.lightText}>{getText()}</Text>
        </View>
    );
}