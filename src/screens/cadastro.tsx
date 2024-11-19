import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const CadastroAlunoScreen = () => {
  const [rmalu, setRmalu] = useState("");
  const [nomealu, setNomealu] = useState("");
  const [emailalu, setEmailalu] = useState("");
  const [alusenha, setAlusenha] = useState("");
  const [pontmes, setPontmes] = useState("0");
  const [pontano, setPontano] = useState("0");
  const [nometur, setNometur] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    // Verificar se todos os campos foram preenchidos
    if (
      !rmalu ||
      !nomealu ||
      !emailalu ||
      !alusenha ||
      !pontmes ||
      !pontano ||
      !nometur
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    try {
      // Enviar os dados para o backend
      const response = await axios.post(
        "http://10.67.235.235/PassaporteCulturalSite/php/cadAluno.php",
        new URLSearchParams({
          rmalu,
          nomealu,
          emailalu,
          alusenha,
          pontmes,
          pontano,
          nometur,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } } // Cabeçalho para o formato correto
      );

      console.log(response.data); // Verifique o que o backend está retornando

      // Verificar a resposta do backend
      const data = response.data;
      if (data.message) {
        Alert.alert("Sucesso", data.message);
        navigation.navigate("Login");
        
      } else if (data.error) {
        Alert.alert("Erro", data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao cadastrar aluno!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <TextInput
        placeholder="RM"
        value={rmalu}
        onChangeText={setRmalu}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Nome"
        value={nomealu}
        onChangeText={setNomealu}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={emailalu}
        onChangeText={setEmailalu}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={alusenha}
        onChangeText={setAlusenha}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Nome da Turma"
        value={nometur}
        onChangeText={setNometur}
        style={styles.input}
      />

      <Button title="Cadastrar" onPress={handleSubmit} color={'#001f3f'} />
    </View>
  );
};
const styles = StyleSheet.create({
  container:{ 
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ead8b1'
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input:{
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'rgb(196, 221, 230);'
  }
})
export default CadastroAlunoScreen;
