import React from "react";
import { View, Text } from "react-native";

import styles from "./specifics.style";

const Specifics = ({ points, title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}: </Text>
            <View style={styles.pointsContainer}>
                {points.map((point, index) => (
                    <View key={index} style={styles.pointWrapper}>
                        <View style={styles.pointDot} />
                        <Text key={index} style={styles.pointText}>
                            {point}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default Specifics;
