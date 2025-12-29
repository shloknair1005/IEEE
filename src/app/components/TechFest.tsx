import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Event {
  id: number;
  day: number;
  name: string;
  description: string;
  imageUrl: string;
}

const events: Event[] = [
  // Day 1
  {
    id: 1,
    day: 1,
    name: 'Opening Ceremony & Welcome Address',
    description: 'Join us for an inspiring opening ceremony featuring industry leaders.',
    imageUrl: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29uZmVyZW5jZSUyMGtleW5vdGV8ZW58MXx8fHwxNzY3MDA0MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    day: 1,
    name: 'Launch of project Exhibition & Guided Exhibition by industry people',
    description: 'Students and their projects make their first appearance.',
    imageUrl: 'https://images.unsplash.com/photo-1760952851538-17a59f691efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwd29ya3Nob3B8ZW58MXx8fHwxNzY3MDA0MjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    day: 1,
    name: 'Inaugration of Atharva Hackathon.',
    description: 'An Exciting Hackathon commenses.',
    imageUrl: 'https://images.unsplash.com/photo-1638202677704-b74690bb8fa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjBjb2Rpbmd8ZW58MXx8fHwxNzY2OTAzOTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  // Day 2
  {
    id: 4,
    day: 2,
    name: 'Tech Talks',
    description: 'Inspiring Industry Experts Enlighten the Participants.',
    imageUrl: 'https://images.unsplash.com/photo-1702351091399-3ec384341079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5ldCUyMG9mJTIwdGhpbmdzJTIwaW90fGVufDF8fHx8MTc2NzAwNDIxNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    day: 2,
    name: 'CyberSecurity Workshop',
    description: 'Get hands-on experience with the latest cybersecurity tools and techniques.',
    imageUrl: 'https://images.unsplash.com/photo-1562758778-e5638b5b6607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGNvbXBldGl0aW9ufGVufDF8fHx8MTc2NzAwMDIxNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    day: 2,
    name: 'Exhibition walk',
    description: 'Walk among the projects and interact with the students.',
    imageUrl: 'https://images.unsplash.com/photo-1559548084-569fb2087092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NjcwMDQyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  // Day 3
  {
    id: 7,
    day: 3,
    name: 'Industry walk',
    description: 'Explore the latest trends and innovations in the tech industry.',
    imageUrl: 'https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29ya3xlbnwxfHx8fDE3NjY5MTUxNDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 8,
    day: 3,
    name: 'Tech Workshop',
    description: 'Hands-on workshop exploring the latest developments in artificial intelligence and ML algorithms.',
    imageUrl: 'https://images.unsplash.com/photo-1764874299025-d8b2251f307d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGNlcmVtb255JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzY2OTkyNTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 9,
    day: 3,
    name: 'Valedictory & Prize Distribution',
    description: 'Celebrate three days of innovation with awards, networking, and closing remarks.',
    imageUrl: 'https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2xvc2luZyUyMGNlcmVtb255fGVufDF8fHx8MTc2NzAwNDIxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

function EventCard({ event, index }: { event: Event; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Parallax effect for the image
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-[#1a1a1a] border border-purple-500/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
    >
      {/* Event Image with Parallax */}
      <div ref={imageRef} className="w-full h-48 lg:h-56 overflow-hidden relative bg-gradient-to-br from-purple-900/40 to-purple-600/20">
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={event.imageUrl}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Purple overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60" />
      </div>

      {/* Event Content */}
      <div className="p-6">
        <div className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full mb-3">
          <span className="text-purple-300 text-sm">Day {event.day}</span>
        </div>
        <h3 className="text-white text-xl mb-2">{event.name}</h3>
        <p className="text-white/70">{event.description}</p>
      </div>
    </motion.div>
  );
}

export function TechFest() {
  const dayGroups = [
    events.filter(e => e.day === 1),
    events.filter(e => e.day === 2),
    events.filter(e => e.day === 3),
  ];

  return (
    <section id="ieee-techfest" className="bg-[#0a0a0a] py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-white text-4xl lg:text-5xl mb-4 font-bold">
            IEEE TechFest 2025
          </h2>
          <p className="text-white/70 text-lg lg:text-xl max-w-2xl mx-auto">
            Three days of cutting-edge technology, innovation, and collaboration
          </p>
        </div>

        {/* Events by Day */}
        <div className="space-y-16">
          {dayGroups.map((dayEvents, dayIndex) => (
            <div key={dayIndex}>
              <div className="mb-8">
                <h3 className="text-purple-400 text-3xl lg:text-4xl mb-2">
                  Day {dayIndex + 1}
                </h3>
                <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {dayEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}