export default {
  methods: {
    isDesktop() {
      const width = window.innerWidth;
      return width > 767;
    },
    isSmallScreans() {
        const width = window.innerWidth;
        return width < 767;
    }
  },
};
