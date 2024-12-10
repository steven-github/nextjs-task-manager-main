export type TaskFormProps = {
    form: {
        title: string;
        description: string;
        status: string;
    };
    setForm: (form: { title: string; description: string; status: string }) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    editing: boolean;
};

export type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};

export type TaskListProps = {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
    onToggleStatus: (id: number) => void;
};
