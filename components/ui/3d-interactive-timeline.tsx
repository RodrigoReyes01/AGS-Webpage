import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  category?: string;
  color?: string;
  link?: {
    url: string;
    text: string;
  };
}

interface Timeline3DProps {
  events: TimelineEvent[];
  backgroundColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  accentColor?: string;
  showImages?: boolean;
  className?: string;
}

const defaultColors = {
  background: 'bg-white',
  primary: 'bg-brand-blue',
  secondary: 'bg-cyan-400',
  text: 'text-gray-900',
  accent: 'bg-cyan-400',
};

// Separate component for each timeline item to fix hooks issue
const TimelineItem: React.FC<{
  event: TimelineEvent;
  index: number;
  accentColor: string;
  primaryColor: string;
  activeEvent: string | null;
  setActiveEvent: (id: string | null) => void;
}> = ({ event, index, accentColor, primaryColor, activeEvent, setActiveEvent }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true, // Changed to true for better performance
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`relative mb-2 md:mb-4 ${
        isEven ? 'md:ml-auto' : 'md:mr-auto'
      } md:w-1/2 flex ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          x: isEven ? 50 : -50,
          y: 20,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.8,
            ease: 'easeOut',
          },
        },
      }}
    >
      {/* Timeline node */}
      <div
        className={`absolute left-0 md:left-auto ${
          isEven ? 'md:left-0' : 'md:right-0'
        } top-0 transform md:-translate-x-1/2 ${
          isEven ? 'md:translate-x-0' : 'md:translate-x-0'
        } z-20 hidden md:block`}
      >
        <motion.div
          className={`w-4 h-4 rounded-full ${accentColor} border-4 border-white cursor-pointer shadow-lg`}
          whileHover={{ scale: 1.3 }}
          onClick={() =>
            setActiveEvent(activeEvent === event.id ? null : event.id)
          }
        >
        </motion.div>
      </div>

      {/* Content card */}
      <motion.div
        className={`relative z-10 bg-white rounded-lg overflow-hidden shadow-md w-full ${
          isEven ? 'md:ml-8' : 'md:mr-8'
        } border border-gray-200 p-6`}
        whileHover={{
          y: -3,
          transition: { duration: 0.3 },
        }}
        onMouseEnter={() => setActiveEvent(event.id)}
        onMouseLeave={() => setActiveEvent(null)}
      >
        <div className="flex items-start justify-between mb-3">
          <span className={`text-sm font-semibold ${accentColor.replace('bg-', 'text-')} tracking-wide`}>
            {event.date}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-3 text-gray-900">
          {event.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed">
          {event.description}
        </p>

        {event.link && (
          <a
            href={event.link.url}
            className={`inline-block mt-4 px-4 py-2 ${primaryColor} text-white hover:opacity-80 rounded-lg font-medium transition-all duration-200`}
          >
            {event.link.text}
          </a>
        )}

        <motion.div
          className={`absolute bottom-0 left-0 h-1 ${accentColor}`}
          initial={{ width: '0%' }}
          animate={{ width: activeEvent === event.id ? '100%' : '0%' }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

export const Timeline3D: React.FC<Timeline3DProps> = ({
  events,
  backgroundColor = defaultColors.background,
  primaryColor = defaultColors.primary,
  secondaryColor = defaultColors.secondary,
  textColor = defaultColors.text,
  accentColor = defaultColors.accent,
  showImages = false,
  className = '',
}) => {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      setScrollDirection(st > lastScrollTop ? 'down' : 'up');
      setLastScrollTop(st <= 0 ? 0 : st);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      className={`w-full ${backgroundColor} px-4 sm:px-6 lg:px-8 overflow-hidden ${textColor} ${className}`}
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Main timeline content */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Central line */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 rounded-full hidden md:block`}
            ></div>

            {/* Timeline events */}
            {events.map((event, index) => (
              <TimelineItem
                key={event.id}
                event={event}
                index={index}
                accentColor={accentColor}
                primaryColor={primaryColor}
                activeEvent={activeEvent}
                setActiveEvent={setActiveEvent}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline3D;
