import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('bookdb.db');

function BookDetailScreen({ route }) {
  const { book } = route.params;
  const navigation = useNavigation();
  const [bookDetails, setBookDetails] = useState(null);

  const handleEdit = () => {
    navigation.navigate('Edit', { book });
  };

  const handleRemove = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this book?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            db.transaction(tx => {
              tx.executeSql(
                'DELETE FROM books WHERE id = ?',
                [book.id],
                (_, result) => {
                  if (result.rowsAffected > 0) {
                    alert('Book removed successfully.');
                    navigation.goBack();
                  }
                },
                (_, error) => {
                  console.error(error);
                }
              );
            });
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM books WHERE id = ?', [book.id], (_, { rows }) => {
        setBookDetails(rows._array[0]);
      });
    });
  };

  useFocusEffect(() => {
    fetchBookDetails();
  });

  if (!bookDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Book Details</Text>
        <Text style={styles.text}>ISBN: {bookDetails.isbn}</Text>
        <Text style={styles.text}>Name: {bookDetails.name}</Text>
        <Text style={styles.text}>Author: {bookDetails.author}</Text>
        <Text style={styles.text}>Cover Type: {bookDetails.coverType}</Text>
        <Text style={styles.text}>Date Purchased: {bookDetails.datePurchased}</Text>
        <Text style={styles.text}>Price Purchased: {bookDetails.pricePurchased}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Edit" onPress={handleEdit} />
        <Button title="Remove" onPress={handleRemove} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#bae6fd'
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 50, // Increase the padding to make the box larger
    marginBottom: 30, // Increase the marginBottom to add more space between the box and buttons
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24, // Increase the fontSize to make the title larger
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 15, // Increase the fontSize to make the text larger
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },
});

export default BookDetailScreen;
