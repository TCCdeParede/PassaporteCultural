import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";

const Revisao = () => {
    const [visitas, setVisitas] = useState([]);

    const fetchVisitas = async () => {
        try {
            const response = await fetch("http://192.168.0.9/PassaporteCulturalSite/php/revisar_visitas.php");
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

    const handleUpdateStatus = async (idfoto, status) => {
        try {
            const response = await fetch("http://192.168.0.9/PassaporteCulturalSite/php/revisar_visitas.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idfoto, status }),
            });
            const data = await response.json();
            if (data.status === "sucesso") {
                Alert.alert("Sucesso", data.message);
                fetchVisitas(); // Atualiza a lista
            } else {
                Alert.alert("Erro", data.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Erro ao atualizar o status.");
        }
    };

    useEffect(() => {
        fetchVisitas();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text>Aluno: {item.nomealu}</Text>
            <Text>Local: {item.local}</Text>
            <Text>Data: {item.data} - {item.hora}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={[styles.button, styles.approve]}
                    onPress={() => handleUpdateStatus(item.idfoto, "Aprovado")}
                >
                    <Text style={styles.buttonText}>Aprovar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.reject]}
                    onPress={() => handleUpdateStatus(item.idfoto, "Reprovado")}
                >
                    <Text style={styles.buttonText}>Reprovar</Text>
                </TouchableOpacity>
            </View>
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
    itemContainer: { padding: 15, marginVertical: 5, backgroundColor: "#f8f8f8", borderRadius: 8 },
    buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    button: { padding: 10, borderRadius: 5 },
    approve: { backgroundColor: "green" },
    reject: { backgroundColor: "red" },
    buttonText: { color: "#fff", fontWeight: "bold" },
});

export default Revisao;
