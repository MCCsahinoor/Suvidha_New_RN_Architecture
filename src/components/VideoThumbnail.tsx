import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { createThumbnail } from 'react-native-create-thumbnail';
import { Colors } from '../themes';
import DynamicShimmerPlaceholder from '../utils/dynamicShimmerPlaceholder';
import { CommonToastModel } from '../utils/ToastMessageModel';

const VideoThumbnail = ({ videoUrl, children }: any) => {
    const [thumbnail, setThumbnail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (createThumbnail) {
            createThumbnail({
                url: videoUrl,
            }).then((response) => {
                if (response && response.path) {
                    setThumbnail(response.path);
                }
                setLoading(false);
            }).catch(err => {
                console.error(err);
                setLoading(false);
                CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
            });
        } else {
            setLoading(false);
        }
    }, [videoUrl]);

    if (loading) {
        return (
            <View style={styles.container}>
                <DynamicShimmerPlaceholder
                    borderRadius={5}
                    height={72}
                    width={72}
                    count={1}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {thumbnail && <ImageBackground source={{ uri: thumbnail }} style={styles.successUploadVideo} imageStyle={{ borderRadius: 6 }}>
                {children}
            </ImageBackground>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successUploadVideo: {
        marginLeft: 5,
        width: 72,
        height: 72,
        borderRadius: 5,
        marginRight: 5,
        marginBottom: 10,
        borderColor: Colors.color_dark_gray,
        borderWidth: 1,
    },
});

export default VideoThumbnail;