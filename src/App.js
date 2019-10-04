import React, { Component } from 'react';
import {HotTable} from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      colHeaders: ['Header', 'Livros', 'LivroList','LivroCard'],
      settings: {
        columns: [
          {
            data: "header", type: "text", title: 'Heard'
          },
          {
            data: "autor", title: 'Lista'
          },
          {
            data: "Acao", title: 'LivroList', type: "text"
          },
          {
            data: "Acao", title: 'LivroCard', type: "text"
          }
        ],
        allowInsertRow: true
      }
    };

    this._submeterDados = this._submeterDados.bind(this);

    this._livro();
  }

  _livro() {
    fetch('https://swapi.co/api/people/')
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.count > 0) {
        for (let i in responseJson.results) {
          this._pegarPlaneta(responseJson.results[i]);
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  _pegarPlaneta(livro) {
    fetch(livro.homeworld)
    .then((response) => response.json())
    .then((responseJson) => {
      let dados = this.state.data;
      if (responseJson !== null) {
        dados.push({
          name: livro.name, autor: Livro.autor,
          homeplanet: responseJson.autor});
      } else {
        dados.push({
          name: livro.name, autor: pessoa.autor,
          homeplanet: 'unknow'});
      }
      this.setState({data: dados});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  _submeterDados() {
    fetch('url/da/sua/api', {
      method: 'post',
      body: JSON.stringify(this.state.data)
    })
    .then()
    .catch();
  }

  render() {
    return (
      <div className="App">
        <HotTable data={this.state.data} colHeaders={this.state.colHeaders} settings={this.state.settings} />
        <button type="button" onClick={this._submeterDados}>Salvar</button>
      </div>
    );
  }
}

export default App;