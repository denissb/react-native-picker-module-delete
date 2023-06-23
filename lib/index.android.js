import React, { forwardRef, useEffect } from "react"
import { NativeModules, NativeEventEmitter } from "react-native"

function usePrevious(value) {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current = value;
  })
  return ref.current;
}

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
  } = props;

  const [isShown, setIsShown] = React.useState(false);
  const prevItems = usePrevious(items);

  useEffect(() => {
    if (ref && items?.length > 0) {
      ref.current = {
        show: () => {
          setIsShown(true);
          return NativeModules.ReactNativePickerModule.show(
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
          )
        },
      hide: () => {
        setIsShown(false);
        NativeModules.ReactNativePickerModule.hide();
      },
    }
    }
  }, [ref, value, items])

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter();
    const callback = event => {
      onDelete(event.value)
    }
    const listener = eventEmitter.addListener("ItemDeleted", callback);
    return () => {
      listener.remove();
    }
  }, [onDelete]);

  React.useEffect(() => {
    // re-create dialog if items change
    if (isShown && JSON.stringify(items) !== JSON.stringify(prevItems)) {
      NativeModules.ReactNativePickerModule.hide()
      if (items && items.length > 0) {
        ref.current.show()
      } else {
        // all items deleted, cancel dialog
        ref.current.hide()
      }
    }
  }, [ref, items, isShown, prevItems]);

  return <></>
})
export default ReactNativePickerModule
