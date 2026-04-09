import * as SecureStore from "expo-secure-store";
import { useState, useEffect, useCallback } from "react";
import { GameStatsConfig, ScoreEntry, Player, ScoresData, LeaderboardEntry, PersonalEntry, FakePlayer } from "@/components/moduleGraphe/types";

export function useScores(config: GameStatsConfig)
{
    const [data, setData] = useState<ScoresData>({ players: [] });
    const [loaded, setLoaded] = useState(false);

    const load = useCallback(async () => {
        try
        {
            const raw = await SecureStore.getItemAsync(config.storageKey);
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
    }, [config.storageKey]);

    useEffect(() => { load(); }, [load]);

    const persist = async (updated: ScoresData) => {
        try
        {
            await SecureStore.setItemAsync(config.storageKey, JSON.stringify(updated));
            setData(updated);
        }
        catch (e)
        {
            console.error("Erreur persist:", e);
        }
    };

    const lowerIsBetter = config.lowerIsBetter ?? false;

    const mergeBest = (currentBest: number, score: number) => {
        if (currentBest <= 0) return score;
        return lowerIsBetter ? Math.min(currentBest, score) : Math.max(currentBest, score);
    };

    const saveScore = async (score: number, mode: "easy" | "hard") => {
        if (!config.storageKey)
        {
            console.error("storageKey manquant");
            return;
        }

        const entry: ScoreEntry = {
            mode,
            score,
            date: new Date().toISOString()
        };

        setData(prev => {
            const existing = prev.players.find(p => p.id === config.playerId);

            let updatedPlayers: Player[];

            if (existing)
            {
                updatedPlayers = prev.players.map(p => {
                    if (p.id !== config.playerId)
                    {
                        return p;
                    }

                    return {
                        ...p,
                        scores: [...p.scores, entry],
                        bestEasy: mode === "easy"
                            ? mergeBest(p.bestEasy, score)
                            : p.bestEasy,
                        bestHard: mode === "hard"
                            ? mergeBest(p.bestHard, score)
                            : p.bestHard,
                    };
                });
            }
            else
            {
                updatedPlayers = [
                    ...prev.players,
                    {
                        id: config.playerId,
                        name: config.playerName,
                        scores: [entry],
                        bestEasy: mode === "easy" ? score : 0,
                        bestHard: mode === "hard" ? score : 0,
                    }
                ];
            }

            const updated = { players: updatedPlayers };

            SecureStore.setItemAsync(config.storageKey, JSON.stringify(updated))
                .catch(e => console.error("Erreur persist:", e));

            return updated;
        });
    };

    const getLeaderboard = (mode: "easy" | "hard"): LeaderboardEntry[] => {
        const realEntries: LeaderboardEntry[] = data.players
            .map(p => ({ id: p.id,name: p.name, best: mode === "easy" ? p.bestEasy : p.bestHard }))
            .filter(p => p.best > 0);

        const realIds = new Set(realEntries.map(p => p.id));

        const fakeEntries: LeaderboardEntry[] = (config.fakePlayers ?? [])
            .filter((fp: FakePlayer) => !realIds.has(fp.id))
            .map((fp: FakePlayer) => ({
                id: fp.id,
                name: fp.name,
                best: mode === "easy" ? fp.bestEasy : fp.bestHard
            }))
            .filter(p => p.best > 0);

        return [...realEntries, ...fakeEntries].sort((a, b) => lowerIsBetter ? a.best - b.best : b.best - a.best);
    };

    const getMyRank = (mode: "easy" | "hard") => {
        const idx = getLeaderboard(mode).findIndex(p => p.id === config.playerId);
        return idx === -1 ? null : idx + 1;
    };

    const getMyHistory = (mode: "easy" | "hard"): PersonalEntry[] => {
        const me = data.players.find(p => p.id === config.playerId);
        if (!me) return [];

        return me.scores
            .filter(s => s.mode === mode)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(s => ({ score: s.score, date: s.date }));
    };

    return {
        data,
        loaded,
        saveScore,
        getLeaderboard,
        getMyRank,
        getMyHistory,
    };
}