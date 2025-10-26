const { exec } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting Railway deployment preparation...');

// Check if railway.json exists, if not create it
if (!fs.existsSync('railway.json')) {
    console.log('📝 Creating railway.json configuration file...');
    const railwayConfig = {
        "$schema": "https://railway.app/railway.schema.json",
        "build": {
            "builder": "NIXPACKS"
        },
        "deploy": {
            "startCommand": "npm start",
            "restartPolicyType": "ON_FAILURE",
            "restartPolicyMaxRetries": 10
        }
    };
    
    fs.writeFileSync('railway.json', JSON.stringify(railwayConfig, null, 2));
    console.log('✅ Created railway.json');
}

// Commands to execute
const commands = [
    'git add .',
    'git commit -m "Prepare for Railway deployment"',
    'git push origin main'
];

console.log('📡 Preparing to deploy to Railway...');
console.log('This will:');
console.log('1. Add all files to git');
console.log('2. Commit changes');
console.log('3. Push code to GitHub');

// Execute commands
let i = 0;
function executeCommand() {
    if (i >= commands.length) {
        console.log('✅ Deployment preparation completed!');
        console.log('\nNext steps:');
        console.log('1. Go to https://railway.app/new');
        console.log('2. Sign in with GitHub');
        console.log('3. Select your reddot-website repository');
        console.log('4. Railway will automatically detect and deploy your Next.js app');
        console.log('5. Add environment variables in the Railway dashboard');
        return;
    }
    
    const command = commands[i];
    console.log(`\nExecuting: ${command}`);
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`❌ Error: ${error.message}`);
            return;
        }
        if (stderr) console.log(`⚠️  stderr: ${stderr}`);
        if (stdout) console.log(`✅ stdout: ${stdout}`);
        
        i++;
        executeCommand();
    });
}

executeCommand();