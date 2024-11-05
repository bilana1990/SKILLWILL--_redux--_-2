import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, editTodo, toggleTodo, deleteTodo } from './features/todoSlice';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // თემა

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddOrEditTodo = () => {
    if (text.trim()) {
      if (editMode) {
        dispatch(editTodo({ id: editId, newText: text }));
        setEditMode(false);
        setEditId(null);
      } else {
        dispatch(addTodo(text));
      }
      setText('');
    }
  };

  const handleEdit = (todo) => {
    setEditMode(true);
    setEditId(todo.id);
    setText(todo.text);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <h1>Todo List</h1>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add or edit todo"
      />
      <button onClick={handleAddOrEditTodo}>
        {editMode ? 'Update Todo' : 'Add Todo'}
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </span>
            <button onClick={() => handleEdit(todo)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => dispatch(deleteTodo(todo.id))} style={{ marginLeft: '10px' }}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;