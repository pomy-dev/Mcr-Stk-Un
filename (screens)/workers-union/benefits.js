import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Scale, BookOpen, Wallet, Flower, PiggyBank, ChevronLeft } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { mockBenefits } from '@/data/mockData';
import { router } from 'expo-router';

export default function BenefitsScreen() {
  const getIconComponent = (iconName) => {
    const iconMap = {
      heart: Heart,
      scale: Scale,
      book: BookOpen,
      wallet: Wallet,
      flower: Flower,
      'piggy-bank': PiggyBank,
    };
    return iconMap[iconName] || Heart;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'health':
        return theme.colors.success;
      case 'legal':
        return theme.colors.primary;
      case 'education':
        return theme.colors.accent;
      case 'financial':
        return theme.colors.secondary;
      default:
        return theme.colors.text.secondary;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color={theme.colors.text.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Union Benefits</Text>
        <Text style={styles.headerSubtitle}>Available to all members</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.benefitsContainer}>
          {mockBenefits.map((benefit) => {
            const IconComponent = getIconComponent(benefit.icon);
            const color = getCategoryColor(benefit.category);

            return (
              <TouchableOpacity key={benefit.id} style={styles.benefitCard} activeOpacity={0.7}>
                <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
                  <IconComponent size={28} color={color} />
                </View>
                <View style={styles.benefitContent}>
                  <View style={styles.benefitHeader}>
                    <Text style={styles.benefitTitle}>{benefit.title}</Text>
                    <View style={[styles.categoryBadge, { backgroundColor: color + '15' }]}>
                      <Text style={[styles.categoryText, { color }]}>
                        {benefit.category.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.benefitDescription}>{benefit.description}</Text>
                  <TouchableOpacity style={styles.learnMoreButton}>
                    <Text style={[styles.learnMoreText, { color }]}>Learn More</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How to Access Benefits</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              1. Ensure your membership is active and subscriptions are up to date
            </Text>
            <Text style={styles.infoText}>
              2. Submit a benefit application through the Applications screen
            </Text>
            <Text style={styles.infoText}>
              3. Wait for approval from the union committee
            </Text>
            <Text style={styles.infoText}>
              4. Receive confirmation and benefit details via notification
            </Text>
          </View>

          <TouchableOpacity style={styles.applyButton}>
            <LinearGradient
              colors={theme.gradients.secondary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.applyGradient}
            >
              <Text style={styles.applyButtonText}>Apply for Benefits</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  backButton: {
    marginBottom: theme.spacing.sm,
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
  benefitsContainer: {
    padding: theme.spacing.md,
  },
  benefitCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadow.md,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  benefitContent: {
    flex: 1,
  },
  benefitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  benefitTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  categoryText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  benefitDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
    marginBottom: theme.spacing.sm,
  },
  learnMoreButton: {
    alignSelf: 'flex-start',
  },
  learnMoreText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
  },
  infoSection: {
    padding: theme.spacing.md,
  },
  infoTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadow.sm,
    marginBottom: theme.spacing.md,
  },
  infoText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: 22,
    marginBottom: theme.spacing.sm,
  },
  applyButton: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadow.sm,
  },
  applyGradient: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.white,
  },
});
