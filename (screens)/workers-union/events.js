import { theme } from '@/constants/theme';
import { mockEvents } from '@/data/mockData';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, MapPin, Users } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EventsScreen() {
  const getEventTypeColor = (type) => {
    switch (type) {
      case 'meeting':
        return theme.colors.primary;
      case 'conference':
        return theme.colors.secondary;
      case 'training':
        return theme.colors.accent;
      case 'social':
        return theme.colors.success;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
    };
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Events</Text>
        <Text style={styles.headerSubtitle}>Upcoming union activities</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.eventsContainer}>
          {mockEvents.map((event) => {
            const { day, month } = formatDate(event.date);
            const typeColor = getEventTypeColor(event.type);

            return (
              <TouchableOpacity key={event.id} style={styles.eventCard} activeOpacity={0.7}>
                <View style={[styles.dateBox, { backgroundColor: typeColor + '15' }]}>
                  <Text style={[styles.dateDay, { color: typeColor }]}>{day}</Text>
                  <Text style={[styles.dateMonth, { color: typeColor }]}>{month}</Text>
                </View>

                <View style={styles.eventContent}>
                  <View style={styles.eventHeader}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <View style={[styles.typeBadge, { backgroundColor: typeColor + '15' }]}>
                      <Text style={[styles.typeText, { color: typeColor }]}>
                        {event.type.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.eventDescription} numberOfLines={2}>
                    {event.description}
                  </Text>

                  <View style={styles.eventDetails}>
                    <View style={styles.detailItem}>
                      <Clock size={14} color={theme.colors.text.secondary} />
                      <Text style={styles.detailText}>{event.time}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <MapPin size={14} color={theme.colors.text.secondary} />
                      <Text style={styles.detailText}>{event.location}</Text>
                    </View>
                    {event.attendees && (
                      <View style={styles.detailItem}>
                        <Users size={14} color={theme.colors.text.secondary} />
                        <Text style={styles.detailText}>{event.attendees} attending</Text>
                      </View>
                    )}
                  </View>

                  <TouchableOpacity style={styles.rsvpButton}>
                    <LinearGradient
                      colors={[typeColor, typeColor + 'CC']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.rsvpGradient}
                    >
                      <Text style={styles.rsvpText}>Register to Attend</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.white,
  },
  headerSubtitle: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.white,
    opacity: 0.9,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  eventsContainer: {
    padding: theme.spacing.md,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadow.md,
  },
  dateBox: {
    width: 60,
    height: 70,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  dateDay: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
  },
  dateMonth: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    textTransform: 'uppercase',
  },
  eventContent: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  eventTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  typeBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  typeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  eventDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
    marginBottom: theme.spacing.sm,
  },
  eventDetails: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  detailText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
  },
  rsvpButton: {
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
    marginTop: theme.spacing.xs,
  },
  rsvpGradient: {
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  rsvpText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.white,
  },
});
