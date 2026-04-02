type GameMode = "easy" | "hard";

export interface ModeConfig
{
    label: string;
    lives: number;
    memorizeMs: number;
    accentColor: string;
    badgeColor: string;
    description: string;
}

export const modes: Record<GameMode, ModeConfig> = {
    easy:
    {
        label: "Facile",
        lives: 3,
        memorizeMs: 2000,
        accentColor: "#27ae60",
        badgeColor: "#1e8449",
        description: "3 vies - 2 sec pour mémoriser",
    },
    hard:
    {
        label: "Difficile",
        lives: 1,
        memorizeMs: 1000,
        accentColor: "#e74c3c",
        badgeColor: "#c0392b",
        description: "1 vie - 1 sec pour mémoriser",
    },
};

export const grid_size = 5;

export interface Cell
{
    id: number;
    number: number;
    order: number;
}