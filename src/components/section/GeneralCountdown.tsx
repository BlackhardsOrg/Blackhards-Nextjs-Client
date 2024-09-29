import { useEffect, useState } from 'react';

interface CountdownProps {
  targetDateStr: string;
}

const GeneralCountdown: React.FC<CountdownProps> = ({ targetDateStr }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const targetDate = new Date(targetDateStr).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;

      if (timeLeft <= 0) {
        setTimeLeft('Countdown completed!');
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown(); // initial call
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // cleanup on component unmount
  }, [targetDateStr]);

  return <span className='title'>Ends: {timeLeft}</span>;
};

export default GeneralCountdown;
