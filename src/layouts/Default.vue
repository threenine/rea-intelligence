<template>
  <div>
    <site-header></site-header>
    <slot/>
    <site-footer class="py-8 sm:py-16" />
  </div>
</template>

<script>
import config from '~/.temp/config.js';
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/Footer";

export default {
  components : {
    SiteHeader,
    SiteFooter,
  },
  computed: {
    config () {
      return config
    }
  }
}
</script>

<style src="~/assets/css/main.css"></style>
