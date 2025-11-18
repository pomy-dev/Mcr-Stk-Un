import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export function QuickActionCard({ title, icon: Icon, colors, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.iconContainer}>
          <Icon size={28} color={theme.colors.text.white} strokeWidth={2} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: '47%',
    maxWidth: '48%',
    margin: '1%',
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadow.md,
  },
  gradient: {
    padding: theme.spacing.md,
    minHeight: 100,
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.white,
    lineHeight: 18,
  },
});
