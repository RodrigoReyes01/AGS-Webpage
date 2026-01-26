'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import Timeline3D, { TimelineEvent } from '@/components/ui/3d-interactive-timeline';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AboutTimelineSection component
 * Displays company timeline with milestones using 3D interactive timeline
 * Features collapsible view with "See More" button
 */

const AboutTimelineSection: React.FC = () => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  // AGS Timeline events based on company history
  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      date: 'February 2019',
      title: 'AVIATION GROUND SOLUTIONS IS FOUNDED',
      description: 'Aviation Grounds Solution (AGS) was founded in Guatemala. Since its inception, AGS was prepared to offer FBO (Fixed Base Operator) and Ground Handling services, meeting the needs of aircraft on the ground, providing logistical support, fuel services, and other essential facilities for aviation.',
      category: 'Foundation',
    },
    {
      id: '2',
      date: 'March 2019',
      title: 'FIRST FLIGHT OPERATION',
      description: 'The first flight operation marked a significant and defining milestone for the company. During this operation, AGS demonstrated its ability to manage and coordinate all aspects related to the ground handling of an aircraft, including fuel services, logistical support, and attention to the needs of the crew and passengers, ensuring an efficient and safe operation.',
      category: 'Operations',
    },
    {
      id: '3',
      date: 'May 2019',
      title: 'FIRST PRIVATE FLIGHT',
      description: 'AGS served its first private flight. This service included catering, fuel, and FBO (Fixed Base Operator) and Ground Handling services, demonstrating AGS\'s ability to offer a complete and high-quality experience to its private clients.',
      category: 'Service',
    },
    {
      id: '4',
      date: 'June 2019',
      title: 'FIRST SUNWING FLIGHT',
      description: 'Sunwing became AGS\'s first frequent customer, marking an important achievement in the growth of our company. This experience established a continuous and stable relationship with Sunwing, allowing us to regularly provide them with a comprehensive range of Ground Handling services, as well as other customized services to meet their specific needs.',
      category: 'Partnership',
    },
    {
      id: '5',
      date: 'June 2019',
      title: 'FIRST IFL GROUP FLIGHT',
      description: 'Aviation Grounds Solution (AGS) celebrated serving its first flight for IFL Group, marking the start of a new operational relationship. This milestone highlighted AGS\'s growing confidence in AGS\'s FBO and Ground Handling services, reaffirming AGS\'s commitment to excellence and its position as a preferred partner for regional airlines.',
      category: 'Growth',
    },
    {
      id: '6',
      date: 'August 2020',
      title: 'FIRST BUSINESS GROWTH',
      description: 'Aviation Grounds Solution experienced its first significant growth since its founding in 2019. This period was characterized by a notable expansion in the size of our team, reflecting our ability to attract and retain top talent. With the addition of new members to the team, we were able to strengthen our operations and improve the quality of the services offered.',
      category: 'Expansion',
    },
    {
      id: '7',
      date: 'April 2021',
      title: 'FIRST FRONTIER FLIGHT',
      description: 'Aviation Grounds Solution (AGS) celebrated a significant milestone by welcoming Frontier as a second frequent customer. This event marked an important step in consolidating long-standing relationships with key airlines, demonstrating AGS\'s ability to consistently offer high-quality services in FBO (Fixed Base Operator) and Ground Handling.',
      category: 'Partnership',
    },
    {
      id: '8',
      date: 'May 2021',
      title: 'AGS EL SALVADOR OPENING',
      description: 'Aviation Grounds Solution (AGS) officially inaugurated its operation in El Salvador, marking a significant milestone in its regional expansion strategy. The opening of AGS El Salvador represented a key achievement for the company, expanding its presence in Central America, offering FBO (Fixed Base Operator) and Ground Handling services tailored to the specific needs of the Salvadoran market.',
      category: 'Expansion',
    },
    {
      id: '9',
      date: 'May 2021',
      title: 'AGS HONDURAS OPENING',
      description: 'Aviation Grounds Solution (AGS) inaugurated its operation in Honduras, a significant step in its regional expansion strategy. The opening of AGS Honduras represented a key achievement for the company, expanding its presence in Central America and strengthening its ability to offer specialized FBO (Fixed Base Operator) and Ground Handling services in the Honduran market.',
      category: 'Expansion',
    },
    {
      id: '10',
      date: 'October 2022',
      title: '1000 FLIGHTS OPERATED',
      description: 'Aviation Grounds Solution (AGS) reached a significant milestone by completing its 1000th flight operation. This achievement demonstrates the company\'s consistent delivery of high-quality Ground Handling services and operational reliability. The milestone reflects AGS\'s steady growth and dedication to maintaining excellence in the regional aviation services market.',
      category: 'Milestone',
    },
    {
      id: '11',
      date: 'June 2023',
      title: 'FIRST FLAIR AIRLINES FLIGHT',
      description: 'Aviation Grounds Solution (AGS) celebrated a milestone by welcoming Flair Airlines for its first flight, establishing an initial relationship with this airline. This event marked an important step in the expansion of AGS\'s client portfolio and its ability to provide FBO (Fixed Base Operator) and Ground Handling services to a growing variety of airlines.',
      category: 'Partnership',
    },
    {
      id: '12',
      date: 'January 2024',
      title: '5000 FLIGHTS OPERATED',
      description: 'Aviation Grounds Solution (AGS) proudly achieved the remarkable milestone of 5000 flight operations, showcasing exponential growth and unwavering commitment to service excellence. This accomplishment underscores AGS\'s position as a leading provider of Ground Handling services in Central America, demonstrating the trust placed in the company by airlines and operators throughout the region.',
      category: 'Milestone',
    },
    {
      id: '13',
      date: 'June 2024',
      title: 'PLACEHOLDER TITLE',
      description: 'Placeholder description for June 2024 milestone. This will be updated with actual content later.',
      category: 'Growth',
    },
    {
      id: '14',
      date: 'April 2025',
      title: 'PLACEHOLDER TITLE',
      description: 'Placeholder description for April 2025 milestone. This will be updated with actual content later.',
      category: 'Expansion',
    },
    {
      id: '15',
      date: 'October 2025',
      title: 'PLACEHOLDER TITLE',
      description: 'Placeholder description for October 2025 milestone. This will be updated with actual content later.',
      category: 'Achievement',
    },
    {
      id: '16',
      date: '2026',
      title: 'READY TO START OUR 2026 JOURNEY',
      description: 'Placeholder description for 2026. This will be updated with actual content later.',
      category: 'Future',
    },
  ];

  // Show only first 2 events when collapsed
  const visibleEvents = isExpanded ? timelineEvents : timelineEvents.slice(0, 2);

  return (
    <section className="relative w-full py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-gray-900">
          {t('about.timeline.title')}
        </h2>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-center text-gray-600 max-w-4xl mx-auto leading-relaxed">
          {t('about.timeline.subtitle')}
        </p>
      </div>

      {/* Timeline Container with Fade Effect */}
      <div className="relative">
        {/* 3D Interactive Timeline */}
        <Timeline3D
          events={visibleEvents}
          backgroundColor="bg-white"
          primaryColor="bg-brand-blue"
          secondaryColor="bg-cyan-400"
          textColor="text-gray-900"
          accentColor="bg-cyan-400"
          showImages={false}
        />

        {/* Fade Overlay when collapsed */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
        )}
      </div>

      {/* See More / See Less Button */}
      <div className="flex justify-center mt-2">
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{isExpanded ? 'See Less' : 'See More'}</span>
          <motion.svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </motion.button>
      </div>
    </section>
  );
};

export default AboutTimelineSection;
