document.addEventListener('DOMContentLoaded', () => {
  const body       = document.body;
  const promptText = document.getElementById('promptText');
  const hintText    = document.getElementById('hintText');
  const btnLeft     = document.getElementById('btnLeft');
  const btnRight    = document.getElementById('btnRight');
  const btnReveal   = document.getElementById('btnReveal');
  const stage2      = document.getElementById('stage2');
  const confettiLayer = document.getElementById('confettiLayer');
  const video       = document.getElementById('bdayVideo');

  let trickPlayed = false;

  // ---------- المرحلة ١: الزرار الشمال / اليمين ----------
  btnLeft.addEventListener('click', () => {
    trickPlayed = true;
    promptText.classList.remove('shake');
    // reflow عشان الأنيميشن يشتغل تاني لو دست كذا مرة
    void promptText.offsetWidth;

    promptText.textContent = 'معلش قصدي الزرار اليمين 😅';
    promptText.classList.add('shake');
    hintText.textContent = 'آسفين على الغلطة، جرب التاني 👉';
  });

  btnRight.addEventListener('click', () => {
    if (!trickPlayed) {
      // لو دست يمين على طول من غير ما تجرب شمال، منورّيهاش خطوة الخدعة
      promptText.textContent = 'برافو 🎉';
    }
    goToStage(2);
  });

  // ---------- المرحلة ٢: بصي فوق / بصي تحت ----------
  btnReveal.addEventListener('click', () => {
    goToStage(3);
    launchConfetti();

    // تشغيل الفيديو تلقائي (اللمسة دي بتحصل جوا حدث ضغطة زرار
    // فالمفروض المتصفح يسمح بتشغيل الصوت كمان)
    video.currentTime = 0;
    video.play().catch(() => {
      // لو المتصفح رفض التشغيل التلقائي بالصوت، نجرب بدون صوت
      video.muted = true;
      video.play();
    });
  });

  // ---------- دالة تبديل المراحل ----------
  function goToStage(stageNumber) {
    body.dataset.stage = String(stageNumber);
    if (stageNumber === 2) {
      // نرجّع اسكرول الصفحة لفوق عشان تبدأ من "بصي فوق"
      stage2.scrollIntoView({ behavior: 'instant', block: 'start' });
      window.scrollTo(0, 0);
    }
    if (stageNumber === 3) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ---------- كونفيتي بسيط ----------
  function launchConfetti() {
    const colors = ['#ff5d8f', '#ffc857', '#6bcb9a', '#b185db', '#fff3e2'];
    const pieces = 60;

    for (let i = 0; i < pieces; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = (Math.random() * 0.6) + 's';
      piece.style.animationDuration = (2.6 + Math.random() * 1.6) + 's';
      confettiLayer.appendChild(piece);

      // تنظيف بعد ما تخلص الأنيميشن
      piece.addEventListener('animationend', () => piece.remove());
    }
  }
});
