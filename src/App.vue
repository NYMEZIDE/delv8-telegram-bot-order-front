<template>
  <div class="page-wrap fit-container" :class="colorScheme">

    <router-view v-slot="{ Component }">
      <transition name="opacity" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  created() {
    // Трогать осторожно и не в 5 утра
    function urlParseHashParams(locationHash) {
      locationHash = locationHash.replace(/^#/, '');
      var params = {};
      if (!locationHash.length) {
        return params;
      }
      if (locationHash.indexOf('=') < 0 && locationHash.indexOf('?') < 0) {
        params._path = urlSafeDecode(locationHash);
        return params;
      }
      var qIndex = locationHash.indexOf('?');
      if (qIndex >= 0) {
        var pathParam = locationHash.substr(0, qIndex);
        params._path = urlSafeDecode(pathParam);
        locationHash = locationHash.substr(qIndex + 1);
      }
      var locationHashParams = locationHash.split('&');
      var i, param, paramName, paramValue;
      for (i = 0; i < locationHashParams.length; i++) {
        param = locationHashParams[i].split('=');
        paramName = urlSafeDecode(param[0]);
        paramValue = param[1] == null ? null : urlSafeDecode(param[1]);
        params[paramName] = paramValue;
      }
      return params;
    }

    function urlSafeDecode(urlencoded) {
      try {
        urlencoded = urlencoded.replace(/\+/g, '%20');
        return decodeURIComponent(urlencoded);
      } catch (e) {
        return urlencoded;
      }
    }

    var locationHash = '';

    try {
      locationHash = location.hash.toString();
    } catch (e) {
      //
    }

    var initParams = urlParseHashParams(locationHash);
    var webAppDataRaw = '', webAppData = {};

    if (initParams.tgWebAppData && initParams.tgWebAppData.length) {
      webAppDataRaw = initParams.tgWebAppData;
      webAppData = urlParseHashParams(webAppDataRaw);
      delete webAppData._path;
      for (var key in webAppData) {
        var val = webAppData[key];
        try {
          if (val.substr(0, 1) == '{' && val.substr(-1) == '}' ||
              val.substr(0, 1) == '[' && val.substr(-1) == ']') {
            webAppData[key] = JSON.parse(val);
          }
        } catch (e) {
          //
        }
      }
    }

    this.$store.setters.setWebAppData(webAppData);
  },
  setup() {
    // Either 'light' or 'dark'
    const colorScheme = window.Telegram.WebApp.colorScheme || 'light';

    return {
      colorScheme
    }
  }
})
</script>

<style lang="scss">
@import "./assets/styles.scss";
@import "~swiper/swiper.scss";

.page-wrap {
  height: var(--tg-viewport-height);
  width: 100vw;
}

.swiper-container {
  width: 100%;
}

.swiper-slide {
  height: auto;
}
</style>
