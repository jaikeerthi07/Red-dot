const fs = require('fs');
const path = require('path');

// Function to load the knowledge base content
async function loadKnowledgeBase() {
  try {
    const knowledgeBasePath = path.join(__dirname, 'src', 'data', 'knowledge-base.md');
    const content = fs.readFileSync(knowledgeBasePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    return '';
  }
}

// Function to extract relevant sections based on keywords
async function getRelevantKnowledgeBaseSections(query) {
  const fullContent = await loadKnowledgeBase();
  
  if (!fullContent) {
    return '';
  }
  
  // Split content into sections by headers
  const sections = fullContent.split('\n## ');
  
  const relevantSections = [];
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

async function testKnowledgeBaseFunctionality() {
  console.log('Testing knowledge base functionality...');
  
  // Test with different queries
  const testQueries = [
    'Tell me about AI Agents',
    'What projects have you worked on?',
    'How can I contact you?',
    'What services do you offer?',
    'Tell me about the Jarvis AI project',
    'What is your pricing model?',
    'Do you work with healthcare industry?'
  ];
  
  for (const query of testQueries) {
    console.log(`\n--- Query: "${query}" ---`);
    const relevantSections = await getRelevantKnowledgeBaseSections(query);
    console.log(`Sections found: ${relevantSections.split('\n## ').length - 1}`);
    if (relevantSections.length > 0) {
      console.log('First 300 characters of relevant sections:');
      console.log(relevantSections.substring(0, 300) + '...');
    } else {
      console.log('No relevant sections found');
    }
  }
}

// Run the test
testKnowledgeBaseFunctionality().catch(console.error);