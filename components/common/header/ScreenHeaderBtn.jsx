import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity, Image } from "react-native";

import styles from "./screenheader.style";

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
            <Image source={iconUrl} style={styles.btnImg(dimension)} resiseMode="cover" />
        </TouchableOpacity>
    );
};

export default ScreenHeaderBtn;
