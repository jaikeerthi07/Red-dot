import fs from 'fs';
import path from 'path';

// Function to load the knowledge base content
export async function loadKnowledgeBase(): Promise<string> {
  try {
    const knowledgeBasePath = path.join(process.cwd(), 'src', 'data', 'knowledge-base.md');
    const content = fs.readFileSync(knowledgeBasePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    return '';
  }
}

// Function to extract relevant sections based on keywords
export async function getRelevantKnowledgeBaseSections(query: string): Promise<string> {
  const fullContent = await loadKnowledgeBase();
  
  if (!fullContent) {
    return '';
  }
  
  // Split content into sections by headers
  const sections = fullContent.split('\n## ');
  
  const relevantSections: string[] = [];
  const queryLower = query.toLowerCase();
  
  // For each section, check if it's relevant to the query
  for (const section of sections) {
    const sectionHeader = section.split('\n')[0];
    const sectionLower = section.toLowerCase();
    
    // Check for specific query types
    let isRelevant = false;
    
    // Contact queries
    if ((queryLower.includes('contact') || queryLower.includes('email') || queryLower.includes('phone')) && 
        (sectionHeader.includes('Contact') || sectionLower.includes('contact') || sectionLower.includes('email') || sectionLower.includes('phone'))) {
      isRelevant = true;
    }
    // Project queries
    else if ((queryLower.includes('project') || queryLower.includes('jarvis')) && 
             (sectionHeader.includes('Project') || sectionLower.includes('project') || sectionLower.includes('jarvis'))) {
      isRelevant = true;
    }
    // Service queries
    else if ((queryLower.includes('service') || queryLower.includes('offer')) && 
             (sectionHeader.includes('Service') || sectionLower.includes('service'))) {
      isRelevant = true;
    }
    // AI queries
    else if (queryLower.includes('ai') && sectionLower.includes('ai')) {
      isRelevant = true;
    }
    // Pricing queries
    else if ((queryLower.includes('price') || queryLower.includes('cost') || queryLower.includes('budget')) && 
             (sectionHeader.includes('Pricing') || sectionLower.includes('price') || sectionLower.includes('cost') || sectionLower.includes('budget') || sectionHeader.includes('Frequently Asked Questions'))) {
      isRelevant = true;
    }
    // Healthcare queries
    else if (queryLower.includes('healthcare') && (sectionLower.includes('medical') || sectionLower.includes('healthcare'))) {
      isRelevant = true;
    }
    // Default: include company overview for general queries
    else if (sectionHeader.includes('Company Overview')) {
      isRelevant = true;
    }
    
    if (isRelevant) {
      relevantSections.push('## ' + section);
    }
  }
  
  // If no specific sections found, include basic info
  if (relevantSections.length === 0) {
    const companySection = sections.find(s => s.startsWith('Company'));
    const servicesSection = sections.find(s => s.startsWith('Services'));
    
    if (companySection) {
      relevantSections.push('## ' + companySection);
    }
    if (servicesSection) {
      relevantSections.push('## ' + servicesSection);
    }
  }
  
  // Limit the content to prevent exceeding context window
  let combinedContent = relevantSections.join('\n\n').substring(0, 3000);
  
  // Add a note if content was truncated
  if (combinedContent.length >= 3000) {
    combinedContent += '\n\n[Content truncated due to length limitations. Please ask more specific questions for detailed information.]';
  }
  
  return combinedContent;
}

// Function to get a summarized version of the knowledge base for context
export async function getKnowledgeBaseSummary(): Promise<string> {
  const fullContent = await loadKnowledgeBase();
  
  // If we can't load the full content, return a basic summary
  if (!fullContent) {
    return `REDDOT.co.in is an AI development company founded by Jai Keerthi in Chennai, India. 
    We specialize in AI Agents, Multi-Agent Systems, AI SaaS Applications, AI Chatbots, and AI Education. 
    Our key services include AI automation, SaaS applications, AI-powered websites/mobile apps, 
    content creation, internship programs, embedded IoT systems, data analytics, voice/vision apps, 
    and education/mentorship. We've completed projects like Jarvis AI Assistant, medical diagnosis apps, 
    lead generation agents, HR systems, travel planning apps, and social media automation tools.`;
  }
  
  // Extract key sections for a concise summary
  const sections = fullContent.split('## ');
  const keySections = sections.filter(section => 
    section.startsWith('Company Overview') || 
    section.startsWith('Services') || 
    section.startsWith('Key Projects') ||
    section.startsWith('Technologies')
  );
  
  return keySections.map(section => `## ${section}`).join('\n\n');
}

// Function to search the knowledge base for specific information
export async function searchKnowledgeBase(query: string): Promise<string> {
  const fullContent = await loadKnowledgeBase();
  
  if (!fullContent) {
    return '';
  }
  
  // Simple keyword-based search (in a production environment, you might want to use
  // more sophisticated search algorithms or vector databases)
  const lines = fullContent.split('\n');
  const results: string[] = [];
  let currentSection = '';
  
  for (const line of lines) {
    // Track section headers
    if (line.startsWith('## ')) {
      currentSection = line.substring(3).trim();
    }
    
    // Check if the line contains query keywords (case insensitive)
    if (line.toLowerCase().includes(query.toLowerCase()) && line.trim() !== '') {
      results.push(`[${currentSection}] ${line.trim()}`);
    }
    
    // Limit results to prevent overwhelming the context
    if (results.length >= 10) {
      break;
    }
  }
  
  return results.join('\n');
}

// Function to get service-specific information
export async function getServiceInfo(serviceName: string): Promise<string> {
  const fullContent = await loadKnowledgeBase();
  
  if (!fullContent) {
    return '';
  }
  
  const sections = fullContent.split('### ');
  const serviceSection = sections.find(section => 
    section.toLowerCase().includes(serviceName.toLowerCase())
  );
  
  return serviceSection ? `### ${serviceSection}` : '';
}

// Function to get project-specific information
export async function getProjectInfo(projectName: string): Promise<string> {
  const fullContent = await loadKnowledgeBase();
  
  if (!fullContent) {
    return '';
  }
  
  const sections = fullContent.split('### ');
  const projectSection = sections.find(section => 
    section.toLowerCase().includes(projectName.toLowerCase())
  );
  
  return projectSection ? `### ${projectSection}` : '';
}