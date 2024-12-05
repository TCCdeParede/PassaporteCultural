import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useUser } from "../UserContext";

const PerfilScreen = ({ navigation }: any) => {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Image
            source={
              userData.foto
                ? {
                    uri: `http://192.168.1.104/PassaporteCulturalSite/${userData.foto.replace(
                      "../",
                      ""
                    )}`,
                  }
                : require("../../assets/DefaultUserIcon.png")
            }
            style={styles.profileImage}
          />

          <View style={styles.info}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.turma}>Turma: {user.turma}</Text>
            <Text style={styles.pontos}>Pontos: {user.pontos}</Text>
          </View>
        </>
      ) : (
        <Text style={[styles.loadingText, isDarkMode && styles.darkText]}>Carregando...</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
    borderRadius: 105,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  info: {
    width: 300,
    height: 200,
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
    fontSize: 25,
    color: "rgb(196, 221, 230);",
    marginBottom: 20,
    marginTop: 10,
  },
  info: {
    backgroundColor: "#001f3f",
    width: 300,
    height: 200,
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
  },
  darkButton: {
    backgroundColor: "#555",
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
