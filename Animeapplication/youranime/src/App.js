
import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import './styles.css';
//to start use command npm start after giving "cd youranime in the terminal"
//to restart again close the site and press terminal --> new terminal

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
  ADD_OPERATION: "add operation"
}

function reducer(state, { type, payload }) {

  console.log(type)

  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") {
        console.log(state)
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
        operation: state.operation,
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: state.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

    case ACTIONS.ADD_OPERATION:
      return {
        ...state,
        operation: payload.operation,
        previousOperand: state.currentOperand,
        currentOperand: 0,
      }

    case ACTIONS.EVALUATE:
      console.log("evaluated pressed")
      console.log(result(state.operation, state.previousOperand, state.currentOperand))
      return {
        ...state,
        previousOperand: result(state.operation, state.previousOperand, state.currentOperand),
        currentOperand: 0
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length == 1) {
        return { ...state, currentOperand: null }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
  }
}

const result = (operation, operandOne, operandTwo) => {

  console.log(operation, operandOne, operandTwo)

  switch (operation) {
    case '+':
      return Number(operandOne) + Number(operandTwo);
    case '-':
      return Number(operandOne) - Number(operandTwo);
    case '*':
      return Number(operandOne) * Number(operandTwo);
    case '÷':
      return Number(operandOne) / Number(operandTwo);
    case '³':
      return Number(operandOne) * Number(operandOne) * Number(operandOne);
    case '²':
      return Number(operandOne) * Number(operandOne);
    case '√':
      return Math.sqrt(operandOne);
    case 'log10':
      return Math.log10(operandOne);
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})


  return (
    <div className='flexa'>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">{previousOperand} {operation}</div>
          <div className="current-operand">{currentOperand}</div>
        </div>
        <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />

        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />

        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />

        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />

        <OperationButton operation="³" dispatch={dispatch} />
        <OperationButton operation="²" dispatch={dispatch} />
        <OperationButton operation="√" dispatch={dispatch} />

        <OperationButton operation="log10" dispatch={dispatch} />
        <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })} >=</button>



      </div>
    </div>

  );
}

export default App;
//min 18.00