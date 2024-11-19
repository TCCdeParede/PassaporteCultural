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
            source={require("../../assets/DefaultUserIcon.png")}
            style={styles.profileImage}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.turma}>Turma: {user.turma}</Text>
            <Text style={styles.pontos}>Pontos: {user.pontos}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ead8b1"
  },
  profileImage: {
    width: 210,
    height: 210,
    borderRadius: 150,
    marginBottom: 20,
    
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffff"
  },
  turma: {
    fontSize: 25,
    color: "rgb(196, 221, 230);",
    marginTop: 10,
  },
  pontos: {
    fontSize: 25,
    color: "rgb(196, 221, 230);",
    marginBottom: 20,
    marginTop: 10,
  },
  info: {
    backgroundColor: "#001f3f",
    width: 350,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 10,
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
  },
  SairButtonText: {
    color: "#FFF",
    textAlign: "center",
  },
});

export default PerfilScreen;
