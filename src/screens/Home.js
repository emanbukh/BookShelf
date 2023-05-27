import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BookShelf</Text>
      <Text style={styles.description}>Track books that are already in your library</Text>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate('Register')}
          buttonStyle={[styles.button, { backgroundColor: '#5eead4', marginRight: 30 }]}
          titleStyle={styles.buttonTitle}
          title={
            <View>
              <Text style={styles.buttonTitle}>Register</Text>
              <Text style={styles.buttonDescription}>Add your new book onto the shelf</Text>
            </View>
          }
        />
        <Button
          onPress={() => navigation.navigate('Scan')}
          buttonStyle={[styles.button, { backgroundColor: '#67e8f9' }]}
          titleStyle={styles.buttonTitle}
          title={
            <View>
              <Text style={styles.buttonTitle}>Scan</Text>
              <Text style={styles.buttonDescription}>Find out whether it's already on the shelf</Text>
            </View>
          }
        />
      </View>
      
      <Button
        onPress={() => navigation.navigate('Shelf')}
        buttonStyle={[styles.button, { backgroundColor: '#93c5fd' }]}
        titleStyle={styles.buttonTitle}
        title={
          <View>
            <Text style={styles.buttonTitle}>Shelf</Text>
            <Text style={styles.buttonDescription}>Added books</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bae6fd',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    width: 150,
    height: 150,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: '#1e1b4b',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonDescription: {
    color: '#1e1b4b',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default HomeScreen;
