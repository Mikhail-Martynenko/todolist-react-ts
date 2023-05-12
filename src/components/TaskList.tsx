import React from 'react';
import Task from './Task';

interface TaskListProps {
    tasks: {
        id: number;
        title: string;
        isComplete: boolean;
    }[];
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onEdit: (id: number) => void;
}

class TaskList extends React.Component<TaskListProps> {
    handleDelete = (id: number) => {
        this.props.onDelete(id);
    };

    handleToggle = (id: number) => {
        this.props.onToggle(id);
    };
    handleEdit = (id: number) => {
        this.props.onEdit(id);
    };

    render() {
        const {tasks} = this.props;

        return (
            <div className="task-list">
                {tasks.map(task => (
                    <Task
                        key={task.id} task={task} onDelete={this.handleDelete} onToggle={this.handleToggle}
                        onEdit={this.handleEdit}
                    />
                ))}
            </div>
        );
    }
}

export default TaskList;
