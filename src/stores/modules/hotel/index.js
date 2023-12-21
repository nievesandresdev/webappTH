import { defineStore } from 'pinia';
import { useState } from './state';
import { actions } from './actions';
import { getters } from './getters';

export const useHotelStore = defineStore('hotel', {
  state: useState,
  actions,
  getters
});