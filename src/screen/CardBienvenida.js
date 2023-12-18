import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { getUserInfo } from '../utils/userUtils';
import { useNavigation } from '@react-navigation/native';

const CardBienvenida = ({ userData }) => {
  const  navigation = useNavigation();
  const { firstName, lastName, photoUrl } = getUserInfo(userData);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>¡Hola!</Text>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.patientInfoText}>{`${firstName} ${lastName}`}</Text>
          <Pressable
              style={({ pressed }) => [
                styles.terminarHorarioButton,
                { backgroundColor: pressed ? 'red' : 'green' },
              ]}
              onPress={() => navigation.navigate('FinalizarJornada')}
            >
              <Text style={styles.buttonText}>Terminar jornada</Text>
            </Pressable>
        </View>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: photoUrl }}
            style={styles.profileImage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    width: '100%',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    // textAlign: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  patientInfoText: {
    fontSize: 18,
    marginBottom: 5,
    // textAlign: 'center',
  },
  terminarHorarioButton: {
    marginTop: 1,
    marginLeft: 1,
    padding: 4,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CardBienvenida;