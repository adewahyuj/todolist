import Moment from "moment";
import { useState, useRef, useEffect } from "react";
import Todo from "./Todo";
import Service from "./Service";

const todos = [
    {
    name: "Beli buah di supermarket",
    date: "2022/08/17",
    isDone: true,
    },
    {
        name: "Beli pakan Ikan",
        date: "2022/08/11",
        isDone: false,
},
{
    name: "Bimtek di Bogor",
    date: "2022/08/9",
    isDone: false,
},
];
function Todolist() {
    let inputTodoRef = useRef("");
    let inputDateRef = useRef("");
    let [todoList, setTodoList] = useState([...todos]);
    let [todoIndex, setTodoIndex] = useState(null);

    async function loadListData() {
        const response = await Service.list();
        const data = response.data.data;
        setTodoList(() => data);
    }

    
    useEffect(() => {
        loadListData();
    }, []);

    async function handleAddButton(e) {
        e.preventDefault();
        // Edit
        if (todoIndex != null) {
            setTodoList((_todos) => {
            _todos[todoIndex].name = inputTodoRef.current.value;
            _todos[todoIndex].date = inputDateRef.current.value;
            return [..._todos];
        });
            setTodoIndex(() => null);
    }
    // Add
    else {
        await Service.create({
            name: inputTodoRef.current.value,
            date: inputDateRef.current.value,
            isDone: false,
        });
    }

    }
            

    function handleRadioOnChecked(e, index)
{
    setTodoList((_todos) => {
        const _todoLocal = _todos;
        _todoLocal[index].isDone = e.target.value;
        return [..._todos];
    });
}

function handleClearAll(e) {
    e.preventDefault();
    if (!confirm("Are You Sure?")) return;
    setTodoList(() => []);
}
function handleDeleteList(e, index) {
    e.preventDefault();
    if(!confirm("Are You Sure?")) return;
    setTodoList((_todos) => {
        _todos.splice(index, 1);
        return [..._todos];
    });
}

function handleEdit(e, index) {
    e.preventDefault();
    const selectedTodo = todoList[index];
    const formatedDate = Moment(selectedTodo.date).format("Y-MM-D");
    inputTodoRef.current.value = selectedTodo.name;
    inputDateRef.current.value = formatedDate;
    setTodoIndex(() => index);
}



       return (
        <div className="w-1/2 m-auto space-y-5">
            <h1>Training Todo List</h1>
            <div className="flex flex-row space-x-2 justify-between">
                <input
                    ref={inputTodoRef}
                    type="text"
                    name=""
                    className="border-2 border-gray-300 p-1 text-xs w-full" 
                    placeholder="Masukan TODO"
                />
                <input
                    ref={inputDateRef}
                    type="date"
                    className="border-2 border-gray-300 p-1 text-xs w-full" 
                    placeholder="Masukan Tanggal"
                />
                <button onClick={handleAddButton} className ="bg-cyan-300 w-[100px] text-white rounded-sm">+</button>
            </div> 
            <div className="space-y-1">
                {todoList.map((todo, key) => (
                   <Todo date={todo.date} name={todo.name}  
                   onChange={handleRadioOnChecked}
                   onDelete={handleDeleteList}
                   isDone={todo.isDone}
                   index={key}
                   key={key}
                   onEdit={handleEdit}
                   /> 
                ))

                }
            </div>
            
            <div className="flex flex-row justify-between">
                <p>
                    You Have {todoList.reduce((total, todo) => {
                    if (todo.isDone) return total;
                    return (total += 1);
                   }, 0)} Pending Task
                </p>
                <button className="bg-red-500 text-white p-2 rounded-md" onClick={handleClearAll}>Clear All</button>

            </div>
        </div>
    );   

                }
export default Todolist;
