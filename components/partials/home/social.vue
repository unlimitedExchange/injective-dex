<template>
  <div class="mt-20 mb-20">
    <div class="w-full xl:w-2/3">
      <h3 class="text-xl font-bold text-gray-200">
        {{ $t('injective_home_title_2') }}
      </h3>
    </div>

    <div class="w-full">
      <div class="grid grid-cols-12 md:grid-cols-12 gap-4 md:gap-6 mt-6">
        <v-social-item
          class="col-span-4 md:col-span-4"
          link="https://discord.gg/CbUWPsT7um"
        >
          <span class="">Join our community on Discord.</span>
          <template slot="title">
            {{ $t('Discord') }}
          </template>
          <template slot="icon">
            <v-icon-discord class="w-8 h-8 mr-1" />
          </template>
        </v-social-item>
        <v-social-item
          class="col-span-4 md:col-span-4"
          link="https://twitter.com/UnlimitedExch"
        >
          <span class="">Follow the latest news from Unlimited Exchange</span>
          <template slot="title">
            {{ $t('Twitter') }}
          </template>
          <template slot="icon">
            <v-icon-twitter class="w-8 h-8" />
          </template>
        </v-social-item>
        <v-social-item
          class="col-span-4 md:col-span-4"
          link="https://github.com/unlimitedExchange"
        >
          <span class="">Check out our GitHub</span>
          <template slot="title">
            {{ $t('Github') }}
          </template>
          <template slot="icon">
            <v-icon-github class="w-8 h-8" />
          </template>
        </v-social-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VSocialItem from '~/components/partials/home/social-item.vue'

export default Vue.extend({
  components: {
    VSocialItem
  }
})
</script>
