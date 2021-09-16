import React from 'react';
import { useState } from 'react';
import { ethers } from "ethers";
import data from './data.json';
import "./Transfer.css";

function Transfer() {
    const [idx, setIdx] = useState(0);
    const [to_address, setToAddress] = useState("");
    
    let transfer = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const address = data.address;
        const abi = data.abi;
        provider.send("eth_requestAccounts", []).then(() =>
        {
            const signer = provider.getSigner();
            let kitties = new ethers.Contract(address, abi);
            kitties = kitties.connect(signer);
            kitties.transferFrom(window.ethereum.selectedAddress, to_address, idx).catch((err) => alert(err.message));
        });

    }

    return (
        <div className="Transfer">
            <h3>Transfer Kitty:</h3>
            <p>Receiver:</p>
            <input type="idx" value={to_address} onInput= {e => setToAddress(e.target.value)} />
            <p>Kitty Id:</p>
            <input type="idx" value={idx} onInput= {e => setIdx(e.target.value)} />
            <input
            type="button"
            value="Transfer"
            onClick={transfer}
            />
        </div>
    )
}

export default Transfer;
