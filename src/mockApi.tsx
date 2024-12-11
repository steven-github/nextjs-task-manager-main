import { Task } from "./types";
import mockTasksData from "./mockTasks.json"; // Import the JSON file

// Use the imported data instead of hardcoded tasks
const mockTasks: Task[] = mockTasksData;

// Fetch all tasks
export const fetchTasks1 = async (): Promise<Task[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...mockTasks]), 500); // Simulate network delay
    });
};

// Fetch tasks with pagination
export const fetchTasks = async (page: number = 1, limit: number = 5): Promise<Task[]> => {
    return new Promise((resolve) => {
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedTasks = mockTasks.slice(start, end);
        setTimeout(() => resolve([...paginatedTasks]), 500); // Simulate network delay
    });
};

// Create a new task
export const createTask = async (task: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task> => {
    return new Promise((resolve) => {
        const newTask: Task = {
            ...task,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        mockTasks.push(newTask);
        setTimeout(() => resolve(newTask), 500);
    });
};

// Update an existing task
export const updateTask = async (id: number, updatedData: Partial<Task>): Promise<Task> => {
    return new Promise((resolve, reject) => {
        const index = mockTasks.findIndex((task) => task.id === id);
        if (index !== -1) {
            mockTasks[index] = {
                ...mockTasks[index],
                ...updatedData,
                updatedAt: new Date().toISOString(),
            };
            setTimeout(() => resolve(mockTasks[index]), 500);
        } else {
            reject(new Error("Task not found"));
        }
    });
};

// Delete a task
export const deleteTask = async (id: number): Promise<{ success: boolean }> => {
    return new Promise((resolve, reject) => {
        const index = mockTasks.findIndex((task) => task.id === id);
        if (index !== -1) {
            mockTasks.splice(index, 1);
            setTimeout(() => resolve({ success: true }), 500);
        } else {
            reject(new Error("Task not found"));
        }
    });
};

// Toggle the status of a task
export const toggleTaskStatus = async (id: number): Promise<Task> => {
    return new Promise((resolve, reject) => {
        const index = mockTasks.findIndex((task) => task.id === id);
        if (index !== -1) {
            mockTasks[index].status = mockTasks[index].status === "Pending" ? "Completed" : "Pending";
            mockTasks[index].updatedAt = new Date().toISOString();
            setTimeout(() => resolve(mockTasks[index]), 500);
        } else {
            reject(new Error("Task not found"));
        }
    });
};
