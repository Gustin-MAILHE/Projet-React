import { useState, useCallback, useRef } from "react";
import { modes, Cell, grid_size } from "../constants/chimpTest";

type Phase = "modeSelect" | "memorize" | "recall" | "result";
type GameMode = "easy" | "hard";

function shuffle<T>(arr: T[]): T[]
{
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function generateRound(count: number): Cell[]
{
    const total = grid_size * grid_size;
    const positions = shuffle(Array.from(
        {
            length: total
        }, (_, i) => i)).slice(0, count);
    return positions.map((id, idx) => (
        {
            id, number: idx + 1,
            order: idx + 1
        })
    );
}

export function useChimpTest()
{
    const [phase, setPhase] = useState<Phase>("modeSelect");
    const [mode, setMode] = useState<GameMode>("easy");
    const [level, setLevel] = useState(4);
    const [lives, setLives] = useState(3);
    const [cells, setCells] = useState<Cell[]>([]);
    const [nextExpected, setNextExpected] = useState(1);
    const [tappedIds, setTappedIds] = useState<Set<number>>(new Set());
    const [wrongId, setWrongId] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    const clearAllTimeouts = () => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
    };

    const addTimeout = (fn: () => void, ms: number) => {
        const id = setTimeout(fn, ms);
        timeoutsRef.current.push(id);
        return id;
    };

    const startRound = useCallback((lvl: number, currentMode: GameMode) => {
        clearAllTimeouts();
        setCells([]);
        setTappedIds(new Set());
        setWrongId(null);
        setNextExpected(1);

        addTimeout(() => {
            const newCells = generateRound(lvl);
            setCells(newCells);
            setPhase("memorize");
            addTimeout(() => setPhase("recall"), modes[currentMode].memorizeMs);
        }, 100);
    }, []);

    const handleSelectMode = (selectedMode: GameMode) => {
        setMode(selectedMode);
        setLevel(4);
        setScore(0);
        setLives(modes[selectedMode].lives);
        startRound(4, selectedMode);
    };

    const handleTryAgain = () => {
        clearAllTimeouts();
        setPhase("modeSelect");
    };

    const handleCellPress = (cell: Cell, onWrong?: () => void) => {
        if (phase !== "recall")
        {
            return;
        }

        if (tappedIds.has(cell.id))
        {
            return;
        }

        if (cell.order === nextExpected)
        {
            const newTapped = new Set(tappedIds).add(cell.id);
            setTappedIds(newTapped);

            if (nextExpected === cells.length)
            {
                setScore(prev => prev + level);
                const nextLevel = level + 1;
                setLevel(nextLevel);
                addTimeout(() => startRound(nextLevel, mode), 600);
            }
            else
            {
                setNextExpected(nextExpected + 1);
            }
        }
        else
        {
            setWrongId(cell.id);
            onWrong?.();
            const newLives = lives - 1;
            setLives(newLives);

            if (newLives <= 0)
            {
                setScore(level - 1 < 0 ? 0 : level - 1);
                addTimeout(() => setPhase("result"), 800);
            }
            else
            {
                addTimeout(() => startRound(level, mode), 900);
            }
        }
    };

    return {
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
    };
}