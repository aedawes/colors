import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ColorSwatch from './components/ColorSwatch';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colors, setColors] = useState([]);
  const [whiteBackground, setWhiteBackground] = useState(false);
  const [blackBackground, setBlackBackground] = useState(false);

  const darkModeClass = isDarkMode ? 'App-header dark' : 'App-header light';

  useEffect(() => {
    initializeColours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeColours = () => {
    let colorArray = [];

    for (let i = 0; i < 5; i++) {
      colorArray.push(generateRandomColor());
    }

    setColors(colorArray);
  }

  const handleAddColor = () => {
    if (colors.length < 8) {
      setColors([...colors, generateRandomColor()]);
    } else {
      alert('You can only have a maximum of 8 colors');
    }
  }

  const handleRegenerationOfColors = () => {
    let colorArray = [];

    for (let i = 0; i < colors.length; i++) {
      colorArray.push(generateRandomColor());
    }

    setColors(colorArray);
  }

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  const calculateButtonClass = (buttonType) => {
    let buttonClass = 'button';
    if (whiteBackground) {
      buttonClass += ' buttonWhite';
    } else if (blackBackground) {
      buttonClass += ' buttonBlack';
    }
    if (buttonType === 'generateColorsBtn') {
      buttonClass += ' generateColorsBtn';
    }

    console.log(buttonClass);
    return buttonClass;
  }

  return (
    <div className="App">
      {(whiteBackground || blackBackground) ?
        <div className='background' style={{ backgroundColor: whiteBackground ? 'white' : blackBackground ? 'black' : '' }}></div>
        : null
      }
      <Navbar isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <div className={darkModeClass}>
        <div className='colorSwatchesContainer'>
          {colors.map((color, index) =>
            <ColorSwatch key={index} color={color}
            />)}
        </div>
        <div className="btnContainer">
          <button className={calculateButtonClass('generateColorsBtn')} onClick={handleRegenerationOfColors}>Generate Colors</button>
          <button className={calculateButtonClass()} onClick={handleAddColor}>Add Color</button>
          {!blackBackground ?
            <button className={calculateButtonClass()} onClick={() => setWhiteBackground(!whiteBackground)}>See on White Background</button>
            :
            //placeholder to keep spacing
            <button className='button blank'>See on White Background</button>
          }
          {!whiteBackground ?
            <button className={calculateButtonClass()} onClick={() => setBlackBackground(!blackBackground)}>See on Black Background</button>
            :
            //placeholder to keep spacing
            <button className='button blank'>See on Black Background</button>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
