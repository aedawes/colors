import React, { useState, useEffect, useRef } from 'react';
import '../styles/ColorSwatch.css';
import Icon from '@mdi/react';
import { mdiCloseCircleOutline, mdiLock, mdiLockOpenOutline } from '@mdi/js';
import { calculateContrastRatio } from '../ColorContrast';

export default function ColorSwatch({ color, isSmall }) {
    const [locked, setLocked] = useState(false);
    const colorSwatchWidthRef = useRef(null);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [color]);

    const handleResize = () => {
        //for larger screen size but too squished of colours
        if (colorSwatchWidthRef.current) {
            const colorSwatchWidth = colorSwatchWidthRef.current.offsetWidth;
            if (colorSwatchWidth <= 200) {
                colorSwatchWidthRef.current.classList.add('columnLayout');
            } else {
                colorSwatchWidthRef.current.classList.remove('columnLayout');
            }
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(color)
            .then(() => {
                alert('Color Copied!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    const textColor = calculateContrastRatio(color, '#ffffff') > 4.5 ? '#ffffff' : '#000000';

    return (
        <div className='colorContainer' style={{ backgroundColor: color, color: textColor }}>
            {isSmall ? (
                <div ref={colorSwatchWidthRef} className='infoContainer'>
                    <p className='colorHex' onClick={handleCopy} >{color}</p>
                    <div className='iconContainer'>
                        <Icon className='icon' path={mdiCloseCircleOutline} size={1} />
                        {locked ?
                            <Icon className='icon' onClick={() => setLocked(!locked)} path={mdiLock} size={1} />
                            :
                            <Icon className='icon' onClick={() => setLocked(!locked)} path={mdiLockOpenOutline} size={1} />
                        }
                    </div>
                </div>
            ) : (
                <div ref={colorSwatchWidthRef} className='infoContainer'>
                    <Icon className='icon' path={mdiCloseCircleOutline} size={1} />
                    <p className='colorHex' onClick={handleCopy} >{color}</p>
                    {locked ?
                        <Icon className='icon' onClick={() => setLocked(!locked)} path={mdiLock} size={1} />
                        :
                        <Icon className='icon' onClick={() => setLocked(!locked)} path={mdiLockOpenOutline} size={1} />
                    }
                </div>
            )}
        </div>
    );
}