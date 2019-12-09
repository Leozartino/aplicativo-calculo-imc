import React, {Component} from 'react';

import {View, TextInput, Text, TouchableOpacity} from 'react-native';

import styles from './styles';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    peso: '',
    altura: '',
    showResult: false,
    grauDeObesidade: '',
    imc: '',
    classificacao: '',
  };

  // As functions tradicionais "tratam" o this de uma forma diferente,
  // nesse caso, no método onSubmit() em this.state.peso ela não enxerga o componente maior
  // que está acima do button, e sim o componente mais interno, logo nesse caso não irá ser definido.

  //Por isso utiliza-se as arrow functions () => {}, o this se refere ao componente em si, o App;

  onSubmit = () => {
    if (!this.state.peso || !this.state.altura) {
      return;
    }
    let peso = 0;
    if (this.state.peso) {
      peso = parseFloat(this.state.peso);
    }
    let altura = 0;
    if (this.state.altura) {
      altura = parseFloat(this.state.altura);
    }

    const imc = peso / (altura * altura);
    const classificacao = this.getClassificacao(imc);
    const grauDeObesidade = this.getGrauObesidade(imc);

    this.setState({
      showResult: true,
      imc: imc.toFixed(2),
      classificacao: classificacao,
      grauDeObesidade: grauDeObesidade,
    });
  };

  getClassificacao = imc => {
    if (imc < 18.5) {
      return 'Magreza';
    } else if (imc >= 18.5 && imc <= 24.9) {
      return 'Normal';
    } else if (imc >= 25 && imc <= 29.9) {
      return 'Sobrepeso';
    } else if (imc >= 30 && imc <= 39.9) {
      return 'Obesiade';
    } else {
      return 'Obesidade grave!';
    }
  };
  getGrauObesidade = imc => {
    if (imc < 18.5) {
      return '0';
    } else if (imc >= 18.5 && imc <= 24.9) {
      return '0';
    } else if (imc >= 25 && imc <= 29.9) {
      return 'I';
    } else if (imc >= 30 && imc <= 39.9) {
      return 'II';
    } else {
      return 'III';
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Altura</Text>
          <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            placeholder="Altura (ex.: 1.70)"
            onChangeText={altura => this.setState({altura})}
            value={this.state.altura}
          />
          <Text style={styles.label}>Peso</Text>
          <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            placeholder="Peso (ex.: 70kg)"
            onChangeText={peso => this.setState({peso})}
            value={this.state.peso}
          />
          <TouchableOpacity onPress={this.onSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
        </View>
        {this.state.showResult && (
          <View>
            <Text style={styles.resultTitle}>IMC: {this.state.imc}</Text>
            <Text style={styles.resultDescription}>
              Classificação: {this.state.classificacao}
            </Text>
            <Text style={styles.resultDescription}>
              Grau de Obesidade: {this.state.grauDeObesidade}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
