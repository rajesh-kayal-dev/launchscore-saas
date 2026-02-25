import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroSequence = ({ onComplete }) => {
  const [scene, setScene] = useState(1);

  // Scene transitions
  useEffect(() => {
    const timers = [
      setTimeout(() => setScene(2), 1000), // Core glow appears after 1s
      setTimeout(() => setScene(3), 3500), // Logo reveal after 3.5s
      setTimeout(() => setScene(4), 6500), // Transition after 6.5s
      setTimeout(() => onComplete(), 8000), // Complete after 8s
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#0b0b0b] z-50 overflow-hidden">
      {/* Subtle Star Particles */}
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Core Formation (Scene 2+) */}
        <AnimatePresence>
          {scene >= 2 && (
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: scene === 4 ? 0 : 1,
                scale: scene === 4 ? 0.7 : 1
              }}
              transition={{ duration: scene === 4 ? 1.5 : 1.2, ease: 'easeOut' }}
            >
              {/* Outer Glow Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`glow-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: 300 + i * 80,
                    height: 300 + i * 80,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, rgba(16, 185, 129, ${0.15 - i * 0.04}) 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}

              {/* Orbit Lines */}
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={`orbit-${i}`}
                  className="absolute rounded-full border border-emerald-500/20"
                  style={{
                    width: 200 + i * 100,
                    height: 200 + i * 100,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    rotate: i % 2 === 0 ? 360 : -360,
                  }}
                  transition={{
                    duration: 20 + i * 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {/* Orbit dot */}
                  <div 
                    className="absolute w-2 h-2 bg-emerald-400 rounded-full shadow-lg"
                    style={{
                      top: -1,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
                    }}
                  />
                </motion.div>
              ))}

              {/* Core Sphere */}
              <motion.div
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 40% 40%, #34d399 0%, #10b981 40%, #059669 100%)',
                  boxShadow: '0 0 60px rgba(16, 185, 129, 0.6), 0 0 100px rgba(16, 185, 129, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.1)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 60px rgba(16, 185, 129, 0.6), 0 0 100px rgba(16, 185, 129, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.1)',
                    '0 0 80px rgba(16, 185, 129, 0.8), 0 0 140px rgba(16, 185, 129, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.1)',
                    '0 0 60px rgba(16, 185, 129, 0.6), 0 0 100px rgba(16, 185, 129, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.1)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Inner detail ring */}
                <motion.div
                  className="absolute inset-6 rounded-full border-2 border-white/20"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                {/* Core highlight */}
                <div 
                  className="absolute top-6 left-6 w-12 h-12 md:top-8 md:left-8 md:w-16 md:h-16 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, transparent 70%)',
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logo Reveal (Scene 3) */}
        <AnimatePresence>
          {scene >= 3 && scene < 4 && (
            <motion.div
              className="absolute text-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{ top: '60%' }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold mb-4 text-white"
                style={{
                  textShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
                }}
              >
                LaunchScore
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-base md:text-lg text-white/60 font-light"
              >
                The Intelligence Layer for Your Website
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Final Fade to Landing */}
      <AnimatePresence>
        {scene === 4 && (
          <motion.div
            className="absolute inset-0 bg-[#0f0f0f] z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
        )}
      </AnimatePresence>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onComplete}
        className="absolute bottom-8 right-8 px-4 py-2 text-sm text-white/40 hover:text-white/80 transition-colors duration-300 z-20"
      >
        Skip
      </motion.button>
    </div>
  );
};

export default IntroSequence;