import { Task } from "./types";

const mockTasks: Task[] = [
    {
        id: 1,
        title: "Buy groceries",
        description: "Milk, eggs, bread, and coffee",
        status: "Pending",
        createdAt: "2024-12-01T10:00:00Z",
        updatedAt: "2024-12-01T10:00:00Z",
    },
    {
        id: 2,
        title: "Workout",
        description: "1-hour cardio session",
        status: "Completed",
        createdAt: "2024-12-02T08:30:00Z",
        updatedAt: "2024-12-03T09:15:00Z",
    },
];

// Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...mockTasks]), 500); // Simulate network delay
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
