import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAudioPlayer } from "react-use-audio-player";
import selectBg from "./selection/StarterBg.png"
import { StarterPkmns } from "../interfaces/PokemonList";
import { useNavigate } from "react-router-dom";
import "./components/titleMenu.css"

interface SelectPokemonProps {
  setSelectedPkmn: (pkmn: string | null) => void;
}

const SelectPokemon: React.FC<SelectPokemonProps> = ({setSelectedPkmn}) =>  {
  const navigate = useNavigate();
  const backApi = "http://localhost:3000/"
  const [pkmn1, setPkmn1] = useState<StarterPkmns | null>(null);
  const [pkmn2, setPkmn2] = useState<StarterPkmns | null>(null);
  const [pkmn3, setPkmn3] = useState<StarterPkmns | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const { load, playing, stop } = useAudioPlayer();
  useEffect(()=> {
    getPkmns();
  }, [])

  const getPkmns = async () => {
    const response = await axios.get(`${backApi}start`)
    setPkmn1(response.data.random1);
    setPkmn2(response.data.random2);
    setPkmn3(response.data.random3);
  }

  const handleCardClick = (name: string, cry: string) => {
    console.log(cry)
    setSelected(selected === name ? null : name);
    load(cry, { autoplay: true });
    if (playing) {
      stop();
    }
  };

  const handleNextClick = () => {
    if (selected) {
      setSelectedPkmn(selected);
      navigate("/selectRival");
    }
  };
  return (
    <div className="pageTitle">
      <div className="bgContainer absolute top-0 left-0 w-screen h-screen m-0 p-0"><img src={selectBg} className="bg_gif w-screen h-screen object-cover bg-no-repeat"/></div>
      <div className="pages">
        <h1 className="startTitle text-6xl p-2 text-center text-white z-3">Choose your Legendary Pokemon</h1>
        <div className="flex flex-wrap flex-row justify-center content-start box-border pt-[2em]">

          <div className={`card-div flex p-1 flex-col items-center box-border ${selected === pkmn1?.name ? "selected" : ""}`} onClick={() => handleCardClick(pkmn1?.name!, pkmn1?.cry!)}>
            <h2 className="capitalize font-bold p-2">{pkmn1?.name}</h2>
            <div className="img-div w-full h-48 flex flex-row justify-center items-center p-1"><img src={pkmn1?.showdown_front || pkmn1?.dream_front} alt="Option 1 Pokemon"/></div>
            <div className="flex flex-col text-left p-2 text-center">
              <p className="pkmnData">HP: <span className=" font-bold">{pkmn1?.hp}</span></p>
              <p className="pkmnData">Attack: <span className=" font-bold">{pkmn1?.attack}</span></p>
              <p className="pkmnData">Defense: <span className=" font-bold">{pkmn1?.defense}</span></p>
            </div>
          </div>
          <div className={`card-div flex p-1 flex-col items-center box-border ${selected === pkmn2?.name ? "selected" : ""}`} onClick={() => handleCardClick(pkmn2?.name!, pkmn2?.cry!)}>
            <h2 className="capitalize font-bold p-2">{pkmn2?.name}</h2>
            <div className="img-div w-full h-48 flex flex-row justify-center items-center p-1"> <img src={pkmn2?.showdown_front || pkmn2?.dream_front} alt="Option 2 Pokemon" /> </div>
            <div className="flex flex-col text-left p-2 text-center">
              <p className="pkmnData">HP: <span className=" font-bold">{pkmn2?.hp}</span></p>
              <p className="pkmnData">Attack: <span className=" font-bold">{pkmn2?.attack}</span></p>
              <p className="pkmnData">Defense: <span className=" font-bold">{pkmn2?.defense}</span></p>
            </div>
          </div>
          <div className={`card-div flex p-1 flex-col items-center box-border ${selected === pkmn3?.name ? "selected" : ""}`} onClick={() => handleCardClick(pkmn3?.name!, pkmn3?.cry!)}>
            <h2 className="capitalize font-bold p-2">{pkmn3?.name}</h2>
            <div className="img-div w-full h-48 flex flex-row justify-center items-center p-1"> <img src={pkmn3?.showdown_front || pkmn3?.dream_front} alt="Option 3 Pokemon"/> </div>
            <div className="flex flex-col text-left p-2 text-center">
              <p className="pkmnData">HP: <span className=" font-bold">{pkmn3?.hp}</span></p>
              <p className="pkmnData">Attack: <span className=" font-bold">{pkmn3?.attack}</span></p>
              <p className="pkmnData">Defense: <span className=" font-bold">{pkmn3?.defense}</span></p>
            </div>
          </div>

        </div>
        <div className="btnContainer absolute bottom-0 left-0 w-full p-4"><button onClick={handleNextClick} className="startBtn absolute bottom-0 left-0 pb-4 w-screen text-5xl text-white cursor-pointer z-9 selectPokemon">Select Pokemon</button></div>
      </div>
    </div>
  )
}

export default SelectPokemon
