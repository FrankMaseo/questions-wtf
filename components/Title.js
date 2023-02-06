import React, { useState } from 'react';
//import styles from '../styles/slotMachineEffect.css'

const Title = () => {
    const targets = [
        "your boyfriend", "your girlfriend", "your best friend", "your brother", "your sister"
    ];
    const [rolling, setRolling] = useState(false);
    const [currentTarget, setCurrentTarget] = useState(targets[0]);
    

    return (
        <h1>
            <strong>Questions</strong> to ask <span><ul><li>your boyfriend</li><li>your girlfriend</li><li>your best friend</li></ul></span>
        </h1>
    )
}

export default Title;