import * as React from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AppText from '../../components/AppText';

const AppRadioGroup = ({ options, direction = 'row' }) => {
  const [value, setValue] = React.useState('male');

  return (
    <RadioButton.Group
      onValueChange={(newValue) => setValue(newValue)}
      value={value}
    >
      <View style={{ flexDirection: direction }}>
        {options.map((option) => (
          <View
            key={option.value}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: direction === 'row' ? 0 : 5,
            }}
          >
            <RadioButton value={option.value} />
            <AppText>{option.label}</AppText>
          </View>
        ))}
      </View>
    </RadioButton.Group>
  );
};

export default AppRadioGroup;
