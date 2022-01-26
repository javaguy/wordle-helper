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

export function AllowedWords({ words }) {
    const [sort, setSort] = useState("alpha");

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
