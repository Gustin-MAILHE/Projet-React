import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Dimensions, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { modes } from "../../constants/chimpTest";
import { useChimpTest } from "../../hooks/useChimpTest";
import LivesDisplay from "./livesDisplay";
import Cell from "./cell";
import { chimpTestStyles as styles } from "./chimpTestStyles";
import GameStatsModule from "../moduleGraphe/gameStatsModule";
import myReferenceData from "../../assets/chimpTest/referenceScores.json";
import fakePlayers from "../../assets/chimpTest/fakePlayers.json";

const GRID_SIZE = 5;

export default function ChimpTest({ onSaveScore }: { onSaveScore?: (score: number, mode: "easy" | "hard") => void })
{
    const {
        phase,
        mode,
        level,
        lives,
        cells,
        nextExpected,
        tappedIds,
        wrongId,
        score,
        handleSelectMode,
        handleTryAgain,
        handleCellPress
    } = useChimpTest();

    const cfg = modes[mode];
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const { width, height } = Dimensions.get("window");

    const padding = 24;
    const gap = 6;
    const availableSize = Math.min(width - padding * 2, height * 0.6);
    const cellSize = (availableSize - gap * (GRID_SIZE - 1)) / GRID_SIZE;
    const gridSize = cellSize * GRID_SIZE + gap * (GRID_SIZE - 1);

    const triggerShake = () => {
        shakeAnim.setValue(0);
        Animated.sequence([
            Animated.timing(shakeAnim,
                {
                    toValue: 10,
                    duration: 60,
                    useNativeDriver: true
                }),
            Animated.timing(shakeAnim,
                {
                toValue: -10,
                duration: 60,
                useNativeDriver: true
                }),
            Animated.timing(shakeAnim,
                {
                    toValue: 8,
                    duration: 60,
                    useNativeDriver: true
                }),
            Animated.timing(shakeAnim,
                {
                    toValue: 0,
                    duration: 60,
                    useNativeDriver: true }),
        ]).start();
    };

    useEffect(() => {
        if (phase === "result")
        {
            fadeAnim.setValue(0);
            Animated.timing(fadeAnim,
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }).start();
        }
    }, [phase]);

    if (phase === "modeSelect")
    {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centered}>
                    <Text style={styles.title}>Chimp Test</Text>
                    <Text style={styles.subtitle}>
                        Mémorisez les nombres, puis touchez-les dans le bon ordre.
                    </Text>

                    <Text style={styles.modeLabel}>Choisissez votre mode</Text>
                    <View style={styles.modeRow}>
                        {(["easy", "hard"] as const).map((m) => {
                            const c = modes[m];
                            return (
                                <TouchableOpacity
                                    key={m}
                                    style={[styles.modeCard, { borderColor: c.accentColor }]}
                                    onPress={() => handleSelectMode(m)}
                                    activeOpacity={0.8}
                                >
                                    <View style={[styles.modeBadge, { backgroundColor: c.badgeColor }]}>
                                        <Text style={styles.modeBadgeText}>{c.label}</Text>
                                    </View>
                                    <Text style={styles.modeDescription}>{c.description}</Text>
                                    <View style={styles.modeLivesPreview}>
                                        {Array.from({ length: c.lives }, (_, i) => (
                                            <Text key={i} style={{ fontSize: 16 }}>❤️</Text>
                                        ))}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    if (phase === "result")
    {
        return (
            <SafeAreaView style={styles.container}>
                <GameStatsModule
                    score={score}
                    mode={mode}
                    config={{
                        playerId: "player-1",
                        playerName: "Toi",
                        storageKey: "chimp_scores_player1",
                        referenceData: myReferenceData,
                        fakePlayers: fakePlayers,
                    }}
                    onPlayAgain={handleTryAgain}
                    onSaveScore={onSaveScore}
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.header, { transform: [{ translateX: shakeAnim }] }]}>
                <Text style={styles.levelText}>Niveau {level}</Text>
                <LivesDisplay lives={lives} max={cfg.lives} />
                {phase === "memorize" && <Text style={styles.phaseHint}>Mémorisez !</Text>}
                {phase === "recall" && <Text style={styles.phaseHint}>Touchez : {nextExpected}</Text>}
            </Animated.View>

            <View style={{ width: gridSize, height: gridSize, position: "relative", alignSelf: "center" }}>
                {cells.map((cell) => {
                    const col = cell.id % GRID_SIZE;
                    const row = Math.floor(cell.id / GRID_SIZE);
                    return (
                        <Cell
                            key={`${level}-${cell.id}`}
                            cell={cell}
                            phase={phase === "memorize" ? "memorize" : "recall"}
                            isTapped={tappedIds.has(cell.id)}
                            isWrong={wrongId === cell.id}
                            cellSize={cellSize}
                            left={col * (cellSize + gap)}
                            top={row * (cellSize + gap)}
                            onPress={(c) => handleCellPress(c, triggerShake)}
                        />
                    );
                })}
            </View>
        </SafeAreaView>
    );
}