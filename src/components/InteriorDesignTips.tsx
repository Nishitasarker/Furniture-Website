"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, CheckCircle2 } from "lucide-react";

const Modal = ({ post, onClose }: { post: any; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div 
      className="bg-white rounded-3xl p-8 max-w-2xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"><X size={20} /></button>
      
      <img src={post.image} alt={post.title} className="w-full h-72 object-cover rounded-2xl mb-6 shadow-md" />
      <h2 className="text-3xl font-bold mb-4 text-gray-900">{post.title}</h2>
      
           <div className="space-y-6 text-gray-700">
        <p className="text-lg leading-relaxed">{post.fullDetails}</p>
        
        <div>
          <h4 className="font-bold text-xl mb-3 text-orange-500">How to implement this:</h4>
          <ul className="space-y-3">
            {post.steps.map((step: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={18} />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isPaused, setIsPaused] = useState(false);

 
  const posts = [
    { 
      id: 1, 
      title: "Minimalist Decor", 
      excerpt: "Make small areas look spacious.", 
      fullDetails: "Minimalism is about making space for what matters. It creates a serene and clutter-free environment.", 
      steps: ["Use light, neutral color palettes.", "Choose furniture with visible legs to increase floor visibility.", "Keep surfaces free of excess decorative items.", "Invest in hidden storage solutions."],
      image: "/Drawing-Room-Ideas.jpg" 
    },
    { 
      id: 2, 
      title: "Perfect Sofa Selection", 
      excerpt: "Comfort meets style.", 
      fullDetails: "A sofa is the centerpiece of your living room. Getting the right one transforms the entire room's vibe.", 
      steps: ["Measure the room and doorway width before buying.", "Select a fabric based on your lifestyle (durable for kids/pets).", "Test the depth of the seat for comfort.", "Choose a color that anchors the room."],
      image: "/l-shape-sofa-design_.jpg" 
    },
    { 
        id: 3, 
        title: "Eco-Friendly Living", 
        excerpt: "Sustainable furniture choices.", 
        fullDetails: "Eco-friendly furniture is durable and carries a lower carbon footprint.", 
        steps: ["Look for certifications like FSC (Forest Stewardship Council).", "Choose bamboo or reclaimed wood materials.", "Opt for natural fabrics like cotton or linen.", "Support local artisans to reduce transport emissions."],
        image: "/Eco.png" 
      },
      { 
      id: 4, 
      title: "Lighting Essentials", 
      excerpt: "Master the fine art of layering room lights.", 
      fullDetails: "Lighting is the most powerful tool in interior design. Layering different light sources creates deep atmosphere, warmth, and high functionality.", 
      steps: ["Combine ambient, task, and accent lighting for deep layers.", "Use warm yellow lights (2700K) for cozy bedroom & living areas.", "Install dimmers to easily shift the mood from day to night.", "Place strategic floor lamps in empty corners to open up space."],
      image: "/evening-lights.jpg" 
    },
    { 
      id: 5, 
      title: "Color Psychology", 
      excerpt: "How wall colors affect mood and lifestyle.", 
      fullDetails: "Colors have a direct and profound impact on human psychology, energy levels, productivity, and overall mental peace.", 
      steps: ["Choose soft blues or greens for a relaxing bedroom environment.", "Use vibrant yellows or oranges in creative home workspaces.", "Keep living rooms balanced with warm beige or off-white tones.", "Test paint swatches on the wall under daylight before painting."],
      image: "/color-psychology.jpg" 
    },
    { 
      id: 6, 
      title: "Vertical Storage Hacks", 
      excerpt: "Utilize your wall space to keep rooms tidy.", 
      fullDetails: "When floor space is tightly limited, look up! Vertical styling keeps your floor uncluttered while adding a premium design element.", 
      steps: ["Install floating open shelves for books and small indoor plants.", "Go for floor-to-ceiling custom wardrobes to maximize space.", "Use wall-mounted key holders and floating entertainment units.", "Hang geometric mirrors to reflect light and create depth."],
      image: "/vertical-storage.jpg" 
    },
    { 
      id: 7, 
      title: "Rug & Textile Magic", 
      excerpt: "Tie your room together with soft textures.", 
      fullDetails: "Rugs and curtains act as the unifying layers of a room. They absorb echoes, bring soft textures, and visually frame your furniture layouts.", 
      steps: ["Ensure the rug is large enough so front legs of furniture rest on it.", "Hang curtains high and wide to make windows appear larger.", "Layer different fabrics like velvet cushions on a linen sofa.", "Stick to a single accent color theme for all room textiles."],
      image: "/rug-textiles.jpg" 
    }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Interior Design Tips</h2>
      
      <motion.div 
        className="flex gap-8"
       animate={isPaused ? { x: 0 } : { x: ["0%", "-33.33%"] }}
     transition={{  duration: 20, ease: "linear", repeat: Infinity  }}
      >
       {[...posts, ...posts, ...posts].map((post, index) => (
         <div key={index} className="w-[350px] flex-shrink-0 bg-gray-50 border border-gray-100 rounded-3xl p-6 shadow-sm">            <img src={post.image} className="w-full h-40 object-cover rounded-2xl mb-4" />
            <h3 className="text-xl text-gray-800 font-bold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4 h-12 overflow-hidden">{post.excerpt}</p>
            <button 
              onClick={() => { setSelectedPost(post); setIsPaused(true); }}
              className="text-orange-500 font-bold flex items-center gap-2"
            >
              Learn How <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedPost && (
          <Modal post={selectedPost} onClose={() => { setSelectedPost(null); setIsPaused(false); }} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogSection;