import "./App.css";
import Button from "./Button";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  onChildChanged,
} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV6Z2qlXaiod2wQp4lj14xBZpH_3b1Pbg",
  authDomain: "tictactoe-3cfa4.firebaseapp.com",
  projectId: "tictactoe-3cfa4",
  storageBucket: "tictactoe-3cfa4.appspot.com",
  messagingSenderId: "576911701989",
  appId: "1:576911701989:web:c9b4fa9b9d3cf772cee10c",
  measurementId: "G-SFG1F7V7J4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function App() {
  var initial = [
    { id: 1, icon: "", disabled: false },
    { id: 2, icon: "", disabled: false },
    { id: 3, icon: "", disabled: false },
    { id: 4, icon: "", disabled: false },
    { id: 5, icon: "", disabled: false },
    { id: 6, icon: "", disabled: false },
    { id: 7, icon: "", disabled: false },
    { id: 8, icon: "", disabled: false },
    { id: 9, icon: "", disabled: false },
  ];

  const [wins, setWins] = useState({ X: 0, O: 0 });

  const [icon, setIcon] = useState("X");
  const [playedBy, setPlayedBy] = useState("");
  const [values, setValues] = useState(initial);
  const [count, setCount] = useState(0);

  const [player, setPlayer] = useState({ id: "", type: "" });
  const [gameId, setGameId] = useState("");
  const [start, setStart] = useState(false);
  const [extraStep, setExtraStep] = useState(false);

  const btnClick = (value) => {
    const copy = [...values];
    if (!copy[value - 1].icon) {
      copy[value - 1].icon = icon;
      copy[value - 1].disabled = true;
    }
    setValues(copy);
    setCount(count + 1);
    if (icon === "X") {
      setIcon("O");
    } else {
      setIcon("X");
    }
    setPlayedBy(player.id);
  };

  // useEffect(() => {
  //   if (start) {
  //     get(child(ref(db), `games/${gameId}`))
  //       .then((snapshot) => {
  //         const details = snapshot.val();
  //         details.turn = icon;
  //         details.playedBy = playedBy;
  //         const updates = {};
  //         updates["/games/" + gameId] = details;
  //         update(ref(db), updates);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [icon]);

  useEffect(() => {
    setPlayer({ id: uuidv4(), type: "" });
  }, []);

  useEffect(() => {
    if (start) {
      get(child(ref(db), `games/${gameId}`))
        .then((snapshot) => {
          const details = snapshot.val();
          details.turn = icon;
          details.playedBy = playedBy;
          details.values = values;
          const updates = {};
          updates["/games/" + gameId] = details;
          update(ref(db), updates);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (
      (values[0].icon === "X" &&
        values[1].icon === "X" &&
        values[2].icon === "X") ||
      (values[3].icon === "X" &&
        values[4].icon === "X" &&
        values[5].icon === "X") ||
      (values[6].icon === "X" &&
        values[7].icon === "X" &&
        values[8].icon === "X") ||
      (values[0].icon === "X" &&
        values[4].icon === "X" &&
        values[8].icon === "X") ||
      (values[2].icon === "X" &&
        values[4].icon === "X" &&
        values[6].icon === "X") ||
      (values[0].icon === "X" &&
        values[3].icon === "X" &&
        values[6].icon === "X") ||
      (values[1].icon === "X" &&
        values[4].icon === "X" &&
        values[7].icon === "X") ||
      (values[2].icon === "X" &&
        values[5].icon === "X" &&
        values[8].icon === "X")
    ) {
      setWins({ X: wins.X + 1, O: wins.O });
      setTimeout(() => {
        setValues(initial);
        alert("Hurray, X won !!");
      }, 200);

      setCount(0);
    } else if (
      (values[0].icon === "O" &&
        values[1].icon === "O" &&
        values[2].icon === "O") ||
      (values[3].icon === "O" &&
        values[4].icon === "O" &&
        values[5].icon === "O") ||
      (values[6].icon === "O" &&
        values[7].icon === "O" &&
        values[8].icon === "O") ||
      (values[0].icon === "O" &&
        values[4].icon === "O" &&
        values[8].icon === "O") ||
      (values[2].icon === "O" &&
        values[4].icon === "O" &&
        values[6].icon === "O") ||
      (values[0].icon === "O" &&
        values[3].icon === "O" &&
        values[6].icon === "O") ||
      (values[1].icon === "O" &&
        values[4].icon === "O" &&
        values[7].icon === "O") ||
      (values[2].icon === "O" &&
        values[5].icon === "O" &&
        values[8].icon === "O")
    ) {
      setTimeout(() => {
        setValues(initial);
        alert("Hurray, O won !!");
      }, 200);

      setWins({ X: wins.X, O: wins.O + 1 });
      setCount(0);
    } else {
      if (count === 9) {
        setTimeout(() => {
          setValues(initial);
          alert("Match Draw !!");
        }, 200);
        setCount(0);
        return;
      }
    }
  }, [values]);

  const createGame = () => {
    setPlayer({ id: player.id, type: "creator" });
    const myGameId = uuidv4();
    setGameId(myGameId);
    setExtraStep(true);
    set(ref(db, "games/" + myGameId), {
      player1: { id: player.id, type: "creator" },
      player2: { id: "", type: "joiner" },
      xWins: 0,
      oWins: 0,
      turn: icon,
      values: initial,
    });
  };

  const joinGame = () => {
    setPlayer({ id: player.id, type: "joiner" });
    setExtraStep(true);
  };

  const continueJoining = () => {
    get(child(ref(db), `games/${gameId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (!snapshot.val().player2.id) {
            const details = snapshot.val();
            details.player2.id = player.id;
            const updates = {};
            updates["/games/" + gameId] = details;
            update(ref(db), updates);
          } else {
            alert("The match has already started.");
          }
        } else {
          alert("No such game exists");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  onChildChanged(ref(db), (data) => {
    for (var key of Object.keys(data.val())) {
      if (key == gameId && data.val()[key].player2.id) {
        console.log(true);
        if (start != true) {
          setStart(true);
          setIcon(data.val()[key].turn);
          setPlayedBy(data.val()[key].playedBy);
          setValues(data.val()[key].values);
        }
        return;
      }
    }
  });

  return start ? (
    <div className="container">
      <div className="row h-100vh">
        <div className="col-lg-6 offset-lg-3">
          <div className="scorecard">
            <h1>{icon}'s Turn</h1>
            <h1>
              Wins X : {wins.X} , Wins O : {wins.O}
            </h1>
          </div>
          <div className="row row-inner">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
              return (
                <div className="col-4 div-index" key={value}>
                  <Button
                    value={value}
                    btnClick={() => btnClick(value)}
                    disabled={values[index].disabled || playedBy == player.id}
                    icon={values.length > 0 ? values[index].icon : ""}
                  ></Button>
                </div>
              );
            })}
          </div>
          {player.type == "creator" ? (
            <div className="box mt-5">
              <button className="btn-2" onClick={() => setValues(initial)}>
                Reset Block
              </button>
              <button className="btn-2" onClick={() => setWins({ X: 0, O: 0 })}>
                Reset Points
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  ) : extraStep && player.type == "creator" ? (
    <div className="container">
      <div className="row h-100vh">
        <div className="col-md-4 offset-4">
          <div className="row">
            <h3 className="text-center">
              Share this game id with your friend and ask them to join
            </h3>
            <h2 className="text-center mt-4">{gameId}</h2>
          </div>
        </div>
      </div>
    </div>
  ) : extraStep && player.type == "joiner" ? (
    <div className="container">
      <div className="row h-100vh">
        <div className="col-md-4 offset-4">
          <div className="row">
            <div className="form-group w-100">
              <label htmlFor="gameID">Enter Game ID</label>
              <input
                type="text"
                name="gameID"
                id="gameID"
                className="form-control"
                onChange={(e) => setGameId(e.target.value)}
              />
            </div>
            <div className="form-group w-100">
              <button className="btn-2 w-100" onClick={continueJoining}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="container">
      <div className="row h-100vh">
        <div className="col-md-4 offset-4">
          <div className="row">
            <button className="btn-2 w-100" onClick={createGame}>
              Create Game
            </button>
          </div>
          <div className="row">
            <button className="btn-2 w-100" onClick={joinGame}>
              Join Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
