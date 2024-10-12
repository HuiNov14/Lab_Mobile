import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';

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

export default function App() {
  const [posts, setPosts] = useState([...postsData]);
  const likedicon = 'https://images.pond5.com/likes-facebook-reactions-icon-loop-footage-099224927_iconl.jpeg';
  const likeicon = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsHTppc_G2SMQ8cXGQrpLJyvTDHMoIZZm74g&usqp=CAU';
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
    <View style={styles.container}>
      <ScrollView>
      {posts.map((post) => (
        <View style={styles.post} key={post.id}>
          <View style={styles.postHeader}>
            <Image source={{uri: post.avatar}} style={styles.profileImage} />
            <Text style={styles.username}>{post.username}</Text>
          </View>

          <Text style={styles.postText}>{post.text}</Text>
          <Image source={{ uri: post.image }} style={styles.contentImage} />
          <View style={styles.statContainer}>
            <Text>
              <Text>{post.likes}</Text> Likes
            </Text>
            <Text>
              <Text>{post.comments}</Text> Comments
            </Text>
            <Text>
              <Text>{post.shares}</Text> Shares
            </Text>
          </View>

          <View style={styles.horizontalLine} />

          <View style={styles.interactiveContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {handleAddLike(post.id);}}>
              <Image source={post.liked ? {uri: likedicon} : {uri: likeicon}} style={styles.buttonIcon} /> 
              <Text style={styles.buttonText}>Likes</Text>
              
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => handleAddComment(post.id)}>
              <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/5338/5338282.png'}} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Comments</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => handleAddShare(post.id)}>
              <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/2958/2958791.png'}} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Shares</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      </ScrollView>
      
    </View>
    
  );
}
const styles = StyleSheet.create({
  container: {
        flex: 1,
    },
    post: {
        flex: 1,
        padding: 15,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 40,
        marginRight: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    postText: {
        fontSize: 12,
        color: '#000',
        marginVertical: 10,
    },
    statContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    horizontalLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#f00',
        marginVertical: 10,
    },
    buttonIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    interactiveContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    }
});
