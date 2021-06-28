package com.bridge_android;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.LinkedList;
import java.util.List;

import io.blackbox_vision.wheelview.view.WheelView;

public class Bridge_android extends SimpleViewManager<WheelView> {
    public static final String REACT_CLASS = "BridgeAndroid";

    @Override
    protected WheelView createViewInstance(ThemedReactContext reactContext) {
        final WheelView wheelView = new WheelView(reactContext);
        return wheelView;
    }

    @ReactProp(name = "data")
    public void setData(WheelView wheelView, ReadableArray data) {
        List<String> dataList = new LinkedList<>();
        for (int i = 0; i < data.size() ; i++) {
            dataList.add(data.getString(i));
        }
        wheelView.setItems(dataList);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }
}