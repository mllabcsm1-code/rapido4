import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Phone, Lock, Eye, AlertCircle } from 'lucide-react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  // refs for input navigation
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    // reset error
    setError('');

    if (!email || !phone || !password) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#FFF7ED', '#FFFFFF']}
      style={styles.gradient}
    >
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        {/* Floating Error Message */}
        {error ? (
          <View style={styles.errorBox}>
            <AlertCircle size={16} color="#DC2626" style={{ marginRight: 6 }} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Header */}
          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <Mail size={28} color="#fff" />
            </View>
            <Text style={styles.appName}>RideApp</Text>
            <Text style={styles.tagline}>Your journey starts here</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Mail size={18} color="#6B7280" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="john.doe@example.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => phoneRef.current?.focus()}
                  blurOnSubmit={false}
                />
              </View>
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <Phone size={18} color="#6B7280" style={styles.icon} />
                <TextInput
                  ref={phoneRef}
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+1 (555) 123-4567"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  blurOnSubmit={false}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Lock size={18} color="#6B7280" style={styles.icon} />
                <TextInput
                  ref={passwordRef}
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Eye size={18} color={showPassword ? "#F97316" : "#6B7280"} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity 
              style={styles.signInButton} 
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.signInText}>{loading ? "Signing In..." : "Sign In"}</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.line} />
            </View>

            {/* Social Buttons */}
            <TouchableOpacity style={styles.googleButton}>
              <FontAwesome name="google" size={20} color="#DB4437" style={{ marginRight: 8 }} />
              <Text style={styles.googleText}>Sign in with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.appleButton}>
              <FontAwesome name="apple" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.appleText}>Sign in with Apple</Text>
            </TouchableOpacity>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text style={styles.createAccountText}>Create an account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    backgroundColor: '#F97316',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
  },
  tagline: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 5,
    color: '#374151',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 40,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    paddingVertical: 0,
  },
  icon: {
    marginRight: 6,
  },
  signInButton: {
    backgroundColor: '#F97316',
    borderRadius: 6,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  signInText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  orText: {
    marginHorizontal: 10,
    color: '#6B7280',
    fontSize: 13,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  googleText: {
    fontSize: 15,
    color: '#111827',
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 6,
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
  },
  appleText: {
    fontSize: 15,
    color: '#fff',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: '#6B7280',
    fontSize: 13,
  },
  createAccountText: {
    color: '#F97316',
    fontSize: 13,
    fontWeight: '600',
  },
  errorBox: {
    position: 'absolute',
    top: 50,
    left: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 6,
    padding: 10,
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    flex: 1,
  },
});
