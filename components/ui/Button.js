import { Text, TouchableOpacity } from 'react-native';


export const Button = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  disabled,
}) => {
  const getStyles = () => {
    const baseStyle = {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
    };

    const variantStyles = {
      primary: {
        backgroundColor: '#2563eb',
      },
      secondary: {
        backgroundColor: '#64748b',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#2563eb',
      },
    };

    const sizeStyles = {
      small: {
        paddingVertical: 8,
        paddingHorizontal: 16,
      },
      medium: {
        paddingVertical: 12,
        paddingHorizontal: 24,
      },
      large: {
        paddingVertical: 16,
        paddingHorizontal: 32,
      },
    };

    return [baseStyle, variantStyles[variant], sizeStyles[size], style];
  };

  const getTextStyles = () => {
    const baseTextStyle = {
      fontSize: 16,
      fontWeight: '600',
    };

    const variantTextStyles = {
      primary: { color: '#fff' },
      secondary: { color: '#fff' },
      outline: { color: '#2563eb' },
    };

    return [baseTextStyle, variantTextStyles[variant], textStyle];
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={Boolean(disabled)}
      style={getStyles()}
      activeOpacity={0.7}
    >
      <Text style={getTextStyles()}>{title}</Text>
    </TouchableOpacity>
  );
};
