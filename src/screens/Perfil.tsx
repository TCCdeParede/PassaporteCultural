import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useUser } from "../UserContext";
import { useFocusEffect } from "@react-navigation/native";

const PerfilScreen = ({ navigation }: any) => {
  const { user } = useUser(); // Obtendo o usuário logado

  // Estado local para armazenar dados do usuário
  const [userData, setUserData] = useState<any>(null);

  // Função para carregar os dados do usuário
  const loadUserData = () => {
    if (user) {
      setUserData(user); // Carrega os dados do usuário
    }
  };

  // Atualiza os dados sempre que a tela ganhar foco
  useFocusEffect(
    React.useCallback(() => {
      loadUserData(); // Carrega os dados sempre que a tela ganhar foco
    }, [user]) // Recarrega os dados sempre que o usuário mudar
  );

  // Atualiza os dados ao montar o componente
  useEffect(() => {
    loadUserData(); // Carrega os dados do usuário na montagem do componente
  }, [user]); // Isso garante que o componente será atualizado quando o usuário mudar

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userData ? (
        <>
          {/* Exibe a imagem de perfil ou um ícone padrão */}
          <Image
            source={
              userData.foto
                ? {
                    uri: `http://192.168.1.104/PassaporteCulturalSite/${userData.foto.replace(
                      "../",
                      ""
                    )}`, // Remove '../' do caminho
                  }
                : require("../../assets/DefaultUserIcon.png") // Ícone padrão caso não tenha foto
            }
            style={styles.profileImage}
          />

          <View style={styles.info}>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.turma}>Turma: {userData.turma}</Text>
            <Text style={styles.pontos}>
              Pontos Mensais Gerais: {userData.pontMesGeral}
            </Text>
            <Text style={styles.pontos}>
              Pontos Anuais Gerais: {userData.pontAnoGeral}
            </Text>
            <Text style={styles.pontos}>
              Pontos Mensais Computados: {userData.pontMesComputado}
            </Text>
            <Text style={styles.pontos}>
              Pontos Anuais Computados: {userData.pontAnoComputado}
            </Text>
          </View>
        </>
      ) : (
        <Text>Carregando...</Text>
      )}

      <TouchableOpacity
        style={styles.EditarButton}
        onPress={() => navigation.navigate("EditarPerfil")}
      >
        <Text style={styles.EditarButtonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.SairButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.SairButtonText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ead8b1",
    // Removido o flexGrow: 1, pois o ScrollView já lida com a rolagem
  },
  profileImage: {
    width: 210,
    height: 210,
    borderRadius: 105, // Para fazer um círculo perfeito
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  turma: {
    fontSize: 25,
    color: "rgb(196, 221, 230);",
    marginTop: 10,
    textAlign: "center",
  },
  pontos: {
    fontSize: 20,
    color: "rgb(196, 221, 230);",
    marginBottom: 10,
    marginTop: 5,
    textAlign: "center",
  },
  info: {
    backgroundColor: "#001f3f",
    width: 300,
    padding: 20, // Adicionando padding para o conteúdo
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  EditarButton: {
    backgroundColor: "#001f3f",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  EditarButtonText: {
    color: "#FFF",
    textAlign: "center",
  },
  SairButton: {
    backgroundColor: "#9B111E",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginTop: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  SairButtonText: {
    color: "#FFF",
    textAlign: "center",
  },
});

export default PerfilScreen;
