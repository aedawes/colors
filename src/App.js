import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ColorSwatch from './components/ColorSwatch';
import ContrastCard from './components/ContrastCard';

function App() {
  //STATES---------------------------------------------------------------------------------------------------
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colors, setColors] = useState([]);
  const [whiteBackground, setWhiteBackground] = useState(false);
  const [blackBackground, setBlackBackground] = useState(false);
  const [buttonIsFullSize, setButtonIsFullSize] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [showContrast, setShowContrast] = useState(false);
  const [showContrastAnimation, setShowContrastAnimation] = useState(false);

  //REFS------------------------------------------------------------------------------------------------------
  const colorSwatchContainerWidthRef = useRef(null);

  //VARIABLES-------------------------------------------------------------------------------------------------
  const darkModeClass = isDarkMode ? 'content dark' : 'content light';

  //EFFECTS--------------------------------------------------------------------------------------------------- 
  useEffect(() => {
    //initializes the colors state
    initializeColours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //used to animate the opening of contrast checker
    if (showContrast) {
      setTimeout(() => {
        setShowContrastAnimation(true);
      }, 200);
    }
  }, [showContrast]);

  useEffect(() => {
    //used to animate the closing of contrast checker
    //Trust me, it is different
    if (!showContrastAnimation) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setTimeout(() => {
        setShowContrast(false);
        //longer wait to allow for scroll to top
      }, 550);
    }
  }, [showContrastAnimation]);

  useEffect(() => {
    //This hook implements the update of the css propeties when the colors state changes
    handleResize();
    window.addEventListener('resize', handleResize);
  }, [colors]);

  //FUNCTIONS-------------------------------------------------------------------------------------------------
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

  const handleColorChange = (index, newColor) => {
    //This function handles the change from the color picker
    setColors(prevColors => {
      const updatedColors = [...prevColors];
      updatedColors[index].hex = newColor.hex;
      return updatedColors;
    });
  };

  const handleDeleteColor = (color) => {
    //This function deletes a color
    const updatedColors = colors.filter(c => c.hex !== color.hex);
    setColors(updatedColors);
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

  const handleResize = () => {
    //This functon changes CSS properties based on size of color container
    //for smaller screen size
    if (colorSwatchContainerWidthRef.current) {

      const colorWidth = colorSwatchContainerWidthRef.current.offsetWidth;
      const colorSwatchContainer = colorSwatchContainerWidthRef.current;
      const buttonsContainer = document.getElementsByClassName('topButtonsContainer')[0];
      const buttons = document.getElementsByClassName('button');
      const infoContainer = document.getElementsByClassName('infoContainer');

      //if the color container is less than 675px, change the layout
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

  const handleShowContrast = () => {
    //This function shows the contrast checker
    if (showContrastAnimation === true) {
      setShowContrastAnimation(false);
    } else {
      setShowContrast(true);
    }
  }

  const handleSwap = (index) => {
    //This function swaps the color at the given index with the next color
    if (index < colors.length - 1) {
      const updatedColors = [...colors];
      const tempColor = updatedColors[index];
      updatedColors[index] = updatedColors[index + 1];
      updatedColors[index + 1] = tempColor;
      setColors(updatedColors);
    }
  }

  const initializeColours = () => {
    //This function initializes the colors state when first entering the app
    let colorArray = [];

    for (let i = 0; i < 5; i++) {
      colorArray.push({
        hex: generateRandomColor(),
        locked: false
      });
    }

    setColors(colorArray);
  }

  //RENDER---------------------------------------------------------------------------------------------------
  return (
    <div className="App">
      {(whiteBackground || blackBackground) ?
        <div
          className='background'
          style={{ backgroundColor: whiteBackground ? 'white' : blackBackground ? 'black' : '' }}
        />
        : null
      }
      <Navbar isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <div className={darkModeClass}>
        <div ref={colorSwatchContainerWidthRef} className='colorSwatchesContainer'>
          {colors.map((color, index) =>
            <>
              <ColorSwatch
                key={index}
                color={color}
                isSmall={isSmall}
                lockClick={() => handleLockColor(color)}
                deleteClick={() => handleDeleteColor(color)}
                showDelete={colors.length > 2}
                onColorChange={(newColor) => handleColorChange(index, newColor)}
                index={index < colors.length - 1 ? index : null}
                handleSwap={() => handleSwap(index)}
              />
            </>
          )}
        </div>
        <div className="btnContainer">
          <div className='topButtonsContainer'>
            <button className={calculateButtonClass('generateColorsBtn')} onClick={handleRegenerationOfColors}>
              Generate Colors
            </button>
            <button className={calculateButtonClass()} onClick={handleAddColor}>Add Color</button>
            {!blackBackground ?
              <button className={calculateButtonClass()} onClick={() => setWhiteBackground(!whiteBackground)}>
                See on White Background
              </button>
              :
              //placeholder to keep spacing
              <button className='button blank'>See on White Background</button>
            }
            {!whiteBackground ?
              <button className={calculateButtonClass()} onClick={() => setBlackBackground(!blackBackground)}>
                See on Black Background
              </button>
              :
              //placeholder to keep spacing
              <button className='button blank'>See on Black Background</button>
            }
          </div>
          <button className='button buttonFullSize buttonLong' onClick={() => handleShowContrast()}>
            Check Contrast
          </button>
        </div>
        {showContrast ?
          <div className={`${isSmall ? 'mobile-container' : 'grid-container'} ${showContrastAnimation ? 'contrastAnimation' : ''}`}>
            {colors.map((color1, i) => (
              colors.slice(i + 1).map((color2, j) => (
                <div className={`${isSmall ? 'mobile-item' : 'grid-item'}`}>
                  <ContrastCard key={`${color1.hex}-${color2.hex}`} color1={color1.hex} color2={color2.hex} />
                </div>
              ))
            ))}
          </div>
          : null
        }
      </div>
    </div>
  );
}

export default App;
