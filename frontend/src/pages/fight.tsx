import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MoveDetails, Pokemon } from "../interfaces/Pokemon";
import waterfall from "./battle/waterfall.gif"
import torii from "./battle/torii.gif"
import pier from "./battle/pier.gif"
import grass from "./battle/grass.gif"
import field from "./battle/field.gif"
import desert from "./battle/desert.gif"
import pokeball from "./battle/pokeball.gif"
import "./components/titleMenu.css"

interface FightProps {
  selectedPkmn: string | null;
  Rival: string | null;
  setCapture: (pkmn: string | null) => void;
  capture: string | null
}

const Fight: React.FC<FightProps> = ({ selectedPkmn, Rival, setCapture, capture}) =>  {
  const navigate = useNavigate();
  const [background, setBackground] = useState("");  
  const backgrounds = [ waterfall, torii, pier, grass, field, desert ];

  const backApi = "http://localhost:3000/"
  const [pkmnData, setPkmnData] = useState<Pokemon | null>(null);
  const [foeData, setfoeData] = useState<Pokemon | null>(null);
  const [pkmnHealth, setPkmnHealth] = useState<number>(0);
  const [foeHealth, setFoeHealth] = useState<number>(0);
  const [moves, setMoves] = useState<any[]>([])
  const [foemoves, setFoeMoves] = useState<any[]>([])
  const [moveDescription, setMovedescription] = useState<MoveDetails[]>([])
  const [attackTriggered, setAttackTriggered] = useState(false);
  const [getPkmn, setGetpkmn] = useState(false);
  const [failed, setFailed] = useState(false);
  const [conclude, setConclude] = useState<Boolean | null>(null);
  const [actText, setactText] = useState<any[] | null>(null);
  const [foeText, setFoeText] = useState<any[] | null>(null);
  
  useEffect(() => {
    if(conclude!=null){
      setConclude(null)
    }
    if(capture!=null){
      setCapture(null)
    }
    const fight = async () => {
      const response = await axios.post(`${backApi}fight`, {
        pokemon1: selectedPkmn,
        pokemon2: Rival,
      });
      setPkmnData(response.data.pokeData1);
      setfoeData(response.data.pokeData2);
      setConclude(null)
    };
    fight();

    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackground(randomBg);
  }, [selectedPkmn, Rival]);

  useEffect(() => {
    if (pkmnData?.moves) {
      getMoveDetails(pkmnData?.moves);
      const shuffledMoves = shuffleMoves([...pkmnData.moves]);
      setMoves(shuffledMoves.slice(0, 4));
    }
    if (foeData?.moves) {
      const shuffledMoves = shuffleMoves([...foeData.moves]);
      setFoeMoves(shuffledMoves.slice(0, 4));
    }
    if (pkmnData) {
      setPkmnHealth(pkmnData?.stats?.find((s) => s.stat.name === "hp")?.base_stat || 0);
    }
  
    if (foeData) {
      setFoeHealth(foeData?.stats?.find((s) => s.stat.name === "hp")?.base_stat || 0);
    }
  }, [pkmnData, foeData]);

  const getMoveDetails = async (movesArray: any[]) => {
    const response = await axios.post(`${backApi}moveText`, {
      myMoves: movesArray.slice(0, 4)
    });
    const shuffledMoves = shuffleMoves([...movesArray.slice(0, 4)]);
    setMoves(shuffledMoves)
    setMovedescription(response.data.moveDetails)
  }

  const shuffleMoves = (array: any[]) => {
    if(array.length>3){
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }}
    return array;
  }

  const getFlavorText = (moveName: string): string => {
    const move = moveDescription.find((desc) => {
      return desc.name === moveName;
    });
    return move ? move.flavorText : "Why";
  };

  const getDamage = (moveName: string): string => {
    const move = moveDescription.find((desc) => {
      return desc.name === moveName;
    });
    return move ? move.damage.toString() : "";
  };

  const handleAttack = async(moveUrl: string) => {
    const response = await axios.post(`${backApi}attack`, {
      action: moveUrl,
      p2Health: foeHealth,
      p1atk: pkmnData?.stats?.find((s) => s.stat.name === "attack")?.base_stat || 0,
      p2df: foeData?.stats?.find((s) => s.stat.name === "defense")?.base_stat || 0
    });
    setFoeHealth(response.data.pkmn2)
    setactText([response.data.atkName, response.data.damage])
    if(foeHealth>0){
      handleCounter()
    }
    else{
      setConclude(true)
    }
  };

  const handleCounter = async() => {
    const response = await axios.post(`${backApi}counter`, {
      p1Health: pkmnHealth,
      foeAttacks: foemoves,
      p2atk: foeData?.stats?.find((s) => s.stat.name === "attack")?.base_stat || 0,
      p1df: pkmnData?.stats?.find((s) => s.stat.name === "defense")?.base_stat || 0,
    });
    setPkmnHealth(response.data.pkmn1)
    if(pkmnHealth<0){
      setConclude(false)
    }
    setFoeText([response.data.atkName, response.data.damage])
    if(attackTriggered===false){
    setAttackTriggered(true)}
  };

  const handleCapture = async() => {
    const response = await axios.post(`${backApi}capture`, {
      maxHp: foeData?.stats?.find((s) => s.stat.name === "hp")?.base_stat,
      currentHp: foeHealth,
      enemyName: foeData?.name
    });
    setCapture(response.data.message)
    if(response.data.nab === "failed"){
      handleCounter()
      setFailed(true)
    }
    else{      
      setGetpkmn(true)
      setConclude(true)
      setfoeData(null)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setGetpkmn(false)
    }, 5000); 
    return () => clearTimeout(timer);
  }, [getPkmn])

  useEffect(() => {
    const timer = setTimeout(() => {
      setFailed(false)
    }, 5000); 
    return () => clearTimeout(timer);
  }, [failed])

  useEffect(() => {
    const timer = setTimeout(() => {
      setactText(null)
    }, 3000); 
    return () => clearTimeout(timer);
  }, [actText])
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setFoeText(null)
    }, 3000); 
    return () => clearTimeout(timer);
  }, [foeText])

  useEffect(() => {
    if (pkmnHealth !== null && pkmnHealth <= 0) {
      setConclude(false);
      setPkmnData(null);
    }
  }, [pkmnHealth]);
  
  useEffect(() => {
    if (foeHealth !== null && foeHealth <= 0) {
      setConclude(true);
      setfoeData(null);
    }
  }, [foeHealth]);

  const handleMenu = () => { navigate("/");  };
  const handleAgain = () => { navigate("/selectPokemon");  };
  const handleEnemyChange = () => { navigate("/selectRival")  }

  return (
    <div className="flex flex-col justify-center items-center">
    <div className="bgContainer absolute top-0 left-0 w-screen h-screen m-0 p-0"><img src={background} className="bg_gif w-screen h-screen object-cover bg-no-repeat"/></div>
      <h1 className="battletext text-6xl p-2 text-center text-white z-3 font-bold">Battle!</h1>
      <div className="duelmatch relative m-auto block">
        <div className="player absolute w-2/5 text-white bg-black">
          <p className="m-2 text-xl capitalize font-bold">{pkmnData?.name}</p>
          <div className="hitPoint flex flex-row items-center text-base absolute m-2">
            <p>HP :</p>
            <div className="hpContainer playerHp relative float-right h-full ml-1 pr-1 rounded bg-white" 
            data-hover={`${pkmnHealth.toFixed(2)} / ${pkmnData?.stats?.find((s) => s.stat.name === "hp")?.base_stat || 1}.`}>
            <div className="hpBar p-0 bg-green-600" 
            style={{ width: `${ pkmnHealth && pkmnData ? Math.max(0, Math.min((pkmnHealth / (pkmnData?.stats?.find((s) => s.stat.name === "hp")?.base_stat || 1)) * 100, 100)) : 100
          }%`, }}></div>
            </div>
          </div>
        </div>
        <div className="yesP absolute w-2/5">
          <div className="pkmnImg1">
            <img src={pkmnData?.sprites.other.showdown.back_default || pkmnData?.sprites.back_default || pkmnData?.sprites.other.dream_world.front_default } alt="My Pokemon" className="w-7/12 absolute"/>
          </div>
        </div>
        {conclude !=true && (
          <>
          <div className="foeP absolute w-2/5">       
            <img src={foeData?.sprites.other.showdown.front_default || foeData?.sprites.other.dream_world.front_default || foeData?.sprites.front_default} className="absolute w-auto"/>
          </div>
          <div className="enemy absolute w-2/5 text-white bg-black">
          <p className="m-2 text-xl capitalize font-bold">{foeData?.name}</p>
          <div className="hitPoint flex flex-row items-center text-base absolute m-2">
                <p>HP : </p>
                <div className="hpContainer enemyHp relative float-right h-full ml-1 pr-1 rounded bg-white" data-hover={`${foeHealth.toFixed(2)} / ${foeData?.stats?.find((s) => s.stat.name === "hp")?.base_stat || 1}`}>
                  <div  className="hpBar bg-green-600" style={{ width: `${foeHealth && foeData ? Math.max(0, Math.min((foeHealth / (foeData?.stats?.find((s) => s.stat.name === "hp")?.base_stat || 1)) * 100, 100)) : 100}%` }}></div>
                </div>
              </div>
          </div>
        </>
        )}
        {conclude===true && capture!==null && (
          <div className="captP absolute w-2/5">       
            <img src={pokeball} className="absolute w-auto"/>
          </div>
        )}

        <div className="playerAction absolute w-full bottom-0 bg-black text-white">
          <div className="lifeBox absolute w-2/5 left-0 h-full pl-2">
            {conclude=== null && (
              <>
                {actText===null && foeText===null &&(
                  <p className="text-xl">What will <br></br><span className="pkmnLabel">{pkmnData?.name}</span> do?</p>
                )}
                {actText &&(
                  <p className="actionText text-sm">{pkmnData?.name} used <span className="text-red-700">{actText[0]}</span>.<br></br>causing damage of {actText[1].toFixed(2)}</p>
                )}
                {foeText &&(
                  <p className="actionText text-sm">{foeData?.name} used <span className="text-red-700">{foeText[0]}</span>.<br></br>causing damage of {foeText[1].toFixed(2)}</p>
                )}
                {failed &&(
                  <p><span className="text-green-900 uppercase font-bold">{capture}</span></p>
                )}           
              </>
            )}
            {conclude === true && (
              <>
                {getPkmn &&(
                    <p><span className="pkmnLabel">{capture}</span></p>
                  )}
                <p>You won the battle!</p>
              </>
            )}
            {conclude === false && (
              <p>You lost the battle!</p>
            )}
          </div>
          {conclude ===null && (              
          <div className="moveBox absolute w-3/5 top-0 right-0 h-full grid bg-gray-100">            
            {moves.map((moveObj, index) => (
              <div className={`move${index}`}>
                <button key={index} onClick={() => handleAttack(moveObj.move.url)} className="w-48 text-base text-white bg-black cursor-pointer text-center">{moveObj.move.name}</button>
                <div className="hoverMove absolute left-0 bg-black text-white text-xs font-normal opacity-0 invisible">
                  <p>Damage: <span>{getDamage(moveObj.move.name)}</span></p>
                  <p>Details: <span>{getFlavorText(moveObj.move.name)}</span></p>
                </div>
              </div>
            ))}
              <div className="change">
              <button onClick={handleEnemyChange} className="bg-indigo-700 w-48 text-base text-white bg-black cursor-pointer text-center">Change Opponent</button>
                <div className="hoverMove absolute left-0 bg-black text-white text-xs font-normal opacity-0 invisible">
                  <p className="m-0 p-0 text-sm">Find another Pokemon other than <span>{foeData?.name}</span></p>
                </div>
              </div>
              {foeHealth <foeData?.stats?.find((s) => s.stat.name === "hp")?.base_stat! && attackTriggered &&(
              <div className="captureBtn">
                <div className="hoverMove absolute left-0 bg-black text-white text-xs font-normal opacity-0 invisible">
                <p>Capture <span>{foeData?.name}</span></p>
                </div>
                <button className="w-48 text-base text-white bg-black cursor-pointer text-center bg-red-700" onClick={handleCapture}>Capture</button>
              </div>
              )}
          </div>
          )}
        </div>
      </div>
      
      <div className={`settings`}>        
        <button onClick={handleMenu}>Menu</button> | {" "}
        <button onClick={handleAgain}>Again</button> | {" "}
        <button onClick={handleEnemyChange}>Change Enemy Pokemon</button>
      </div>
    </div>
  )
}

export default Fight
