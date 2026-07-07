import React, { useEffect } from 'react';

export default function AlarmManager({ triggerAlarm, message }) {
  useEffect(() => {
    if (triggerAlarm) {
      // 1. Play Alarm Sound (Web Audio API for gentle pleasant chime)
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const playTone = (freq, startTime, duration) => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, startTime);
        gainNode.gain.setValueAtTime(0.1, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };
      
      const now = audioCtx.currentTime;
      playTone(523.25, now, 0.5); // C5
      playTone(659.25, now + 0.2, 0.5); // E5
      playTone(783.99, now + 0.4, 1.0); // G5

      // 2. Web Notification
      if ("Notification" in window) {
        if (Notification.permission === "granted") {
          new Notification("Pill Reminder", { body: message, icon: '/vite.svg' });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(permission => {
            if (permission === "granted") {
              new Notification("Pill Reminder", { body: message, icon: '/vite.svg' });
            }
          });
        }
      }
    }
  }, [triggerAlarm, message]);

  return null; // This is a background component
}
