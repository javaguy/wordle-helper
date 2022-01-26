import { useState } from "react";
import "./App.css";

import { Guesses } from "./components/guesses/Guesses";
import { Keyboard } from "./components/keyboard/Keyboard";
import { KeyboardHints } from "./components/keyboard/KeyboardHints";
import { AllowedWords } from "./components/allowedwords/AllowedWords";
import { AboutModal } from "./components/aboutmodal/AboutModal";

import Wordle from "./lib/wordle";

const game = new Wordle();

function App() {
    const [guesses, setGuesses] = useState([]);
    const [hints, setHints] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");
    const [currentHint, setCurrentHint] = useState("");
    const [showHintState, setHintState] = useState(false);
    const [allowedWords, setAllowedWords] = useState([]);
    const [showAbout, setShowAbout] = useState(false);

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
            <AboutModal
                isOpen={showAbout}
                handleClose={() => setShowAbout(false)}
            />
            <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">
                        Welcome to Wordle Helper!
                    </h1>
                    <button
                        type="text"
                        className="underline decoration-orange-400"
                        onClick={() => setShowAbout(true)}
                    >
                        How to Use
                    </button>
                </div>
                <div className="mb-6 font-bold">
                    Enter your {showHintState ? "hints" : "guesses"} below:
                </div>
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
                <AllowedWords
                    words={allowedWords}
                    freq={game.dictionary.letterFrequency}
                />
            </div>
            <footer>
                <div className="text-center">
                    You can check out the source code{" "}
                    <a
                        href="https://github.com/javaguy/wordle-helper"
                        className="underline decoration-orange-400"
                    >
                        here
                    </a>
                    . Contributions on improving the hints are welcome!
                </div>
            </footer>
        </div>
    );
}

export default App;
