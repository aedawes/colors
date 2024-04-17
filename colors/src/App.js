import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ColorSwatch from './components/ColorSwatch';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colors, setColors] = useState([]);
  const [whiteBackground, setWhiteBackground] = useState(false);
  const [blackBackground, setBlackBackground] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const colorSwatchContainerWidthRef = useRef(null);

  const darkModeClass = isDarkMode ? 'App-header dark' : 'App-header light';

  useEffect(() => {
    initializeColours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [colors]);

  const initializeColours = () => {
    let colorArray = [];

    for (let i = 0; i < 5; i++) {
      colorArray.push(generateRandomColor());
    }

    setColors(colorArray);
  }

  const handleResize = () => {
    //for smaller screen size
    if (colorSwatchContainerWidthRef.current) {

      const colorWidth = colorSwatchContainerWidthRef.current.offsetWidth;
      const colorSwatchContainer = colorSwatchContainerWidthRef.current;
      const buttonsContainer = document.getElementsByClassName('btnContainer')[0];
      const buttonsWidth = document.getElementsByClassName('button');
      const infoContainer = document.getElementsByClassName('infoContainer');

      if (colorWidth <= 650) {
        setIsSmall(true);
        colorSwatchContainer.classList.add('columnLayout');
        buttonsContainer.classList.add('buttonsColumnLayout');

        for (let i = 0; i < buttonsWidth.length; i++) {
          buttonsWidth[i].classList.add('buttonFullSize');
        }

        for (let i = 0; i < infoContainer.length; i++) {
          infoContainer[i].classList.add('infoContainerMobile');
        }

      } else {
        setIsSmall(false);
        colorSwatchContainer.classList.remove('columnLayout');
        buttonsContainer.classList.remove('buttonsColumnLayout');

        for (let i = 0; i < buttonsWidth.length; i++) {
          buttonsWidth[i].classList.remove('buttonFullSize');
        }

        for (let i = 0; i < infoContainer.length; i++) {
          infoContainer[i].classList.remove('infoContainerMobile');
        }
      }
    }
  };

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
    let newColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    //ensure no duplicate colors
    while (colors.length > 0 && colors.includes(newColor)) {
      newColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    return newColor;
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
        <div ref={colorSwatchContainerWidthRef} className='colorSwatchesContainer'>
          {colors.map((color, index) =>
            <ColorSwatch key={index} color={color} isSmall={isSmall} />
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
