import { router } from "expo-router";
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Button } from '../../components/ui/Button';
import { AuthContext } from '../../context/authProvider';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = React.useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      // await signIn(email, password);
      router.push('Groups');
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>💼</Text>
        <Text style={styles.title}>Groups Management</Text>
        <Text style={styles.subtitle}>Savings & Lending Made Easy</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="your@email.com"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#cbd5e1"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
          placeholderTextColor="#cbd5e1"
        />

        <Button
          title={loading ? 'Logging In...' : 'Login'}
          onPress={() => { }}
          disabled={loading}
          style={styles.loginButton}
        />
      </View>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity
        onPress={() => router.push('Signup')}
        style={styles.signupLink}
      >
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupBold}>Create one</Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.demoContainer}>
        <Text style={styles.demoTitle}>Demo Credentials</Text>
        <Text style={styles.demoText}>Email: demo@example.com</Text>
        <Text style={styles.demoText}>Password: demo123456</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  headerIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  formContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 16,
    color: '#1e293b',
  },
  loginButton: {
    marginTop: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#94a3b8',
    fontSize: 13,
  },
  signupLink: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  signupText: {
    fontSize: 14,
    color: '#64748b',
  },
  signupBold: {
    fontWeight: '700',
    color: '#2563eb',
  },
  demoContainer: {
    marginTop: 32,
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#06b6d4',
  },
  demoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0c4a6e',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    color: '#0c4a6e',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
});
