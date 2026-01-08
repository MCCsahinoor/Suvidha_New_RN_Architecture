import React, { FC, useMemo, useRef, useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView, Animated } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts } from "../themes";

interface MCQModalProps {
    modalVisible?: boolean;
    hideModal?: () => void;
    questionText?: string;
    options?: Array<{ id: string | number; label: string; isCorrect?: 'Y' | 'N' | boolean }>;
    onSubmit?: (payload: { selectedId: string | number | null; isCorrect?: string; winAmount?: string }) => void;
    questionId?: number;
    questionOrderNo?: number;
    videoSkipYn?: 'Y' | 'N';
    screenMstrAutoId?: number;
}

import { PainterQuestionInsert } from "../services/Profile/Profile.services"; 
import ButtonLarge from "./ButtonLarge";
import ResultAlert from "./ResultAlert";

const MCQModal: FC<MCQModalProps> = ({ modalVisible, hideModal, questionText, options = [], onSubmit, questionId = 0, questionOrderNo = 0, videoSkipYn = 'N', screenMstrAutoId = 0 }) => {

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedId, setSelectedId] = useState<string | number | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertHeader, setAlertHeader] = useState('');
    const [alertSubText, setAlertSubText] = useState('');
    const [pendingSubmitPayload, setPendingSubmitPayload] = useState<{ selectedId: string | number | null; isCorrect?: string; winAmount?: string } | null>(null);

    const submit = () => {
        if (selectedId == null || submitting) return;
        setSubmitting(true);
        const payload = {
            question_id: Number(questionId) || 0,
            question_order_no: Number(questionOrderNo) || 0,
            answer_id: Number(selectedId) || 0,
            video_skip_yn: videoSkipYn || 'N',
            screen_mstr_auto_id: Number(screenMstrAutoId) || 0,
        };
        PainterQuestionInsert<any, any>(payload)
            .then((res: any) => {
                const isCorrect = res?.data?.is_correct ?? undefined;
                const winAmount = res?.data?.win_amount ?? undefined;
                const apiMessage = res?.response_message ?? '';
                setPendingSubmitPayload({ selectedId, isCorrect, winAmount });
                if (isCorrect === 'Y') {
                    setAlertHeader('Correct');
                    setAlertSubText(apiMessage || `🎉 Correct answer submitted successfully! You’ve won ${winAmount}.`);
                } else {
                    setAlertHeader('Incorrect');
                    setAlertSubText(apiMessage || 'Wrong answer.');
                }
                setAlertVisible(true);
            })
            .catch(() => {
                setPendingSubmitPayload(null);
                setAlertHeader('Failed');
                setAlertSubText('Submission failed. Please try again.');
                setAlertVisible(true);
            })
            .finally(() => setSubmitting(false));
    };

    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if (modalVisible) {
            Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }).start();
        } else {
            fadeAnim.setValue(0);
        }
    }, [modalVisible, fadeAnim]);

    return (
        <Modal transparent={true} visible={!!modalVisible}>
            <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
            <Animated.View style={[styles.fullscreenContainer, { opacity: fadeAnim }]}>
                <View style={styles.headerBar}>
                    <Text style={styles.headerTitle}>Quick Quiz</Text>
                    {/* <Ionicons
                        onPress={hideModal}
                        name={"close-circle-outline"}
                        size={30}
                        style={styles.closeIconDark}
                    /> */}
                </View>

                <ScrollView contentContainerStyle={styles.bodyContent}>
                    <Text style={styles.singleQuestion}>{questionText || ''}</Text>

                    <View style={styles.radioGroup}>
                        {options.map((opt, idx) => {
                            const selected = selectedIndex === idx;
                            return (
                                <TouchableOpacity
                                    key={`${opt.id}-${idx}`}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        setSelectedIndex(idx);
                                        setSelectedId(opt.id);
                                    }}
                                    style={styles.radioItem}
                                >
                                    <Ionicons
                                        name={selected ? "radio-button-on" : "radio-button-off"}
                                        size={22}
                                        color={selected ? "#2b6cb0" : Colors.color_semi_dark_gray}
                                        style={{ marginRight: 10 }}
                                    />
                                    <Text style={styles.radioLabel}>{opt.label}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>

                <View style={styles.submitBar}>
                    <ButtonLarge
                        title={'Submit'}
                        onPress={submit}
                        fillBtn={true}
                        key={'Submit'}
                        showIcon={false}
                        iconName=""
                        paddingVertical={8}
                        paddingHorizontal={10}
                        fontSize={16}
                        iconSize={19}
                        isAPICall={submitting}
                        disabled={selectedIndex === null || submitting}
                    />
                </View>
            </Animated.View>
            <ResultAlert
                modalVisible={alertVisible}
                hideModal={() => setAlertVisible(false)}
                skipNow={() => { setAlertVisible(false); }}
                confirmAction={() => {
                    setAlertVisible(false);
                    if (onSubmit && pendingSubmitPayload) {
                        onSubmit(pendingSubmitPayload);
                    } else if (hideModal) {
                        hideModal();
                    }
                }}
                allowSkip={false}
                headerText={alertHeader}
                subHeaderText={alertSubText}
                confirmActionButtonText={'OK'}
                resultType={pendingSubmitPayload?.isCorrect === 'Y' ? 'success' : 'error'}
            />
        </Modal>
    );
};

export default MCQModal;

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    fullscreenContainer: {
        flex: 1,
        backgroundColor: Colors.color_white,
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins600SemiBold,
        fontSize: 18,
    },
    closeIconDark: {
        color: Colors.ui_dark_bg,
    },
    bodyContent: {
        padding: 16,
        flexGrow: 1,
        justifyContent: 'center',
    },
    singleQuestion: {
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins600SemiBold,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    radioGroup: {
        gap: 12,
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.color_semi_dark_gray,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 14,
    },
    radioLabel: {
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins500Medium,
        fontSize: 12,
    },
    submitBar: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    submitBtn: {
        backgroundColor: '#2b6cb0',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitBtnDisabled: {
        backgroundColor: '#c5ced8',
    },
    submitText: {
        color: Colors.color_white,
        fontFamily: Fonts.poppins600SemiBold,
        fontSize: 16,
    },
});


