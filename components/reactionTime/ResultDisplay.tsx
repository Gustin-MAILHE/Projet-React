import { View, Text } from "react-native";
import { styles } from "@/components/reactionTime/styles";
import { THRESHOLDS } from "@/constants/reactionGame";

interface Props {
    reactionTime: number;
    bestScore: number;
    totalScores: number;
}

/**
 * Shows the reaction time, a commentary
 * and the session's best score
 */
export function ResultDisplay({ reactionTime, bestScore, totalScores }: Props) {
    const { label } = THRESHOLDS.find((t) => reactionTime < t.max)!;

    return (
        <View>
            <View style={styles.resultBox}>
                <Text style={styles.resultTime}>{reactionTime} ms</Text>
                <Text style={styles.resultLabel}>{label}</Text>
            </View>
            <Text style={styles.best}>
                Meilleur : {bestScore} ms ({totalScores} essai{totalScores > 1 ? "s" : ""})
            </Text>
        </View>
    );
}