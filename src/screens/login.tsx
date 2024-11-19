import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../UserContext"; // Importe o contexto

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { setUser } = useUser(); // Acesse o contexto para salvar os dados do usuário

  async function handleLogin() {
    const data = new FormData();
    data.append("email", email);
    data.append("senha", password);

    try {
      const response = await fetch(
        "http://192.168.1.101/PassaporteCulturalSite/php/loginAluno.php",
        {
          method: "POST",
          body: data,
        }
      );

      const text = await response.text(); // Obter como texto primeiro
      try {
        const responseData = JSON.parse(text); // Tentar converter para JSON

        if (responseData.status === "success") {
          setUser({
            name: responseData.nome,
            turma: responseData.turma,
            pontos: responseData.pontos,
            rm: responseData.rm, // Garantir que o rm está sendo setado corretamente
          });

          // Redirecionar para a tela principal
          navigation.navigate("TabRoutes");
        } else {
          Alert.alert("Erro", responseData.message);
        }
      } catch (error) {
        console.error("Erro ao processar JSON:", text); // Logar a resposta para debug
        Alert.alert("Erro", "Resposta inesperada do servidor.");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      Alert.alert("Erro", "Erro ao tentar conectar com o servidor.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.CadText}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text>Primeira vez? Clique aqui para se cadastrar</Text>
      </TouchableOpacity>
      <Button title="Entrar" onPress={handleLogin} color={"#402E7A"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  CadText: {
    justifyContent: "center",
    marginLeft: 25,
    marginBottom: 20,
  },
});
