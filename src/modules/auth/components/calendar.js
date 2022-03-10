import * as React from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

const calendar = ({
  handleConfirm,

  ...props
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  return (
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      maximumDate={new Date(Date.now() - 86400000)}
    />
  );
};

export default calendar;
