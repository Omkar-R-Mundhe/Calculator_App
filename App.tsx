import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const App: React.FC = () => {
  // State for display
  const [display, setDisplay] = useState<string>('');

  // Function to handle button press
  const handlePress = (value: string | number) => {
    if (value === '=') {
      try {
        const expression = display.replace(/÷/g, '/').replace(/×/g, '*');
        
        // Evaluate the expression
        setDisplay(eval(expression).toString());
      } catch (error) {
        setDisplay('Error'); // Handle invalid expressions
      }
    } else if (value === 'C') {
      setDisplay(''); // Clear display
    } else if (value === '⌫') {
      setDisplay(display.slice(0, -1)); // Delete last character
    } else {
      setDisplay(display + value); // Append to display
    }
  };

  // Button values
  const buttons: (string | number)[][] = [
    ['C', '%', '⌫', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['00', '0', '.', '='],
  ];

  return (
    <View style={styles.container}>
      {/* Display */}
      <View style={styles.display}>
        <Text style={styles.displayText}>{display}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button, buttonIndex) => (
              <TouchableOpacity
                key={buttonIndex}
                style={[styles.button, button === '=' && styles.equalsButton]}
                onPress={() => handlePress(button)}>
                <Text
                  style={[
                    styles.buttonText,
                    button === '=' && styles.equalsButtonText,
                  ]}>
                  {button}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Calc by Omkar</Text>
      </View>
    </View>
  );
};

// Styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
  },
  display: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    color: '#fff',
    fontSize: 40,
  },
  buttons: {
    flex: 2,
    backgroundColor: '#000',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  equalsButton: {
    backgroundColor: '#32CD32', // Green background for "=" button
  },
  equalsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
