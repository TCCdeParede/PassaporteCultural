import React, { useState } from "react";
import { View, Text, FlatList, Alert, StyleSheet } from "react-native";
import { useUser } from "../UserContext"; // Importando o contexto
import { useFocusEffect } from "@react-navigation/native";

const Revisao = () => {
  const { user } = useUser(); // Pegando o usuário logado
  const [visitas, setVisitas] = useState<any[]>([]); // Usando any[] para permitir qualquer formato de dado

  const fetchVisitas = async () => {
    if (!user) return; // Verifica se há um usuário logado

    try {
      const response = await fetch(
        `http:///PassaporteCulturalSite/php/revisar_visitas.php?rmalu=${user.rm}` // Passando o rmalu como parâmetro
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

  // Atualiza os dados sempre que a tela ganha foco
  useFocusEffect(
    React.useCallback(() => {
      fetchVisitas(); // Chama a função para atualizar os dados
    }, [user])
  );

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
    <View style={styles.container}>
      {visitas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>Ainda não há visitas registradas.</Text>
        </View>
      ) : (
        <FlatList
          data={visitas}
          renderItem={renderItem}
          keyExtractor={(item) => item.idfoto.toString()}
          contentContainerStyle={styles.listContent} // Adicionado para garantir padding na lista
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Certifica-se de que ocupa a tela inteira
    backgroundColor: "#ead8b1", // Cor de fundo
  },
  emptyContainer: {
    flex: 1, // Faz o container ocupar toda a altura disponível
    justifyContent: "center", // Centraliza verticalmente a mensagem
    alignItems: "center", // Centraliza horizontalmente a mensagem
  },
  listContent: {
    padding: 15, // Adicionado padding para espaçamento interno da lista
    marginTop: 30, // Adiciona uma margem superior para que as revisões não fiquem no topo
  },
  itemContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "rgb(196, 221, 230)",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  status: {
    marginTop: 10,
    fontWeight: "bold",
  },
  motivo: { color: "red", marginTop: 10 },
  pontos: { color: "green", marginTop: 10 },
  emptyMessage: {
    textAlign: "center", // Centraliza o texto horizontalmente
    fontSize: 18, // Tamanho da fonte
    color: "#555", // Cor do texto
  },
});

export default Revisao;