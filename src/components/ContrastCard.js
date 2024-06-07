import React from 'react';
import '../styles/ContrastCard.css';
import Icon from '@mdi/react';
import { mdiCheckCircle, mdiCloseCircle } from '@mdi/js';
import { calculateContrastRatio } from '../ColorContrast';

export default function ContrastCard({ color1, color2 }) {

    //RENDER------------------------------------------------------------------------------------
    return (
        <div>
            <div className='contrastCardContainer'>
                <div className='contrastColorContainer'>
                    <div className='contrastColorSwatch' style={{ backgroundColor: color1 }}>
                        <p style={{ color: color2 }}>color</p>
                    </div>
                    <div className='contrastColorSwatch' style={{ backgroundColor: color2 }}>
                        <p style={{ color: color1 }}>color</p>
                    </div>
                </div>
                <div className='contrastRatio'>
                    <p>Contrast Ratio: {calculateContrastRatio(color1, color2)}</p>
                    <Icon
                        path={calculateContrastRatio(color1, color2) > 4.5 ? mdiCheckCircle : mdiCloseCircle}
                        size={1.3}
                        color={calculateContrastRatio(color1, color2) > 4.5 ? '#59AB8F' : '#C75164'}
                    />
                </div>
            </div>
        </div>
    );
}