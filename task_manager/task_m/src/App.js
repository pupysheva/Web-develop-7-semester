import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import TableDone from './TableDone';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    state = {
        characters: [],
        donecharacters: []
    };

    getlist = () => {
        console.log("sadfsdaf");
        fetch('http://localhost:8080/api/get_needitems')
            .then(response => response.json())
            .then((jsonData) => {
                    this.setState({
                        characters: jsonData
                    });
                },
                (error) => {
                });
        fetch('http://localhost:8080/api/get_done')
            .then(response => response.json())
            .then((jsonDataa) => {
                    this.setState({
                        donecharacters: jsonDataa
                    });
                },
                (error) => {
                })
    };

    removeCharacter = index => {
        var url = 'http://localhost:8080/api/delete_needitem/' + index;
        fetch(url)
            .then(response => response.json())
            .then((jsonDataa) => {

            });
        const { characters } = this.state;
        this.setState({
            characters: characters.filter((character, i) => {
                return character.id !== index;
            })
        });
    };

    removeDoneCharacter = index => {
        const { donecharacters } = this.state;
        var url = 'http://localhost:8080/api/delete_doneitem/'+ index;
        fetch(url)
            .then(response => response.json())
            .then((jsonDataa) => {

            });
        this.setState({
            donecharacters: donecharacters.filter((donecharacter, i) => {
                return donecharacter.id !== index;
            })
        });
    };

    characterDone = (index, id, name) => {
        const { characters } = this.state;
        this.setState({donecharacters: [...this.state.donecharacters, this.state.characters[index]],
            characters: characters.filter((character, i) => {
                return character.id !== id;
            }) });
        var url = 'http://localhost:8080/api/update_doneitem/'+ name;
        fetch(url)
            .then(response => response.json())
            .then((jsonDataa) => {

            });
        this.removeCharacter(id)
    };

    handleSubmit = character => {
        var url = 'http://localhost:8080/api/update_needitem/'+ character.name;
        fetch(url)
            .then(response => response.json())
            .then((jsonDataa) => {
                this.componentDidMount()
            })

    };

    componentDidMount() {
        this.getlist();
    }

    render() {
        const { characters, donecharacters } = this.state;

        return (
            <div >
                <h1 style={{textAlign:"center"}}>Task Manager Polina</h1>
                    <div className="row">
                        <div className="col-sm">
                            <Table
                                characterData={characters}
                                removeCharacter={this.removeCharacter}
                                characterDone={this.characterDone}
                            />

                            <h3>Add New</h3>
                            <Form handleSubmit={this.handleSubmit} />
                        </div>
                        <div className="col-sm">
                            <TableDone
                                characterData={donecharacters}
                                removeCharacter={this.removeDoneCharacter}
                            />
                        </div>
                    </div>
            </div>
        );
    }
}

export default App;