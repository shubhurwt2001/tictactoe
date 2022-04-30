import "./App.css";
import Button from "./Button";
import { useEffect, useState } from "react";

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
  const [values, setValues] = useState(initial);

  const btnClick = (value) => {
    const copy = [...values];
    if (!copy[value - 1].icon) {
      copy[value - 1].icon = icon;
      copy[value - 1].disabled = true;
    }
    setValues(copy);
    if (icon == "X") {
      setIcon("O");
    } else {
      setIcon("X");
    }
  };

  useEffect(() => {
    if (
      (values[0].icon == "X" &&
        values[1].icon == "X" &&
        values[2].icon == "X") ||
      (values[3].icon == "X" &&
        values[4].icon == "X" &&
        values[5].icon == "X") ||
      (values[6].icon == "X" &&
        values[7].icon == "X" &&
        values[8].icon == "X") ||
      (values[0].icon == "X" &&
        values[4].icon == "X" &&
        values[8].icon == "X") ||
      (values[2].icon == "X" &&
        values[4].icon == "X" &&
        values[6].icon == "X") ||
      (values[0].icon == "X" &&
        values[3].icon == "X" &&
        values[6].icon == "X") ||
      (values[1].icon == "X" &&
        values[4].icon == "X" &&
        values[7].icon == "X") ||
      (values[2].icon == "X" && values[5].icon == "X" && values[8].icon == "X")
    ) {
      alert("X won");
      setWins({ X: wins.X + 1, O: wins.O });
      setValues(initial);
    }

    if (
      (values[0].icon == "O" &&
        values[1].icon == "O" &&
        values[2].icon == "O") ||
      (values[3].icon == "O" &&
        values[4].icon == "O" &&
        values[5].icon == "O") ||
      (values[6].icon == "O" &&
        values[7].icon == "O" &&
        values[8].icon == "O") ||
      (values[0].icon == "O" &&
        values[4].icon == "O" &&
        values[8].icon == "O") ||
      (values[2].icon == "O" &&
        values[4].icon == "O" &&
        values[6].icon == "O") ||
      (values[0].icon == "O" &&
        values[3].icon == "O" &&
        values[6].icon == "O") ||
      (values[1].icon == "O" &&
        values[4].icon == "O" &&
        values[7].icon == "O") ||
      (values[2].icon == "O" && values[5].icon == "O" && values[8].icon == "O")
    ) {
      alert("O won");
      setWins({ X: wins.X, O: wins.O + 1 });
      setValues(initial);
    }
  }, [values]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="box">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
            return (
              <Button
                value={value}
                btnClick={() => btnClick(value)}
                disabled={values[index].disabled}
                key={value}
                icon={values.length > 0 ? values[index].icon : ""}
              ></Button>
            );
          })}
          <button className="btn-2" onClick={() => setValues(initial)}>
            Reset Block
          </button>          
          <button className="btn-2" onClick={() => setWins({ X: 0, O: 0 })}>
            Reset Points
          </button>
        </div>
        <div className="scorecard">
          <h1>Wins X : {wins.X}</h1>
          <h1>Wins O : {wins.O}</h1>
        </div>
      </header>
    </div>
  );
}

export default App;
