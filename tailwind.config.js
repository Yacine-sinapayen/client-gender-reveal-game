export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "rose-pastel": "#F7A8B8",
        "bleu-pastel": "#9EC9EB",
        "fond-clair": "#FFFEFD",
        "jaune-doux": "#FDE68A",
        "gris-neutre": "#6B7280",
        "marron-chaud": "#8B5E3C",
      },
      backgroundImage: {
        'gradient-rose-bleu': 'linear-gradient(135deg, #F7A8B8 0%, #9EC9EB 100%)',
        'gradient-rose-bleu-hover': 'linear-gradient(135deg, #F7A8B8 0%, #9EC9EB 100%)',
        'gradient-rose-bleu-vertical': 'linear-gradient(180deg, #F7A8B8 0%, #9EC9EB 100%)',
        'gradient-rose-bleu-diagonal': 'linear-gradient(45deg, #F7A8B8 0%, #9EC9EB 100%)',
        'gradient-text-rose-bleu': 'linear-gradient(135deg, #F7A8B8 0%, #9EC9EB 100%)',
        'gradient-text-rose-bleu-hover': 'linear-gradient(135deg, #9EC9EB 0%, #F7A8B8 100%)',
      },
    },
  },
  plugins: [],
};
