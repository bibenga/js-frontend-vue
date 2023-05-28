import { defineStore } from 'pinia';
import { delay } from './utils'

export const useTextPairStore = defineStore('textPair', {
  state: () => {
    console.log('[textPair] init state')
    return {
      counter: -2
    }
  },

  getters: {
    doubleCount(state): number {
      return state.counter * 2;
    }
  },

  actions: {
    async init() {
      console.log('[textPair] start initializing...')
      await delay(1000)
      console.log('[textPair] initialized')
    },
    async increment() {
      await delay(1000);
      this.counter++;
    },
    decrement() {
      this.counter--;
    }
  }
});
