import React, { useState } from 'react';
import '../styles/ColorSwatch.css';
import Icon from '@mdi/react';
import { mdiCloseCircleOutline, mdiLock, mdiLockOpenOutline } from '@mdi/js';
import { calculateContrastRatio } from '../ColorContrast';

export default function ColorSwatch({ color }) {
    const [locked, setLocked] = useState(false);

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
            <div className='infoContainer'>
                <Icon className='icon' path={mdiCloseCircleOutline} size={1} />
                <p className='colorHex' onClick={handleCopy} >{color}</p>
                {locked ?
                    <Icon className='icon' onClick={() => setLocked(!locked)} path={mdiLock} size={1} />
                    :
                    <Icon className='icon' onClick={() => setLocked(!locked)} path={mdiLockOpenOutline} size={1} />
                }
            </div>
        </div>
    );
}