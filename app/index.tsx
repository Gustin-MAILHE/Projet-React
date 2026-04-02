import { SafeAreaView, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { useReactionGame } from "@/hooks/useReactionGame";
import { LightCircle }    from "@/components/LightCircle";
import { ResultDisplay }  from "@/components/ResultDisplay";

/**
 * Main screen
 */
export default function Index() {
    const { gameState, reactionTime, bestScore, scores, startGame, handlePress } =
        useReactionGame();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Reaction Time</Text>

            <LightCircle gameState={gameState} reactionTime={reactionTime} />

            {gameState === "idle" || gameState === "done" ? (
                <TouchableOpacity style={styles.button} onPress={startGame}>
                    <Text style={styles.buttonText}>
                        {gameState === "done" ? "↺ Rejouer" : "▶ Démarrer"}
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.bigButton} onPress={handlePress}>
                    <Text style={styles.bigButtonText}>RÉAGIR !</Text>
                </TouchableOpacity>
            )}

            {reactionTime !== null && bestScore !== null && (
                <ResultDisplay
                    reactionTime={reactionTime}
                    bestScore={bestScore}
                    totalScores={scores.length}
                />
            )}
        </SafeAreaView>
    );
}