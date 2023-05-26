import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('bookdb.db');

const InputScreen = ({ route }) => {
    const navigation = useNavigation()
  const { isbn } = route.params;
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [coverType, setCoverType] = useState('');
  const [datePurchased, setDatePurchased] = useState('');
  const [pricePurchased, setPricePurchased] = useState('');

  const handleSave = () => {
    if (!name || !author || !coverType || !datePurchased || !pricePurchased) {
      alert('Please fill in all fields.');
      return;
    }

 // Validate date format (MM/DD/YYYY)
 const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
 if (!dateFormat.test(datePurchased)) {
   alert('Please enter a valid date format (MM/DD/YYYY).');
   return;
 }

 const formattedPrice = parseFloat(pricePurchased).toFixed(2);

 if (isNaN(formattedPrice)) {
   alert('Please enter a valid price.');
   return;
 }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO books (isbn, name, author, coverType, datePurchased, pricePurchased) VALUES (?, ?, ?, ?, ?, ?)',
        [isbn, name, author, coverType, datePurchased, pricePurchased],
        (_, result) => {
          if (result.rowsAffected > 0) {
            const savedBook = {
                id: result.insertId, // assuming your books table has an auto-increment ID column
                isbn,
                name,
                author,
                coverType,
                datePurchased,
                pricePurchased: formattedPrice,
              };
              alert('Book information saved successfully.');
              navigation.navigate('BookDetail', { book: savedBook });
            }
          },
        (_, error) => {
          console.error(error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ISBN: {isbn}</Text>
      <Text style={styles.label}>Book Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Author:</Text>
      <TextInput
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
      />
      <Text style={styles.label}>Cover Type:</Text>
      <TextInput
        style={styles.input}
        value={coverType}
        onChangeText={setCoverType}
      />
       <Text style={styles.label}>Date Purchased (MM/DD/YYYY):</Text>
      <TextInput
        style={styles.input}
        value={datePurchased}
        onChangeText={setDatePurchased}
      />
      <Text style={styles.label}>Price Purchased:</Text>
      <TextInput
        style={styles.input}
        value={pricePurchased.toString()}
        onChangeText={text => setPricePurchased(text)}
        keyboardType="decimal-pad"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default InputScreen;
