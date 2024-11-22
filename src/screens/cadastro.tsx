import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const CadastroAlunoScreen = () => {
  const [rmalu, setRmalu] = useState("");
  const [nomealu, setNomealu] = useState("");
  const [emailalu, setEmailalu] = useState("");
  const [alusenha, setAlusenha] = useState("");
  const [pontmes, setPontmes] = useState("0");
  const [pontano, setPontano] = useState("0");
  const [nometur, setNometur] = useState(""); // Agora será uma string selecionada do Picker
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
      !nometur // Verificando se a turma foi selecionada
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    try {
      // Enviar os dados para o backend
      const response = await axios.post(
        "http://192.168.0.106/PassaporteCulturalSite/php/cadAluno.php",
        new URLSearchParams({
          rmalu,
          nomealu,
          emailalu,
          alusenha,
          pontmes,
          pontano,
          nometur, // Passando o valor da turma selecionada
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

      <Text style={styles.label}>Selecione a Turma</Text>
      <Picker
        selectedValue={nometur}
        onValueChange={setNometur}
        style={styles.input}
      >
        <Picker.Item label="3DSA" value="3DSA" />
        <Picker.Item label="3DSB" value="3DSB" />
        <Picker.Item label="3EAA" value="3EAA" />
        <Picker.Item label="3EAB" value="3EAB" />
        <Picker.Item label="2DSA" value="2DSA" />
        <Picker.Item label="2DSB" value="2DSB" />
        <Picker.Item label="2EAA" value="2EAA" />
        <Picker.Item label="2EAB" value="2EAB" />
        <Picker.Item label="1DSA" value="1DSA" />
        <Picker.Item label="1DSB" value="1DSB" />
        <Picker.Item label="1EAA" value="1EAA" />
        <Picker.Item label="1EAB" value="1EAB" />
      </Picker>

      <Button title="Cadastrar" onPress={handleSubmit} color={"#001f3f"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ead8b1",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "rgb(196, 221, 230)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default CadastroAlunoScreen;
