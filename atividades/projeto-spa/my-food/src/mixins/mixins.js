export default {
  methods: {
    isDesktop() {
      const width = window.innerWidth;
      return width > 1265;
    },
    isSmallScreans() {
        const width = window.innerWidth;
        return width < 767;
    }
  },
};
