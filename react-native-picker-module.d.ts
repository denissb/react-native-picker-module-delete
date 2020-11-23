// Type definitions for react-native-picker-module 1.3.1
// Project: https://github.com/talut/react-native-picker-module
// Definitions by: Talut TASGIRAN <https://github.com/talut>
// TypeScript Version: 3.8.2

import React from "react";

export interface ReactNativePickerModuleProps {
  value?: number;
  items: string[];
  images?: any[];
  title?: string;
  ios?: object;
  pickerRef: (e: ReactNativePickerModule) => void;
  onValueChange: (valueText: string, index: number) => void;
  onDelete?: (valueText: string, index: number) => void;
  onCancel?: () => void;
  onDismiss?: () => void;
  cancelButton?: string;
  confirmButton?: string;
  deleteButton?: string;
}

export default class ReactNativePickerModule extends React.Component<
  ReactNativePickerModuleProps
> {
  show: () => void;
}
