<template>
  <div>
      <h3 class="text-xl font-bold text-gray-200 mt-20">
    {{ $t('getting_started') }}
    </h3>
    <div class="grid grid-cols-4 md:grid-cols-12 gap-4 lg:gap-6 mt-6">
      <v-resource-card
        v-for="(card, index) in cards"
        :key="`resource-card-${index}`"
        class="col-span-4"
      >
        <template slot="category">{{ card.category }}</template>
        <template slot="title">{{ card.title }}</template>
        <template slot="illustration">
          <img
            :src="card.illustration"
            :alt="card.title"
            :class="card.imageClass"
          />
        </template>
        <a
          slot="link"
          :href="card.link"
          class="text-primary-500 hover:text-primary-600"
          target="_blank"
        >
          {{ card.linkText }}
        </a>
        {{ card.description }}
      </v-resource-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      cards: [
        {
          category: 'Docs',
          title: 'Decentralized order book',
          description:
            'Familiar trading experience as centralized exchanges while remaining entirely decentralized.',
          illustration: '/svg/order-book.svg',
          imageClass:
            'w-32 h-32 -mt-5 md:w-24 md:h-24 md:mt-4 lg:w-36 lg:h-36 lg:-mt-5'
        },
        {
          category: 'Docs',
          title: 'Zero fees',
          description: 'Trade as much as you want without any gas fees. Once you deposit the funds, you are trading without any gas fees.',
          illustration: '/svg/zero-fees.svg',
          imageClass:
            'w-32 h-32 -mt-5 md:w-24 md:h-24 md:mt-4 lg:w-36 lg:h-36 lg:-mt-5'
        },
        {
          category: 'Docs',
          title: 'Cross-chain transactions',
          description:
            'You can transact any asset of your choice without any friction across sovereign blockchain networks.',
          illustration: '/svg/cross-chain.svg',
          imageClass:
            'w-32 h-32 -mt-5 md:w-24 md:h-24 md:mt-4 lg:w-36 lg:h-36 lg:-mt-5'
        }
      ]
    }
  }
})
</script>
