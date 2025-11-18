import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Info, AlertTriangle, CheckCircle, AlertCircle, X } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Announcement } from '@/types';

export function AnnouncementBanner({ announcement, onDismiss, onPress }) {
  const getIconAndColor = () => {
    switch (announcement.type) {
      case 'info':
        return { Icon: Info, color: theme.colors.info };
      case 'warning':
        return { Icon: AlertTriangle, color: theme.colors.warning };
      case 'success':
        return { Icon: CheckCircle, color: theme.colors.success };
      case 'urgent':
        return { Icon: AlertCircle, color: theme.colors.danger };
      default:
        return { Icon: Info, color: theme.colors.info };
    }
  };

  const { Icon, color } = getIconAndColor();

  return (
    <TouchableOpacity
      style={[styles.container, { borderLeftColor: color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Icon size={20} color={color} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{announcement.title}</Text>
        <Text style={styles.message} numberOfLines={2}>
          {announcement.message}
        </Text>
      </View>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
          <X size={18} color={theme.colors.text.secondary} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderLeftWidth: 4,
    ...theme.shadow.sm,
  },
  iconContainer: {
    marginRight: theme.spacing.sm,
    paddingTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  message: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  dismissButton: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
  },
});
