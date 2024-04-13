import React from 'react';
import '../styles/ColorSwatch.css';
// import Icon from '@mdi/react';
// import { mdiMoonWaningCrescent, mdiWhiteBalanceSunny } from '@mdi/js';

export default function ColorSwatch({ color }) {

    const handleCopy = () => {
        navigator.clipboard.writeText(color)
            .then(() => {
                alert('Color Copied!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    return (
        <div className='colorContainer' style={{ backgroundColor: color }}>
            <p className='colorHex' onClick={handleCopy} >{color}</p>
        </div>
    );
}