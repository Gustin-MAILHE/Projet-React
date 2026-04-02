import React from "react";
import {Text, View, Image, ScrollView} from "react-native";
import { styles } from "./style"


export const Home = () => (
    <ScrollView style={styles.body}>
        <Text style={styles.bandeau}>BedMark</Text>

        <View style={styles.listJeux}>
            <CarteJeu titre="Temps de réaction" nom={require("@/assets/images/chronometre.png")}/>
            <CarteJeu titre="Nombre caché" nom={require("@/assets/images/chimp.png")}/>
            <CarteJeu titre="Couleur Différente" nom={require("@/assets/images/pipette.png")}/>
            <CarteJeu titre="Séquence Mémorisé" nom={require("@/assets/images/sequence_memory.png")}/>
        </View>
    </ScrollView>
);

const CarteJeu = ( props ) => {
    const { titre, nom } = props;

    return (
    <View style={styles.carteJeu}>
        <Text style={styles.titreCarte}>{titre}</Text>
        <Image
            style={{
                width: '8em',
                height: '8em',
                marginLeft: '4em',
        }}
            source={nom}>
        </Image>
    </View>
)};