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
  const [count, setCount] = useState(0);
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
  };

  useEffect(() => {
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
        }, 2000);
        setCount(0);
        return;
      }
    }
  }, [values]);

  return (
    <div className="container">
      <div className="row h-100vh">
        <div className="col-lg-6 offset-lg-3">
          <div className="scorecard">
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
                    disabled={values[index].disabled}
                    icon={values.length > 0 ? values[index].icon : ""}
                  ></Button>
                </div>
              );
            })}
          </div>
          <div className="box mt-5">
            <button className="btn-2" onClick={() => setValues(initial)}>
              Reset Block
            </button>
            <button className="btn-2" onClick={() => setWins({ X: 0, O: 0 })}>
              Reset Points
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
