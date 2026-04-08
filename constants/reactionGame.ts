// Min time before the green light
export const MIN_DELAY = 1500;

// Min time in ms
export const MAX_DELAY = 3000;

export const THRESHOLDS = [
    { max: 200, label: "Exceptionnel !"},
    { max: 250, label: "Très rapide !"},
    { max: 300, label: "Bien !"},
    { max: 400, label: "Correct"},
    { max: Infinity, label: "Lent... Réessaie !" },
];