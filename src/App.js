import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import './App.css';
import Mint from './components/Mint';
import View from './components/View';
import Transfer from "./components/Transfer";
import CountDown from "./components/CountDown";
import data from './components/data.json';

function App() {
    const [kitties, setKitties] = useState([]);
    const [total, setTotal] = useState(0);
    const [minted, setMinted] = useState(0);
    const [free_sup, setFreeSup] = useState(0);
    const [start_height, setStartHeight] = useState(0);
    const [data_url, setDataUrl] = useState("");
    const [image_url, setImageUrl] = useState("");
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
          setMinted((await kitties_contract.totalSupply()).toNumber());
          setFreeSup((await kitties_contract.getFreeSupply()).toNumber());
          setDataUrl(await kitties_contract.getBaseURI());
          setStartHeight(await kitties_contract.getSaleTime());
          let base_url = await kitties_contract.getBaseURI();
          setDataUrl(base_url)
          let data = await fetch("https://arweave.net/" + base_url.substring(5) + '0').then((res) => res.json());
          setImageUrl(data.image.substring(0, data.image.length - 5));
          setTotal((await kitties_contract.MAX_KITTIES()).toNumber());
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
      <CountDown start_height={start_height}></CountDown>
    </container>
    <container>
      <Mint 
        total={total} 
        minted={minted} 
        data_url={data_url}
        image_url={image_url}
        free_sup={free_sup}></Mint>
    </container>
    <container>
      <Transfer></Transfer>
    </container>
    <container>
      <View kitties={kitties} show_all_kitties={show_all_kitties} show_my_kitties={show_my_kitties} image_url={image_url}></View>
    </container>
  </div>
  );
}

export default App;
