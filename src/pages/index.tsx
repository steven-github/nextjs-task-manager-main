import { createTask, deleteTask, fetchTasks, toggleTaskStatus, updateTask } from "../mockApi";
import { useEffect, useState } from "react";

import { Task } from "@/types";

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]); // State for tasks
    const [form, setForm] = useState({ title: "", description: "", status: "Pending" }); // State for form
    const [formErrors, setFormErrors] = useState({ title: "", description: "" }); // State for form validation errors
    const [editingTask, setEditingTask] = useState<Task | null>(null); // State for editing
    const [page, setPage] = useState(1); // Current page for pagination
    const [hasMore, setHasMore] = useState(true); // Tracks if there are more tasks to load
    const [filterStatus, setFilterStatus] = useState<string>("All"); // Status filter
    const TASKS_PER_PAGE = 5; // Number of tasks to load per page

    // Fetch tasks on component mount and when page changes
    useEffect(() => {
        loadTasks(page);
    }, [page]);

    // Function to load tasks for the given page
    const loadTasks = async (pageNumber: number) => {
        try {
            const newTasks = await fetchTasks(pageNumber, TASKS_PER_PAGE);
            setTasks((prev) => [...prev, ...newTasks]);
            if (newTasks.length < TASKS_PER_PAGE) {
                setHasMore(false); // No more tasks to load
            }
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        // Reset error when user types
        setFormErrors({ ...formErrors, [name]: "" });
    };

    // Form Validation Logic
    const validateForm = () => {
        const errors: Partial<typeof formErrors> = {}; // Use Partial to allow optional keys
        if (!form.title.trim()) {
            errors.title = "Title is required.";
        }
        if (form.description.trim().length < 5) {
            errors.description = "Description must be at least 5 characters long.";
        }
        setFormErrors({ title: errors.title || "", description: errors.description || "" });
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) return;

        if (editingTask) {
            // Update task
            const updatedTask = await updateTask(editingTask.id, form);
            setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
            setEditingTask(null);
        } else {
            // Create new task
            const newTask = await createTask(form);
            setTasks((prev) => [newTask, ...prev]); // Prepend new task to the top
        }
        setForm({ title: "", description: "", status: "Pending" });
    };

    // Handle edit action
    const handleEdit = (task: Task) => {
        setForm({
            title: task.title,
            description: task.description,
            status: task.status,
        });
        setEditingTask(task);
    };

    // Handle delete action
    const handleDelete = async (id: number) => {
        await deleteTask(id);
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    // Handle toggle status action
    const handleToggleStatus = async (id: number) => {
        const updatedTask = await toggleTaskStatus(id);
        setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    };

    // Handle "Load More" button click
    const loadMoreTasks = () => {
        setPage((prev) => prev + 1);
    };

    // Infinite Scroll: Automatically load more tasks when the user scrolls to the bottom
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasMore) {
                setPage((prev) => prev + 1);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore]);

    // Filter tasks based on selected status
    const filteredTasks = filterStatus === "All" ? tasks : tasks.filter((task) => task.status === filterStatus);

    // Handle filter change
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(e.target.value);
    };

    return (
        <div className='min-h-screen bg-gray-100 p-4'>
            <h1 className='text-3xl font-bold text-center mb-6'>Task Manager</h1>

            {/* Task Form */}
            <form onSubmit={handleSubmit} className='bg-white p-4 shadow-md rounded-md mb-6'>
                <input
                    name='title'
                    value={form.title}
                    onChange={handleInputChange}
                    placeholder='Title'
                    className={`w-full mb-2 p-2 border rounded-md ${formErrors.title ? "border-red-500" : "border-gray-300"}`}
                />
                {formErrors.title && <p className='text-red-500 text-sm mb-2'>{formErrors.title}</p>}

                <textarea
                    name='description'
                    value={form.description}
                    onChange={handleInputChange}
                    placeholder='Description'
                    className={`w-full mb-2 p-2 border rounded-md ${formErrors.description ? "border-red-500" : "border-gray-300"}`}
                />
                {formErrors.description && <p className='text-red-500 text-sm mb-2'>{formErrors.description}</p>}

                <select name='status' value={form.status} onChange={handleInputChange} className='w-full mb-4 p-2 border rounded-md'>
                    <option value='Pending'>Pending</option>
                    <option value='Completed'>Completed</option>
                </select>

                <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>
                    {editingTask ? "Update Task" : "Create Task"}
                </button>
            </form>

            {/* Filter Dropdown */}
            <div className='mb-4'>
                <label htmlFor='status-filter' className='block font-bold mb-2'>
                    Filter by Status
                </label>
                <select id='status-filter' value={filterStatus} onChange={handleFilterChange} className='w-full p-2 border rounded-md'>
                    <option value='All'>All</option>
                    <option value='Pending'>Pending</option>
                    <option value='Completed'>Completed</option>
                </select>
            </div>

            {/* Task List */}
            <ul className='space-y-4'>
                {filteredTasks.map((task) => (
                    <li key={task.id} className='bg-white p-4 shadow-md rounded-md flex items-center justify-between'>
                        <div>
                            <h2 className='text-lg font-bold'>{task.title}</h2>
                            <p>{task.description}</p>
                            <p className='text-sm text-gray-500'>Status: {task.status}</p>
                        </div>
                        <div className='flex space-x-2'>
                            <button onClick={() => handleEdit(task)} className='bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600'>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(task.id)} className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'>
                                Delete
                            </button>
                            <button
                                onClick={() => handleToggleStatus(task.id)}
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

            {hasMore && (
                <button onClick={loadMoreTasks} className='w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600'>
                    Load More
                </button>
            )}
        </div>
    );
}
