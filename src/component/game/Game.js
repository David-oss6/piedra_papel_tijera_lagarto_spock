import "./gamestyle.css";
import { useState, useEffect } from "react";
import piedra from "./img/piedra2.png";
import papel from "./img/papel2.png";
import tijera from "./img/tijera2.png";
import lagarto from "./img/lagarto2.png";
import spock from "./img/spock2.png";
import reglas from "./img/rules.png";
import interrogante from "./img/interrogante.png";

export default function Game() {
  const [ia, setIa] = useState();
  const [iaClass, setIaClass] = useState("");
  const [iaImg, setIaImg] = useState();
  const [player, setPlayer] = useState();
  const [go, setGo] = useState(false);
  const [msg, setMsg] = useState(null);
  const [choice, setChoice] = useState(-1);
  const list = [
    { name: "piedra", win: ["tijera", "lagarto"] },
    { name: "papel", win: ["piedra", "spok"] },
    { name: "tijera", win: ["papel", "lagarto"] },
    { name: "lagarto", win: ["spok", "papel"] },
    { name: "spok", win: ["tijera", "piedra"] },
  ];

  useEffect(() => {
    let iaChoice = Math.floor(Math.random() * 5);
    setIa(list[iaChoice].name);
  }, []);
  useEffect(() => {
    console.log(iaImg);
    if (ia === "piedra") {
      setIaImg(piedra);
    }
    if (ia === "papel") {
      setIaImg(papel);
    }
    if (ia === "tijera") {
      setIaImg(tijera);
    }
    if (ia === "lagarto") {
      setIaImg(lagarto);
    }
    if (ia === "spock") {
      setIaImg(spock);
    }
  }, [ia]);
  const start = () => {
    let result = undefined;
    console.log("IA", ia);
    console.log("player", player.name);
    if (!player || go) {
      alert("escoge una mano");
    } else {
      ia_magic(); //cambio de clase dentro de ia div
      setGo(true);
      if (ia === player.name) {
        setMsg("Empate!");
      } else {
        result = player.win.find((x) => {
          return x === ia;
        });
        if (result === undefined) {
          setMsg("perdiste");
        }
        if (result) {
          setMsg("ganaste");
        }
      }
    }
  };
  const playAgain = () => {
    setChoice(-1);
    setGo(false);
    setPlayer(null);
    setMsg("");
    let iaChoice = Math.floor(Math.random() * 5);
    setIa(list[iaChoice].name);
  };

  const handleChoice = (x) => {
    setChoice(x);
    setPlayer(list[x]);
  };

  const ia_magic = () => {
    setIaClass("ia_move");
    setTimeout(() => {
      setIaClass("ia_no_display");
    }, [1000]);
  };
  return (
    <div className="game">
      <h1 className="text">Piedra papel tijera lagarto spock </h1>
      <div className="players_div">
        <p className="text">PLAYER</p>
        <p></p>
        <p className="text">IA</p>
      </div>
      <div className="stage">
        <div className="selectCont">
          <div
            className={choice === 0 ? "cero" : ""}
            onClick={() => handleChoice(0)}
          >
            <img className="choice_img" src={piedra} alt="" />
          </div>
          <div
            className={choice === 1 ? "uno" : ""}
            onClick={() => handleChoice(1)}
          >
            <img className="choice_img" src={papel} alt="" />
          </div>
          <div
            className={choice === 2 ? "dos" : ""}
            onClick={() => handleChoice(2)}
          >
            <img className="choice_img" src={tijera} alt="" />
          </div>
          <div
            className={choice === 3 ? "tres" : ""}
            onClick={() => handleChoice(3)}
          >
            <img className="choice_img" src={lagarto} alt="" />
          </div>
          <div
            className={choice === 4 ? "cuatro" : ""}
            onClick={() => handleChoice(4)}
          >
            <img className="choice_img" src={spock} alt="" />
          </div>
        </div>

        <p className="vs">VS</p>
        {/* IA components ****************************************************** */}
        <div className={go ? " computer ia_move_dos" : "computer"}>
          <img
            className={go ? `interrogante ${iaClass}` : "interrogante"}
            src={interrogante}
            alt="ia"
          />
          <img
            src={iaImg}
            className={go ? "img_choice_ia" : "ia_no_display"}
            alt="ia"
          />
        </div>
      </div>

      <div className="btns_div">
        {msg && <p className="resultado">{msg}</p>}
        {go ? (
          <button
            className="fight_btns"
            onClick={player ? () => playAgain() : ""}
          >
            Play Again
          </button>
        ) : (
          <button className="fight_btns" onClick={player ? () => start() : ""}>
            GO!
          </button>
        )}{" "}
      </div>

      <img className="reglas_img" src={reglas} alt="" />
    </div>
  );
}
