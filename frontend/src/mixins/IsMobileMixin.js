export default {
  data() {
    return {
      $windowWidth: window.innerWidth,
    };
  },
  computed: {
    isMobile() {
      return this.$data.$windowWidth <= 768;
    },
  },
  methods: {
    $updateWindowWidth() {
      this.$data.$windowWidth = window.innerWidth;
    },
  },
  created() {
    window.addEventListener('resize', this.$updateWindowWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$updateWindowWidth);
  },
};
