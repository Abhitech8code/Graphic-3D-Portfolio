import { useState } from 'react';
import { useInView } from '@/hooks/useScrollProgress';
import {
  Download,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Palette,
  Monitor,
  Smartphone,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

interface Certification {
  name: string;
  provider: string;
  year: string;
  hours?: string;
}

const experiences: Experience[] = [
  {
    company: 'Pump Nation Fitness',
    location: 'Gurugram',
    role: 'Graphic Designer | System Support Engineer | Sales & CRM Executive',
    period: 'July 2025 – Present',
    description: 'Leading creative and technical operations for a premier fitness brand with Cult Fit & Fitpass tie-up.',
    achievements: [
      'Designed high-impact marketing creatives for social media, banners, posters, and promotions',
      'Managed complete visual branding and design communication',
      'Handled CRM systems for lead tracking, follow-ups, and memberships',
      'Provided on-site IT and system support',
    ],
  },
  {
    company: 'Netra Kumbh – Maha Kumbh 2025',
    location: 'Prayagraj',
    role: 'Testing Engineer & IT Support',
    period: 'Jan 2025 – Feb 2025',
    description: 'Contributed to one of the largest spiritual gatherings in the world.',
    achievements: [
      'Designed and managed digital visual assets for event displays and dashboards',
      'Created banners, posters, and informational graphics for on-site and digital use',
      'Supported visual layout alignment and UI presentation for system interfaces',
    ],
  },
];

const educations: Education[] = [
  {
    degree: "O' Level Diploma – Computer Science",
    institution: 'NIELIT Delhi',
    period: '2018 – 2020',
    details: 'Comprehensive computer science diploma covering programming fundamentals',
  },
  {
    degree: 'Bachelor of Arts – Political Science',
    institution: 'CSJMU Kanpur',
    period: '2016 – 2018',
    details: 'Developed critical thinking and analytical skills',
  },
];

const certifications: Certification[] = [
  {
    name: 'Front-End Web Development Bootcamp',
    provider: 'Udemy',
    year: '2023',
  },
  {
    name: 'Responsive Web Design Certification',
    provider: 'FreeCodeCamp',
    year: '2022',
    hours: '300+ Hours',
  },
];

const skills = [
  { name: 'Graphic Design', percentage: 88, icon: Palette },
  { name: 'Web Design', percentage: 85, icon: Monitor },
  { name: 'Programming', percentage: 73, icon: Code },
  { name: 'UI/UX Design', percentage: 80, icon: Smartphone },
];

function SkillBar({ skill, index, isInView }: { skill: typeof skills[0]; index: number; isInView: boolean }) {
  const Icon = skill.icon;
  return (
    <div
      className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-neon-cyan" />
        </div>
        <span className="font-rajdhani text-cyan-100">{skill.name}</span>
        <span className="ml-auto font-orbitron text-neon-cyan">{skill.percentage}%</span>
      </div>
      <div className="h-2 bg-black/40 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-neon-cyan to-neon-orange rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isInView ? `${skill.percentage}%` : '0%',
            transitionDelay: `${index * 100 + 300}ms`,
          }}
        />
      </div>
    </div>
  );
}

