import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';

import Header from './Header';
import Post from './Post';


//MSSV: 21520910
//Tên: Bùi Minh Huy

const postsData = [
  {
      id: 1,
      avatar: 'https://static.vecteezy.com/system/resources/previews/012/941/847/original/illustration-of-avatar-girl-nice-smiling-woman-with-black-hair-flat-icon-on-purple-background-vector.jpg',
      username: 'Traveler',
      text: 'Sydney... 😀 😃',
      image: 'https://go2travel.vn/data/upload/Sydney-Opera-House-c.jpeg',
      likes: 16,
      comments: 31,
      shares: 2,
      liked: false,
  },
  {
      id: 2,
      avatar: 'https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1',
      username: 'Traveler 2',
      text: 'Exploring... 😀 😃',
      image: 'https://vcdn-dulich.vnecdn.net/2022/06/16/World-Travel-2-9241-1655367719.jpg',
      likes: 35,
      comments: 30,
      shares: 18,
      liked: false,
  },
  {
    id: 3,
    avatar: 'https://cdn4.vectorstock.com/i/1000x1000/08/38/nice-astronaut-with-equipment-to-kawaii-avatar-vector-15210838.jpg',
    username: 'Traveler 3',
    text: 'Ha Long Bay... 😀 😃',
    image: 'https://www.anlamtravel.vn/storage/pagedata/100921/img/images/menu/2_1.jpg',
    likes: 64,
    comments: 35,
    shares: 58,
    liked: false,
  },
];

const App = () => {
  const [posts, setPosts] = useState([...postsData]);

  const handleAddComment = (potsId) => {
            const updatedPosts =
                posts.map((post) => {
                    if (post.id === potsId) {
                        return {
                            ...post,
                            comments: post.comments + 1,
                        };
                    }
                    return post;
                });
            setPosts(updatedPosts);
        }
        const handleAddShare = (potsId) => {
          const updatedPosts2 =
              posts.map((post) => {
                  if (post.id === potsId) {
                      return {
                          ...post,
                          shares: post.shares + 1,
                      };
                  }
                  return post;
              });
          setPosts(updatedPosts2);
      }
      const handleAddLike = (potsId) => {
            const updatedPosts3 =
                posts.map((post) => {
                    if (post.id === potsId && post.liked) {
                        return {
                            ...post,
                            likes: post.likes - 1,
                            liked: false,
                        };
                    }
                    else if (post.id === potsId && !post.liked) {
                      return {
                          ...post,
                          likes: post.likes + 1,
                          liked: true,
                      };
                  }
                    return post;
                });
            setPosts(updatedPosts3);
        }

    return (
        <ScrollView style={styles.container}>
            <Header appName={'Lab 02'}/>
            
            <View style={styles.feed}>
                {posts.map(post => (
                    <Post
                        key={post.id}
                        post={post}
                        handleOnCommentClick={handleAddComment}
                        handleOnLikeClick={handleAddLike}
                        handleOnShareClick={handleAddShare}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    feed: {
        flex: 1,
    },
});

