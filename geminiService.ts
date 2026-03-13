@import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cairo:wght@200..1000&family=IBM+Plex+Sans+Arabic:wght@100..700&family=Inter:wght@100..900&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", "IBM Plex Sans Arabic", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Amiri", serif;
  --font-cairo: "Cairo", sans-serif;
  
  --color-navy: #0A192F;
  --color-sand: #F4EBD0;
  --color-gold: #D4AF37;
  --color-paper: #F9F7F2;
}

@layer base {
  body {
    @apply bg-paper text-navy font-sans;
  }
  
  h1, h2, h3, h4 {
    @apply font-serif;
  }
}

.arabic-text {
  direction: rtl;
  font-family: "IBM Plex Sans Arabic", sans-serif;
}

.glass-card {
  @apply bg-white/80 backdrop-blur-md border border-navy/5 shadow-sm rounded-2xl;
}

