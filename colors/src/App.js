import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ColorSwatch from './components/ColorSwatch';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colors, setColors] = useState([]);
  const [whiteBackground, setWhiteBackground] = useState(false);
  const [blackBackground, setBlackBackground] = useState(false);
  const [buttonIsFullSize, setButtonIsFullSize] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  const colorSwatchContainerWidthRef = useRef(null);

  const darkModeClass = isDarkMode ? 'App-header dark' : 'App-header light';

  useEffect(() => {
    //This hook initializes the colors state
    initializeColours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //This hook implements the update of the css propeties when the colors state changes
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [colors]);

  const initializeColours = () => {
    let colorArray = [];

    for (let i = 0; i < 5; i++) {
      colorArray.push({
        hex: generateRandomColor(),
        locked: false
      });
    }

    setColors(colorArray);
  }

  const handleResize = () => {
    //This functon changes CSS properties based on size of color container
    //for smaller screen size
    if (colorSwatchContainerWidthRef.current) {

      const colorWidth = colorSwatchContainerWidthRef.current.offsetWidth;
      const colorSwatchContainer = colorSwatchContainerWidthRef.current;
      const buttonsContainer = document.getElementsByClassName('btnContainer')[0];
      const buttons = document.getElementsByClassName('button');
      const infoContainer = document.getElementsByClassName('infoContainer');

      if (colorWidth <= 675) {
        setIsSmall(true);
        colorSwatchContainer.classList.add('columnLayout');
        buttonsContainer.classList.add('buttonsColumnLayout');

        for (let i = 0; i < buttons.length; i++) {
          buttons[i].classList.add('buttonFullSize');
          setButtonIsFullSize(true);
        }

        for (let i = 0; i < infoContainer.length; i++) {
          infoContainer[i].classList.add('infoContainerMobile');
        }

      } else {
        setIsSmall(false);
        colorSwatchContainer.classList.remove('columnLayout');
        buttonsContainer.classList.remove('buttonsColumnLayout');

        for (let i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove('buttonFullSize');
          setButtonIsFullSize(false);
        }

        for (let i = 0; i < infoContainer.length; i++) {
          infoContainer[i].classList.remove('infoContainerMobile');
        }
      }
    }
  };

  const handleAddColor = () => {
    //This function adds a color to the palette 
    if (colors.length < 8) {
      const newColor = {
        hex: generateRandomColor(),
        locked: false
      }
      setColors([...colors, newColor]);
    } else {
      alert('You can only have a maximum of 8 colors');
    }
  }

  const handleRegenerationOfColors = () => {
    //This function runs when the 'Generate Colors' button is clicked
    let colorArray = [];

    for (let i = 0; i < colors.length; i++) {
      if (colors[i].locked) {
        colorArray.push(colors[i]);
      } else {
        colorArray.push({
          hex: generateRandomColor(),
          locked: false
        });
      }
    }

    setColors(colorArray);
  }

  const generateRandomColor = () => {
    //This helpter function generates a random color
    let newColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    while (newColor.length < 7) {
      newColor += '0';
    }

    //ensure no duplicate colors
    while (colors.length > 0 && colors.includes(newColor)) {
      newColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      while (newColor.length < 7) {
        newColor += '0';
      }
    }

    return newColor;
  }

  const calculateButtonClass = (buttonType) => {
    //This function helps to build the class for the buttons
    let buttonClass = 'button';
    if (whiteBackground) {
      buttonClass += ' buttonWhite';
    } else if (blackBackground) {
      buttonClass += ' buttonBlack';
    }
    if (buttonType === 'generateColorsBtn') {
      buttonClass += ' generateColorsBtn';
    }
    if (buttonIsFullSize) {
      buttonClass += ' buttonFullSize';
    }
    return buttonClass;
  }

  const handleLockColor = (color) => {
    //This function locks a color
    const updatedColors = colors.map(c => {
      if (c.hex === color.hex) {
        return { ...c, locked: !c.locked }
      }
      return c;
    });

    setColors(updatedColors);
  }

  const handleDeleteColor = (color) => {
    //This function deletes a color
    const updatedColors = colors.filter(c => c.hex !== color.hex);
    setColors(updatedColors);
  }

  const handleColorChange = (index, newColor) => {
    setColors(prevColors => {
      const updatedColors = [...prevColors];
      updatedColors[index].hex = newColor.hex;
      return updatedColors;
    });
  };

  return (
    <div className="App">
      {(whiteBackground || blackBackground) ?
        <div className='background' style={{ backgroundColor: whiteBackground ? 'white' : blackBackground ? 'black' : '' }}></div>
        : null
      }
      <Navbar isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <div className={darkModeClass}>
        <div ref={colorSwatchContainerWidthRef} className='colorSwatchesContainer'>
          {colors.map((color, index) =>
            <ColorSwatch
              key={index}
              color={color}
              isSmall={isSmall}
              lockClick={() => handleLockColor(color)}
              deleteClick={() => handleDeleteColor(color)}
              showDelete={colors.length > 2}
              onColorChange={(newColor) => handleColorChange(index, newColor)}
            />
          )}
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
