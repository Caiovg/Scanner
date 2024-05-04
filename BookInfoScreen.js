import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function BookInfoScreen({ route }) {
  const { bookInfo } = route.params;
  const [titulo, setTitulo] = useState('');
  const [autores, setAutores] = useState('');
  const [editora, setEditora] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (bookInfo) {
      setTitulo(bookInfo.title || '');
      setAutores(bookInfo.authors ? bookInfo.authors.join(', ') : '');
      setEditora(bookInfo.publisher || '');
      setDescricao(bookInfo.description || '');
    }
  }, [bookInfo]);

  const handleCadastro = () => {
    // Aqui você pode adicionar a lógica para enviar os dados para serem cadastrados
    // Por exemplo, fazer uma requisição para uma API de cadastro
    console.log('Título:', titulo);
    console.log('Autor(es):', autores);
    console.log('Editora:', editora);
    console.log('Descrição:', descricao);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Insira o título"
      />
      <Text style={styles.label}>Autor(es):</Text>
      <TextInput
        style={styles.input}
        value={autores}
        onChangeText={setAutores}
        placeholder="Insira o(s) autor(es)"
      />
      <Text style={styles.label}>Editora:</Text>
      <TextInput
        style={styles.input}
        value={editora}
        onChangeText={setEditora}
        placeholder="Insira a editora"
      />
      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Insira a descrição"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
