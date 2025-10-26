const http = require('http');

// Test different chat queries
const testQueries = [
  { message: "Tell me about AI Agents", description: "AI Agents query" },
  { message: "What projects have you worked on?", description: "Projects query" },
  { message: "How can I contact you?", description: "Contact query" },
  { message: "What services do you offer?", description: "Services query" },
  { message: "Tell me about the Jarvis AI project", description: "Jarvis project query" }
];

async function testChatAPI() {
  console.log('Testing chat API with different queries...\n');
  
  for (const { message, description } of testQueries) {
    console.log(`--- Testing: ${description} ---`);
    console.log(`Query: "${message}"`);
    
    try {
      // Make a request to the chat API
      const postData = JSON.stringify({ message });
      
      const options = {
        hostname: 'localhost',
        port: 3009,
        path: '/api/chat',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };
      
      const req = http.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            console.log(`Mode: ${response.mode}`);
            console.log(`Response: ${response.response.substring(0, 150)}...\n`);
          } catch (e) {
            console.log(`Raw response: ${data.substring(0, 150)}...\n`);
          }
        });
      });
      
      req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}\n`);
      });
      
      req.write(postData);
      req.end();
      
    } catch (error) {
      console.error(`Error testing ${description}:`, error.message, '\n');
    }
    
    // Add a small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
}

testChatAPI();