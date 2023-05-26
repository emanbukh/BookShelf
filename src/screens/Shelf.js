import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('bookdb.db');

function BookListScreen() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM books', [], (_, { rows }) => {
        const bookList = rows._array;
        setBooks(bookList);
        setTotalBooks(bookList.length);
      });
    });
  };

  useFocusEffect(() => {
    fetchBooks();
  });

  const navigateToBookDetail = (book) => {
    navigation.navigate('BookDetail', { book });
  };

  const handleSearch = () => {
    const filtered = books.filter(book =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
    setTotalBooks(filtered.length);
  };

  const renderBookItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => navigateToBookDetail(item)}
    >
      <Text style={styles.bookItemText}>{index + 1}. ISBN: {item.isbn}</Text>
      <Text style={styles.bookItemText}>Name: {item.name}</Text>
      <View style={styles.separator} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book List</Text>
      <Text>Total Books: {totalBooks}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by book name"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      {searchQuery ? (
        filteredBooks.length > 0 ? (
          <FlatList
            data={filteredBooks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderBookItem}
          />
        ) : (
          <Text>No books found</Text>
        )
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
  },
  bookItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
  },
  bookItemText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 8,
  },
});

export default BookListScreen;
