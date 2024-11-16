import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  async function handleLogin() {
    const data = new FormData();
    data.append('email', email);
    data.append('senha', password);

    try {
      const response = await fetch('http://192.168.0.9/PassaporteCulturalSite-main/PassportCultural/php/loginAluno.php', {
        method: 'POST',
        body: data,
      });
      const responseData = await response.json();
      
      if (responseData.status === 'success') {
        // Redirecionar para a tela principal
        navigation.navigate('TabRoutes');
      } else {
        // Mostrar erro
        Alert.alert('Erro', responseData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao tentar conectar com o servidor');
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
      <TouchableOpacity style={styles.CadText} onPress={() => navigation.navigate('Cadastro')}>
        <Text>Primeira vez? Clique aqui para se cadastrar</Text>
      </TouchableOpacity>
      <Button title="Entrar" onPress={handleLogin} color={'#402E7A'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  CadText: {
    justifyContent: 'center',
    marginLeft: 25,
    marginBottom: 20
  }
});
