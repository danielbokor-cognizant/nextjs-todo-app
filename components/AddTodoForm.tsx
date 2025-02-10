interface AddTodoFormProps {
    onAdd: (data: FormData) => Promise<void>;
}

export function AddTodoForm({onAdd}: AddTodoFormProps) {
    return (
        <form action={onAdd} className="flex space-x-2 mb-4">
            <input type="text" name="title" placeholder="Add New Todo" required className="flex-grow border-gray-500 border px-2 rounded" />
            <button type="submit" className="border border-gray-500 px-2 rounded">Add</button>
        </form>
    )
}