export interface ReferenceData
{
    easy: number[];
    hard: number[];
}

export interface FakePlayer
{
    id: string;
    name: string;
    bestEasy: number;
    bestHard: number;
}

export interface GameStatsConfig
{
    playerId: string;
    playerName: string;
    storageKey: string;
    referenceData: ReferenceData;
    fakePlayers?: FakePlayer[];
    lowerIsBetter?: boolean;
}

export interface ScoreEntry
{
    mode: "easy" | "hard";
    score: number;
    date: string;
}

export interface Player
{
    id: string;
    name: string;
    scores: ScoreEntry[];
    bestEasy: number;
    bestHard: number;
}

export interface ScoresData
{
    players: Player[];
}

export interface LeaderboardEntry
{
    id: string;
    name: string;
    best: number;
}

export interface PersonalEntry
{
    score: number;
    date: string;
    rank?: number;
}