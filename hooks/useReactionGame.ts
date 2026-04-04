import { useState, useRef } from "react";
import { MIN_DELAY, MAX_DELAY } from "@/constants/reactionGame";

export type GameState = "idle" | "waiting" | "go" | "done";

/**
 * Personalised Hook that ecapsulates the game's logic
 * The composant just has to call the function and read the values
 *
 * @returns gameState, reactionTime, scores, bestScore, startGame, handlePress
 */
export function useReactionGame() {
    const [gameState, setGameState]       = useState<GameState>("idle");
    const [reactionTime, setReactionTime] = useState<number | null>(null);
    const [scores, setScores]             = useState<number[]>([]);

    const timer     = useRef<ReturnType<typeof setTimeout> | null>(null);
    const startTime = useRef<number>(0);

    function startGame() {
        setGameState("waiting");
        setReactionTime(null);

        const delay = MIN_DELAY + Math.random() * MAX_DELAY;

        timer.current = setTimeout(() => {
            startTime.current = Date.now();
            setGameState("go");
        }, delay);
    }

    function handlePress() {
        if (gameState === "waiting") {
            clearTimeout(timer.current!);
            setGameState("idle");
            alert("Trop tôt ! Attends que la lumière soit verte.");
            return;
        }

        if (gameState === "go") {
            const ms = Date.now() - startTime.current;
            setReactionTime(ms);
            setGameState("done");
            setScores((prev) => [...prev, ms]);
        }
    }

    const bestScore = scores.length > 0 ? Math.min(...scores) : null;

    return { gameState, reactionTime, scores, bestScore, startGame, handlePress };
}