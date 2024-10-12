import React from 'react';

import { View, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';

const InteractiveButtons = ({ post, handleOnCommentClick, handleOnLikeClick, handleOnShareClick }) => {

    return (
        <View style={styles.interactiveContainer}>
            {/* Likes Button */}
            <CustomButton
                post={post}
                image={post.liked ? 'https://images.pond5.com/likes-facebook-reactions-icon-loop-footage-099224927_iconl.jpeg' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsHTppc_G2SMQ8cXGQrpLJyvTDHMoIZZm74g&usqp=CAU'}
                text="Likes"
                handleOnClick={handleOnLikeClick}
            />

            {/* Comments Button */}
            <CustomButton
                post={post}
                image={'https://cdn-icons-png.flaticon.com/512/5338/5338282.png'}
                text="Comments"
                handleOnClick={handleOnCommentClick}
            />

            {/* Shares Button */}
            <CustomButton
                post={post}
                image={'https://cdn-icons-png.flaticon.com/512/2958/2958791.png'}
                text="Shares"
                handleOnClick={handleOnShareClick}
            />
        </View>
    );
};

export default InteractiveButtons;

const styles = StyleSheet.create({
    interactiveContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
