import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Colors, Fonts } from '../themes';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text } from 'react-native';


const CustomToastInModel: React.FC = () => {
    const toastConfig = {
        success: (props: any) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: '#5CB85C', backgroundColor: '#5CB85C', marginBottom: -5, width: '95%' }}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                text1NumberOfLines={10}
                text1Style={{
                    fontSize: 13,
                    fontWeight: '400',
                    color: Colors.color_white,
                    fontFamily: Fonts.OpenSans600SemiBold,
                }}
            // renderTrailingIcon={() => (
            //     <TouchableOpacity onPress={() => Toast.hide()} style={styles.closeButton}>
            //         <Text style={styles.closeText}>✕</Text>
            //     </TouchableOpacity>
            // )}

            />
        ),
        error: (props: any) => (
            <ErrorToast
                {...props}
                style={{ borderLeftColor: '#f66', backgroundColor: '#f66', marginBottom: -5, width: '95%' }}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                text1NumberOfLines={10}
                text1Style={{
                    fontSize: 13,
                    fontWeight: '400',
                    color: Colors.color_white,
                    fontFamily: Fonts.OpenSans600SemiBold,
                }}
            // renderTrailingIcon={() => (
            //     <TouchableOpacity onPress={() => Toast.hide(props.id)} style={styles.closeButton}>
            //         <Text style={styles.closeText}>✕</Text>
            //     </TouchableOpacity>
            // )}
            />
        ),

    };


    return (
        <>
            <Toast config={toastConfig} />
        </>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        paddingTop: 20,
        paddingRight: 10
    },
    closeText: {
        color: Colors.color_white,
        fontSize: 14,
        fontWeight: '600',
    },
});

export default CustomToastInModel;