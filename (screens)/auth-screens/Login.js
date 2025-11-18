import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneInput from "react-native-international-phone-number";
import { Button } from "../../components/ui/Button";
import { AuthContext } from "../../context/authProvider";

export default function LoginScreen({ navigation }) {
  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [e164Number, setE164Number] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  // ---------- SEND OTP (demo – replace with Firebase / Twilio) ----------
  const sendOtp = async () => {
    if (!e164Number || e164Number.length < 8) {
      Alert.alert("Invalid Number", "Please enter a valid phone number");
      return;
    }

    setLoading(true);
    try {
      // YOUR REAL OTP ENDPOINT HERE
      // await fetch("https://your-api.com/send-otp", { method: "POST", body: JSON.stringify({ phone: e164Number }) });
      await new Promise((r) => setTimeout(r, 800)); // fake delay

      Alert.alert("OTP Sent 📩", `Demo OTP for ${e164Number} is 123456`);
      setOtpSent(true);
    } catch (e) {
      Alert.alert("Failed", e.message ?? "Could not send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ---------- VERIFY OTP ----------
  const verifyOtp = async () => {
    if (otp !== "123456") {
      Alert.alert("Wrong OTP", "Demo OTP is 123456");
      return;
    }

    setLoading(true);
    try {
      // YOUR REAL VERIFY ENDPOINT HERE
      // await signIn?.({ phone: e164Number });
      navigation.navigate("MainTabs");
    } catch (e) {
      Alert.alert("Login Failed", e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>💼</Text>
        <Text style={styles.title}>InHlumo Schemes</Text>
        <Text style={styles.subtitle}>Secure+Easy+Transparent Schemes</Text>
      </View>

      {/* Phone Input */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Phone Number</Text>

        <PhoneInput
          value={phoneInputValue}
          defaultCountry="SZ"           // Eswatini/Swaziland 🇸🇿 (+268)
          onChangePhoneNumber={(data) => {
            setPhoneInputValue(data || "");
            setE164Number(data || "");
          }}
          placeholder="76 123 456"
          phoneInputStyle={styles.phoneInput}
          textContainerStyle={styles.textContainer}
          flagContainerStyle={styles.flagContainer}
          disabled={loading || otpSent}
          autoFocus
        />

        {/* OTP Section */}
        {otpSent && (
          <>
            <Text style={styles.label}>Enter OTP</Text>
            <Text style={styles.otpHint}>Sent to {e164Number}</Text>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpTextInput}
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="------"
                textAlign="center"
                autoFocus
                editable={!loading}
              />
            </View>
          </>
        )}

        {/* Action Button */}
        <Button
          title={
            loading
              ? "Please wait..."
              : otpSent
                ? "Verify OTP"
                : "Send OTP"
          }
          onPress={otpSent ? verifyOtp : sendOtp}
          disabled={loading}
          style={styles.actionButton}
        />
        {loading && <ActivityIndicator style={{ marginTop: 12 }} color="#2563eb" />}
      </View>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.line} />
      </View>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.signupLink}>
        <Text style={styles.signupText}>
          Don’t have an account? <Text style={styles.signupBold}>Create one</Text>
        </Text>
      </TouchableOpacity>

      {/* Demo Box */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoTitle}>Demo (Eswatini)</Text>
        <Text style={styles.demoText}>Phone: +268 76 123 456</Text>
        <Text style={styles.demoText}>OTP: 123456</Text>
      </View>
    </ScrollView>
  );
}

/* ────────────────────────────── STYLES ────────────────────────────── */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  contentContainer: { padding: 24, paddingTop: 60 },

  header: { alignItems: "center", marginBottom: 48 },
  headerIcon: { fontSize: 56, marginBottom: 16 },
  title: { fontSize: 28, fontWeight: "700", color: "#1e293b", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#64748b" },

  formContainer: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: "600", color: "#1e293b", marginBottom: 8 },

  phoneInput: {
    fontSize: 16,
    color: "#1e293b",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  textContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  flagContainer: {
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
  },

  otpHint: { fontSize: 12, color: "#64748b", marginBottom: 8 },
  otpBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    height: 56,
    justifyContent: "center",
    marginBottom: 16,
  },
  otpTextInput: {
    fontSize: 20,
    letterSpacing: 10,
    color: "#1e293b"
  },

  actionButton: { marginTop: 24 },

  divider: { flexDirection: "row", alignItems: "center", marginVertical: 18 },
  line: { flex: 1, height: 1, backgroundColor: "#e2e8f0" },
  dividerText: { marginHorizontal: 12, color: "#94a3b8", fontSize: 13 },

  signupLink: { alignItems: "center", paddingVertical: 12 },
  signupText: { fontSize: 14, color: "#64748b" },
  signupBold: { fontWeight: "700", color: "#2563eb" },

  demoContainer: {
    marginTop: 32,
    marginBottom: 30,
    backgroundColor: "#e0f2fe",
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#06b6d4",
  },
  demoTitle: { fontSize: 13, fontWeight: "600", color: "#0c4a6e", marginBottom: 8 },
  demoText: { fontSize: 12, color: "#0c4a6e", marginBottom: 4 },
});