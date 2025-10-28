import { useEffect, useState } from 'react';

export default function UrgencyBanner() {
  const targetDate = new Date('2025-11-30T23:59:00+01:00'); // Nov 30, 23:59 CET

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Don't render if expired
  if (timeLeft.expired) {
    return null;
  }

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="bg-[var(--text-active)] text-[var(--bg)] py-3 px-4 sticky top-0 z-[100] border-b border-[var(--line)]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="font-display font-semibold">Founding Client Beta</span>
          <span className="hidden sm:inline">—</span>
          <span className="bg-[var(--bg)] text-[var(--text-active)] px-3 py-1 rounded-full text-sm font-semibold">
            50% off
          </span>
          <span className="hidden sm:inline">—</span>
          <span className="font-medium">3 slots remaining</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">—</span>
          <div className="flex items-center gap-1.5 font-body">
            <TimeUnit value={timeLeft.days} label="d" />
            <span className="opacity-50">:</span>
            <TimeUnit value={timeLeft.hours} label="h" />
            <span className="opacity-50">:</span>
            <TimeUnit value={timeLeft.minutes} label="m" />
            <span className="opacity-50">:</span>
            <TimeUnit value={timeLeft.seconds} label="s" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const formatted = String(value).padStart(2, '0');

  return (
    <div className="flex items-baseline gap-0.5">
      <span className="text-base font-semibold tabular-nums">{formatted}</span>
      <span className="text-xs opacity-70">{label}</span>
    </div>
  );
}
