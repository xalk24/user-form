<template>
<div class="ui-pagination">
  <div
    class="ui-pagination__button"
    :class="{'ui-pagination__button--disabled': !prevBtnActive}"
    @click="prevPage"
  >
    <mdicon name="chevron-left"/>
  </div>
  <template
    v-if="!isMobile"
  >
    <div
      v-for="(num, key) in pages"
      :key="key"
      class="ui-pagination__item"
      :class="{
      'ui-pagination__item--dotted': num === 'DOTTED',
      'ui-pagination__item--active': num === selectedPage
    }"
      @click="goToPage(num)"
    >
      {{ num === 'DOTTED' ? '. . .' : num }}
    </div>
  </template>
  <div
    v-else
    class="ui-pagination__item ui-pagination__item--dotted"
  >
    {{ selectedPage }}
  </div>
  <div
    class="ui-pagination__button ui-pagination__button"
    :class="{'ui-pagination__button--disabled': !nextBtnActive}"
    @click="nextPage"
  >
    <mdicon name="chevron-right"/>
  </div>
</div>
</template>

<script>
import IsMobileMixin from '@/mixins/IsMobileMixin';

export default {
  name: 'UiPagination',
  mixins: [IsMobileMixin],
  props: {
    totalItems: {
      type: Number,
      default: 0,
    },
    itemsPerPage: {
      type: Number,
      default: 1,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      selectedPage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    pages() {
      const result = [];
      const { totalPages } = this;
      if (totalPages <= 5) {
        for (let i = 1; i <= this.totalPages; i += 1) {
          result.push(i);
        }
        return result;
      }
      if (this.selectedPage < 4) {
        for (let i = 1; i <= 7; i += 1) {
          if (i <= 4) {
            result.push(i);
          } else if (i === 5) {
            result.push('DOTTED');
          } else {
            result.push(totalPages - 7 + i);
          }
        }
        return result;
      }
      if (this.selectedPage < totalPages - 2) {
        for (let i = 1; i <= 7; i += 1) {
          if (i <= 2) {
            result.push(i);
          } else if (i === 3 || i === 6) {
            result.push('DOTTED');
          } else if (i === 4) {
            result.push(this.selectedPage);
          } else if (i === 5) {
            result.push(this.selectedPage + 1);
          } else {
            result.push(totalPages - 7 + i);
          }
        }
        return result;
      }
      for (let i = 1; i <= 7; i += 1) {
        if (i <= 3) {
          result.push(i);
        } else if (i === 4) {
          result.push('DOTTED');
        } else {
          result.push(totalPages - 7 + i);
        }
      }
      return result;
    },
    prevBtnActive() {
      return this.selectedPage > 1;
    },
    nextBtnActive() {
      return this.selectedPage < this.totalPages;
    },
  },
  watch: {
    selectedPage(newPage) {
      this.$emit('paginate', newPage);
    },
    page(page) {
      this.selectedPage = page;
    },
  },
  methods: {
    nextPage() {
      if (!this.nextBtnActive) {
        return;
      }
      this.selectedPage += 1;
    },
    prevPage() {
      if (!this.prevBtnActive) {
        return;
      }
      this.selectedPage -= 1;
    },
    goToPage(page) {
      if (page === 'DOTTED') {
        return;
      }
      this.selectedPage = page;
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-pagination {
  display: flex;
  height: 32px;
  &__button, &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $color-second;
    border-left: none;
    height: 100%;
    width: 32px;
    transition-duration: $transition-delay;
    cursor: pointer;
    &:nth-child(1) {
      border-left: 1px solid $color-second;
      border-radius: 8px 0 0 8px;
    }
    &:nth-last-child(1) {
      border-radius: 0 8px 8px 0;
    }
    &--active {
      background-color: $color-prime;
      color: white;
    }
    &--disabled {
      cursor: default;
      &:hover {
        background-color: white !important;
      }
    }
    &:hover {
      background-color: $color-gray-1;
    }
  }
  &__item--dotted {
    width: 64px;
    letter-spacing: .2rem;
    cursor: default;
    &:hover {
      background-color: white;
    }
  }
}
</style>
