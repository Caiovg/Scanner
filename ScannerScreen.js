import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { getBookInfo } from './services/bookService';
import { useNavigation } from '@react-navigation/native';

export default function ScannerScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [bookInfo, setBookInfo] = useState(null);
  const [scannedCode, setScannedCode] = useState(null);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const requestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    if (!alertShown) {
      setScannedCode(data);
      setScanned(false);
      const info = await getBookInfo(data);
      setBookInfo(info);
      setAlertShown(true);

      Alert.alert(
        'Código lido',
        `O código ${data} foi lido. Verifique se está correto.`,
        [
          {
            text: 'OK',
            onPress: () => {
              setAlertShown(false); // Resetando para permitir o alerta ser exibido novamente na próxima leitura
             navigation.navigate('BookInfoScreen', { bookInfo: info });
            },
          },
          {
            text: 'Cancelar',
            onPress: () => {
              setAlertShown(false); // Resetando para permitir o alerta ser exibido novamente na próxima leitura
              setScanned(true); // Permitindo a leitura novamente
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      {hasPermission === null && (
        <View style={styles.buttonContainer}>
          <Button title="Permitir Câmera" onPress={requestPermission} />
        </View>
      )}
      {hasPermission === true && !scanned && (
        <View style={styles.buttonContainer}>
          <Text style={styles.text} onPress={() => setScanned(true)}>
            Ler código
          </Text>
        </View>
      )}
      {hasPermission === true && scanned && (
        <Camera
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
