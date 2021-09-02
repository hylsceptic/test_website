import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import './App.css';
import Mint from './components/Mint';
import View from './components/View';
import Transfer from "./components/Transfer";
import data from './components/data.json';

function App() {
    const [kitties, setKitties] = useState([]);
    const [total, setTotal] = useState(0);
    const [minted, setMinted] = useState(0);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = data.address;
    const abi = data.abi;
    let kitties_contract = new ethers.Contract(address, abi, provider);

    useEffect(() => {
      const initData = async () => {
        await window.ethereum.enable();
        kitties_contract.walletOfOwner(window.ethereum.selectedAddress).then((res) => {
            res = res.map((idx) => {return idx.toNumber()});
            setKitties(res);
          });
          setTotal((await kitties_contract.MAX_KOALAS()).toNumber());
          setMinted((await kitties_contract.totalSupply()).toNumber());
      }
      
      initData();
    }, []);

  let show_all_kitties = () => {
    let all_kitties = [];
    for (var i = 0; i < minted; i++) {
      all_kitties.push(i);
    };
    setKitties(all_kitties);
  };
  let show_my_kitties = () => {
    kitties_contract.walletOfOwner(window.ethereum.selectedAddress).then((res) => {
      res = res.map((idx) => {return idx.toNumber()});
      setKitties(res);
    });
  };

  return (
    <div>
    <container>
      <Mint total={total} minted={minted}></Mint>  
    </container>
    <container>
      <Transfer></Transfer>  
    </container>
    <container>
      <View kitties={kitties} show_all_kitties={show_all_kitties} show_my_kitties={show_my_kitties}></View>  
    </container>
  </div>
  );
}

export default App;
