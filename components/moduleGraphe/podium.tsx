import React from "react";
import { View, Text } from "react-native";
import { LeaderboardEntry } from "./types";
import { s } from "./moduleStyle";

interface Props {
    leaderboard: LeaderboardEntry[];
    currentPlayerId: string;
    myRank: number | null;
    myScore: number;
    mode: "easy" | "hard";
}

export default function Podium({ leaderboard, currentPlayerId, myRank, myScore, mode }: Props)
{
    const top3 = leaderboard.slice(0, 3);
    const medals = ["🥇", "🥈", "🥉"];
    const heights = [100, 75, 60];
    const isInTop3 = myRank !== null && myRank <= 3;

    return (
        <View style={s.podiumContainer}>
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
                            <Text style={[s.podiumScore, isMe && s.meText]}>{player.best}</Text>
                            <View style={[s.podiumBlock, { height: heights[rankIdx] }, isMe && s.meBlock]}>
                                <Text style={s.rankText}>#{rankIdx + 1}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>

            {!isInTop3 && myRank !== null && (
                <View style={s.myRankRow}>
                    <Text style={s.myRankText}>Ta position : #{myRank} — Score : {myScore}</Text>
                </View>
            )}

            <View style={s.list}>
                {leaderboard.map((p, i) => {
                    const isMe = p.id === currentPlayerId;
                    return (
                        <View key={p.id} style={[s.listRow, isMe && s.meListRow]}>
                            <Text style={s.listRank}>#{i + 1}</Text>
                            <Text style={[s.listName, isMe && s.meText]}>{isMe ? "Toi" : p.name}</Text>
                            <Text style={[s.listScore, isMe && s.meText]}>{p.best}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}