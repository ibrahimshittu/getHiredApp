import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";

import styles from "./nearbyjobs.style";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";

const Nearbyjobs = () => {
    const router = useRouter();

    const { data, isLoading, error } = useFetch("search", {
        query: "React developer",
        page: "1",
        num_pages: "1",
        remote_jobs_only: "true",
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nearby Jobs</Text>
                <TouchableOpacity onPress={() => router.push("/search")}>
                    <Text style={styles.headerBtn}>Show All</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text>{error.message}</Text>
                ) : (
                    data?.map((job) => (
                        <NearbyJobCard
                            key={job.job_id}
                            job={job}
                            handleNavigate={() => router.push("/job-details/" + job.job_id)}
                        />
                    ))
                )}
            </View>
        </View>
    );
};

export default Nearbyjobs;
