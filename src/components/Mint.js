import React from 'react';
import { useState } from 'react';
import { ethers } from "ethers";
import data from './data.json';
import "./Mint.css";

function Mint({total, minted}) {
    const [cnt, setCnt] = useState(0);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = data.address;
    const abi = data.abi;
    
    let mint_new = () => {
        if (cnt === 0) return;
        provider.send("eth_requestAccounts", []).then(() =>
        {
            const signer = provider.getSigner();
            let kitties = new ethers.Contract(address, abi);
            kitties = kitties.connect(signer);
            let price = 0.01;
            let overrides = {
                value: ethers.utils.parseEther((cnt * price).toString())
            };
            kitties.mint(cnt, overrides);
        });

    }

    return (
        <div className="Mint">
            <p>Minted: {minted} / {total} </p>
            <div>
                <h3>Mint Kitties:</h3>
                <p>Count:</p>
                <input type="text" value={cnt} onInput= {e => setCnt(e.target.value)} />
                <input
                type="button"
                value="mint"
                onClick={mint_new}
                />
            </div>
        </div>
    )
}

export default Mint;
