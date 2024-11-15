// countdown.js

export function initCountdown() {
  const countdownDate = new Date("2024-11-17T00:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = countdownDate - now;

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      document.querySelector(
        ".timers .mp-time-box:nth-child(1) .mp-time"
      ).textContent = String(days).padStart(2, "0");
      document.querySelector(
        ".timers .mp-time-box:nth-child(2) .mp-time"
      ).textContent = String(hours).padStart(2, "0");
      document.querySelector(
        ".timers .mp-time-box:nth-child(3) .mp-time"
      ).textContent = String(minutes).padStart(2, "0");
      document.querySelector(
        ".timers .mp-time-box:nth-child(4) .mp-time"
      ).textContent = String(seconds).padStart(2, "0");
    } else {
      clearInterval(timerInterval);
      document.querySelector(".timers").textContent = "Countdown Ended";
    }
  }

  const timerInterval = setInterval(updateCountdown, 1000);
}
