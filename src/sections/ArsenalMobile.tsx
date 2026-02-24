import { motion } from 'framer-motion';
import { useState } from 'react';

const arsenalData = {
  design: {
    name: '🎨 DESIGN',
    color: '#00f0ff',
    tools: ['Canva', 'Photoshop', 'Illustrator', 'After Effects', 'Figma']
  },
  development: {
    name: '💻 DEVELOPMENT',
    color: '#a855f7',
    tools: ['VS Code', 'GitHub', 'React', 'Tailwind', 'Node.js', 'MongoDB', 'Next.js']
  },
  ai: {
    name: '🤖 AI & AUTOMATION',
    color: '#10b981',
    tools: ['ChatGPT', 'Claude', 'Midjourney', 'Runway', 'ElevenLabs', 'n8n', 'Zapier']
  },
  video: {
    name: '🎥 VIDEO & CONTENT',
    color: '#f59e0b',
    tools: ['CapCut', 'Premiere Pro', 'OBS', 'DaVinci Resolve']
  },
  deployment: {
    name: '🚀 DEPLOYMENT',
    color: '#ef4444',
    tools: ['Vercel', 'Netlify', 'Firebase', 'Docker']
  }
};

export function ArsenalMobile() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen py-20 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
            MY DIGITAL ARSENAL
          </h2>
          <p className="text-lg text-cyan-300/70">
            Tools & Technologies Powering My Creative Universe
          </p>
        </motion.div>

        <div className="grid gap-4 max-w-4xl mx-auto">
          {Object.entries(arsenalData).map(([key, data], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <motion.button
                onClick={() => setExpandedCategory(expandedCategory === key ? null : key)}
                className="w-full p-6 rounded-2xl backdrop-blur-xl bg-black/50 border-2 transition-all"
                style={{ borderColor: data.color }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold" style={{ color: data.color }}>
                    {data.name}
                  </h3>
                  <motion.span
                    animate={{ rotate: expandedCategory === key ? 180 : 0 }}
                    className="text-2xl"
                    style={{ color: data.color }}
                  >
                    ▼
                  </motion.span>
                </div>
              </motion.button>

              <motion.div
                initial={false}
                animate={{
                  height: expandedCategory === key ? 'auto' : 0,
                  opacity: expandedCategory === key ? 1 : 0
                }}
                className="overflow-hidden"
              >
                <div className="p-6 flex flex-wrap gap-2">
                  {data.tools.map((tool, i) => (
                    <motion.span
                      key={tool}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur border"
                      style={{ borderColor: data.color, color: data.color }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
