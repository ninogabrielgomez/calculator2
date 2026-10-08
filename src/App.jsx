import { useState } from 'react';
import './App.css';

function CalcDisplay({ dispValue }) {
  return (
    <div className='Display'>
      {dispValue}
    </div>
  );
}

function CalcButton({ buttonLabel, buttonClassname = 'Button', onClick }) {
  return (
    <button className={buttonClassname} onClick={onClick}>
      {buttonLabel}
    </button>
  );
}

function App() {
  const [disp, setDisp] = useState("0");
  const [operand1, setOperand1] = useState(null);
  const [operand2, setOperand2] = useState(null);
  const [operation, setOperation] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  // Clear Handler for "C" button
  const clearClickHandler = (e) => {
    e.preventDefault();
    setDisp("0");
    setOperand1(null);
    setOperand2(null);
    setOperation(null);
    setIsFinished(false);
  };

  // Equal Handler for "=" button
  const equalClickHandler = (e) => {
    e.preventDefault();

    if (operand1 !== null && operand2 !== null && operation !== null) {
      let result = 0;

      if (operation === "+") {
        result = parseInt(operand1) + parseInt(operand2);
      } else if (operation === "-") {
        result = parseInt(operand1) - parseInt(operand2);
      } else if (operation === "*") {
        result = parseInt(operand1) * parseInt(operand2);
      } else if (operation === "÷") {
        result = parseInt(operand2) !== 0 ? parseInt(operand1) / parseInt(operand2) : "Error";
      }

      setDisp(String(result));
      setOperand1(String(result));
      setOperand2(null);
      setOperation(null);
      setIsFinished(true);
    }
  };

  // Operation Handler for +, -, ×, ÷
  const operationClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setOperation(value);
    setDisp(value);
    setIsFinished(false);
  };

  // Number Handler for 0-9
  const numbuttonClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    console.log(value + "|" + operand1 + "|" + operand2 + "|" + operation);

    if (isFinished) {
      setDisp(value);
      setOperand1(value);
      setIsFinished(false);
      return;
    }

    if (operation === null) {
      if (operand1 === null) {
        setDisp(value);
        setOperand1(value);
      } else {
        setDisp(operand1 + value);
        setOperand1(operand1 + value);
      }
    } else {
      if (operand2 === null) {
        setDisp(value);
        setOperand2(value);
      } else {
        setDisp(operand2 + value);
        setOperand2(operand2 + value);
      }
    }
  };

  // Handler for "GOMEZ" button
  const gomezClickHandler = (e) => {
    e.preventDefault();
    setDisp("Niño Gabriel T. Gomez");
  };

  return (
    <div className='App'>
      <div className='Header'> Calculator of Niño Gabriel T. Gomez - WMD3A</div>
      <div className='Calculator'>
        <CalcDisplay dispValue={disp}/>
        <div className='Keypad'>
          <CalcButton buttonLabel={7} onClick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={8} onClick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={9} onClick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={"+"} buttonClassname="Button Button-operator" onClick={operationClickHandler}/>
          <CalcButton buttonLabel={4} onClick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={5} onClick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={6} onClick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={"*"} buttonClassname="Button Button-operator" onClick={operationClickHandler}/>
          <CalcButton buttonLabel={1} onClick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={2} onClick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={3} onClick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={"-"} buttonClassname="Button Button-operator" onClick={operationClickHandler}/>
          <CalcButton buttonLabel={"C"} buttonClassname="Button Button-clear" onClick={clearClickHandler}/>
          <CalcButton buttonLabel={0} onClick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={"="} buttonClassname="Button Button-equals" onClick={equalClickHandler}/>
          <CalcButton buttonLabel={"÷"} buttonClassname="Button Button-operator" onClick={operationClickHandler}/>
          <CalcButton buttonLabel={"GOMEZ"} buttonClassname="Button Button-name" onClick={gomezClickHandler}/>
        </div>
      </div>
    </div>
  );
}

export default App;
