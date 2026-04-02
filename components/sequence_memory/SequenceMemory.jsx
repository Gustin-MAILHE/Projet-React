import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GRID_SIZE = 9; // 3x3 grid

const SequenceMemory = () => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [activeSquare, setActiveSquare] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(0);

  // Trigger the sequence playback whenever the sequence changes
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
    
    // Brief pause before showing the sequence
    await new Promise((resolve) => setTimeout(resolve, 500));

    for (let i = 0; i < sequence.length; i++) {
      // Light up the square
      setActiveSquare(sequence[i]);
      await new Promise((resolve) => setTimeout(resolve, 400)); // Flash duration
      
      // Turn it off
      setActiveSquare(null);
      await new Promise((resolve) => setTimeout(resolve, 200)); // Gap between flashes
    }
    
    setIsPlaying(false);
  };

  const handlePress = (index) => {
    // Prevent user from pressing while sequence is playing or game is over
    if (isPlaying || gameOver || level === 0) return;

    // Flash the square briefly for user feedback
    setActiveSquare(index);
    setTimeout(() => setActiveSquare(null), 150);

    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    const currentStep = newUserSequence.length - 1;

    // Check if the user made a mistake
    if (newUserSequence[currentStep] !== sequence[currentStep]) {
      setGameOver(true);
      return;
    }

    // Check if the user successfully completed the current level
    if (newUserSequence.length === sequence.length) {
      setIsPlaying(true); // Temporarily lock input
      setTimeout(() => {
        setLevel((prev) => prev + 1);
        setUserSequence([]);
        setSequence((prev) => [...prev, Math.floor(Math.random() * GRID_SIZE)]);
      }, 1000); // Wait 1 second before starting the next level
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {gameOver ? 'Game Over!' : `Jte baise mathis: ${level}`}
      </Text>

      <View style={styles.grid}>
        {Array.from({ length: GRID_SIZE }).map((_, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() => handlePress(index)}
            style={[
              styles.square,
              activeSquare === index && styles.squareActive,
              gameOver && activeSquare === index && styles.squareError // Highlight wrong press in red
            ]}
          />
        ))}
      </View>

      {(gameOver || level === 0) && (
        <TouchableOpacity style={styles.button} onPress={startGame}>
          <Text style={styles.buttonText}>
            {gameOver ? 'Try Again' : 'C COOl'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Layout calculations for a perfect 3x3 square
const screenWidth = Dimensions.get('window').width;
const gridPadding = 40;
const squareMargin = 5;
const squareSize = (screenWidth - gridPadding - squareMargin * 6) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
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
    width: screenWidth - gridPadding,
    justifyContent: 'center',
  },
  square: {
    width: squareSize,
    height: squareSize,
    margin: squareMargin,
    backgroundColor: '#333333',
    borderRadius: 8,
  },
  squareActive: {
    backgroundColor: '#4ade80', // Bright green when lit
  },
  squareError: {
    backgroundColor: '#ef4444', // Red if the user clicks the wrong one
  },
  button: {
    marginTop: 40,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SequenceMemory;