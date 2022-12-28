<template>
  <Combobox v-slot="{ open }" multiple>
    <div class="relative">
      <ComboboxLabel class="label">Merchants</ComboboxLabel>
      <div class="relative">
        <ComboboxInput
          placeholder="Search here..."
          class="input"
          @change="query = $event.target.value"
          :displayValue="getDisplay"
        />
        <span class="absolute top-2 right-2">
          <ComboboxButton>
            <Icon
              class="transition-all duration-300"
              :class="[open ? 'rotate-180' : '']"
              name="fluent:chevron-down-24-regular"
              size="20"
            /> </ComboboxButton
        ></span>
      </div>
      <ComboboxOptions
        class="absolute w-full bg-white border border-gray-100 rounded-md shadow-lg"
      >
        <div
          v-if="filteredMerchants.length === 0 && query !== ''"
          class="relative px-2 py-4 text-center text-gray-500 cursor-default select-none"
        >
          No Merchant Found
        </div>
        <!-- filtereed merchants -->
        <ComboboxOption
          as="template"
          v-for="merchant in filteredMerchants"
          :key="merchant._id"
          :value="merchant._id"
        >
          <li
            class="px-3 py-2.5 cursor-pointer ui-active:bg-primary-50 ui-selected:bg-primary ui-selected:text-white"
          >
            <span class="block text-sm truncate ui-active:text-primary">
              {{ merchant.name }}
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup>
import {
  ComboboxLabel,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
} from "@headlessui/vue";
// instantiate the merchant store
const merchantStore = useMerchantStore();
// get the merchants
useAsyncData(() => merchantStore.getAll(), { initialCache: false });
// Serch value
const query = ref("");
// Method used to display the text inside the input
const getDisplay = (merchants) => {
  // If empty
  if (!merchants.length) return;
  // get first merchant name
  let firstMerchant = merchantStore.merchants.find(
    (a) => a._id == merchants[0],
  )?.name;
  // if we have more than one selected, return the first & the extras
  if (merchants.length > 1) {
    return `${firstMerchant} + ${merchants.length - 1} more`;
  }
  // If only one is selcted, return that one
  return firstMerchant;
};
// Simple search function to find the merchants
const filteredMerchants = computed(() =>
  query.value === ""
    ? merchantStore.merchants
    : merchantStore.merchants.filter((a) => {
        return a.name.toLowerCase().includes(query.value.toLowerCase());
      }),
);
</script>
