import React from "react";
import { View, Text, TouchableOpacity, Linking, Image } from "react-native";
import { icons } from "../../../constants";

import styles from "./footer.style";

const Footer = ({ url }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.likeBtn}>
                <Image source={icons.heart} style={styles.likeBtnImage} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={() => Linking.openURL(url)}>
                <Text style={styles.applyBtnText}>Apply Now</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
