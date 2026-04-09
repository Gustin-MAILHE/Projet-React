import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, SafeAreaView, ScrollView } from 'react-native';
import GameStatsModule from '../moduleGraphe/gameStatsModule';
import myReferenceData from "../../assets/chimpTest/referenceScores.json";
import fakePlayers from "../../assets/chimpTest/fakePlayers.json";
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

const GRID_SIZE = 9;

const SequenceMemoryGame = () => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [activeSquare, setActiveSquare] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(0);

  const { width } = useWindowDimensions();
  const GAME_MAX_WIDTH = 450; 
  const effectiveWidth = Math.min(width, GAME_MAX_WIDTH);
  
  const gridPadding = 40;
  const squareMargin = 5;
  const squareSize = (effectiveWidth - gridPadding - squareMargin * 6) / 3;

  useEffect(() => {
    if (sequence.length > 0) {
      playSequence();
    }
  }, [sequence]);

  const startGame = () => {
    setSequence([Math.floor(Math.random() * GRID_SIZE)]);
    setUserSequence([]);
    setGameOver(false);
    setLevel(1);
  };

  const playSequence = async () => {
    setIsPlaying(true);
    
    await new Promise((resolve) => setTimeout(resolve, 500));

    for (let i = 0; i < sequence.length; i++) {
      setActiveSquare(sequence[i]);
      await new Promise((resolve) => setTimeout(resolve, 400));
      
      setActiveSquare(null);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    
    setIsPlaying(false);
  };

  const handlePress = (index) => {
    if (isPlaying || gameOver || level === 0) return;

    setActiveSquare(index);
    setTimeout(() => setActiveSquare(null), 150);

    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    const currentStep = newUserSequence.length - 1;

    if (newUserSequence[currentStep] !== sequence[currentStep]) {
      setGameOver(true);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      setIsPlaying(true);
      setTimeout(() => {
        setLevel((prev) => prev + 1);
        setUserSequence([]);
        setSequence((prev) => [...prev, Math.floor(Math.random() * GRID_SIZE)]);
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header/>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          <Text style={styles.headerText}>
            {gameOver ? 'Game Over!' : `Level: ${level}`}
          </Text>

          <View style={[styles.grid, { width: effectiveWidth - gridPadding }]}>
            {Array.from({ length: GRID_SIZE }).map((_, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() => handlePress(index)}
                style={[
                  styles.square,
                  { width: squareSize, height: squareSize, margin: squareMargin },
                  activeSquare === index && styles.squareActive,
                  gameOver && activeSquare === index && styles.squareError
                ]}
              />
            ))}
          </View>

          {(gameOver || level === 0) && (
            <TouchableOpacity style={styles.button} onPress={startGame}>
              <Text style={styles.buttonText}>
                {gameOver ? 'Try Again' : 'Start Game'}
              </Text>
            </TouchableOpacity>
          )}
          <GameStatsModule
            score={level}
            mode={"easy"}
            config={{
                playerId: "playerYourself",
                playerName: "Toi",
                storageKey: "sequence_scores_player",
                referenceData: myReferenceData,
                fakePlayers: fakePlayers,
            }}
            onPlayAgain={startGame}
            onSaveScore={()=> {}}
          />

          
        </View>
      </ScrollView>
      <Footer/>
    </SafeAreaView>
    
    
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  square: {
    backgroundColor: '#333333',
    borderRadius: 8,
  },
  squareActive: {
    backgroundColor: '#4ade80',
  },
  squareError: {
    backgroundColor: '#ef4444',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#35724a',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  extraContentPlaceholder: {
    marginTop: 50,
    width: '100%',
    padding: 20,
  },
  secondaryText: {
    color: '#888',
    textAlign: 'center',
  }
});

export default SequenceMemoryGame;

