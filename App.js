import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import styles from './styles/style';
import Fooret from './components/Footer';
import GameBoard from './components/GameBoard';
import Header from './components/Header';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <GameBoard />
      <Fooret />
      <StatusBar style="auto" />
    </View>
  );
}
