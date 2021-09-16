import React from 'react';
import { useState } from 'react';
import { ethers } from "ethers";
import './CountDown.css';

function CountDown({start_height}) {
    let [current_heght, setCurrentHeight] = useState(0);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getBlockNumber().then((res) => {setCurrentHeight(res)})
    if (start_height > current_heght) {
        return (
            <div className="CountDown">
                <h3>Count down:</h3>
                <p>{start_height - current_heght} Block to go, approximately {((start_height - current_heght) / 4).toFixed(1)} minites</p>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

export default CountDown
