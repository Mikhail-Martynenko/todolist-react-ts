import React from "react";
import {Tasks} from "../domain/Task";

interface FieldEditProps {
    tasks: Tasks;
    editingTaskId: number | null;
    handleCancelEdit: () => void;
    handleSave: (id: number | null, updatedTask: { title: string; isComplete?: boolean }) => void;
}

interface FieldEditState {
    inputValue: string;
}

export default class FieldEdit extends React.Component<FieldEditProps, FieldEditState> {
    constructor(props: FieldEditProps) {
        super(props);
        this.state = {
            inputValue: this.props.tasks.find(task => task.id === this.props.editingTaskId)?.title || '',
        };
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({inputValue: e.target.value});
    };

    handleSaveClick = () => {
        const {tasks, editingTaskId, handleSave} = this.props;
        const updatedTask = {
            ...tasks.find(task => task.id === editingTaskId),
            title: this.state.inputValue,
        };
        handleSave(editingTaskId, updatedTask);
    };

    render() {
        const {inputValue} = this.state;
        const {handleCancelEdit} = this.props;

        return (
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={this.handleInputChange}
                />
                <button onClick={handleCancelEdit}>Cancel</button>
                <button onClick={this.handleSaveClick}>Save</button>
            </div>
        );
    }
}
