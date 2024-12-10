import React from "react";
import { TaskFormProps } from "@/types";

const TaskForm: React.FC<TaskFormProps> = ({ form, setForm, onSubmit, editing }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <form onSubmit={onSubmit} className='bg-white p-4 shadow-md rounded-md mb-6'>
            <input name='title' value={form.title} onChange={handleChange} placeholder='Title' required className='w-full mb-4 p-2 border rounded-md' />
            <textarea
                name='description'
                value={form.description}
                onChange={handleChange}
                placeholder='Description'
                className='w-full mb-4 p-2 border rounded-md'
            />
            <select name='status' value={form.status} onChange={handleChange} className='w-full mb-4 p-2 border rounded-md'>
                <option value='Pending'>Pending</option>
                <option value='Completed'>Completed</option>
            </select>
            <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>
                {editing ? "Update Task" : "Create Task"}
            </button>
        </form>
    );
};

export default TaskForm;
