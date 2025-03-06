<script setup>
import { defineProps, ref, onMounted } from 'vue';

defineProps({
  title: {
    type: String,
    default: 'Code Your Future'
  },
  subtitle: {
    type: String,
    default: 'Find the job that fits your code.'
  }
});

const texts = ['<Find the job that fits your code.>', '<Start your career today!>', '<Find. Apply. Code.>'];
const displayedText = ref(' '); // Non-breaking space to maintain height
const showCursor = ref(true);
let charIndex = 0;
let textIndex = 0;
let isDeleting = false;

// Cursor blinking effect
setInterval(() => {
  showCursor.value = !showCursor.value;
}, 800);

const typeText = () => {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    // Typing effect
    displayedText.value = currentText.slice(0, charIndex++);
    if (charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(typeText, 1500); // Pause before deleting
      return;
    }
  } else {
    // Deleting effect
    displayedText.value = currentText.slice(0, charIndex--);
    if (charIndex < 1) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      charIndex = 0;
      displayedText.value = texts[textIndex].slice(0, 1); // Keep at least one character visible
      setTimeout(typeText, 500); // Pause before typing new text
      return;
    }
  }
  setTimeout(typeText, isDeleting ? 40 : 60); // Speed control
};

onMounted(typeText);
</script>
<style>
.blink {
  animation: blink 1s infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
<template>
  <section class="bg-[#F5F7FA] py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center h-24">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-gray-700 sm:text-5xl md:text-6xl">{{ title }}</h1>
        <p class="my-4 text-xl text-gray-600 italic">
          {{ displayedText }}<span v-if="showCursor" class="blink">|</span>
        </p>
      </div>
    </div>
  </section>
</template>
