import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import CardUltimaMedicacion from './CardUtimaMedicacion';
import CardBienvenida from './CardBienvenida';
import PlanFarmacologicoScreen from './PlanFarmacologicoScreen';
import CamaraScreen from './CamaraScreen';
import { getAuth, onAuthStateChanged, app } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import SelectHouseScreen from './SelectHouseScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData, retrieveData } from '../redux/storageService';


const HomeScreen = ({ navigation, route }) => {
  
  // console.log("Persistencia (Datos de asistencia): ",assistanceDataToSend);
  // console.log("Persistencia (Datos del paciente): ",selectedPatient);
  // const ubicacionSalida = (assistanceDataToSend && assistanceDataToSend.ubicacionSalida) || null;
  // console.log("USar variable",ubicacionSalida);


  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [persistedAssistanceData, setPersistedAssistanceData] = useState(null);
  const [persistedSelectedPatient, setPersistedSelectedPatient] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [assistanceDataToSend, setAssistanceDataToSend] = useState(null);
  // Actualiza la función para obtener el identificador del usuario
    const getUserIdStorageKey = (key) => `${key}_${userId}`;

  
  useEffect(() => {
    const loadData = async () => {
      const persistedAssistanceData = await retrieveData('assistanceDataToSend');
      const persistedSelectedPatient = await retrieveData('selectedPatient');

      setPersistedAssistanceData(persistedAssistanceData);

      if (persistedSelectedPatient) {
        setSelectedPatient(persistedSelectedPatient);
      }
    };

    loadData();
  }, []);    // Añade selectedPatient como dependencia para que se ejecute al cambiar


  useEffect(() => {
    const loadAssistanceData = async () => {
      const persistedAssistanceData = await retrieveData(getUserIdStorageKey('assistanceDataToSend'));
      if (persistedAssistanceData) {
        setAssistanceDataToSend(persistedAssistanceData);
      }
    };
  
    const loadSelectedPatient = async () => {
      const persistedSelectedPatient = await retrieveData(getUserIdStorageKey('selectedPatient'));
      if (persistedSelectedPatient) {
        setSelectedPatient(persistedSelectedPatient);
      }
    };
  
    loadAssistanceData();
    loadSelectedPatient();
  }, [userId]);

  useEffect(() => {
    if (assistanceDataToSend) {
      storeData('assistanceDataToSend', assistanceDataToSend);
    }

    if (selectedPatient) {
      storeData('selectedPatient', selectedPatient);
    }
  }, [assistanceDataToSend, selectedPatient]);

  useEffect(() => {
    const loadUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          const fetchedUserData = userDoc.data();

          const role = fetchedUserData?.userRole;
          const id = user.uid;

          await AsyncStorage.setItem('userRole', role);
          await AsyncStorage.setItem('userId', id);

          setUserRole(role);
          setUserId(id);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    const retrievePersistedData = async () => {
      const storedRole = await AsyncStorage.getItem('userRole');
      const storedId = await AsyncStorage.getItem('userId');

      setUserRole(storedRole);
      setUserId(storedId);

      const storedAssistanceData = await retrieveData('assistanceDataToSend');
      const storedSelectedPatient = await retrieveData('selectedPatient');

      setPersistedAssistanceData(storedAssistanceData);
      
      // Añade la condición para asignar storedSelectedPatient a selectedPatient si es undefined
      if (selectedPatient === undefined && storedSelectedPatient) {
        setSelectedPatient(storedSelectedPatient);
      } else {
        setPersistedSelectedPatient(storedSelectedPatient);
      }
    };

    const authListener = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        loadUserData();
      } else {
        retrievePersistedData();
      }
    });

    return () => {
      authListener();
    };
  }, [selectedPatient]);

  useEffect(() => {
    if (assistanceDataToSend) {
      storeData('assistanceDataToSend', assistanceDataToSend);
    }

    if (selectedPatient) {
      storeData('selectedPatient', selectedPatient);
    }
  }, [assistanceDataToSend, selectedPatient]);



  console.log("Persistencia userRole:", userRole);
  console.log("Persistencia UserID:", userId);
  console.log("Persistencia (Datos de asistencia): ", persistedAssistanceData);
  console.log("Persistencia (Datos del paciente): ", persistedSelectedPatient);
  console.log("Debug: selectedPatient:", persistedSelectedPatient);

      useEffect(() => {
          if (assistanceDataToSend !== undefined && assistanceDataToSend !== null) {
            AsyncStorage.setItem(getUserIdStorageKey('assistanceDataToSend'), JSON.stringify(assistanceDataToSend))
              .catch(error => console.error('Error al persistir assistanceDataToSend:', error));
          }

          if (selectedPatient !== undefined && selectedPatient !== null) {
            AsyncStorage.setItem(getUserIdStorageKey('selectedPatient'), JSON.stringify(selectedPatient))
              .catch(error => console.error('Error al persistir selectedPatient:', error));
          }
      }, [assistanceDataToSend, selectedPatient]);

  const shouldRedirectToSelectHouseScreen = !persistedAssistanceData && !persistedSelectedPatient;
  
   useEffect(() => {
    // Persistir assistanceDataToSend y selectedPatient localmente solo si existen
        if (assistanceDataToSend !== undefined && assistanceDataToSend !== null) {
          AsyncStorage.setItem('assistanceDataToSend', JSON.stringify(assistanceDataToSend))
            .catch(error => console.error('Error al persistir assistanceDataToSend:', error));
        }

        if (selectedPatient !== undefined && selectedPatient !== null) {
          AsyncStorage.setItem('selectedPatient', JSON.stringify(selectedPatient))
            .catch(error => console.error('Error al persistir selectedPatient:', error));
        }
    }, [assistanceDataToSend, selectedPatient]);

  console.log("Persistencia userRole:", userRole);
  console.log("Persistencia UserID:", userId);
  console.log("Persistencia (Datos de asistencia): ", persistedAssistanceData);
  console.log("Persistencia (Datos del paciente): ", persistedSelectedPatient);
  console.log("#### Debug: selectedPatient:", selectedPatient);
  console.log("#### Debug: assistanceDataToSend:", assistanceDataToSend);

    
  
    const renderItem = () => (
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Datos del usuario:</Text>
        <View style={styles.patientInfo}>
          <Text style={styles.patientInfoText}>{`${selectedPatient?.nombre || 'Nombre no disponible'}`}</Text>
          <Text style={styles.patientInfoText}>{`Edad: ${selectedPatient?.edad || 'Edad no disponible'}`}</Text>
          <Text style={styles.patientInfoText}>{`Diagnóstico: ${selectedPatient?.diagnostico || 'Diagnóstico no disponible'}`}</Text>
        </View>
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>
        {selectedPatient && (
          <FlatList
            data={[selectedPatient]}
            keyExtractor={(item) => (item && item.id ? item.id.toString() : null)}
            renderItem={renderItem}
            ListHeaderComponent={() => <CardBienvenida route={{ params: { assistanceDataToSend } }} />}
            ListFooterComponent={() => (
              <>
                {selectedPatient && <CardUltimaMedicacion selectedPatient={selectedPatient} />}
                {selectedPatient && <PlanFarmacologicoScreen route={{ params: { selectedPatient } }} />}
                {shouldRedirectToSelectHouseScreen && <SelectHouseScreen />}
              </>
            )}
          />
        )}
  
        {!selectedPatient && (
          <>
            {shouldRedirectToSelectHouseScreen && <SelectHouseScreen />}
          </>
        )}
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    width: '100%',
    borderWidth: 2,
    borderColor: "#5fbcc0",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  patientInfo: {
    marginBottom: 15,
  },
  patientInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  dateTimeContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  dateTimeTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateTimeLabelText: {
    fontSize: 16,
    marginRight: 5,
    color: '#555', // Puedes ajustar el color según tus preferencias
  },
  dateTimeText: {
    fontSize: 16,
  },
});

export default HomeScreen;