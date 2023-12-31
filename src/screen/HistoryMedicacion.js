import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Modal, Button } from 'react-native-paper';

const ModalFinalizar = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      visible={visible}
      onDismiss={onCancel}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            ¿Estás listo para finalizar tu turno?
          </Text>
          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={onCancel}
              style={styles.cancelButton}
              labelStyle={styles.buttonLabel}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={onConfirm}
              style={styles.confirmButton}
              labelStyle={styles.buttonLabel}
            >
              Confirmar
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#ff79c6',
  },
  confirmButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#4caf50',
  },
  buttonLabel: {
    color: 'white',
  },
});

export default ModalFinalizar;