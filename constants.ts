
import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: 'mern-mastery',
    title: 'Advanced MERN Stack Ecosystem',
    instructor: 'Alex Rivera',
    category: 'Full Stack',
    level: 'Advanced',
    rating: 4.9,
    students: 18400,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    description: 'Deep dive into MongoDB, Express, React, and Node.js. Learn Microservices, WebSockets, and complex state orchestration.',
    lessons: [
      { 
        id: 'm1', 
        title: 'Microservices Architecture with Node', 
        duration: '45:00', 
        content: 'Breaking down the monolith into scalable services.', 
        order: 1,
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
      },
      { 
        id: 'm2', 
        title: 'Real-time Systems with Socket.io', 
        duration: '35:00', 
        content: 'Building bidirectional communication for high-performance apps.', 
        order: 2,
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      }
    ]
  },
  {
    id: 'ds-analytics',
    title: 'Data Science & Predictive Analytics',
    instructor: 'Dr. Sarah Chen',
    category: 'Data Science',
    level: 'Intermediate',
    rating: 4.8,
    students: 12500,
    thumbnail: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=800',
    description: 'Master data mining, predictive modeling, and statistical inference using modern Python tooling.',
    lessons: [
      { id: 'ds1', title: 'Advanced Feature Engineering', duration: '40:00', content: 'Transforming raw data into predictive signals.', order: 1 }
    ]
  },
  {
    id: 'gen-ai-prompt',
    title: 'Gen-AI & Prompt Engineering Pro',
    instructor: 'Marcus Sterling',
    category: 'Artificial Intelligence',
    level: 'Advanced',
    rating: 5.0,
    students: 9200,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    description: 'Master the art of Large Language Models. Build AI Agents and implement RAG (Retrieval Augmented Generation).',
    lessons: [
      { id: 'ga1', title: 'Chain of Thought Prompting', duration: '20:00', content: 'Optimizing reasoning in LLMs for complex tasks.', order: 1 }
    ]
  },
  {
    id: 'fullstack-web',
    title: 'Full Stack Web Development (Next.js 15)',
    instructor: 'Elena Moss',
    category: 'Full Stack',
    level: 'Beginner',
    rating: 4.9,
    students: 21000,
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate guide to modern web. Server Components, Edge Functions, and High-Performance rendering.',
    lessons: [
      { id: 'fs1', title: 'Server Components Deep Dive', duration: '30:00', content: 'Understanding the new paradigm of Next.js.', order: 1 }
    ]
  },
  {
    id: 'dotnet-stack',
    title: '.NET 9 Full Stack Enterprise',
    instructor: 'Jason Voorhees',
    category: 'Development',
    level: 'Advanced',
    rating: 4.7,
    students: 7500,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    description: 'Enterprise grade development with C#, ASP.NET Core, Entity Framework, and Azure Integration.',
    lessons: [
      { id: 'net1', title: 'CQRS and MediatR Patterns', duration: '50:00', content: 'Decoupling logic for maintainable enterprise systems.', order: 1 }
    ]
  },
  {
    id: 'azure-cloud',
    title: 'Azure Solutions Architect Masterclass',
    instructor: 'Cloud Walker',
    category: 'Cloud Computing',
    level: 'Advanced',
    rating: 4.8,
    students: 11200,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    description: 'Design and deploy resilient, scalable, and secure cloud infrastructures on Microsoft Azure.',
    lessons: [
      { id: 'az1', title: 'VNET Peering & Security Centers', duration: '40:00', content: 'Architecting secure global networks.', order: 1 }
    ]
  },
  {
    id: 'cyber-security',
    title: 'Ethical Hacking & Cyber Defense',
    instructor: 'Shadow Byte',
    category: 'Cyber Security',
    level: 'Intermediate',
    rating: 4.9,
    students: 6800,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    description: 'Learn to protect and secure digital assets. Penetration testing, malware analysis, and risk management.',
    lessons: [
      { id: 'cy1', title: 'Web App Pentesting', duration: '55:00', content: 'Finding vulnerabilities before the attackers do.', order: 1 }
    ]
  },
  {
    id: 'qa-testing',
    title: 'QA Testing & Automated Excellence',
    instructor: 'Priya Sharma',
    category: 'Quality Assurance',
    level: 'Beginner',
    rating: 4.6,
    students: 5400,
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800',
    description: 'Master Cypress, Selenium, and Jest. Build robust CI/CD pipelines for automated quality assurance.',
    lessons: [
      { id: 'qa1', title: 'E2E Testing with Playwright', duration: '35:00', content: 'Next-gen cross-browser testing automation.', order: 1 }
    ]
  },
  {
    id: 'power-bi',
    title: 'Power BI: Business Intelligence Elite',
    instructor: 'David Miller',
    category: 'Data Visualization',
    level: 'Beginner',
    rating: 4.8,
    students: 9300,
    thumbnail: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800',
    description: 'Turn data into decisions. Advanced DAX, Power Query, and stunning dashboard architecture.',
    lessons: [
      { id: 'pb1', title: 'Data Modeling for Performance', duration: '40:00', content: 'Structuring datasets for rapid insights.', order: 1 }
    ]
  },
  {
    id: 'dsa-algo',
    title: 'Data Structures & Algorithms Mastery',
    instructor: 'Pro. Alan Knight',
    category: 'Computer Science',
    level: 'Advanced',
    rating: 5.0,
    students: 25000,
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800',
    description: 'Ace technical interviews at Big Tech. Advanced graph theory, DP, and space-time optimization.',
    lessons: [
      { id: 'ds1', title: 'Dynamic Programming Patterns', duration: '60:00', content: 'Solving the unsolvable through memoization.', order: 1 }
    ]
  },
  {
    id: 'android-dev',
    title: 'Native Android: Jetpack Compose',
    instructor: 'Lucia Ferrari',
    category: 'Mobile Development',
    level: 'Intermediate',
    rating: 4.7,
    students: 8100,
    thumbnail: 'https://images.unsplash.com/photo-1521931961826-fe48677230a5?auto=format&fit=crop&q=80&w=800',
    description: 'Build premium Android applications with Kotlin, Coroutines, and Declarative UI.',
    lessons: [
      { id: 'ad1', title: 'State Management in Compose', duration: '35:00', content: 'Flows, Livedata, and MVI architectures.', order: 1 }
    ]
  },
  {
    id: 'ai-ml-bootcamp',
    title: 'Machine Learning & Neural Networks',
    instructor: 'Isaac Newton Jr.',
    category: 'Machine Learning',
    level: 'Advanced',
    rating: 4.9,
    students: 13400,
    thumbnail: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800',
    description: 'Deep Learning with TensorFlow and PyTorch. Computer Vision, NLP, and Reinforcement Learning.',
    lessons: [
      { id: 'ml1', title: 'Backpropagation from Scratch', duration: '45:00', content: 'Understanding the engine of AI.', order: 1 }
    ]
  }
];
