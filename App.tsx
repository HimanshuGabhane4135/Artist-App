import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import BootSplash from 'react-native-bootsplash';

import ReactNativeBiometrics from 'react-native-biometrics';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from './src/navigation/RootNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SheetProvider, registerSheet } from 'react-native-actions-sheet';

import AddCategory from './src/components/drawer/AddCategory';
import AddEvent from './src/components/drawer/AddEvent';

registerSheet('addCategory', AddCategory);
registerSheet('addEvent', AddEvent);

const App = () => {
  const handleBiometricAuth = async () => {
    await BootSplash.hide({ fade: true });
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { success, error } = await rnBiometrics.simplePrompt({ promptMessage: 'Authenticate to continue' });

      if (success) {
        return true;
      } else {
        const errorMessage = error ? `Authentication failed: ${error}` : 'Biometric authentication failed';
        Alert.alert('Authentication Failed', errorMessage);
        return false;
      }
    } catch (error) {
      console.error('[handleBiometricAuth] Error:', error);
      Alert.alert('Error', 'Biometric authentication failed from device');
      return false;
    }
  };

  useEffect(() => {
    handleBiometricAuth();
  }, []);

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SheetProvider>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </SheetProvider>
    </QueryClientProvider>
  );
};

export default App;
