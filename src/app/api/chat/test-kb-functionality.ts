import { getRelevantKnowledgeBaseSections } from '@/lib/knowledge-base';

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
    console.log(`Sections found: ${relevantSections.split('\\n## ').length - 1}`);
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