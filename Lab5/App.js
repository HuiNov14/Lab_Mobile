import { StyleSheet, Text, View } from 'react-native';
import Main from './src/Main';
import React from 'react';
import * as SQLite from 'expo-sqlite';

//Họ tên: Bùi Minh Huy - MSSV: 21520910

export default function App() {
  React.useEffect(() => {
    const db = SQLite.openDatabase('Storage.db');
    db.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS storage (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, image TEXT, formattedAddress TEXT, latitude REAL, longitude REAL);'
        );
      },
      null,
      null
    );
  }, []);
  return (
    <Main />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
