import TrashIcon from "./assets/trash.png";
import EditIcon from "./assets/edit.png";
import Moment from "moment"; // Yarn Add Moment

function Todo({index, name, date, isDone, onChange, onDelete, onEdit}) {
    const formatDate = Moment(date).format("DD-MM-YYYY");
    return(
        <>
        <div className="bg-gray-200 flex flex-row p-2 space-x-2 justify-between rounded-md">
                <input type="radio"
                        className="accent-green-400"
                        checked={isDone}
                        onChange={(e) => onChange(e, index)}
                />
                <p className={isDone ? "line-through" : "" + "text-left"}>{name}</p>
                <em className="">{formatDate}</em>
                <div className="space-x-2">
                            <button onClick={(e) => onEdit(e, index)}>
                            <img src={EditIcon} className="w-5" />
                        </button>
                        <button onClick={(e) => onDelete (e, index)}>
                            <img src={TrashIcon} className="w-5" />
                        </button>
                </div>
            </div>       
        
        </>
    );

}
export default Todo;