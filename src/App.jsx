import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, updateTodo } from './Features/Todo';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [updateText, setUpdateText] = useState('');
  const [updateId, setUpdateId] = useState(null);
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todo.todos);

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      dispatch(addTodo({
        id: Date.now(),
        text: inputText,
      }));
      setInputText('');
    }
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = () => {
    if (updateId && updateText.trim() !== '') {
      dispatch(updateTodo({
        id: updateId,
        newText: updateText,
      }));
      setUpdateId(null);
      setUpdateText('');
    }
  };

  return (
    <div className="App">
      <h1 className="title">Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Add a new todo"
        />
        <button className="add-button" onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <div className="button-container">
              <button className="delete-button" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              <button className="update-button" onClick={() => { setUpdateId(todo.id); setUpdateText(todo.text); }}>Update</button>
            </div>
          </li>
        ))}
      </ul>
      {updateId && (
        <div className="update-container">
          <input
            type="text"
            value={updateText}
            onChange={e => setUpdateText(e.target.value)}
            placeholder="Update todo text"
          />
          <button className="update-todo-button" onClick={handleUpdateTodo}>Update Todo</button>
        </div>
      )}
    </div>
  );
}

export default App;
