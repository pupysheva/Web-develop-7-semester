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
};

const TableBody = props => {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={row.id}>
                <td>{row.name}</td>
                <td>
                    <button className={"btn btn-danger btn-sm"} onClick={() => props.removeCharacter(row.id, row.name)}>Delete</button>

                </td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
};

class TableDone extends Component {
    render() {
        const { characterData, removeCharacter } = this.props;

        return (
            <table>
                <TableHeader />
                <TableBody characterData={characterData} removeCharacter={removeCharacter} />
            </table>
        );
    }
}

export default TableDone;