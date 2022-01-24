// import { KeyValue } from '../../lib/keyboard'
// import { getStatuses } from '../../lib/statuses'
import { Key } from "./Key";
import { useEffect } from "react";

export const KeyboardHints = ({ onChar, onDelete, onEnter, guesses }) => {
    const onClick = (value) => {
        if (value === "ENTER") {
            onEnter();
        } else if (value === "DELETE") {
            onDelete();
        } else {
            onChar(value.charAt(0));
        }
    };

    useEffect(() => {
        const listener = (e) => {
            if (e.code === "Enter") {
                onEnter();
            } else if (e.code === "Backspace") {
                onDelete();
            } else {
                const key = e.key.toLowerCase();
                if (key.length === 1 && ["a", "p", "c"].includes(key)) {
                    onChar(key);
                }
            }
        };
        window.addEventListener("keyup", listener);
        return () => {
            window.removeEventListener("keyup", listener);
        };
    }, [onEnter, onDelete, onChar]);

    return (
        <div>
            <div className="flex justify-center mb-1">
                <Key
                    width={130.8}
                    value="absent"
                    onClick={onClick}
                    status="absent"
                />
                <Key
                    width={130.8}
                    value="present"
                    onClick={onClick}
                    status="present"
                />
                <Key
                    width={130.8}
                    value="correct"
                    onClick={onClick}
                    status="correct"
                />
            </div>
            <div className="flex justify-center">
                <Key width={65.4} value="ENTER" onClick={onClick}>
                    Enter
                </Key>
                <Key width={65.4} value="DELETE" onClick={onClick}>
                    Delete
                </Key>
            </div>
        </div>
    );
};
