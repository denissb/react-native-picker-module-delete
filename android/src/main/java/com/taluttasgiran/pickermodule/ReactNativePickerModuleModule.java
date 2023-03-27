package com.taluttasgiran.pickermodule;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

import javax.annotation.Nullable;

public class ReactNativePickerModuleModule extends ReactContextBaseJavaModule {
    private final ReactContext reactContext;
    private RNSpinner rnSpinner;

    public ReactNativePickerModuleModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @ReactMethod
    public void show(
            ReadableArray items,
            @Nullable String selectedValue,
            @Nullable String title,
            @Nullable String selectedColor,
            @Nullable Boolean showDeleteButton,
            @Nullable String backgroundColor,
            @Nullable String tintColor,
            final Callback onClickCallback,
            @Nullable final Callback onCancelCallback
    ) {
        rnSpinner = new RNSpinner(getCurrentActivity(), reactContext, items, selectedValue, title, showDeleteButton, selectedColor, backgroundColor, tintColor, onClickCallback, onCancelCallback);
        rnSpinner.show();
    }

    @ReactMethod
    public void hide() {
        if (rnSpinner != null) {
            rnSpinner.hide();
        }
    }

    @Override
    public String getName() {
        return "ReactNativePickerModule";
    }
}
