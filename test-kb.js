const fs = require('fs');
const path = require('path');

// Simple test to check knowledge base processing
async function testKnowledgeBase() {
  console.log('Testing knowledge base functionality...');
  
  try {
    // Load knowledge base content
    const knowledgeBasePath = path.join(__dirname, 'src', 'data', 'knowledge-base.md');
    const content = fs.readFileSync(knowledgeBasePath, 'utf-8');
    console.log('Knowledge base loaded successfully. Length:', content.length);
    
    // Test section splitting
    const sections = content.split('\n## ');
    console.log('Number of sections found:', sections.length);
    
    // Show first few section headers
    console.log('First 5 section headers:');
    for (let i = 0; i < Math.min(5, sections.length); i++) {
      const header = sections[i].split('\n')[0];
      console.log(`${i + 1}. ${header}`);
    }
    
    // Test keyword mapping logic
    const keywordMapping = {
      'service': ['Services', 'AI Agents', 'SaaS', 'Websites', 'Mobile Apps', 'Content Creation', 'Internship', 'Embedded', 'Data', 'Voice', 'Education'],
      'project': ['Projects', 'Jarvis', 'Medical', 'Lead Generation', 'HR', 'Travel', 'Nano Banana'],
      'company': ['Company', 'Overview', 'Founder', 'Jai', 'Jagadish'],
      'technology': ['Technologies', 'Programming', 'AI/ML', 'Web', 'Mobile', 'Cloud', 'Databases', 'DevOps', 'IoT'],
      'contact': ['Contact', 'Email', 'Phone', 'Location'],
      'pricing': ['Pricing', 'Cost', 'Budget'],
      'ai': ['AI', 'Artificial Intelligence', 'Machine Learning'],
      'education': ['Education', 'Mentorship', 'Internship', 'Training']
    };
    
    // Test with different queries
    const testQueries = [
      'Tell me about AI Agents',
      'What projects have you worked on?',
      'How can I contact you?',
      'What services do you offer?',
      'Tell me about the Jarvis AI project'
    ];
    
    console.log('\nTesting keyword matching:');
    for (const query of testQueries) {
      console.log(`\nQuery: "${query}"`);
      const queryLower = query.toLowerCase();
      let matchedCategories = [];
      
      for (const [category, keywords] of Object.entries(keywordMapping)) {
        if (queryLower.includes(category) || keywords.some(kw => queryLower.includes(kw.toLowerCase()))) {
          matchedCategories.push(category);
        }
      }
      
      console.log(`Matched categories: ${matchedCategories.join(', ') || 'None'}`);
    }
    
  } catch (error) {
    console.error('Error testing knowledge base:', error.message);
  }
}

testKnowledgeBase();