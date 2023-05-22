import React from 'react';
import TaskView from './TaskView';
import {Tasks} from "../domain/Task";

interface TaskListProps {
    tasks: Tasks;
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
                    <TaskView
                        key={task.id} task={task} onDelete={this.handleDelete} onToggle={this.handleToggle}
                        onEdit={this.handleEdit}
                    />
                ))}
            </div>
        );
    }
}

export default TaskList;
