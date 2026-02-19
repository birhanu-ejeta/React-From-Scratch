import { useState } from "react";

export default function TodoForm({ onAdd }) {
    const [text, setText] = useState("");

    function handleSubmit(e) {
        e.preventDefault();             // prevent page refresh

        if (text.trim() === "") return;  // don't allow empty todos

        onAdd(text);                     // send text to parent
        setText("");                     // clear input
    }

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to be done?"
                className="todo-input"
            />
            <button type="submit" className="add-btn">
                Add ➕
            </button>
        </form>
    );
}