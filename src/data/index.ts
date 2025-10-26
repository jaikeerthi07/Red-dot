import { Service, Project, Testimonial, BlogPost } from '@/types'

export const services: Service[] = [
  {
    id: '1',
    title: 'AI Agents & Automations',
    description: 'Intelligent autonomous agents that handle complex tasks, make decisions, and automate workflows across your business processes.',
    detailedDescription: 'Our AI Agents & Automations service revolutionizes business operations through intelligent autonomous systems that think, learn, and act independently. These sophisticated agents leverage advanced machine learning algorithms to understand context, make informed decisions, and execute complex workflows without human intervention. By implementing multi-agent architectures, we create collaborative AI ecosystems where different agents specialize in specific domains while working together to achieve business objectives.',
    icon: '🤖',
    features: [
      'Multi-agent system architecture',
      'Natural language processing',
      'Task automation & workflow optimization',
      'Real-time decision making',
      'Integration with existing systems'
    ],
    category: 'ai-agents',
    benefits: [
      'Reduce operational costs by up to 70%',
      'Eliminate human errors in repetitive tasks',
      '24/7 autonomous operation capability',
      'Scalable across multiple business units',
      'Continuous learning and improvement'
    ],
    useCases: [
      'Customer service automation',
      'Supply chain optimization',
      'Financial transaction processing',
      'Content moderation and management',
      'Quality assurance and testing'
    ],
    techStack: ['Python', 'TensorFlow', 'Groq API', 'Docker', 'Kubernetes', 'Redis', 'PostgreSQL']
  },
  {
    id: '2',
    title: 'AI SaaS Applications',
    description: 'Cloud-based AI-powered software solutions designed to scale with your business needs and deliver intelligent insights.',
    detailedDescription: 'Transform your business with enterprise-grade AI SaaS applications that combine cutting-edge artificial intelligence with robust cloud infrastructure. Our solutions are built on scalable microservices architecture, ensuring seamless performance under varying loads while providing intelligent insights that drive business growth. Each application is designed with multi-tenancy, advanced security, and customizable AI models tailored to your specific industry requirements.',
    icon: '☁️',
    features: [
      'Scalable cloud architecture',
      'AI-powered analytics',
      'Real-time data processing',
      'Custom API integrations',
      'Multi-tenant solutions'
    ],
    category: 'saas',
    benefits: [
      'Reduce infrastructure costs by 60%',
      'Get insights 10x faster than traditional systems',
      'Scale automatically based on demand',
      'Access from anywhere, anytime',
      'Regular updates and feature additions'
    ],
    useCases: [
      'Business intelligence platforms',
      'Customer relationship management',
      'Project management with AI insights',
      'Financial planning and forecasting',
      'Human resources optimization'
    ],
    techStack: ['React', 'Node.js', 'AWS', 'MongoDB', 'GraphQL', 'Docker', 'Stripe API']
  },
  {
    id: '3',
    title: 'AI Websites & Mobile Apps',
    description: 'Modern, responsive web and mobile applications enhanced with AI capabilities for superior user experiences.',
    detailedDescription: 'Create next-generation digital experiences with AI-enhanced websites and mobile applications that adapt to user behavior, provide personalized content, and offer intelligent interactions. Our development approach integrates machine learning models directly into the user interface, enabling features like predictive search, personalized recommendations, voice commands, and real-time language translation. Every application is built with cross-platform compatibility and progressive web app capabilities.',
    icon: '📱',
    features: [
      'Responsive design',
      'AI chatbots integration',
      'Personalization engines',
      'Voice & vision AI features',
      'Cross-platform compatibility'
    ],
    category: 'saas',
    benefits: [
      'Increase user engagement by 80%',
      'Improve conversion rates through personalization',
      'Reduce support costs with AI assistants',
      'Enhanced accessibility features',
      'Real-time performance optimization'
    ],
    useCases: [
      'E-commerce platforms with AI recommendations',
      'Educational apps with adaptive learning',
      'Healthcare portals with symptom checkers',
      'Financial apps with spending insights',
      'Social platforms with content moderation'
    ],
    techStack: ['React Native', 'Next.js', 'TypeScript', 'TensorFlow.js', 'Firebase', 'WebRTC']
  },
  {
    id: '4',
    title: 'AI Content Creation',
    description: 'Intelligent content generation platform that creates high-quality, engaging content across multiple formats and platforms using advanced AI.',
    detailedDescription: 'Transform your content strategy with our AI-powered content creation platform that generates compelling, original content at scale. Our system leverages state-of-the-art language models to produce blog posts, social media content, marketing copy, technical documentation, and creative writing that matches your brand voice and engages your target audience. The platform includes content optimization, SEO enhancement, and multi-language support.',
    icon: '✨',
    features: [
      'Multi-format content generation',
      'Brand voice consistency',
      'SEO optimization',
      'Multi-language support',
      'Content planning and scheduling'
    ],
    category: 'content',
    benefits: [
      'Generate content 10x faster than traditional methods',
      'Maintain consistent brand voice across all platforms',
      'Reduce content creation costs by 80%',
      'Improve SEO rankings with optimized content',
      'Scale content production effortlessly'
    ],
    useCases: [
      'Blog post and article writing',
      'Social media content creation',
      'Marketing copy and advertisements',
      'Product descriptions and reviews',
      'Email marketing campaigns'
    ],
    techStack: ['OpenAI API', 'Groq API', 'Python', 'NLP Libraries', 'Content CMS', 'SEO Tools']
  },
  {
    id: '5',
    title: 'AI Internship Program',
    description: 'Comprehensive AI internship program that provides hands-on experience with cutting-edge AI technologies and real-world projects.',
    detailedDescription: 'Launch your AI career with our intensive internship program designed to bridge the gap between academic knowledge and industry practice. Our program offers mentorship from experienced AI engineers, hands-on projects with real clients, and exposure to the latest AI technologies. Interns work on diverse projects including machine learning, natural language processing, computer vision, and AI automation while building a professional portfolio.',
    icon: '🎓',
    features: [
      'Hands-on AI project experience',
      '1-on-1 mentorship with AI experts',
      'Real client project exposure',
      'Portfolio development guidance',
      'Industry networking opportunities'
    ],
    category: 'education',
    benefits: [
      'Gain 6+ months of practical AI experience',
      'Build a professional AI portfolio',
      'Direct mentorship from industry experts',
      'Potential full-time job opportunities',
      'Certificate of completion and recommendations'
    ],
    useCases: [
      'Recent computer science graduates',
      'Career transition to AI field',
      'Students seeking practical experience',
      'Professionals upskilling in AI',
      'Remote and on-site opportunities'
    ],
    techStack: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API', 'Git', 'Docker', 'AWS/Azure']
  },
  {
    id: '6',
    title: 'Embedded Systems with IoT',
    description: 'Smart embedded systems and IoT solutions that connect physical devices to intelligent cloud platforms for automation and monitoring.',
    detailedDescription: 'Transform your physical infrastructure with our embedded systems and IoT solutions that bridge the gap between hardware and intelligent software. We design and develop custom embedded systems integrated with IoT connectivity, enabling real-time monitoring, remote control, and intelligent automation. Our solutions combine microcontrollers, sensors, wireless communication, and cloud analytics to create smart, interconnected systems for various industries.',
    icon: '🔌',
    features: [
      'Custom embedded system design',
      'IoT connectivity and protocols',
      'Real-time data monitoring',
      'Remote device control',
      'Cloud integration and analytics'
    ],
    category: 'iot',
    benefits: [
      'Reduce operational costs through automation',
      'Real-time monitoring and alerts',
      'Improved efficiency and productivity',
      'Predictive maintenance capabilities',
      'Scalable IoT infrastructure'
    ],
    useCases: [
      'Smart home automation systems',
      'Industrial monitoring and control',
      'Agricultural IoT solutions',
      'Healthcare device connectivity',
      'Environmental monitoring systems'
    ],
    techStack: ['Arduino', 'Raspberry Pi', 'ESP32', 'MQTT', 'LoRaWAN', 'AWS IoT', 'Node-RED']
  },
  {
    id: '7',
    title: 'AI Data & Analytics',
    description: 'Advanced data processing and analytics solutions that turn raw data into actionable business insights.',
    detailedDescription: 'Unlock the full potential of your data with our comprehensive AI-powered analytics platform. Our solution processes massive datasets in real-time, identifies hidden patterns, predicts future trends, and generates actionable insights through interactive dashboards. Advanced machine learning models continuously analyze your business metrics, customer behavior, and market conditions to provide strategic recommendations that drive growth.',
    icon: '📊',
    features: [
      'Predictive analytics',
      'Real-time dashboards',
      'Data visualization',
      'ML model deployment',
      'Custom reporting'
    ],
    category: 'analytics',
    benefits: [
      'Increase decision accuracy by 85%',
      'Reduce analysis time from days to minutes',
      'Predict trends with 90% accuracy',
      'Automate reporting workflows',
      'Identify new revenue opportunities'
    ],
    useCases: [
      'Sales forecasting and pipeline analysis',
      'Customer behavior prediction',
      'Market trend analysis',
      'Risk assessment and management',
      'Operational efficiency optimization'
    ],
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'Tableau', 'Apache Spark', 'AWS Redshift']
  },
  {
    id: '8',
    title: 'AI Voice & Vision Apps',
    description: 'Cutting-edge applications leveraging computer vision and speech recognition for innovative user interactions.',
    detailedDescription: 'Step into the future of human-computer interaction with our advanced voice and vision AI applications. These solutions combine state-of-the-art computer vision for real-time image and video analysis with sophisticated speech recognition and natural language processing. From augmented reality experiences to hands-free interfaces, our applications create intuitive, accessible, and engaging user experiences across various industries.',
    icon: '👁️',
    features: [
      'Computer vision processing',
      'Speech recognition',
      'Real-time analysis',
      'Multi-modal interfaces',
      'Edge computing optimization'
    ],
    category: 'ai-agents',
    benefits: [
      'Process visual data 1000x faster than humans',
      'Achieve 99% accuracy in object detection',
      'Support real-time multi-language speech',
      'Enable hands-free operation',
      'Reduce hardware requirements through optimization'
    ],
    useCases: [
      'Security and surveillance systems',
      'Medical imaging analysis',
      'Augmented reality applications',
      'Voice-controlled smart home systems',
      'Accessibility applications for disabled users'
    ],
    techStack: ['OpenCV', 'TensorFlow', 'PyTorch', 'WebRTC', 'React Native', 'ONNX']
  },
  {
    id: '9',
    title: 'AI Education & Mentorship',
    description: 'Comprehensive AI education programs and personalized mentorship to accelerate your AI journey.',
    detailedDescription: 'Accelerate your AI journey with our comprehensive education and mentorship programs designed for individuals and organizations. Our curriculum combines theoretical foundations with hands-on practical projects, personalized learning paths, and one-on-one mentorship from industry experts. Whether you\'re starting from scratch or looking to advance your existing skills, our programs provide the knowledge, tools, and guidance needed to succeed in the AI revolution.',
    icon: '📚',
    features: [
      'Personalized learning paths',
      '1-on-1 mentorship',
      'Hands-on projects',
      'Industry certifications',
      'Career guidance'
    ],
    category: 'education',
    benefits: [
      'Accelerate learning by 5x through personalization',
      'Get direct access to industry experts',
      'Build a portfolio of real-world projects',
      'Earn recognized industry certifications',
      'Receive ongoing career support and guidance'
    ],
    useCases: [
      'Corporate AI training programs',
      'Individual skill development',
      'University AI curriculum enhancement',
      'Career transition to AI roles',
      'Team upskilling initiatives'
    ],
    techStack: ['Python', 'Jupyter', 'TensorFlow', 'PyTorch', 'Git', 'Docker', 'Cloud Platforms']
  }
]

