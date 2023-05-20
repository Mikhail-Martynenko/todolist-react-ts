import React from 'react';
import TaskList from './components/TaskList';
import './App.css'
import FieldEdit from "./components/FieldEdit";

const URL_PATH: string = `https://jsonplaceholder.typicode.com/posts/`

interface AppState {
    tasks: {
        id: number;
        title: string;
        isComplete: boolean;
    }[];
    editingTaskId: number | null;
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tasks: [],
            editingTaskId: null,
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch(URL_PATH);
            if (response.ok) {
                const tasks = await response.json();
                console.log('Запрос прошёл успешно!')
                // this.setState(() => ({
                //     tasks: [...tasks.slice(0, 5)]
                // }));
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleAddTask = async (title: string) => {
        const {tasks} = this.state;
        const newTask = {
            id: tasks.length + 1,
            title,
            isComplete: false
        };
        this.setState((prevState) => ({tasks: [...prevState.tasks, newTask]}));

        try {
            const response = await fetch(URL_PATH, {
                method: 'POST',
                body: JSON.stringify({
                    userId: 1,
                    title,
                    isComplete: false
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            console.log(response, 'POST response')
        } catch (error) {
            console.log(error)
        }
    };

    handleDeleteTask = async (id: number) => {
        try {
            const response = await fetch(`${URL_PATH}${id}`, {
                method: 'DELETE',
            });
            console.log(response, 'DELETE')
        } catch (error) {
            console.log(error)
        }

        this.setState(prevState => ({
            tasks: prevState.tasks.filter(task => task.id !== id).map((task, index) => ({...task, id: index + 1}))
        }));
    };


    handleToggleTask = async (id: number) => {
        try {
            const response = await fetch(`${URL_PATH}${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: id,
                    title: 'foo',
                    completed: true,
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            console.log(response, "PUT handleToggleTask")
        } catch (error) {
            console.log(error)
        }
        this.setState((prevState) => ({
            tasks: prevState.tasks.map(task => task.id === id ? {...task, isComplete: !task.isComplete} : task)
        }));
    };

    handleToggleAll = async () => {
        const {tasks} = this.state;
        const allComplete = tasks.every(task => task.isComplete);

        this.setState((prevState) => ({
            tasks: prevState.tasks.map(task => ({
                        ...task,
                        isComplete: !allComplete
                    }
                )
            )
        }));
        try {
            const response = await fetch(URL_PATH, {
                method: 'PUT',
                body: JSON.stringify({
                    completed: !allComplete,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            console.log(response, 'PUT handleToggleAll');
        } catch (error) {
            console.log(error);
        }
    };

    handleDeleteCompleted = () => {
        this.setState(prevState => {
            const remainingTasks = prevState.tasks.filter(task => !task.isComplete);
            return {
                tasks: remainingTasks.map((task, index) => ({...task, id: index + 1})),
            };
        });
    };

    addTaskEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        const {value} = e.currentTarget;

        if (e.key === 'Enter' && value.trim() !== '') {
            this.handleAddTask(value.trim());
            e.currentTarget.value = '';
        }
    };

    handleCancelEdit = () => {
        this.setState(() => ({
            editingTaskId: null
        }));
    };

    handleEditClick = (taskId: number) => {
        this.setState({editingTaskId: taskId});
    };
    handleSave = (id: number | null, updatedTask: { title: string; isComplete?: boolean }) => {
        const {tasks} = this.state;
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    title: updatedTask.title,
                    isComplete: updatedTask.isComplete !== undefined ? updatedTask.isComplete : task.isComplete,
                };
            }
            return task;
        });

        this.setState({tasks: updatedTasks});
    };


    render() {
        const {tasks, editingTaskId} = this.state;

        return (
            <div className='App'>
                <h1>Task List</h1>
                <input type="text" placeholder="Enter task name" onKeyDown={this.addTaskEnter} />
                <TaskList
                    tasks={tasks} onDelete={this.handleDeleteTask} onToggle={this.handleToggleTask}
                    onEdit={this.handleEditClick}
                />
                {editingTaskId !== null && (
                    <FieldEdit
                        tasks={tasks}
                        editingTaskId={editingTaskId}
                        handleCancelEdit={this.handleCancelEdit}
                        handleSave={this.handleSave}
                    />
                )}
                <button onClick={this.handleToggleAll}>Toggle All</button>
                <button onClick={this.handleDeleteCompleted}>Delete Completed</button>
            </div>
        );
    }
}

export default App;
