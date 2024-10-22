import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Bg1 from "./selection/StarterBg7.png"
import Bg2 from "./selection/StarterBg2.png"
import Bg3 from "./selection/StarterBg3.png"
import Bg4 from "./selection/StarterBg4.png"
import Bg5 from "./selection/StarterBg5.png"
import Bg6 from "./selection/StarterBg6.png"
import { useNavigate } from "react-router-dom";
import "./components/titleMenu.css"

//pokeapi.co/api/v2/location-area/168/pokemon_encounters.version_details[0].encounter_details[0]
interface RivalProps {
  setRival: (pkmn: string | null) => void;
  selectedPkmn: string | null;
}

const SelectRival: React.FC <RivalProps> = ({ setRival, selectedPkmn }) =>  {
  const navigate = useNavigate();
  const backApi = "http://localhost:3000/"
const [background, setBackground] = useState("");

const backgrounds = [ Bg1, Bg2, Bg3, Bg4, Bg5, Bg6 ];

  useEffect(()=> {
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackground(randomBg);
  }, [])

  const getRandom = async () => {
    const response = await axios.get(`${backApi}rival`)
    setRival(response.data);
    navigate("/fight");
  }

  return (
    <div className="pageTitle">
      <div className="dimOverlay"></div>
      <div className="bgContainer absolute top-0 left-0 w-screen h-screen m-0 p-0"><img src={background} className="bg_gif w-screen h-screen object-cover bg-no-repeat"/></div>
      <div className="pages">
        <h1 className="startTitle text-6xl p-2 text-center text-white z-3">Find Opponent Pokemon for <span className="uppercase">{selectedPkmn}</span></h1>
        <div className="btnContainer absolute bottom-0 left-0 w-full p-4">
          <button className="startBtn absolute bottom-0 left-0 pb-4 w-screen text-5xl text-white cursor-pointer z-9 fightBtn" onClick={getRandom}>Find and Fight</button>
          </div>
      </div>
    </div>
  )
}

export default SelectRival
