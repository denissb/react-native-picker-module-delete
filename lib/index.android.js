import React, { forwardRef, useEffect } from "react"
import { NativeModules, NativeEventEmitter } from "react-native"

const ReactNativePickerModule = forwardRef((props, ref) => {
  const {
    value,
    items,
    title,
    backgroundColor,
    tintColor,
    selectedColor,
    onDelete,
    onValueChange,
    onCancel,
  } = props
  useEffect(() => {
    if (ref && items?.length > 0) {
      ref.current = {
        show: () =>
          NativeModules.ReactNativePickerModule.show(
            items,
            value,
            title,
            selectedColor,
            Boolean(onDelete),
            backgroundColor,
            tintColor,
            value => {
              onValueChange(value)
            },
            onCancel || (() => {}),
    ),
      hide: () => NativeModules.ReactNativePickerModule.hide(),
    }
    }
  }, [ref, value, items])

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter()
    const callback = event => {
      onDelete(event.value)
    }
    const listener = eventEmitter.addListener("ItemDeleted", callback)
    return () => {
      listener.remove();
    }
  }, [onDelete]);

  return <></>
})
export default ReactNativePickerModule
