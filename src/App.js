import { useState } from "react";
import "./App.css";

import { Guesses } from "./components/guesses/Guesses";
import { Keyboard } from "./components/keyboard/Keyboard";
import { KeyboardHints } from "./components/keyboard/KeyboardHints";
import Wordle from "./lib/wordle";

function AllowedWords({ words }) {
    return (
        <div>
            <p>Here are some things you can guess: </p>
            {words.slice(0, 30).map((w, i) => (
                <div key={i}>
                    Word - {w.word}, Score {w.score}{" "}
                </div>
            ))}
        </div>
    );
}

const game = new Wordle();

function App() {
    const [guesses, setGuesses] = useState([]);
    const [hints, setHints] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");
    const [currentHint, setCurrentHint] = useState("");
    const [showHintState, setHintState] = useState(false);
    const [allowedWords, setAllowedWords] = useState([]);

    const onChar = (value) => {
        if (currentGuess.length < 5) {
            setCurrentGuess(`${currentGuess}${value}`);
        }
    };

    const onDelete = () => {
        setCurrentGuess(currentGuess.slice(0, -1));
    };

    const onEnter = () => {
        // setGuesses([...guesses, currentGuess]);
        // setCurrentGuess("");

        // get the hints
        if (currentGuess.length === 5) {
            setHintState(true);
        }
    };

    const onHint = (value) => {
        if (currentHint.length < 5) {
            setCurrentHint(`${currentHint}${value.charAt(0)}`);
        }
    };

    const onDeleteHint = () => {
        setCurrentHint(currentHint.slice(0, -1));
    };

    const onEnterHint = () => {
        if (currentHint.length < 5) {
            return;
        }

        console.log("onEnterHint called");
        // Update the Wordle
        game.addTurn(currentGuess, currentHint);

        setGuesses([...guesses, currentGuess]);
        setCurrentGuess("");
        setHints([...hints, currentHint]);
        setCurrentHint("");
        setHintState(false);
        setAllowedWords(game.getNewGuesses());
    };

    return (
        <div className="App">
            <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <h1>Welcome to Wordle Helper!</h1>
                <p>Enter your {showHintState ? "hints" : "guesses"} below:</p>
                <Guesses
                    guesses={guesses}
                    hints={hints}
                    currentGuess={currentGuess}
                    currentHint={currentHint}
                />
                {showHintState ? (
                    <KeyboardHints
                        onChar={onHint}
                        onDelete={onDeleteHint}
                        onEnter={onEnterHint}
                    />
                ) : (
                    <Keyboard
                        onChar={onChar}
                        onDelete={onDelete}
                        onEnter={onEnter}
                        guesses={guesses}
                    />
                )}
                <AllowedWords words={allowedWords} />
            </div>
        </div>
    );
}

export default App;
