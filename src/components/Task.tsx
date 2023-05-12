import React from 'react';

interface TaskProps {
    task: {
        id: number;
        title: string;
        isComplete: boolean;
    };
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onEdit: (id: number) => void;
}

class Task extends React.Component<TaskProps> {
    constructor(props: TaskProps) {
        super(props);
    }

    handleDeleteClick = () => {
        this.props.onDelete(this.props.task.id);
    };

    handleToggleClick = () => {
        this.props.onToggle(this.props.task.id);
    };

    handleEdit = () => {
        this.props.onEdit(this.props.task.id);
    };

    render() {
        const {task} = this.props;

        return (
            <div className='task'>
                <span>{task.id}</span>
                <input type="checkbox" checked={task.isComplete} onChange={this.handleToggleClick} />
                <span style={{textDecoration: task.isComplete ? 'line-through' : 'none'}}>{task.title}</span>
                <button onClick={this.handleDeleteClick}>Delete</button>
                <button onClick={this.handleEdit}>Edit</button>
            </div>
        );
    }
}

export default Task;
