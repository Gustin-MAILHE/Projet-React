import React, { useState } from 'react';
import { View, Text, Pressable } from "react-native"
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { styles } from "@/components/colorGame/styles";
import LivesDisplay from "../chimpTest/livesDisplay";

type GameState = 'start' | 'playing' | 'gameOver';

const ColorGame = () => {
    const [level, setLevel] = useState(1)
    const [difficulty, setDifficulty] = useState(2);
    const [lives, setLives] = useState(3);
    const [gameState, setGameState] = useState<GameState>('start');

    const GenerateMap = (level: number) => {
        let matrix = Array(level).fill(0).map(() => Array(level).fill(0))
        matrix[Math.floor(Math.random() * level)][Math.floor(Math.random() * level)] = 1;
        return matrix
    }

    const falseButton = () => {
        if (lives > 0) {
            setLives(lives - 1);
        } else {
            setGameState('gameOver');
        }
    }

    const trueButton = () => {
        if (lives > 0) {
            if (difficulty < 9) {
                setDifficulty(difficulty + 1);
            }
            setLevel(level + 1);
        } else {
            setGameState('gameOver');
        }
    }

    const startGame = () => {
        setLevel(1);
        setDifficulty(2);
        setLives(3);
        setGameState('playing');
    }

    const restartGame = () => {
        setLevel(1);
        setDifficulty(2);
        setLives(3);
        setGameState('playing');
    }

    const ShowMap = (matrix: number[][]) => {
        let colors = ['rgba(255, 50, 50, 1.0)',
            'rgba(255, 127, 50, 1.0)',
            'rgba(255, 255, 50, 1.0)',
            'rgba(127, 255, 50, 1.0)',
            'rgba(50, 255, 50, 1.0)',
            'rgba(50, 255, 127, 1.0)',
            'rgba(50, 255, 255, 1.0)',
            'rgba(50, 127, 255, 1.0)',
            'rgba(50, 50, 255, 1.0)',
            'rgba(127, 50, 255, 1.0)',
            'rgba(255, 50, 255, 1.0)',
            'rgba(255, 50, 127, 1.0)']
        let backgroundColor;
        const transparency = String((matrix.length % 10) / 10)
        const falseColor = colors[Math.floor(Math.random() * colors.length)]
        const trueColor = falseColor.replace(/[\d.]+\)$/g, transparency.concat(")"))
        const gridSize = matrix.length;
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const buttonSize = isMobile ? Math.min(40, (window.innerWidth - 40) / gridSize) : 50;
        const margin = isMobile ? 0.5 : 1;
        const containerWidth = (buttonSize + margin * 2) * gridSize;
        
        return (
            <View style={[styles.gridContainer, { width: containerWidth }]}>
                {matrix.flat().map((value, index) => {
                    if (value === 0) {
                        backgroundColor = falseColor
                        return <Pressable
                            key={index}
                            style={[
                                styles.buttonFalse,
                                {
                                    backgroundColor,
                                    width: buttonSize,
                                    height: buttonSize,
                                    borderRadius: isMobile ? 4 : 8,
                                    margin: margin
                                }
                            ]} 
                            onPress={falseButton}
                        >
                        </Pressable>
                    } else {
                        backgroundColor = trueColor
                        return <Pressable
                            key={index}
                            style={[
                                styles.buttonTrue,
                                {
                                    backgroundColor,
                                    width: buttonSize,
                                    height: buttonSize,
                                    borderRadius: isMobile ? 4 : 8,
                                    margin: margin
                                }
                            ]} 
                            onPress={trueButton}
                        >
                        </Pressable>
                    }
                })}
            </View>
        )
    }

    const StartScreen = () => (
        <View style={styles.startScreenContainer}>
            <Text style={styles.startScreenTitle}>
                Color Picker
            </Text>
            <Text style={styles.startScreenDescription}>
                Trouvez l'imposteur dans la grille le plus vite possible,
                mais plus vous progressez, plus il sera camouflé.
            </Text>
            <Pressable
                onPress={startGame}
                style={styles.startButton}>
                <Text style={{ color: 'white' }}>
                    START
                </Text>
            </Pressable>
        </View>
    );

    const GameOverScreen = () => (
        <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverTitle}>
                GAME OVER
            </Text>
            <Text style={styles.gameOverScore}>
                Score final : Niveau {level}
            </Text>
            <Text style={styles.gameOverMessage}>
                {lives <= 0 ? 'Plus de vies restantes' : 'Niveau maximum atteint !'}
            </Text>
            <Pressable
                onPress={restartGame}
                style={styles.restartButton}>
                <Text style={{ color: 'white' }}>
                    RESTART ?
                </Text>
            </Pressable>
        </View>
    );

    const renderGameContent = () => {
        switch (gameState) {
            case 'start':
                return <StartScreen />;
            case 'gameOver':
                return <GameOverScreen />;
            case 'playing':
            default:
                return (
                    <>
                        <Text style={styles.levelText}>
                            Niveau {level}
                        </Text>
                        {ShowMap(GenerateMap(difficulty))}
                        <LivesDisplay lives={lives} max={3}/>
                    </>
                );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
            </View>

            <View style={[
                styles.mainContent,
                {
                    paddingHorizontal: typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 20,
                    paddingVertical: typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 20
                }
            ]}>
                {renderGameContent()}
            </View>

            <View style={styles.footer}>
                <Footer />
            </View>
        </View>
    );
}

export default ColorGame;
