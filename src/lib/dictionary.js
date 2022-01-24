import { WORDSLIST } from "./wordle-allowed-v2";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const ALPHABET_SET = new Set(ALPHABET.split(""));

export default function Dictionary() {
    this.words = readWordsv2();
    this.letterFrequency = calculateLetterFrequency(this.words);
    this.ALPHABET = ALPHABET;
    this.ALPHABET_SET = ALPHABET_SET;

    // Calculate the score for each word based on the letter frequency and save it
    this.words.forEach((word) => {
        word.score = wordScore(word, this.letterFrequency);
    });
}

Dictionary.prototype.regexSearch = function (regexStr) {
    var regexObj = new RegExp(regexStr);
    let matches = this.words.filter((word) => regexObj.test(word.word));

    matches.sort((a, b) => b.score - a.score);

    return matches;
};

function readWordsv2() {
    return WORDSLIST.map((line) => {
        // console.log("line - ", line);
        return {
            word: line.word,
            isAnswer: line.isAnswer,
            hasDupes: hasDupes(line.word),
            set: new Set(line.word.split("")),
            score: 0
        };
    });
}

function hasDupes(word) {
    let letters = word.split("");
    let set = new Set(letters);
    return set.size !== letters.length;
}

function calculateLetterFrequency(words) {
    // Initialise the letter frequency dictionary
    let freq = ALPHABET.split("").reduce((acc, letter) => {
        acc[letter] = 0;
        return acc;
    }, {});

    // Only get the answer words
    let answerWords = words.filter((word) => word.isAnswer);

    answerWords.forEach((w) => {
        [...w.set].forEach((letter) => {
            freq[letter]++;
        });
    });

    console.log("Letter Frequencies - ", freq);

    return freq;
}

function wordScore(word, freq) {
    let score = [...word.set].reduce(
        (score, letter) => score * freq[letter],
        1
    );

    return score;
}
