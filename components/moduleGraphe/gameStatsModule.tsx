import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { GameStatsConfig } from "./types";
import { useScores } from "../../hooks/useScores";
import ScoreGraph from "./scoreGraph";
import Podium from "./podium";
import { s } from "./moduleStyle";

interface Props
{
    score: number;
    mode: "easy" | "hard";
    config: GameStatsConfig;
    onPlayAgain: () => void;
    onSaveScore?: (score: number, mode: "easy" | "hard") => void;
}

export default function GameStatsModule({ score, mode: initialMode, config, onPlayAgain, onSaveScore }: Props)
{
    const [mode, setMode] = useState<"easy" | "hard">(initialMode);
    const [saved, setSaved] = useState(false);
    const { saveScore, getLeaderboard, getMyRank, getMyHistory, loaded } = useScores(config);

    const handleSave = async () => {
        await saveScore(score, initialMode);
        onSaveScore?.(score, initialMode);
        setSaved(true);
    };

    return (
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <Text style={s.scoreLabel}>Score</Text>
            <Text style={s.scoreNumber}>{score}</Text>

            <View style={s.btnRow}>
                {!saved ? (
                    <TouchableOpacity style={s.btnGold} onPress={handleSave}>
                        <Text style={s.btnGoldText}>Voir les stats et podium</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={[s.btnGold, { backgroundColor: "#27ae60" }]}>
                        <Text style={s.btnGoldText}>✓ Voir les stats et podium</Text>
                    </View>
                )}
                <TouchableOpacity style={s.btnSecondary} onPress={onPlayAgain}>
                    <Text style={s.btnSecondaryText}>Rejouer</Text>
                </TouchableOpacity>
            </View>

            {saved && loaded && (
                <>
                    <View style={s.switchRow}>
                        {(["easy", "hard"] as const).map(m => (
                            <TouchableOpacity
                                key={m}
                                style={[s.switchBtn, mode === m && s.switchBtnActive]}
                                onPress={() => setMode(m)}
                            >
                                <Text style={[s.switchText, mode === m && s.switchTextActive]}>
                                    {m === "easy" ? "Facile" : "Difficile"}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <ScoreGraph
                        myScore={score}
                        mode={mode}
                        referenceData={config.referenceData}
                    />

                    <Podium
                        leaderboard={getLeaderboard(mode)}
                        personalHistory={getMyHistory(mode)}
                        currentPlayerId={config.playerId}
                        myRank={getMyRank(mode)}
                        myScore={score}
                        mode={mode}
                    />
                </>
            )}

        </ScrollView>
    );
}