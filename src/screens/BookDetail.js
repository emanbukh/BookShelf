import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('bookdb.db');

function BookDetailScreen({ route }) {
  const { book } = route.params;
  const navigation = useNavigation();
  const [bookDetails, setBookDetails] = useState(null);

  const handleEdit = () => {
    // Handle the edit functionality here
    // You can navigate to the edit screen passing the book details
    navigation.navigate('Edit', { book });
  };

  const handleRemove = () => {
    db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM books WHERE id = ?',
          [book.id],
          (_, result) => {
            if (result.rowsAffected > 0) {
              alert('Book removed successfully.');
              navigation.goBack(); // Navigate back to the previous screen
            }
          },
          (_, error) => {
            console.error(error);
          }
        );
      });
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
      <Text style={styles.title}>Book Details</Text>
      <Text>ISBN: {bookDetails.isbn}</Text>
      <Text>Name: {bookDetails.name}</Text>
      <Text>Author: {bookDetails.author}</Text>
      <Text>Cover Type: {bookDetails.coverType}</Text>
      <Text>Date Purchased: {bookDetails.datePurchased}</Text>
      <Text>Price Purchased: {bookDetails.pricePurchased}</Text>
      <View style={styles.buttonsContainer}>
        <Button title="Edit" onPress={handleEdit} />
        <Button title="Remove" onPress={handleRemove} />
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
});

export default BookDetailScreen;
