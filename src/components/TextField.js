import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';

const TextField = ({
  onChangeText,
  placeholder,
  value,
  label,
  secureTextEntry,
  keyboardType,
  ...props
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      mode="outlined"
      outlineColor="transparent"
      autoCapitalize="none"
      style={{
        width: '90%',
        alignSelf: 'center',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
      }}
      theme={{
        colors: {
          placeholder: '#ACACAC',
          text: '#36596A',
          primary: '#ABAEBE',
          underlineColor: 'transparent',
          background: '#FAFAFA',
        },
      }}
    />
  );
};
export default TextField;
