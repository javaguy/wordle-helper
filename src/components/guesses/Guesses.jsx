import classNames from "classnames";

const Cell = ({ value, state }) => {
    const classes = classNames(
        "w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded",
        {
            "bg-white border-slate-200": !state,
            "bg-slate-400 text-white border-slate-400": state === "a",
            "bg-green-500 text-white border-green-500": state === "c",
            "bg-yellow-500 text-white border-yellow-500": state === "p"
        }
    );

    return (
        <>
            <div className={classes}>{value}</div>
        </>
    );
};

const CellRow = ({ word, hint }) => {
    let classes = "flex justify-center mb-1";
    let padWord = word.padEnd(5);
    let padHint = hint.padEnd(5);

    return (
        <div className={classes}>
            {padWord.split("").map((char, index) => (
                <Cell value={char} state={padHint.charAt(index)} key={index} />
            ))}
        </div>
    );
};

export const Guesses = ({ guesses, hints, currentGuess, currentHint }) => {
    return (
        <div className="pb-6">
            {guesses.map((guess, index) => (
                <CellRow word={guess} hint={hints[index]} key={index} />
            ))}
            <CellRow word={currentGuess} hint={currentHint} />
        </div>
    );
};

// export const Guesses = ({ guesses, hints, currentGuess, currentHint }) {
//     let cellClasses =
//         "w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded";
//     let rowClasses = "flex justify-center mb-1";

//     return (
//         <div className="pb-6">
//             {guesses.map((guess, index) => (
//                 <div key={index} className={rowClasses}>
//                     {guess.split("").map((char, index) => (
//                         <div className={cellClasses}>{char}</div>
//                     ))}
//                 </div>
//             ))}
//             <div key={"current"} className={rowClasses}>
//                 {currentGuess
//                     .padEnd(5)
//                     .split("")
//                     .map((char, index) => (
//                         <div className={cellClasses}>{char}</div>
//                     ))}
//             </div>
//         </div>
//     );
// }
