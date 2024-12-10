import React from "react";
import { TaskListProps } from "@/types";

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
    return (
        <ul className='space-y-4'>
            {tasks.map((task) => (
                <li key={task.id} className='bg-white p-4 shadow-md rounded-md flex items-center justify-between'>
                    <div>
                        <h2 className='text-lg font-bold'>{task.title}</h2>
                        <p>{task.description}</p>
                        <p className='text-sm text-gray-500'>Status: {task.status}</p>
                    </div>
                    <div className='flex space-x-2'>
                        <button onClick={() => onEdit(task)} className='bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600'>
                            Edit
                        </button>
                        <button onClick={() => onDelete(task.id)} className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'>
                            Delete
                        </button>
                        <button
                            onClick={() => onToggleStatus(task.id)}
                            className={`px-3 py-1 rounded-md ${
                                task.status === "Pending" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
                            } text-white`}
                        >
                            {task.status === "Pending" ? "Mark Completed" : "Mark Pending"}
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
