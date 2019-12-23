import React, { Component } from 'react';

const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Task</th>
            <th></th>
        </tr>
        </thead>
    );
}

const TableBody = props => {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={row.id}>
                <td>{row.name}</td>
                <td>
                    <button className={"btn btn-danger btn-sm"} onClick={() => props.removeCharacter(row.id)}>Delete</button>
                    <button className={"btn btn-success btn-sm"} onClick={() => props.characterDone(index, row.id, row.name)}>Done</button>

                </td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

class Table extends Component {
    render() {
        const { characterData, removeCharacter, characterDone } = this.props;

        return (
            <table>
                <TableHeader />
                <TableBody characterData={characterData} removeCharacter={removeCharacter} characterDone={characterDone}  />
            </table>
        );
    }
}

export default Table;