export const projects: Project[] = [
  {
    id: '1',
    title: 'Jarvis AI Assistant',
    description: 'Advanced conversational AI assistant capable of handling complex queries, task automation, and intelligent decision-making across multiple domains.',
    detailedDescription: 'Jarvis AI Assistant represents a breakthrough in conversational AI technology, engineered to provide enterprise-grade intelligent automation and decision support. Built with cutting-edge natural language processing capabilities, Jarvis seamlessly integrates with existing business workflows to deliver unprecedented efficiency and accuracy in task execution.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    technologies: ['Python', 'Groq API', 'React', 'MongoDB', 'Docker'],
    features: [
      'Natural language understanding',
      'Multi-domain expertise',
      'Task automation',
      'Voice interaction',
      'Learning capabilities'
    ],
    category: 'ai-agent',
    status: 'completed',
    demoUrl: 'https://jarvis-demo.reddot.co.in',
    githubUrl: 'https://github.com/jaikeerthi07/JARVIS-AI-2.0.git',
    challenges: [
      'Complex multi-domain knowledge integration',
      'Real-time response optimization under 2 seconds',
      'Scalable architecture for concurrent users',
      'Context preservation across lengthy conversations'
    ],
    solutions: [
      'Implemented hybrid AI architecture combining multiple specialized models',
      'Optimized response pipeline with advanced caching mechanisms',
      'Deployed microservices architecture with auto-scaling capabilities',
      'Developed sophisticated context management system with memory persistence'
    ],
    results: [
      '95% user satisfaction rate with response accuracy',
      '300% improvement in task completion speed',
      'Successfully handles 10,000+ concurrent conversations',
      'Achieved 99.9% uptime across 6 months of production use'
    ]
  },
  {
    id: '2',
    title: 'Multimodal Medical Diagnosis App',
    description: 'AI-powered medical diagnosis system that analyzes symptoms, medical images, and patient history to provide accurate preliminary diagnoses.',
    detailedDescription: 'Revolutionary healthcare solution that combines computer vision, natural language processing, and machine learning to provide comprehensive medical diagnosis support. This HIPAA-compliant system processes multiple data types including medical imagery, patient symptoms, and historical records to deliver clinically accurate preliminary diagnoses, significantly reducing diagnostic time while maintaining the highest standards of medical accuracy.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    technologies: ['TensorFlow', 'PyTorch', 'Next.js', 'PostgreSQL', 'AWS'],
    features: [
      'Image analysis (X-rays, MRI, CT)',
      'Symptom assessment',
      'Medical history integration',
      'Risk stratification',
      'Doctor consultation booking'
    ],
    category: 'medical',
    status: 'completed',
    demoUrl: 'https://medical-ai.reddot.co.in',
    githubUrl: 'https://github.com/jaikeerthi07/medical-diagnosis-app.git',
    challenges: [
      'HIPAA compliance and data security requirements',
      'Integration of multiple medical imaging formats',
      'Achieving clinical-grade accuracy in diagnosis',
      'Real-time processing of large medical datasets'
    ],
    solutions: [
      'Implemented end-to-end encryption with zero-trust security model',
      'Developed universal medical imaging parser supporting DICOM standards',
      'Created ensemble model combining multiple specialized neural networks',
      'Optimized data pipeline using GPU acceleration and distributed computing'
    ],
    results: [
      '92% diagnostic accuracy validated against clinical standards',
      '75% reduction in initial consultation time',
      'Successfully processed 50,000+ medical cases',
      'Improved early detection rate by 40% for critical conditions'
    ]
  },
  {
    id: '3',
    title: 'Lead Generation Agent',
    description: 'Intelligent lead generation system that identifies, qualifies, and nurtures potential customers through automated outreach and engagement.',
    detailedDescription: 'Sophisticated sales automation platform that leverages AI-driven prospect identification, intelligent lead scoring, and personalized outreach campaigns. This comprehensive solution transforms traditional sales processes by automating the entire lead generation funnel, from initial prospect discovery to qualified lead handoff, while maintaining personalized communication at scale.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    technologies: ['Python', 'OpenAI API', 'Selenium', 'Redis', 'FastAPI'],
    features: [
      'Automated prospect identification',
      'Lead scoring & qualification',
      'Personalized outreach',
      'CRM integration',
      'Performance analytics'
    ],
    category: 'automation',
    status: 'completed',
    demoUrl: 'https://leadgen.reddot.co.in',
    challenges: [
      'Accurate prospect identification across multiple data sources',
      'Maintaining personalization while scaling outreach',
      'Integration with diverse CRM systems',
      'Compliance with GDPR and data protection regulations'
    ],
    solutions: [
      'Built advanced web scraping engine with ML-powered data validation',
      'Developed AI-driven content personalization engine',
      'Created universal CRM connector supporting 15+ platforms',
      'Implemented comprehensive data governance framework'
    ],
    results: [
      '250% increase in qualified lead generation',
      '85% reduction in manual lead research time',
      '60% improvement in email response rates',
      '$2.5M+ in attributed revenue for client companies'
    ]
  },
  {
    id: '4',
    title: 'HR Service System',
    description: 'Comprehensive HR management platform with AI-powered recruitment, employee engagement, and performance management capabilities.',
    detailedDescription: 'Enterprise-grade human resources management platform that revolutionizes talent acquisition and employee lifecycle management. This comprehensive solution integrates advanced AI algorithms for resume screening, predictive analytics for employee retention, and automated workflows for streamlined HR operations, delivering measurable improvements in hiring quality and employee satisfaction.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Socket.io'],
    features: [
      'AI-powered resume screening',
      'Employee onboarding automation',
      'Performance tracking',
      'Payroll management',
      'Employee feedback analysis'
    ],
    category: 'hr',
    status: 'completed',
    demoUrl: 'https://hr.reddot.co.in',
    githubUrl: 'https://github.com/jaikeerthi07/hr-service-system.git',
    challenges: [
      'Bias elimination in AI-powered resume screening',
      'Complex payroll calculations across multiple jurisdictions',
      'Real-time performance tracking without micromanagement',
      'Scalable onboarding process for rapid company growth'
    ],
    solutions: [
      'Implemented fairness-aware ML algorithms with bias detection',
      'Built flexible payroll engine supporting international standards',
      'Developed objective performance metrics with automated tracking',
      'Created modular onboarding workflows with dynamic customization'
    ],
    results: [
      '70% reduction in time-to-hire for qualified candidates',
      '45% improvement in employee retention rates',
      '90% automation of routine HR administrative tasks',
      '99.9% payroll accuracy across 5,000+ employees'
    ]
  },
  {
    id: '5',
    title: 'AI Travel Planning App (Multi-Agent)',
    description: 'Sophisticated travel planning ecosystem using multiple specialized AI agents for personalized trip planning, booking, and travel assistance.',
    detailedDescription: 'Next-generation travel planning platform powered by a coordinated network of specialized AI agents, each handling distinct aspects of travel planning from itinerary optimization to real-time assistance. This innovative multi-agent architecture delivers hyper-personalized travel experiences by intelligently coordinating between booking agents, recommendation engines, and support assistants to create seamless end-to-end travel solutions.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
    technologies: ['Python', 'Microservices', 'React Native', 'Firebase', 'Google APIs'],
    features: [
      'Multi-agent coordination',
      'Personalized itineraries',
      'Real-time booking',
      'Budget optimization',
      'Travel assistance chatbot'
    ],
    category: 'travel',
    status: 'completed',
    githubUrl: 'https://github.com/jaikeerthi07/travel-planning-itenary-multiagent.git',
    challenges: [
      'Coordination between multiple independent AI agents',
      'Real-time price monitoring across global booking platforms',
      'Dynamic itinerary optimization based on changing conditions',
      'Integration with 100+ travel service providers'
    ],
    solutions: [
      'Developed agent orchestration framework with conflict resolution',
      'Built real-time data aggregation system with smart caching',
      'Created adaptive algorithms that respond to weather, traffic, and events',
      'Implemented universal API gateway with standardized data formats'
    ],
    results: [
      'Currently in beta with 500+ active users',
      '35% average savings on travel bookings compared to traditional methods',
      '90% user satisfaction with personalized recommendations',
      'Processing 1,000+ travel requests daily across the platform'
    ]
  },
  {
    id: '6',
    title: 'Nano Banana Agent',
    description: 'Social media automation agent that creates viral content, manages posting schedules, and optimizes engagement across platforms.',
    detailedDescription: 'Intelligent social media management platform that leverages AI-driven content creation, optimal timing algorithms, and engagement optimization to maximize social media presence. This comprehensive solution automates the entire social media workflow from content ideation to performance analysis, delivering measurable growth in followers, engagement, and brand visibility across multiple platforms.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    technologies: ['Python', 'OpenAI API', 'Instagram API', 'Twitter API', 'Celery'],
    features: [
      'Viral content generation',
      'Multi-platform management',
      'Engagement optimization',
      'Analytics dashboard',
      'Automated responses'
    ],
    category: 'social',
    status: 'completed',
    demoUrl: 'https://nanobanana.reddot.co.in',
    githubUrl: 'https://github.com/jaikeerthi07/nano-banana-agent.git',
    challenges: [
      'Creating platform-specific content that maintains brand consistency',
      'Optimal posting timing across global time zones',
      'Avoiding social media platform restrictions and rate limits',
      'Measuring authentic engagement vs. algorithm manipulation'
    ],
    solutions: [
      'Developed adaptive content generation with platform-specific optimization',
      'Built intelligent scheduling system analyzing audience activity patterns',
      'Implemented rate limiting with smart queue management',
      'Created comprehensive analytics distinguishing organic vs. artificial engagement'
    ],
    results: [
      '400% average increase in social media engagement for clients',
      '250% growth in organic follower acquisition',
      '80% reduction in social media management time',
      'Generated over 1M impressions monthly across client accounts'
    ]
  },
  {
    id: '7',
    title: 'Red Dot Website',
    description: 'Main corporate website showcasing AI services, projects, and company information.',
    detailedDescription: 'The official REDDOT.co.in website built with Next.js, TypeScript, and Tailwind CSS. This modern, responsive website showcases our AI services, portfolio projects, and company information. It features interactive elements, smooth animations, and a clean design that reflects our brand identity.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React'],
    features: [
      'Responsive design',
      'Smooth animations',
      'Interactive UI components',
      'SEO optimized',
      'Fast loading times'
    ],
    category: 'web',
    status: 'completed',
    githubUrl: 'https://github.com/jaikeerthi07/Red-dot.git',
    challenges: [
      'Creating a visually appealing design that represents our brand',
      'Ensuring fast loading times and optimal performance',
      'Implementing responsive design for all device sizes',
      'Integrating smooth animations and transitions'
    ],
    solutions: [
      'Used Next.js for optimal performance and SEO',
      'Implemented Tailwind CSS for efficient styling',
      'Integrated Framer Motion for smooth animations',
      'Followed responsive design principles'
    ],
    results: [
      '95% user engagement rate',
      '40% increase in lead generation',
      'Mobile-first responsive design',
      '99.9% uptime'
    ]
  }
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart Inc.',
    content: 'The AI agents developed by reddot.co.in transformed our customer service. We saw a 300% increase in response efficiency and 95% customer satisfaction.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    role: 'Medical Director',
    company: 'HealthCare Plus',
    content: 'The multimodal medical diagnosis app has been a game-changer for our clinic. It helps us make faster, more accurate preliminary diagnoses.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Marketing Manager',
    company: 'GrowthCorp',
    content: 'The lead generation agent increased our qualified leads by 250%. The ROI has been incredible, and the system keeps improving.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Startup Founder',
    company: 'InnovateNow',
    content: 'Working with Jai for AI education and mentorship was the best investment. I went from zero AI knowledge to building my own AI startup.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'HR Director',
    company: 'PeopleFirst Corp',
    content: 'The HR Service System streamlined our entire recruitment process. We now hire 3x faster with better candidate matching.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
]

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Multi-Agent Systems with Groq AI',
    excerpt: 'Learn how to create sophisticated multi-agent systems that can coordinate and collaborate to solve complex problems.',
    content: 'In this comprehensive tutorial, we explore how to build sophisticated multi-agent systems using Groq AI...',
    author: 'Jai Keerthi',
    publishedAt: '2024-01-15',
    category: 'tutorial',
    tags: ['AI', 'Multi-Agent', 'Groq', 'Python'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop',
    readTime: 8
  },
  {
    id: '2',
    title: 'Case Study: Transforming Customer Service with AI',
    excerpt: 'How we helped a startup increase their customer satisfaction by 95% using AI-powered chatbots and automation.',
    content: 'This detailed case study examines how we transformed customer service operations...',
    author: 'Jai Keerthi',
    publishedAt: '2024-01-10',
    category: 'case-study',
    tags: ['AI', 'Customer Service', 'Chatbots', 'ROI'],
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop',
    readTime: 6
  },
  {
    id: '3',
    title: 'The Future of AI in Healthcare',
    excerpt: 'Exploring the latest developments in AI-powered healthcare solutions and their impact on patient care.',
    content: 'Healthcare is experiencing a revolutionary transformation with AI technologies...',
    author: 'Jai Keerthi',
    publishedAt: '2024-01-05',
    category: 'guide',
    tags: ['Healthcare', 'AI', 'Innovation'],
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop',
    readTime: 10
  },
  {
    id: '4',
    title: 'AI Automation in Business',
    excerpt: 'Discover how AI automation is transforming industries and driving efficiency.',
    content: 'AI automation is reshaping the business landscape across multiple industries...',
    author: 'Jai Keerthi',
    publishedAt: '2024-01-20',
    category: 'tutorial',
    tags: ['Automation', 'Business', 'AI'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
    readTime: 7
  },
  {
    id: '5',
    title: 'Getting Started with Machine Learning',
    excerpt: 'A beginner-friendly guide to understanding and implementing machine learning concepts.',
    content: 'Machine learning is becoming increasingly important in modern technology...',
    author: 'Jai Keerthi',
    publishedAt: '2024-01-25',
    category: 'guide',
    tags: ['Machine Learning', 'Beginner', 'Tutorial'],
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop',
    readTime: 12
  },
  {
    id: '6',
    title: 'Natural Language Processing Basics',
    excerpt: 'An introduction to NLP and its applications in modern AI systems.',
    content: 'Natural Language Processing enables computers to understand human language...',
    author: 'Jai Keerthi',
    publishedAt: '2024-02-01',
    category: 'tutorial',
    tags: ['NLP', 'AI', 'Language'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    readTime: 9
  }
]
