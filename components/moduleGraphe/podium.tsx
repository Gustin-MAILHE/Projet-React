import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LeaderboardEntry, PersonalEntry } from "./types";
import { s } from "./moduleStyle";
import { sw, sf } from "./responsive";

interface Props
{
    leaderboard: LeaderboardEntry[];
    personalHistory: PersonalEntry[];
    currentPlayerId: string;
    myRank: number | null;
    myScore: number;
    mode: "easy" | "hard";
    lowerIsBetter?: boolean;
}

type Tab = "global" | "personal";

function formatDate(iso: string): string
{
    const d = new Date(iso);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    return `${day}/${month}  ${h}:${m}`;
}

export default function Podium({ leaderboard, personalHistory, currentPlayerId, myRank, mode, lowerIsBetter = false}: Props)
{
    const [tab, setTab] = useState<Tab>("global");
    const top3 = leaderboard.slice(0, 3);
    const medals = ["🥇", "🥈", "🥉"];
    const heights = [sw(100), sw(75), sw(60)];
    const isInTop3 = myRank !== null && myRank <= 3;

    const bestScore = personalHistory.length > 0
        ? (lowerIsBetter ? Math.min(...personalHistory.map(e => e.score)) : Math.max(...personalHistory.map(e => e.score)))
        : null;
    const avgScore = personalHistory.length > 0
        ? Math.round(personalHistory.reduce((sum, e) => sum + e.score, 0) / personalHistory.length)
        : null;

    return (
        <View style={s.podiumContainer}>
            <View style={s.switchRow}>
                <TouchableOpacity
                    style={[s.switchBtn, tab === "global" && s.switchBtnActive]}
                    onPress={() => setTab("global")}
                >
                    <Text style={[s.switchText, tab === "global" && s.switchTextActive]}>
                        Classement Générale
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[s.switchBtn, tab === "personal" && s.switchBtnActive]}
                    onPress={() => setTab("personal")}
                >
                    <Text style={[s.switchText, tab === "personal" && s.switchTextActive]}>
                        Mes parties
                    </Text>
                </TouchableOpacity>
            </View>

            {tab === "global" && (
                <>
                    <Text style={s.graphTitle}>
                        Leaderboard — {mode === "easy" ? "Facile" : "Difficile"}
                    </Text>

                    <View style={s.podiumRow}>
                        {[1, 0, 2].map((rankIdx) => {
                            const player = top3[rankIdx];

                            if (!player) {
                                return <View key={rankIdx} style={{flex: 1}}/>;
                            }

                            const isMe = player.id === currentPlayerId;
                            return (
                                <View key={rankIdx} style={s.podiumCol}>
                                    <Text style={s.medal}>{medals[rankIdx]}</Text>
                                    <Text style={[s.podiumName, isMe && s.meText]} numberOfLines={1}>
                                        {isMe ? "Toi" : player.name}
                                    </Text>
                                    <Text style={[s.podiumScore, isMe && s.meText]}>
                                        {player.best}
                                    </Text>
                                    <View style={[s.podiumBlock, { height: heights[rankIdx] }, isMe && s.meBlock]}>
                                        <Text style={s.rankText}>#{rankIdx + 1}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>

                    {!isInTop3 && myRank !== null && (
                        <View style={s.myRankRow}>
                            <Text style={s.myRankText}>Ta position : #{myRank}</Text>
                        </View>
                    )}

                    <View style={s.list}>
                        {leaderboard.map((p, i) => {
                            const isMe = p.id === currentPlayerId;
                            return (
                                <View key={p.id} style={[s.listRow, isMe && s.meListRow]}>
                                    <Text style={s.listRank}>#{i + 1}</Text>
                                    <Text style={[s.listName, isMe && s.meText]}>
                                        {isMe ? "Toi" : p.name}
                                    </Text>
                                    <Text style={[s.listScore, isMe && s.meText]}>{p.best}</Text>
                                </View>
                            );
                        })}
                    </View>
                </>
            )}

            {tab === "personal" && (
                <>
                    <Text style={s.graphTitle}>
                        Mes parties — {mode === "easy" ? "Facile" : "Difficile"}
                    </Text>

                    {personalHistory.length > 0 && (
                        <View style={s.statsRow}>
                            <View style={s.statBox}>
                                <Text style={s.statValue}>{personalHistory.length}</Text>
                                <Text style={s.statLabel}>parties</Text>
                            </View>
                            <View style={s.statDivider} />
                            <View style={s.statBox}>
                                <Text style={s.statValue}>{bestScore}</Text>
                                <Text style={s.statLabel}>meilleur</Text>
                            </View>
                            <View style={s.statDivider} />
                            <View style={s.statBox}>
                                <Text style={s.statValue}>{avgScore}</Text>
                                <Text style={s.statLabel}>moyenne</Text>
                            </View>
                        </View>
                    )}

                    <View style={[s.list, { marginTop: sw(12) }]}>
                        {personalHistory.length === 0 ? (
                            <Text style={s.hint}>Aucune partie enregistrée pour ce mode.</Text>
                        ) : (
                            personalHistory.map((entry, i) => {
                                const isBest = entry.score === bestScore && i === personalHistory.findIndex(e => e.score === bestScore);
                                return (
                                    <View key={i} style={[s.listRow, isBest && s.meListRow]}>
                                        <Text style={s.listRank}>#{i + 1}</Text>

                                        <Text style={[s.listName, { fontSize: sf(12) }]}>
                                            {formatDate(entry.date)}
                                            {isBest ? "  ⭐" : ""}
                                        </Text>

                                        <Text style={[s.listScore, isBest && s.meListText]}>
                                            {entry.score}
                                        </Text>
                                    </View>
                                );
                            })
                        )}
                    </View>
                </>
            )}
        </View>
    );
}