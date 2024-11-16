import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import axios from 'axios';

const CadastroAlunoScreen = () => {
  const [rmalu, setRmalu] = useState('');
  const [nomealu, setNomealu] = useState('');
  const [emailalu, setEmailalu] = useState('');
  const [alusenha, setAlusenha] = useState('');
  const [pontmes, setPontmes] = useState('0');
  const [pontano, setPontano] = useState('0');
  const [nometur, setNometur] = useState('');
  

  const handleSubmit = async () => {
    // Verificar se todos os campos foram preenchidos
    if (!rmalu || !nomealu || !emailalu || !alusenha || !pontmes || !pontano || !nometur) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    try {
      // Enviar os dados para o backend
      const response = await axios.post(
        'http://192.168.0.9/PassaporteCulturalSite-main/PassportCultural/php/cadAluno.php',
        new URLSearchParams({
          rmalu,
          nomealu,
          emailalu,
          pontmes,
          pontano,
          alusenha,
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } } // Cabeçalho para o formato correto
      );

      console.log(response.data); // Verifique o que o backend está retornando

      // Verificar a resposta do backend
      const data = response.data;
      if (data.message) {
        Alert.alert('Sucesso', data.message);
      } else if (data.error) {
        Alert.alert('Erro', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao cadastrar aluno!');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput
        placeholder="RM"
        value={rmalu}
        onChangeText={setRmalu}
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Nome"
        value={nomealu}
        onChangeText={setNomealu}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Email"
        value={emailalu}
        onChangeText={setEmailalu}
        keyboardType="email-address"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Senha"
        value={alusenha}
        onChangeText={setAlusenha}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Nome da Turma"
        value={nometur}
        onChangeText={setNometur}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
};

export default CadastroAlunoScreen;