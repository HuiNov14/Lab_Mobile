import React, { useState } from 'react';
import { View, Text, Button, Image, Platform, StyleSheet, FlatList, ImageBackground, SectionList } from 'react-native';
import { fruits_vegetables, workouts } from './data.js';

//MSSV: 21520910
//Tên: Bùi Minh Huy

const App = () => {
    const [selectedExercises, setSelectedExercises] = useState([]);

    const toggleExerciseSelection = (exercise) => {
        if (selectedExercises.includes(exercise)) {
            const newSelectedExercises = selectedExercises.filter((ex) => ex !== exercise);
            setSelectedExercises(newSelectedExercises);
        } else {
            setSelectedExercises([...selectedExercises, exercise]);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.view}>
                <Text>{item}</Text>
                <Button
                    title={selectedExercises.includes(item) ? 'DESELECT' : 'SELECT'}
                    onPress={() => toggleExerciseSelection(item)}
                />
            
        </View>
    );

    const renderSectionHeader = ({ section }) => (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{section.title}</Text>
            <Image style={styles.titleImage} source={{ uri: section.url }} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>
                FlatList - Workouts
            </Text>

            <ImageBackground style={styles.backgroundImage}
                source={{ uri: 'https://st2.depositphotos.com/9527076/12335/i/950/depositphotos_123359068-stock-photo-fitness-workout-background-dumbbells-on.jpg' }}>
                <FlatList
                    data={workouts.map((item) => item.type)}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.listView}
                />
            </ImageBackground>

            <Text style={styles.textTitle}>
                SectionList - Fruits & Vegetables
            </Text>

            <ImageBackground style={styles.backgroundImage}
                source={{ uri: 'https://png.pngtree.com/background/20210710/original/pngtree-fruit-and-vegetable-fruit-background-template-picture-image_1032040.jpg' }} >
                <SectionList
                    sections={fruits_vegetables}
                    renderItem={renderItem}
                    renderSectionHeader={renderSectionHeader}
                    keyExtractor={(item, index) => item + index}
                    style={styles.listView}
                />
            </ImageBackground>

            <Text style={styles.text}>
                <Text style={styles.textSelected}>SELECTED EXERCISES: {'\n'}</Text>
                {selectedExercises.join(', ')}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        marginHorizontal: 30,
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'white',
        margin:6,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 35,
        marginBottom: 10,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center',
        marginBottom: 10,
    },
    titleImage: {
        flex: 0.2,
        resizeMode: 'contain',
    },
    listView: {
        ...Platform.select({
            ios: {
                maxHeight: 280,
            },
            android: {
                maxHeight: 260,
            },
            default: {
                maxHeight: 170,
            },
        }),
        marginBottom: 15,
        width: 320,
    },
    text: {
        textAlign: 'center',
    },
    title: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    textTitle: {
        color: 'blue',
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    textSelected: {
        color: 'red',
        fontWeight: 'bold',
    },
});

export default App;