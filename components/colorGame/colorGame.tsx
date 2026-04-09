import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import LivesDisplay from "../chimpTest/livesDisplay";

type GameState = 'start' | 'playing' | 'gameOver';

const ColorGame = () => {
    const [difficulty, setDifficulty] = useState(2);
    const [lives, setLives] = useState(3);
    const [gameState, setGameState] = useState<GameState>('start');

    const GenerateMap = (level: number) => {
        let matrix = Array(level).fill(0).map(() => Array(level).fill(0))
        matrix[Math.floor(Math.random() * level)][Math.floor(Math.random() * level)] = 1;
        return matrix
    }

    const falseButton = () => {
        if (lives > 0 && difficulty < 9) {
            setLives(lives - 1);
        } else {
            setGameState('gameOver');
        }
    }

    const trueButton = () => {
        if (lives > 0 && difficulty < 9) {
            setDifficulty(difficulty + 1);
        } else {
            setGameState('gameOver');
        }
    }

    const startGame = () => {
        setDifficulty(2);
        setLives(3);
        setGameState('playing');
    }

    const restartGame = () => {
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
        const trueColor = falseColor.replace(/[\d\.]+\)$/g, transparency.concat(")"))
        const gridSize = matrix.length;
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const buttonSize = isMobile ? Math.min(40, (window.innerWidth - 40) / gridSize) : 50;
        
        return (
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridSize}, ${buttonSize}px)`,
                gridTemplateRows: `repeat(${gridSize}, ${buttonSize}px)`,
                gap: isMobile ? '1px' : '2px',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '100%',
                overflow: 'auto'
            }}>
                {matrix.flat().map((value, index) => {
                    if (value === 0) {
                        backgroundColor = falseColor
                        return <button 
                            key={index} 
                            id="false" 
                            style={{
                                backgroundColor,
                                width: `${buttonSize}px`,
                                height: `${buttonSize}px`,
                                border: 'none',
                                borderRadius: isMobile ? 4 : 8,
                                cursor: 'pointer',
                                minWidth: isMobile ? '30px' : '40px',
                                minHeight: isMobile ? '30px' : '40px'
                            }} 
                            onClick={falseButton}
                        >
                        </button>
                    } else {
                        backgroundColor = trueColor
                        return <button 
                            key={index} 
                            id="true" 
                            style={{
                                backgroundColor,
                                width: `${buttonSize}px`,
                                height: `${buttonSize}px`,
                                border: 'none',
                                borderRadius: isMobile ? 4 : 8,
                                cursor: 'pointer',
                                minWidth: isMobile ? '30px' : '40px',
                                minHeight: isMobile ? '30px' : '40px'
                            }} 
                            onClick={trueButton}
                        >
                        </button>
                    }
                })}
            </div>
        )
    }

    const StartScreen = () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h1 style={{
                color: 'white',
                fontFamily: 'Serial',
                fontSize: '2.5rem',
                marginBottom: '20px',
                textAlign: 'center'
            }}>
                Color Picker
            </h1>
            <p style={{
                color: '#b0b0b0',
                fontFamily: 'Serial',
                fontSize: '1.2rem',
                marginBottom: '40px',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                Trouvez l'imposteur dans la grille le plus vite possible,
                mais plus vous progressez, plus il sera camouflé.
            </p>
            <button
                onClick={startGame}
                style={{
                    backgroundColor: '#35724a',
                    color: 'white',
                    border: 'none',
                    padding: '15px 30px',
                    fontFamily: 'Serial',
                    fontSize: '1.2rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s'
                }}>
                START
            </button>
        </div>
    );

    const GameOverScreen = () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h1 style={{
                color: 'white',
                fontFamily: 'Serial',
                fontSize: '2.5rem',
                marginBottom: '20px',
                textAlign: 'center'
            }}>
                GAME OVER
            </h1>
            <p style={{
                color: '#b0b0b0',
                fontFamily: 'Serial',
                fontSize: '1.2rem',
                marginBottom: '20px',
                textAlign: 'center'
            }}>
                Score final : Niveau {difficulty-1}
            </p>
            <p style={{
                color: '#ff6b6b',
                fontFamily: 'Serial',
                fontSize: '1rem',
                marginBottom: '40px',
                textAlign: 'center'
            }}>
                {lives <= 0 ? 'Plus de vies restantes' : 'Niveau maximum atteint !'}
            </p>
            <button
                onClick={restartGame}
                style={{
                    backgroundColor: '#35724a',
                    color: 'white',
                    border: 'none',
                    padding: '15px 30px',
                    fontFamily: 'Serial',
                    fontSize: '1.2rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s'
                }}>
                RESTART ?
            </button>
        </div>
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
                        <p style={{
                            color: '#b0b0b0',
                            fontFamily: 'Serial',
                            fontSize: '1.2rem',
                            marginBottom: '20px',
                            textAlign: 'center'
                        }}>
                            Niveau {difficulty-1}
                        </p>
                        {ShowMap(GenerateMap(difficulty))}
                        <LivesDisplay lives={lives} max={3}/>
                    </>
                );
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: '#1a1a2e'
        }}>
            <header style={{
                position: 'relative',
                zIndex: 1,
                backgroundColor: 'transparent',
                padding: '16px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Header />
            </header>

            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: typeof window !== 'undefined' && window.innerWidth < 768 ? '10px' : '20px',
                overflow: 'auto'
            }}>
                {renderGameContent()}
            </main>

            <footer style={{
                position: 'relative',
                zIndex: 1,
                height: '70px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                marginLeft: '5%',
                marginRight: '5%'
            }}>
                <Footer />
            </footer>
        </div>
    );
}

export default ColorGame;
