import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('bookdb.db');

function ViewScreen() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
      }, []);
    
      const fetchBooks = () => {
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM books', [], (_, { rows }) => {
            setBooks(rows._array);
          });
        });
    
    };
        return (
            <View style={styles.container}>
              <Text style={styles.title}>Book List</Text>
              {books.length > 0 ? (
                <FlatList
                  data={books}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.bookItem}>
                      <Text style={styles.bookItemText}>ISBN: {item.isbn}</Text>
                      <Text style={styles.bookItemText}>Name: {item.name}</Text>
                      <Text style={styles.bookItemText}>Author: {item.author}</Text>
                      <Text style={styles.bookItemText}>Cover Type: {item.coverType}</Text>
                      <Text style={styles.bookItemText}>Date Purchased: {item.datePurchased}</Text>
                      <Text style={styles.bookItemText}>Price Purchased: {item.pricePurchased}</Text>
                    </View>
                  )}
                />
              ) : (
                <Text>No books found</Text>
              )}
            </View>
          );
        };
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
          bookItem: {
            marginBottom: 16,
          },
          bookItemText: {
            fontSize: 16,
          },
        });
    
export default ViewScreen;
