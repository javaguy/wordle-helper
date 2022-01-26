import { useState } from "react";

function Sort({ sort, onSort }) {
    let onChange = (e) => {
        onSort(e.target.value);
    };
    return (
        <div className="flex items-start mb-6 justify-center">
            <label htmlFor="sort" className="sort-label flex items-center pr-1">
                Show:
            </label>
            <select
                id="sort"
                value={sort}
                onChange={onChange}
                className="flex items-center border-solid border-2 rounded mx-0.5"
            >
                <option value="alpha">Alphabetical</option>
                <option value="score">Maximise Letter Probabilities</option>
                <option value="answer">Most Likely Answers</option>
            </select>
        </div>
    );
}

function Frequency({ freq }) {
    let list = Object.keys(freq).map((key) => ({
        letter: key,
        count: freq[key]
    }));

    list.sort((a, b) => b.count - a.count);

    return (
        <div className="pb-6">
            <div className="mb-6 font-bold">
                Here are the most common letters in the Wordle:
            </div>
            <div className="grid grid-cols-4 gap-4">
                {list.map((l, i) => (
                    <div
                        className="border-solid border-2 flex items-center justify-center mx-0.5 text-lg rounded"
                        key={i}
                    >
                        {l.letter.toUpperCase()}: {Math.round(l.count * 100)}%
                    </div>
                ))}
            </div>
        </div>
    );
}

export function AllowedWords({ words, freq }) {
    const [sort, setSort] = useState("alpha");

    if (!words || words.length === 0) {
        return <Frequency freq={freq} />;
    }

    let sortedList = (
        sort === "answer" ? words.filter((w) => w.isAnswer) : words
    ).sort((a, b) => {
        if (sort === "alpha") {
            return a.word.localeCompare(b.word);
        } else {
            return b.score - a.score;
        }
    });

    return (
        <div className="pb-6">
            <div className="mb-6 font-bold">
                Here are some words you can try:
            </div>
            <Sort sort={sort} onSort={setSort} />
            <div className="grid grid-cols-4 gap-4">
                {sortedList.slice(0, 52).map((w, i) => (
                    <div
                        className="border-solid border-2 flex items-center justify-center mx-0.5 text-lg rounded"
                        key={i}
                    >
                        {w.word.toUpperCase()}
                    </div>
                ))}
            </div>
        </div>
    );
}
