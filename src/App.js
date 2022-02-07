import { useState, useCallback, useEffect } from "react";
import './App.css';

import MyHeader from "./components/Header";
import AddInput from "./components/AddInput";
import TodoItem from "./components/TodoItem";
import CheckModal from "./components/Modal/CheckModal";
import EditModal from "./components/Modal/EditModal";
import NoDataTip from "./components/NoDataTip";

function App() {

  const [ isInputShow, setInputShow ] = useState(false),
        [ isShowCheckModal, setShowCheckModal ] = useState(false),
        [ isShowEditModal, setShowEditModal ] = useState(false),
        [ todoList, setTodoList ] = useState([]),
        [ currentData, setcurrentData ] = useState({});
  
  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem('todoData') || '[]');
    setTodoList(todoData);
  }, [])

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoList));
  }, [todoList])

  const addItem = useCallback((value) => {
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      completed: false
    };
    setTodoList((todoList) => [...todoList, dataItem]);
    setInputShow(false);
  }, []);

  const completeItem = useCallback((id) => {
    setTodoList((todoList) => todoList.map(item => {
      if (item.id === id) {
        item.completed = !item.completed
      }
      return item;
    }))
  }, [])

  const openCheckModal = useCallback((id) => {
    setcurrentData(() => todoList.filter(item => item.id === id)[0]);
    setShowCheckModal(true);
  }, [todoList])

  const openEditModal = useCallback((id) => {
    setcurrentData(() => todoList.filter(item => item.id === id)[0]);
    setShowEditModal(true);
  }, [todoList])

  const removeItem = useCallback((id) => {
    setTodoList((todoList) => todoList.filter(item => item.id !== id));
  }, [])

  const submitEdit = useCallback((newData, id) => {
    setTodoList((todoList) => 
      todoList.map((item) => {
        if (item.id === id) {
          item = newData;
        }
        return item;
      })
    )
    setShowEditModal(false);
  }, [])

  return (
    <div className="App">
      <MyHeader openInput={ () => setInputShow(!isInputShow) } />
      <AddInput isInputShow={ isInputShow } addItem={addItem} />

      {
        !todoList || todoList.length === 0 ? (<NoDataTip />) : (
          <ul className="todo-list">
            {
              todoList.map((item, index) => {
                return (
                  <TodoItem
                    dataItem={item}
                   key={index}
                   openCheckModal={openCheckModal}
                   openEditModal={openEditModal}
                   removeItem={removeItem}
                   completeItem={completeItem}/>
                );
              })
            }
          </ul>
        )
      }

      <CheckModal
       isShowCheckModal={isShowCheckModal}
       data={currentData}
       closeModal={ () => setShowCheckModal(false)} />
      <EditModal
       isShowEditModal={isShowEditModal}
       data={currentData}
       submitEdit={submitEdit} />
    </div>
  );
}

export default App;
