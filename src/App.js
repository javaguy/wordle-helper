import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Keyboard } from "./components/keyboard/Keyboard";

function Guesses({ guesses, currentGuess }) {
    let cellClasses =
        "w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded";
    let rowClasses = "flex justify-center mb-1";

    return (
        <div className="pb-6">
            {guesses.map((guess, index) => (
                <div key={index} className={rowClasses}>
                    {guess.split("").map((char, index) => (
                        <div className={cellClasses}>{char}</div>
                    ))}
                </div>
            ))}
            <div key={"current"} className={rowClasses}>
                {currentGuess
                    .padEnd(5)
                    .split("")
                    .map((char, index) => (
                        <div className={cellClasses}>{char}</div>
                    ))}
            </div>
        </div>
    );
}

function App() {
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");

    const onChar = (value) => {
        if (currentGuess.length < 5) {
            setCurrentGuess(`${currentGuess}${value}`);
        }
    };

    const onDelete = () => {
        setCurrentGuess(currentGuess.slice(0, -1));
    };

    const onEnter = () => {
        setGuesses([...guesses, currentGuess]);
        setCurrentGuess("");
    };

    return (
        <div className="App">
            <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <h1>Welcome to Wordle Helper!</h1>
                <p>Enter your guesses below:</p>
                <Guesses guesses={guesses} currentGuess={currentGuess} />
                <Keyboard
                    onChar={onChar}
                    onDelete={onDelete}
                    onEnter={onEnter}
                    guesses={guesses}
                />
            </div>
        </div>
    );
}

export default App;
