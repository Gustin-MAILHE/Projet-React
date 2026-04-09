// app/reaction.tsx
import React from "react";
import { Pressable, Text, View, SafeAreaView } from "react-native";
import { LightCircle } from "@/components/reactionTime/LightCircle";
import { useReactionGame } from "@/hooks/useReactionGame";
import GameStatsModule from "../moduleGraphe/gameStatsModule";
import myReferenceData from "../../assets/reactionTime/referenceScore.json";
import fakePlayers from "../../assets/reactionTime/fakePlayers.json";
import { styles } from "./styles";
import {Header} from "@/components/header/header";
import {Footer} from "@/components/footer/footer";

export default function ReactionScreen() {
    const { gameState, reactionTime, startGame, handlePress } = useReactionGame();
    const isFinished = gameState === "done" && reactionTime !== null;

    if (isFinished) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Reaction Time</Text>
                <GameStatsModule
                    score={reactionTime}
                    mode="easy"
                    config={{
                        playerId: "playerYourself",
                        playerName: "Toi",
                        storageKey: "reaction_scores_player",
                        referenceData: myReferenceData,
                        fakePlayers: fakePlayers,
                        lowerIsBetter: true,
                    }}
                    onPlayAgain={startGame}
                />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header/>
            <Text style={styles.title}>Reaction Time</Text>

            <LightCircle gameState={gameState} reactionTime={reactionTime} />

            {gameState === "idle" || gameState === "done" ? (
                <Pressable style={styles.button} onPress={startGame}>
                    <Text style={styles.buttonText}>
                        {gameState === "done" ? "↺ Rejouer" : "▶ Démarrer"}
                    </Text>
                </Pressable>
            ) : (
                <Pressable style={styles.bigButton} onPress={handlePress}>
                    <Text style={styles.bigButtonText}>RÉAGIR !</Text>
                </Pressable>
            )}
            <Footer/>
        </SafeAreaView>
    );
}