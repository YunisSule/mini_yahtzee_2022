import { Text, View } from 'react-native';
import styles from '../styles/style';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Mini Yahtzee</Text>
    </View>
  );
}
