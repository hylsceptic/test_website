import React from 'react';
import { useState } from 'react';
import { ethers } from "ethers";
import data from './data.json';
import "./Mint.css";


function Mint({total, minted, data_url, image_url, free_sup}) {
    const [cnt, setCnt] = useState(1);
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
            let price = minted < free_sup ? 0 : 0.01;
            let overrides = {
                value: ethers.utils.parseEther((cnt * price).toString())
            };
            kitties.mint(cnt, overrides).catch((err) => alert(err.message));
        });

    }

    return (
        <div className="Mint">
            <h3>Basic info:</h3>
            <p>Minted/free/total: {minted} / {free_sup} / {total} </p>
            <p>Metadata url: {data_url}</p> 
            <p>Image url: {image_url}</p>
            <p>Contract Address: {data.address}</p>
            <div>
                <h3>Mint Kitties:</h3>
                <p>Count:</p>
                <input type="text" value={cnt} onInput= {e => setCnt(e.target.value)} />
                <input
                type="button"
                value="Mint"
                onClick={mint_new}
                />
            </div>
        </div>
    )
}

export default Mint;