function TimelineItem({
  item,
  index,
  isInView,
  type,
}: {
  item: Experience | Education | Certification;
  index: number;
  isInView: boolean;
  type: 'work' | 'education' | 'cert';
}) {
  const isWork = type === 'work';
  const isEducation = type === 'education';
  const isCert = type === 'cert';

  return (
    <div
      className={`relative pl-8 pb-8 border-l-2 border-neon-cyan/30 last:pb-0 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Timeline Dot */}
      <div
        className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full border-2 border-neon-cyan bg-black"
        style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}
      />

      <div className="glass-panel rounded-xl p-5 hover:border-neon-cyan/50 transition-all duration-300">
        {isWork && (
          <>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-rajdhani bg-neon-orange/20 text-neon-orange rounded-full">
                {(item as Experience).period}
              </span>
              <span className="px-3 py-1 text-xs font-rajdhani bg-neon-cyan/20 text-neon-cyan rounded-full">
                {(item as Experience).location}
              </span>
            </div>
            <h3 className="font-orbitron text-lg text-white mb-1">{(item as Experience).company}</h3>
            <p className="text-neon-cyan font-rajdhani text-sm mb-3">{(item as Experience).role}</p>
            <p className="text-cyan-100/60 text-sm mb-3">{(item as Experience).description}</p>
            <ul className="space-y-2">
              {(item as Experience).achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-cyan-100/70">
                  <CheckCircle className="w-4 h-4 text-neon-orange mt-0.5 flex-shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {isEducation && (
          <>
            <span className="px-3 py-1 text-xs font-rajdhani bg-neon-cyan/20 text-neon-cyan rounded-full">
              {(item as Education).period}
            </span>
            <h3 className="font-orbitron text-lg text-white mt-2 mb-1">{(item as Education).degree}</h3>
            <p className="text-neon-orange font-rajdhani text-sm">{(item as Education).institution}</p>
            {(item as Education).details && (
              <p className="text-cyan-100/60 text-sm mt-2">{(item as Education).details}</p>
            )}
          </>
        )}

        {isCert && (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-rajdhani bg-neon-orange/20 text-neon-orange rounded-full">
                {(item as Certification).year}
              </span>
              {(item as Certification).hours && (
                <span className="px-3 py-1 text-xs font-rajdhani bg-neon-cyan/20 text-neon-cyan rounded-full">
                  {(item as Certification).hours}
                </span>
              )}
            </div>
            <h3 className="font-orbitron text-lg text-white mb-1">{(item as Certification).name}</h3>
            <p className="text-neon-cyan font-rajdhani text-sm">{(item as Certification).provider}</p>
          </>
        )}
      </div>
    </div>
  );
}

export function Resume() {
  const { ref, isInView } = useInView(0.1);
  const downloadBtnMagnetic = useMagneticEffect(0.2);
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'skills'>('experience');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/resume/Abhishek_Shukla_CV.pdf';
    link.download = 'Abhishek_Shukla_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="resume"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-orange/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-orbitron tracking-widest text-neon-orange border border-neon-orange/30 rounded-full">
            CURRICULUM VITAE
          </span>
          <h2 className="font-orbitron text-3xl sm:text-5xl font-bold text-neon-cyan mb-4">
            MY RESUME
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-orange mx-auto mb-6" />

          {/* Download Button */}
          <div
            ref={downloadBtnMagnetic.ref}
            onMouseMove={downloadBtnMagnetic.onMouseMove}
            onMouseLeave={downloadBtnMagnetic.onMouseLeave}
            onMouseEnter={downloadBtnMagnetic.onMouseEnter}
            className="inline-block"
          >
            <button
              onClick={handleDownload}
              className="group relative px-8 py-4 glass-panel rounded-xl overflow-hidden transition-all duration-300 hover:border-neon-cyan"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-orange/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-3 text-neon-cyan group-hover:text-white transition-colors">
                <Download className="w-5 h-5" />
                <span className="font-orbitron text-sm tracking-wider">DOWNLOAD CV</span>
                <FileText className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-10">
          {[
            { id: 'experience', label: 'Experience', icon: Briefcase },
            { id: 'education', label: 'Education', icon: GraduationCap },
            { id: 'skills', label: 'Skills', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-rajdhani font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan'
                    : 'glass-panel text-cyan-400/60 hover:text-cyan-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'experience' && (
              <div className="space-y-0">
                <h3 className="font-orbitron text-xl text-neon-orange mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  WORK EXPERIENCE
                </h3>
                {experiences.map((exp, index) => (
                  <TimelineItem
                    key={index}
                    item={exp}
                    index={index}
                    isInView={isInView}
                    type="work"
                  />
                ))}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-0">
                <h3 className="font-orbitron text-xl text-neon-orange mb-6 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  EDUCATION
                </h3>
                {educations.map((edu, index) => (
                  <TimelineItem
                    key={index}
                    item={edu}
                    index={index}
                    isInView={isInView}
                    type="education"
                  />
                ))}

                <h3 className="font-orbitron text-xl text-neon-orange mb-6 mt-10 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  CERTIFICATIONS
                </h3>
                {certifications.map((cert, index) => (
                  <TimelineItem
                    key={index}
                    item={cert}
                    index={index}
                    isInView={isInView}
                    type="cert"
                  />
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="glass-panel rounded-xl p-8">
                <h3 className="font-orbitron text-xl text-neon-orange mb-8 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  TECHNICAL SKILLS
                </h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <SkillBar key={index} skill={skill} index={index} isInView={isInView} />
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-neon-cyan/20">
                  <h4 className="font-orbitron text-lg text-neon-cyan mb-4">Expertise Areas</h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      'Visual Branding',
                      'Social Media Design',
                      'UI/UX Design',
                      'Web Development',
                      'Motion Graphics',
                      'Print Design',
                      'CRM Management',
                      'IT Support',
                    ].map((area, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-lg bg-neon-cyan/10 text-cyan-400 font-rajdhani text-sm border border-neon-cyan/30"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="glass-panel rounded-xl p-6">
              <h3 className="font-orbitron text-lg text-neon-cyan mb-4">CONTACT INFO</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
                    <Palette className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <div>
                    <p className="text-xs text-cyan-400/60">Role</p>
                    <p className="font-rajdhani text-cyan-100">Graphic Designer / Web Developer</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neon-orange/20 flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-neon-orange" />
                  </div>
                  <div>
                    <p className="text-xs text-cyan-400/60">Experience</p>
                    <p className="font-rajdhani text-cyan-100">3+ Years</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <div>
                    <p className="text-xs text-cyan-400/60">Phone</p>
                    <p className="font-rajdhani text-cyan-100">+91 7052757579</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Card */}
            <div className="glass-panel rounded-xl p-6">
              <h3 className="font-orbitron text-lg text-neon-orange mb-4">AVAILABILITY</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-rajdhani">Open to Work</span>
              </div>
              <p className="text-cyan-100/60 text-sm">
                Currently available for freelance projects and full-time opportunities.
              </p>
            </div>

            {/* View Portfolio Link */}
            <a
              href="#projects"
              className="glass-panel rounded-xl p-6 flex items-center justify-between group hover:border-neon-cyan transition-all"
            >
              <div>
                <h3 className="font-orbitron text-lg text-neon-cyan mb-1">VIEW PORTFOLIO</h3>
                <p className="text-cyan-400/60 text-sm">See my latest work</p>
              </div>
              <ExternalLink className="w-6 h-6 text-neon-cyan group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
