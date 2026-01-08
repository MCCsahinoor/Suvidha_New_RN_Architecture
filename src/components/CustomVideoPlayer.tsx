import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Colors } from '../themes';
import { YTVideoId } from '../utils/YTVideoToThumbnail';
import { PainterQuestionDetails } from '../services/Profile/Profile.services';
import DynamicShimmerPlaceholder from '../utils/dynamicShimmerPlaceholder';

export interface CustomVideoPlayerProps {
    source: string;
    poster?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    style?: any;
    onError?: (error: any) => void;
    onEnd?: () => void;
    onLoad?: () => void;
    addSkipYn?: 'Y' | 'N';
    onSkip?: () => void;
    onNext?: () => void;
    screenId?: number;
    onQuestionsLoaded?: (q: any) => void;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
    source,
    poster,
    autoPlay = false,
    loop = false,
    muted = false,
    style,
    onError,
    onEnd,
    onLoad,
    addSkipYn = 'N',
    onSkip,
    onNext,
    screenId,
    onQuestionsLoaded,
}) => {
    const window = Dimensions.get('window');

    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isLoading, setIsLoading] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(muted);
    const [videoCompleted, setVideoCompleted] = useState(false);
    const [allowNext, setAllowNext] = useState(false);

    const [isLandscapeContent, setIsLandscapeContent] = useState<boolean | null>(null);

    const videoRef = useRef<any>(null);

    const isYouTube = useMemo(
        () => /youtu\.be|youtube\.com/i.test(source),
        [source]
    );

    const ytRef = useRef<any>(null);
    const ytTimerRef = useRef<any>(null);
    const youTubeId = useMemo(
        () => (isYouTube ? YTVideoId(source) : ''),
        [isYouTube, source]
    );

    const handleLoad = (data: any) => {
        setIsLoading(false);
        setDuration(data.duration);
        setVideoCompleted(false);
        setAllowNext(false);

        const nat = data?.naturalSize;
        const width = Number(nat?.width) || 0;
        const height = Number(nat?.height) || 0;

        const landscape = width >= height;
        setIsLandscapeContent(landscape);

        onLoad?.();
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const renderTimer = () => (
        <View style={styles.timerWrapper}>
            <View style={styles.progressBar}>
                <View
                    style={[
                        styles.progress,
                        {
                            width: duration
                                ? `${(Math.min(currentTime, duration) / duration) * 100}%`
                                : '0%',
                        },
                    ]}
                />
            </View>
            <View style={styles.timeRow}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
        </View>
    );

    const renderVideo = () => {
        if (isYouTube) {
            // auto size for YouTube: use 16:9 if landscape unknown
            const contentWidth = window.width - 24;
            const ytHeight = Math.round((contentWidth * 9) / 16);
            return (
                <YoutubePlayer
                    ref={ytRef}
                    height={isLandscapeContent === false ? 220 : ytHeight}
                    width={undefined}
                    play={isPlaying}
                    videoId={youTubeId as string}
                    onReady={async () => {
                        setIsLoading(false);
                        try {
                            const d = await ytRef.current?.getDuration?.();
                            if (d && !isNaN(d)) setDuration(d);
                        } catch { }
                    }}
                    onChangeState={(state: string) => {
                        const s = String(state);
                        if (s === 'buffering') setIsLoading(true);
                        if (s === 'playing' || s === 'paused' || s === 'unstarted' || s === 'cued') setIsLoading(false);
                        if (state === 'ended') {
                            setVideoCompleted(true);
                            setAllowNext(true);
                            setCurrentTime(prev => (duration > 0 ? duration : prev));
                            setIsPlaying(false);
                            onEnd?.();
                        }
                    }}
                />
            );
        }

        return (
            <Video
                ref={videoRef}
                source={{ uri: source }}
                poster={poster}
                style={styles.video}
                resizeMode="contain"
                paused={!isPlaying}
                muted={isMuted}
                repeat={loop}
                onLoad={handleLoad}
                onProgress={e => setCurrentTime(e.currentTime)}
                onEnd={() => {
                    setVideoCompleted(true);
                    setAllowNext(true);
                    setCurrentTime(prev => (duration > 0 ? duration : prev));
                    setIsPlaying(false);
                    onEnd?.();
                }}
                onError={(err) => {
                    setIsLoading(false);
                    onError?.(err);
                }}
            />
        );
    };

    return (
        <>
            <View style={[styles.container, style]}>
                {renderVideo()}

                <View style={styles.inlineOverlay}>
                    {isLoading && (
                        <View>
                            <DynamicShimmerPlaceholder borderRadius={5} height={50} width={"100%"} count={1} />
                            <DynamicShimmerPlaceholder borderRadius={5} height={20} width={"100%"} count={1} />
                            <Text style={{ textAlign: 'center', color: Colors.color_white, fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>Please Wait...</Text>
                        </View>
                    )}
                    {!isLoading && (
                        <View style={styles.controlsContainer}>
                            <View style={styles.controlsRow}>
                                <Pressable onPress={() => {
                                    if (videoCompleted) {
                                        // Video has ended, reset and replay
                                        setCurrentTime(0);
                                        setVideoCompleted(false);
                                        setAllowNext(false);
                                        if (isYouTube) {
                                            ytRef.current?.seekTo(0, true);
                                        } else {
                                            videoRef.current?.seek(0);
                                        }
                                        setIsPlaying(true);
                                    } else {
                                        setIsPlaying(!isPlaying);
                                    }
                                }}>
                                    <Icon name={isPlaying ? 'pause' : 'play-arrow'} size={30} color="white" />
                                </Pressable>
                                {renderTimer()}
                                <Pressable onPress={() => setIsMuted(prev => !prev)}>
                                    <Icon name={isMuted ? 'volume-off' : 'volume-up'} size={26} color="white" />
                                </Pressable>
                            </View>
                            <View style={styles.ctaRow}>
                                {addSkipYn === 'Y' && (
                                    <Pressable
                                        style={styles.ctaBtn}
                                        onPress={async () => {
                                            if (screenId && onQuestionsLoaded) {
                                                try {
                                                    const resp: any = await PainterQuestionDetails<any, any>({ screen_mstr_auto_id: Number(screenId) });
                                                    if (resp?.response_code === 1 && resp?.data) {
                                                        const d = Array.isArray(resp.data) ? resp.data[0] : resp.data;
                                                        if (d) {
                                                            const questionText = d.qd_question_details || d.qd_question_description || '';
                                                            const options = Array.isArray(d.question_details)
                                                                ? d.question_details.map((o: any) => ({
                                                                    id: o.qa_auto_id ?? o.qdqa_auto_id ?? o.qa_id ?? o.id,
                                                                    label: o.qa_question_option ?? o.option ?? o.label ?? '',
                                                                    isCorrect: (o.is_correct ?? o.correct_yn ?? '').toString().toUpperCase() === 'Y',
                                                                }))
                                                                : [];
                                                            const questionId = Number(d.qd_auto_id ?? d.question_id ?? 0);
                                                            const orderNo = Number(d.qd_order ?? d.order_no ?? 0);
                                                            onQuestionsLoaded({ questionText, options, questionId, orderNo });
                                                        }
                                                    }
                                                } catch { }
                                            }
                                            onSkip?.();
                                        }}
                                    >
                                        <Text style={styles.ctaText}>Skip</Text>
                                    </Pressable>
                                )}
                                {allowNext && (
                                    <Pressable
                                        style={styles.ctaBtn}
                                        onPress={async () => {
                                            if (screenId && onQuestionsLoaded) {
                                                try {
                                                    const resp: any = await PainterQuestionDetails<any, any>({ screen_mstr_auto_id: Number(screenId) });
                                                    if (resp?.response_code === 1 && resp?.data) {
                                                        const d = Array.isArray(resp.data) ? resp.data[0] : resp.data;
                                                        if (d) {
                                                            const questionText = d.qd_question_details || d.qd_question_description || '';
                                                            const options = Array.isArray(d.question_details)
                                                                ? d.question_details.map((o: any) => ({
                                                                    id: o.qa_auto_id ?? o.qdqa_auto_id ?? o.qa_id ?? o.id,
                                                                    label: o.qa_question_option ?? o.option ?? o.label ?? '',
                                                                    isCorrect: (o.is_correct ?? o.correct_yn ?? '').toString().toUpperCase() === 'Y',
                                                                }))
                                                                : [];
                                                            const questionId = Number(d.qd_auto_id ?? d.question_id ?? 0);
                                                            const orderNo = Number(d.qd_order ?? d.order_no ?? 0);
                                                            onQuestionsLoaded({ questionText, options, questionId, orderNo });
                                                        }
                                                    }
                                                } catch { }
                                            }
                                            onNext?.();
                                        }}
                                    >
                                        <Text style={styles.ctaText}>Next</Text>
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    )}

                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.color_black,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    video: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    inlineOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        // paddingHorizontal: 12,
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    controlsContainer: {
        backgroundColor: '#000000' + '80',
        // paddingHorizontal: 15,
        paddingBottom: 10,
    },
    ctaRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    ctaBtn: {
        backgroundColor: '#2b6cb0',
        paddingVertical: 10,
        borderRadius: 7,
        marginHorizontal: 6,
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ctaText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
    },
    timerWrapper: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        width: '100%',
        flex: 1,
    },
    progressBar: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 6,
    },
    progress: {
        height: '100%',
        backgroundColor: '#fff',
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    timeText: {
        color: '#fff',
        fontSize: 13,
    },
});

export default CustomVideoPlayer;
