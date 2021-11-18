<template>
  <div class="h-full w-full flex flex-wrap py-4 hero-background">
    <div class="container">
      <div class="w-full mx-auto xl:w-4/5">
        <div class="grid xl:grid-cols-2 gap-4 mt-32 mb-32">
          <div class="2xl:w-4/5">
            <p class=" mb-3 text-primary-500">Decentralized. Zero Fees. Secure.</p>
            <h1 class="text-5xl font-bold">Welcome to <br />Unlimited Exchange</h1>
            <p class="mt-6 max-w-6xl mx-auto opacity-75">Unlimited Exchange is a decentralized exchange which allows you to access various financial markets on Injective’s fast, multi-chain, secure, and zero gas fee exchange protocol. Borderless trading without restrictions.</p>
          </div>
          <div></div>
        </div>
        <v-panel class="mt-16">
          <v-markets />
        </v-panel>
        <v-get-started class="mt-6" />
        <v-social class="mt-16" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VSocial from '~/components/partials/home/social.vue'
import VGetStarted from '~/components/partials/home/get-started.vue'
import VMarkets from '~/components/partials/common/markets/markets.vue'

export default Vue.extend({
  components: {
    VGetStarted,
    VSocial,
    VMarkets
  }
})
</script>
