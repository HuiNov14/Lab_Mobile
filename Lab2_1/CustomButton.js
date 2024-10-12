import React from 'react';

import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const InteractiveButtons = ({ post, image, text, handleOnClick }) => {

    return (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleOnClick(post.id)} >
            <Image
                source={{uri: image}}
                style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default InteractiveButtons;

const styles = StyleSheet.create({
    buttonImage: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
