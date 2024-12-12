import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useUser } from "../UserContext";
import { ThemeContext } from "../../App";
import { useFocusEffect } from "@react-navigation/native";

const PerfilScreen = ({ navigation }: any) => {
  const { user } = useUser(); // Obtendo o usuário logado
  const { theme } = useContext(ThemeContext); // Obtém o tema atual
  const isDarkMode = theme === "dark";

  // Estado local para armazenar dados do usuário
  const [userData, setUserData] = useState<any>(null);

  // Função para carregar os dados do usuário
  const loadUserData = useCallback(() => {
    if (user) {
      setUserData(user); // Atualiza os dados do estado com o contexto atual do usuário
    }
  }, [user]);

  // Atualiza os dados do usuário sempre que a tela entra em foco
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [loadUserData])
  );

  // Atualiza os dados do usuário quando o contexto muda, mesmo em segundo plano
  useEffect(() => {
    loadUserData();
  }, [user, loadUserData]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      {userData ? (
        <>
          {/* Exibe a imagem de perfil ou um ícone padrão */}
          <Image
            source={
              userData.foto
                ? {
                    uri: `http://passaportecultural.rf.gd/${userData.foto.replace(
                      "../",
                      ""
                    )}`, // Remove '../' do caminho
                  }
                : require("../../assets/DefaultUserIcon.png") // Ícone padrão caso não tenha foto
            }
            style={styles.profileImage}
          />

          <View style={[styles.info, isDarkMode && styles.darkInfo]}>
            <Text style={[styles.name, isDarkMode && styles.darkText]}>
              {userData.name}
            </Text>
            <Text style={[styles.turma, isDarkMode && styles.darkText]}>
              Turma: {userData.turma}
            </Text>
            <Text style={[styles.pontos, isDarkMode && styles.darkText]}>
              Pontos Mensais Gerais: {userData.pontMesGeral}
            </Text>
            <Text style={[styles.pontos, isDarkMode && styles.darkText]}>
              Pontos Anuais Gerais: {userData.pontAnoGeral}
            </Text>
            <Text style={[styles.pontos, isDarkMode && styles.darkText]}>
              Pontos Mensais Computados: {userData.pontMesComputado}
            </Text>
            <Text style={[styles.pontos, isDarkMode && styles.darkText]}>
              Pontos Anuais Computados: {userData.pontAnoComputado}
            </Text>
          </View>
        </>
      ) : (
        <Text style={[styles.loadingText, isDarkMode && styles.darkText]}>
          Carregando...
        </Text>
      )}

      <TouchableOpacity
        style={[styles.EditarButton, isDarkMode && styles.darkButton]}
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
  },
  lightContainer: {
    backgroundColor: "#ead8b1",
  },
  darkContainer: {
    backgroundColor: "#001529",
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
  info: {
    width: 350,
    height: 350,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 10,
    backgroundColor: "#001f3f",
  },
  darkInfo: {
    backgroundColor: "#333",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  turma: {
    fontSize: 25,
    color: "rgb(196, 221, 230)",
    marginTop: 10,
    textAlign: "center",
  },
  pontos: {
    fontSize: 20,
    color: "rgb(196, 221, 230)",
    marginBottom: 10,
    marginTop: 5,
    textAlign: "center",
  },
  darkButton: {
    backgroundColor: "#555",
  },
  EditarButton: {
    backgroundColor: "#001f3f",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginTop: 20,
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
  loadingText: {
    fontSize: 18,
    color: "#000",
  },
  darkText: {
    color: "#FFF",
  },
});

export default PerfilScreen;
