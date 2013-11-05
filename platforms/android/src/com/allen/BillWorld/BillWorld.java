/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.allen.BillWorld;

import org.apache.cordova.Config;
import org.apache.cordova.CordovaActivity;
import org.json.JSONObject;

import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.RelativeLayout.LayoutParams;

import com.baidu.mobads.AdView;
import com.baidu.mobads.AdViewListener;

public class BillWorld extends CordovaActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        super.init();
        super.loadUrl(Config.getStartUrl());

        //get the root layout
        LinearLayout rlMain = super.root;
        AdView adView = new AdView(this);
        
        FrameLayout.LayoutParams param = new FrameLayout.LayoutParams(LayoutParams.FILL_PARENT,
            LayoutParams.WRAP_CONTENT);
        param.bottomMargin = 0;
        param.gravity = Gravity.BOTTOM;

        adView.setListener(new AdViewListener() {
            public void onAdSwitch() {
                Log.w("", "onAdSwitch");
            }

            public void onAdShow(JSONObject info) {
                Log.w("", "onAdShow " + info.toString());
            }

            public void onAdReady(AdView adView) {
                Log.w("", "onAdReady " + adView);
            }

            public void onAdFailed(String reason) {
                Log.w("", "onAdFailed " + reason);
            }

            public void onAdClick(JSONObject info) {
                Log.w("", "onAdClick " + info.toString());
            }

            public void onVideoStart() {
                Log.w("", "onVideoStart");
            }

            public void onVideoFinish() {
                Log.w("", "onVideoFinish");
            }

            @Override
            public void onVideoClickAd() {
                Log.w("", "onVideoFinish");
            }

            @Override
            public void onVideoClickClose() {
                Log.w("", "onVideoFinish");
            }

            @Override
            public void onVideoClickReplay() {
                Log.w("", "onVideoFinish");
            }

            @Override
            public void onVideoError() {
                Log.w("", "onVideoFinish");
            }
        });
        rlMain.addView(adView, param);
        setContentView(rlMain);
        
        
        //ca8c656d_e498eab7

    }
}
