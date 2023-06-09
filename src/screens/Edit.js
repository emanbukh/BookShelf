import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('bookdb.db');

const EditScreen = ({ route }) => {
  const navigation = useNavigation();
  const { book } = route.params;
  const [name, setName] = useState(book.name);
  const [author, setAuthor] = useState(book.author);
  const [coverType, setCoverType] = useState(book.coverType);
  const [datePurchased, setDatePurchased] = useState(book.datePurchased);
  const [pricePurchased, setPricePurchased] = useState(book.pricePurchased);

  const handleUpdate = () => {
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
        'UPDATE books SET name=?, author=?, coverType=?, datePurchased=?, pricePurchased=? WHERE id=?',
        [name, author, coverType, datePurchased, formattedPrice, book.id],
        (_, result) => {
          if (result.rowsAffected > 0) {
            alert('Book information updated successfully.');
            navigation.goBack(); // Navigate back to the previous screen
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
      <Text style={styles.title}>Edit Book</Text>
      <Text style={styles.label}>ISBN: {book.isbn}</Text>
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
      <Picker
        style={styles.picker}
        selectedValue={coverType}
        onValueChange={itemValue => setCoverType(itemValue)}
      >
        <Picker.Item label="Hardcover" value="hardcover" />
        <Picker.Item label="Paperback" value="paperback" />
      </Picker>
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
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#bae6fd',
    shadowColor: 'rgba(0, 0, 0, 0.3)', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 1, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Android shadow elevation
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    marginBottom: 16,
    paddingHorizontal: 8,
    shadowColor: 'rgba(0, 0, 0, 0.3)', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 1, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 3, // Android shadow elevation
  },
  picker: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    marginBottom: 16,
    paddingHorizontal: 8,
    shadowColor: 'rgba(0, 0, 0, 0.3)', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 1, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 3, // Android shadow elevation
  },
});

export default EditScreen;
