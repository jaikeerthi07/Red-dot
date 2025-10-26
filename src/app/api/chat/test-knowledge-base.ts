import { getRelevantKnowledgeBaseSections } from '@/lib/knowledge-base';

async function testKnowledgeBase() {
  console.log('Testing knowledge base functionality...');
  
  // Test with different queries
  const testQueries = [
    'Tell me about AI Agents',
    'What projects have you worked on?',
    'How can I contact you?',
    'What services do you offer?',
    'Tell me about the Jarvis AI project'
  ];
  
  for (const query of testQueries) {
    console.log(`\nQuery: "${query}"`);
    const relevantSections = await getRelevantKnowledgeBaseSections(query);
    console.log(`Relevant sections length: ${relevantSections.length} characters`);
    if (relevantSections.length > 0) {
      console.log('First 200 characters of relevant sections:');
      console.log(relevantSections.substring(0, 200) + '...');
    }
  }
}

// Run the test
testKnowledgeBase().catch(console.error);