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

  const renderBookItem = ({ item, index }) => {
    const isEven = index % 2 === 0;
    const backgroundColor = isEven ? '#ccfbf1' : '#ecfeff';

    return (
      <TouchableOpacity
        style={[styles.bookItem, { backgroundColor }]}
        onPress={() => navigateToBookDetail(item)}
      >
        <Text style={styles.bookItemText}>{index + 1}. ISBN: {item.isbn}</Text>
        <Text style={[styles.bookItemText, { paddingLeft: 16 }]}>Book Name: {item.name}</Text>
      </TouchableOpacity>
    );
  };

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
    backgroundColor: '#bae6fd'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,textAlign: 'center',
    
  },
  searchInput: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 8,marginTop: 8,
  },
  bookItem: {
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
  },
  bookItemText: {
    fontSize: 16,
  },
});

export default BookListScreen;
