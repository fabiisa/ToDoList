import React, { useState, useEffect } from 'react';
import './App.css';
//importing components
import Form from './components/Form';
import ToDoList from './components/ToDoList';

function App() {
  //inputText is the value and setInpuText is the function to change the value
  // state studd
  const [inputText, setInputText] = useState('');
  const [toDos, setToDos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Run once when the app starts
  useEffect(() => {getLocalTodos()}, []);
  // use useEffect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [toDos, status])

  //functions
  const filterHandler= () => {
    switch(status){
      case 'completed':
        setFilteredTodos(toDos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(toDos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(toDos);
        break;
    }
  }

  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(toDos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null ){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setToDos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1> Fabi's To Do list </h1>
      </header>
      <Form todos= {toDos} setTodos = {setToDos} inputText={inputText} setInputText={setInputText} setStatus ={setStatus} />
      <ToDoList setTodos = {setToDos} todos={toDos} filteredTodos ={filteredTodos}/>
    </div>
  );
}

export default App;
