import {View, Text, Image, TouchableOpacity} from "react-native";
import { styles } from "./style";
import React from "react";
import {router} from "expo-router";

export const Header = () => {

    return (
        <View style={ styles.main }>
            <TouchableOpacity
                onPress={ ()=> router.push("/") }
            >
                <Image
                    style={{ width: 80, height: 80, marginLeft: 32 }}
                    source={require("@/assets/images/logo.png")}
                />
            </TouchableOpacity>
        </View>
    )
}