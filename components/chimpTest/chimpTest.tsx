import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { modes } from "../../constants/chimpTest";
import { useChimpTest } from "../../hooks/useChimpTest";
import LivesDisplay from "./livesDisplay";
import GridIcon from "./gridIcon";
import Cell from "./cell";
import { chimpTestStyles as styles } from "./chimpTestStyles";

const { width } = Dimensions.get("window");

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
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const shakeAnim = React.useRef(new Animated.Value(0)).current;

    const padding = 24;
    const gap = 6;
    const cellSize = (width - padding * 2 - gap * (5 - 1)) / 5;

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
                    <GridIcon />
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

    if (phase === "result") {
        return (
            <SafeAreaView style={styles.container}>
                <Animated.View style={[styles.centered, { opacity: fadeAnim }]}>
                    <GridIcon />
                    <View style={[styles.modePill, { backgroundColor: cfg.badgeColor }]}>
                        <Text style={styles.modePillText}>{cfg.label} mode</Text>
                    </View>
                    <Text style={styles.label}>Score</Text>
                    <Text style={styles.scoreNumber}>{score}</Text>
                    <Text style={styles.compareText}>Sauvegardez votre score pour voir votre classement.</Text>
                    <View style={styles.btnRow}>
                        <TouchableOpacity
                            style={styles.btnGold}
                            onPress={() => onSaveScore?.(score, mode)}
                        >
                            <Text style={styles.btnGoldText}>Sauvegarder</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSecondary} onPress={handleTryAgain}>
                            <Text style={styles.btnSecondaryText}>Rejouer</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
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

            <View style={[styles.grid, { gap }]}>
                {Array.from({ length: 25 }, (_, i) => (
                    <Cell
                        key={i}
                        cell={cells.find(c => c.id === i)}
                        phase={phase === "memorize" ? "memorize" : "recall"}
                        isTapped={tappedIds.has(i)}
                        isWrong={wrongId === i}
                        cellSize={cellSize}
                        onPress={(cell) => {
                            handleCellPress(cell);
                            if (wrongId === cell.id) triggerShake();
                        }}
                    />
                ))}
            </View>
        </SafeAreaView>
    );
}