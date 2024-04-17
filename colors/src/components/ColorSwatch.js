import React, { useState, useEffect, useRef } from 'react';
import '../styles/ColorSwatch.css';
import Icon from '@mdi/react';
import { mdiCloseCircleOutline, mdiLock, mdiLockOpenOutline } from '@mdi/js';
import { calculateContrastRatio } from '../ColorContrast';
import { SketchPicker } from 'react-color';

export default function ColorSwatch({ color, isSmall, lockClick, deleteClick, showDelete, onColorChange }) {
    const [showColorPicker, setShowColorPicker] = useState(false);

    const colorSwatchWidthRef = useRef(null);
    const colorPickerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            //This function listens to see if there is a click outside of the color picker
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setShowColorPicker(false);
            }
        }
        //Checks when there is a click anywhere in the document
        document.addEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        //calls the handleResize function when the window is resized
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [color]);


    const handleResize = () => {
        //Moves the color and icons to a column if the screen is too small
        //in-between size
        if (colorSwatchWidthRef.current) {
            const colorSwatchWidth = colorSwatchWidthRef.current.offsetWidth;
            if (colorSwatchWidth <= 200) {
                colorSwatchWidthRef.current.classList.add('columnLayout');
            } else {
                colorSwatchWidthRef.current.classList.remove('columnLayout');
            }
        }
    };

    const handleHexClick = () => {
        setShowColorPicker(true);
    };

    const handleClosePicker = () => {
        setShowColorPicker(false);
    };

    const handleChangeComplete = (newColor) => {
        onColorChange(newColor);
    };

    const textColor = calculateContrastRatio(color.hex, '#ffffff') > 4.5 ? '#ffffff' : '#000000';
    const deleteClass = showDelete ? 'icon' : 'icon disappear';

    return (
        <div className='colorContainer' style={{ backgroundColor: color.hex, color: textColor }}>
            {showColorPicker ?
                <div className='colorPicker' ref={colorPickerRef}>
                    {/* This is a color picker from a third party library called react-color */}
                    <SketchPicker color={color} onChangeComplete={handleChangeComplete} onClose={handleClosePicker} />
                </div>
                : null
            }
            {isSmall ? (
                <div ref={colorSwatchWidthRef} className='infoContainer'>
                    <p className='colorHex' onClick={handleHexClick} >{color.hex}</p>
                    <div className='iconContainer'>
                        <Icon className={deleteClass} onClick={() => deleteClick()} path={mdiCloseCircleOutline} size={1} />
                        {color.locked ?
                            <Icon className='icon' onClick={() => lockClick()} path={mdiLock} size={1} />
                            :
                            <Icon className='icon' onClick={() => lockClick()} path={mdiLockOpenOutline} size={1} />
                        }
                    </div>
                </div>
            ) : (
                <div ref={colorSwatchWidthRef} className='infoContainer'>
                    <Icon className={deleteClass} onClick={() => deleteClick()} path={mdiCloseCircleOutline} size={1} />
                    <p className='colorHex' onClick={handleHexClick} >{color.hex}</p>
                    {color.locked ?
                        <Icon className='icon' onClick={() => lockClick()} path={mdiLock} size={1} />
                        :
                        <Icon className='icon' onClick={() => lockClick()} path={mdiLockOpenOutline} size={1} />
                    }
                </div>
            )}
        </div>
    );
}