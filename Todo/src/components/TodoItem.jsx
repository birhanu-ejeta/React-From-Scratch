export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li className="todo-item">
            {/* Checkbox to mark complete */}
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />

            {/* Todo text — strike through if completed */}
            <span style={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#888" : "#fff"
            }}>
                {todo.text}
            </span>

            {/* Delete button */}
            <button
                onClick={() => onDelete(todo.id)}
                className="delete-btn"
            >
                ❌
            </button>
        </li>
    );
}