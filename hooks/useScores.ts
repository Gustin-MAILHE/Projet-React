import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { GameStatsConfig, ScoreEntry, Player, ScoresData, LeaderboardEntry } from "../components/moduleGraphe/types";

export function useScores(config: GameStatsConfig)
{
    const [data, setData] = useState<ScoresData>({ players: [] });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => { load(); }, []);

    const load = async () => {
        try
        {
            const raw = await AsyncStorage.getItem(config.storageKey);
            if (raw) setData(JSON.parse(raw));
        }
        catch (e)
        {
            console.error("Erreur chargement", e);
        }
        finally
        {
            setLoaded(true);
        }
    };

    const persist = async (updated: ScoresData) => {
        await AsyncStorage.setItem(config.storageKey, JSON.stringify(updated));
        setData(updated);
    };

    const saveScore = async (score: number, mode: "easy" | "hard") => {
        const entry: ScoreEntry = { mode, score, date: new Date().toISOString() };
        const existing = data.players.find(p => p.id === config.playerId);
        let updatedPlayers: Player[];

        if (existing)
        {
            updatedPlayers = data.players.map(p => {
                if (p.id !== config.playerId)
                {
                    return p;
                }
                return {
                    ...p,
                    scores: [...p.scores, entry],
                    bestEasy: mode === "easy" ? Math.max(p.bestEasy, score) : p.bestEasy,
                    bestHard: mode === "hard" ? Math.max(p.bestHard, score) : p.bestHard,
                };
            });
        }
        else
        {
            updatedPlayers = [...data.players,
            {
                id: config.playerId,
                name: config.playerName,
                scores: [entry],
                bestEasy: mode === "easy" ? score : 0,
                bestHard: mode === "hard" ? score : 0,
            }];
        }

        await persist({ players: updatedPlayers });
    };

    const getLeaderboard = (mode: "easy" | "hard"): LeaderboardEntry[] => data.players
            .map(p => ({ id: p.id, name: p.name, best: mode === "easy" ? p.bestEasy : p.bestHard })).filter(p =>
            p.best > 0).sort((a, b) => b.best - a.best);


    const getMyRank = (mode: "easy" | "hard") => {
        const idx = getLeaderboard(mode).findIndex(p => p.id === config.playerId);
        return idx === -1 ? null : idx + 1;
    };

    return {
        data,
        loaded,
        saveScore,
        getLeaderboard,
        getMyRank
    };
}