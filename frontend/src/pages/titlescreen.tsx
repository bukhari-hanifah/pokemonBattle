import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./components/titleMenu.css"
import autumn1 from "./titlemenu/autumn1.gif"
import park1 from "./titlemenu/park1.gif";
import park2 from "./titlemenu/park2.gif";
import river1 from "./titlemenu/river1.gif"
import river2 from "./titlemenu/river2.gif";;
import cave1 from "./titlemenu/cave1.gif";
import beach1 from "./titlemenu/beach1.gif";
import green1 from "./titlemenu/green1.gif";
import hall1 from "./titlemenu/hall1.gif";
import pond1 from "./titlemenu/pond1.gif";
import stump1 from "./titlemenu/stump1.gif";
import { Captured } from "../interfaces/Captured";
import { useAudioPlayer } from "react-use-audio-player";

interface SelectPokemonProps {
  setSelectedPkmn: (pkmn: string | null) => void;
}

const TitleMenu: React.FC<SelectPokemonProps> = ({setSelectedPkmn}) => {
  const navigate = useNavigate();
const backApi = "http://localhost:3000/"
const [background, setBackground] = useState("");
const [capturebox, setCapturebox] = useState<Captured[] | null>(null);
const [count, setCount] = useState<number>(0);
const [selected, setSelected] = useState<string | null>(null);
const [deleted, setDeleted] = useState<Boolean | null>(null);

const backgrounds = [ autumn1, park1, park2, river1, river2, cave1, beach1, green1, hall1, pond1, stump1 ];

const { load, playing, stop } = useAudioPlayer();

  useEffect(()=> {
    titleScreen();
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackground(randomBg);
    console.log(count)
  }, [])

  const titleScreen = async () => {
    try {
    const response = await axios.get(`${backApi}`);
    setCount(response.data.count)
    console.log("Response from backend:", response.data.capturedPkmns);
    setCapturebox(response.data.capturedPkmns)
    } catch(error) {
      console.error("Failed to fetch data", error)
    }
  }
  
  const chosen = (name: string, cry: string) => {
    setSelected(selected === name ? null : name);
    setSelectedPkmn(name)
    load(cry, { autoplay: true });
    if (playing) {
      stop();
    }
  }

  const getDelete = async (nameDel: string) => {
    console.log(nameDel);
    try {
      const response = await axios.delete(`${backApi}delete`, {
        data: {data: nameDel} ,
      });
      console.log(response.data.message);
      titleScreen();
    } catch (error) {
      console.error("Failed to delete Pokémon", error);
    }
  };

  const handleNavigation = () => {
    if (selected === null) {
      navigate("/selectPokemon");
    } else {
      navigate("/selectRival");
    }
  };

  return (
    <div className="titlePage text-center z-1">
      <div className="dimOverlay"></div>
      <div className="bgContainer absolute top-0 left-0 w-screen h-screen m-0 p-0"><img src={background} className="bg_gif w-screen h-screen object-cover bg-no-repeat" alt="Background"/></div>
      <div className="pages">
        <h1 className="startTitle text-4xl p-2 text-center text-white z-3">Legendary Pokemon Battle</h1>
        {count>0 && (
          <div className="capturedBox flex flex-col w-4/5 h-4/5 m-auto overflow-hidden justify-center">
            <div className="Capcounts text-2xl pb-2 text-white">Captured Pokemons: <span className="font-bold">{count}</span></div>
            <div className="pkmnLists p-3 text-base text-white h-full text-center w-full grid overflow-y-auto overflow-x-auto">
                {capturebox && (capturebox.map((captured, index) => (
                  <div key={index} 
                  className={`list text-center ${selected === captured.name ? "selectedP" : ""} `} onClick={() => chosen(captured.name, captured.cry)}>
                    <h3 className="listTitle text-lg text-center text-white capitalize font-bold p-1">{captured.name}</h3>
                    <div className="listImg max-h-24 mx-auto p-1 flex justify-center items-center"><img src={captured.photo} alt={captured.photo}/></div>
                    <div className="m-1">
                      <p className="text-white">HP: <span className="font-bold">{captured.hp}</span></p>
                      <p className="text-white">Attack: <span className="font-bold">{captured.attack}</span></p>
                      <p className="text-white">Defense: <span className="font-bold">{captured.defense}</span></p>
                    </div>
                    {selected === captured.name && (
                      <div className="delBtn">
                        <button onClick={(e) => { e.stopPropagation(); getDelete(captured.name); }}> Delete </button>
                      </div>
                    )}
                  </div>
                )))}
            </div>
          </div>
        )}
        <div className="btnContainer absolute bottom-0 left-0 w-full p-4">
          <button onClick={handleNavigation} className="startBtn absolute bottom-0 left-0 pb-4 w-screen text-5xl text-white cursor-pointer z-9">
            {selected === null ? "Start" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TitleMenu

