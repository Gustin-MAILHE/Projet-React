// components/home/home.tsx
import React from "react";
import { useRouter } from "expo-router";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";


export const Home = () => {
    const router = useRouter();
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.body}>
            <Text style={styles.bandeau}>BedMark</Text>

            <View style={styles.listJeux}>
                <CarteJeu
                    titre="Reaction Time"
                    nom={require("@/assets/images/chronometre.png")}
                    onPress={() => router.push("/games/indexReactionTime")}
                />
                <CarteJeu
                    titre="Chimp Test"
                    nom={require("@/assets/images/chimp.png")}
                    onPress={()=> router.push("/games/indexChimp")} />
                <CarteJeu
                    titre="Couleur Différente"
                    nom={require("@/assets/images/pipette.png")}
                    onPress={()=> router.push("/games/indexColors")}  />
                <CarteJeu
                    titre="Séquence Mémorisé"
                    nom={require("@/assets/images/sequence_memory.png")}
                    onPress={()=> router.push("/games/indexSequenceMemo")}  />
            </View>
        </ScrollView>
    );
};

// @ts-ignore
const CarteJeu = ({ titre, nom, onPress }) => (
    <TouchableOpacity
        style={styles.carteJeu}
        onPress={onPress}
        disabled={!onPress}
    >
        <Text style={styles.titreCarte}>{titre}</Text>
        <Image
            style={{ width: 80, height: 80, marginLeft: 32 }}
            source={nom}
        />
    </TouchableOpacity>
);