import { union, difference } from "./set-helper";
import Dictionary from "./dictionary";

var GameState = function () {
    this.guesses = [];
    this.notAllowed = new Set();
    this.mustHave = new Set();
    this.letters = [
        { value: "", notAllowed: new Set() },
        { value: "", notAllowed: new Set() },
        { value: "", notAllowed: new Set() },
        { value: "", notAllowed: new Set() },
        { value: "", notAllowed: new Set() }
    ];
};

GameState.prototype.addTurn = function (g, r) {
    let guess = g.toLowerCase();
    let result = r.toLowerCase();

    this.guesses.push(guess);

    result.split("").forEach((l, i) => {
        let char = guess.charAt(i);
        if (l === "a") {
            this.notAllowed.add(char);
        } else if (l === "p") {
            this.mustHave.add(char);
            this.letters[i].notAllowed.add(char);
        } else if (l === "c") {
            this.mustHave.add(char);
            this.letters[i].value = char;
        }
    });
};

export default function Wordle() {
    this.state = new GameState();
    this.dictionary = new Dictionary();
}

Wordle.prototype.addTurn = function (guess, result) {
    this.state.addTurn(guess, result);
};

Wordle.prototype.getNewGuesses = function () {
    return this.findWordsWithState(this.state);
};

Wordle.prototype.findWordsWithState = function (state) {
    let dictionary = this.dictionary;

    // Find all the words that contain the given letters

    let lookAhead = [...state.mustHave].map((l) => `(?=.*?${l})`).join("");
    let letterMatch = state.letters
        .map((l) => {
            if (l.value) {
                return `${l.value}{1}`;
            }

            let a = difference(
                dictionary.ALPHABET_SET,
                union(state.notAllowed, l.notAllowed)
            );

            return `[${[...a].join()}]{1}`;
        })
        .join("");

    let dynamicPart = "^" + lookAhead + letterMatch + "$";

    return dictionary.regexSearch(dynamicPart);
};
