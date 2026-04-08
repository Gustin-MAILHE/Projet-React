// app/reaction.tsx
import { SafeAreaView, TouchableOpacity, Text } from "react-native";
import { LightCircle } from "@/components/reactionTime/LightCircle";
import { ResultDisplay } from "@/components/reactionTime/ResultDisplay";
import { useReactionGame } from "@/hooks/useReactionGame";
import { styles } from "../../app/styles";
import {Header} from "@/components/header/header";
import {Footer} from "@/components/footer/footer";

export default function ReactionScreen() {
    const { gameState, reactionTime, bestScore, scores, startGame, handlePress } =
        useReactionGame();

    return (
        <SafeAreaView style={styles.container}>
            <Header/>
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
            <Footer/>
        </SafeAreaView>
    );
}