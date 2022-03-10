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
  editable,
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
      editable={editable}
      mode="outlined"
      outlineColor="transparent"
      autoCapitalize="none"
      style={{
        width: '90%',
        alignSelf: 'center',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        fontFamily: 'Poppins-Regular',
        // borderWidth: 1,
        // borderColor: '#EBEBEB',
        // borderRadius: 6,
      }}
      theme={{
        colors: {
          placeholder: '#ACACAC',
          text: '#36596A',
          primary: '#ABAEBE',
          underlineColor: 'transparent',
          background: '#F3F2F4',
        },
      }}
    />
  );
};
export default TextField;
