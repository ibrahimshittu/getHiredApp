import React from "react";
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
    Company,
    JobAbout,
    JobFooter,
    jobFooter,
    JobTabs,
    ScreenHeaderBtn,
    Specifics,
} from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hook/useFetch";

const JobDetails = () => {
    const [activeTab, setActiveTab] = useState("About"); // [0, 1, 2
    const params = useSearchParams();
    const router = useRouter();

    const { data, loading, error, refetch } = useFetch("job-details", {
        job_id: params.id,
    });

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {};

    const tabs = ["About", "Qualifications", "Responsibilities"];

    const displayTabContent = (
        activeTab,
        jobDescription,
        jobQualifications,
        jobResponsibilities
    ) => {
        switch (activeTab) {
            case "About":
                return <JobAbout info={jobDescription} />;
            case "Qualifications":
                return <Specifics title="Qualifications" points={jobQualifications} />;
            case "Responsibilities":
                return <Specifics title="Responsibilities" points={jobResponsibilities} />;
            default:
                break;
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => {
                                router.back();
                            }}
                        />
                    ),
                    headerRight: () => <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />,
                    headerTitle: "",
                    headerBackTitleVisible: false,
                }}
            />
            <>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {loading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : (
                        <View
                            style={{
                                padding: SIZES.medium,
                                paddingBottom: 100,
                            }}
                        >
                            <Company
                                companyLogo={data[0]?.employer_logo}
                                jobTitle={data[0]?.job_title}
                                companyName={data[0]?.employer_name}
                                location={data[0]?.employer_country}
                            />
                            <JobTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            {displayTabContent(
                                activeTab,
                                data[0]?.job_description ?? "No data provided",
                                data[0]?.job_highlights.Qualifications ?? ["N/A"],
                                data[0]?.job_responsibilities.Responsibilities ?? ["N/A"]
                            )}
                        </View>
                    )}
                </ScrollView>
                <JobFooter url={data[0]?.job_google_link ?? "https://www.google.com"} />
            </>
        </SafeAreaView>
    );
};

export default JobDetails;
