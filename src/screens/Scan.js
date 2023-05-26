import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('bookdb.db');

function BarcodeScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [bookNotFound, setBookNotFound] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    checkBookInDatabase(data);
  };

  const checkBookInDatabase = (isbn) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM books WHERE isbn = ?',
        [isbn],
        (_, { rows }) => {
          if (rows.length > 0) {
            const book = rows.item(0);
            navigateToBookDetail(book);
          } else {
            setBookNotFound(true);
          }
        }
      );
    });
  };

  const navigateToBookDetail = (book) => {
    navigation.navigate('BookDetail', { book });
  };

  const handleScanAgain = () => {
    setScanned(false);
    setBookNotFound(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {scanned && (
        <Button title="Scan Again" onPress={handleScanAgain} />
      )}
      {bookNotFound && (
        <View style={styles.bookNotFoundContainer}>
          <Text style={styles.bookNotFoundText}>This book is not in your shelf yet, GRAB IT!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  bookNotFoundContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 16,
    borderRadius: 8,
  },
  bookNotFoundText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BarcodeScannerScreen;
