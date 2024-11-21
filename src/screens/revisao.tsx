import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert, StyleSheet } from "react-native";
import { useUser } from "../UserContext"; // Importando o contexto

const Revisao = () => {
  const { user } = useUser(); // Pegando o usuário logado
  const [visitas, setVisitas] = useState<any[]>([]); // Usando any[] para permitir qualquer formato de dado

  const fetchVisitas = async () => {
    if (!user) return; // Verifica se há um usuário logado

    try {
      const response = await fetch(
        `http://192.168.1.104/PassaporteCulturalSite/php/revisar_visitas.php?rmalu=${user.rm}` // Passando o rmalu como parâmetro
      );
      const data = await response.json();
      if (data.status === "sucesso") {
        setVisitas(data.data);
      } else {
        Alert.alert("Erro", "Não foi possível carregar as visitas.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro de conexão com o servidor.");
    }
  };

  useEffect(() => {
    fetchVisitas();
  }, [user]); // Atualiza as visitas sempre que o usuário logado mudar

  // Definindo o tipo do parâmetro 'dateString' como string
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <Text>Local: {item.local}</Text>
      <Text>Data: {formatDate(item.data)}</Text>

      {/* Exibe o estado da visita */}
      <Text style={styles.status}>Status: {item.rev}</Text>

      {/* Condicional para exibir o motivo se o estado for 'Não Aceito' */}
      {item.rev === "Não aceito" && item.motivo && (
        <Text style={styles.motivo}>Motivo: {item.motivo}</Text>
      )}

      {/* Condicional para exibir os pontos se o estado for 'Aceito' */}
      {item.rev === "Aceito" && item.pontos && (
        <Text style={styles.pontos}>Pontos: {item.pontos}</Text>
      )}
    </View>
  );

  return (
    <FlatList
      data={visitas}
      renderItem={renderItem}
      keyExtractor={(item) => item.idfoto.toString()}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  status: {
    marginTop: 10,
    fontWeight: "bold",
  },
  motivo: { color: "red", marginTop: 10 },
  pontos: { color: "green", marginTop: 10 },
});

export default Revisao;
