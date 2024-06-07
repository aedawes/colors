import React from 'react';
import '../styles/Navbar.css';
import Icon from '@mdi/react';
import { mdiMoonWaningCrescent, mdiWhiteBalanceSunny } from '@mdi/js';


//CREDIT: The toggle switch is from a tutorial at https://www.youtube.com/watch?v=bztDMD4HSL0 with my own alterations

export default function Navbar({ isDarkMode, onToggleDarkMode }) {

    //VARIABLES------------------------------------------------------------------------------------------------------------------
    const sliderDarkModeClass = isDarkMode ? 'slider dark-toggle' : 'slider light-toggle';

    //RENDER---------------------------------------------------------------------------------------------------------------------
    return (
        <nav>
            <h1>COLOR PICKER</h1>
            <label className='switch'>
                <input
                    type='checkbox'
                    checked={isDarkMode}
                    onChange={onToggleDarkMode}
                />
                <span className={sliderDarkModeClass}>
                    <Icon className='icon' path={isDarkMode ? mdiMoonWaningCrescent : mdiWhiteBalanceSunny} size={0.9} />
                </span>
            </label>
        </nav>
    );
}