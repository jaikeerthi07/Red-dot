const { exec } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting deployment preparation...');

// Check if we have a GitHub username in the script
// TODO: Replace 'YOUR_GITHUB_USERNAME' with your actual GitHub username
const githubUsername = 'jaikeerthi07';
const repositoryName = 'reddot.org.in';

if (githubUsername === "YOUR_GITHUB_USERNAME") {
    console.error("❌ Please set your GitHub username in the script!");
    process.exit(1);
}

console.log(`🔧 GitHub username set to: ${githubUsername}`);
console.log(`📦 Repository name set to: ${repositoryName}`);

// Git commands to initialize and push to GitHub
const gitCommands = [
    'git init',
    'git add .',
    'git commit -m "Initial commit: REDDOT.org.in website"',
    'git branch -M main',
    `git remote add origin https://github.com/${githubUsername}/${repositoryName}.git`,
    'git push -u origin main'
];

console.log('📡 Deploying to GitHub...');
console.log('This will:');
console.log('1. Initialize a new Git repository');
console.log('2. Add all files to the repository');
console.log('3. Commit the initial changes');
console.log('4. Set main branch');
console.log('5. Add GitHub as remote origin');
console.log('6. Push code to GitHub');

// Execute commands
let i = 0;
function executeCommand() {
    if (i >= gitCommands.length) {
        console.log('✅ Deployment preparation completed!');
        console.log('\nNext steps:');
        console.log('1. Go to https://vercel.com/new');
        console.log('2. Sign in with GitHub');
        console.log('3. Import your reddot-website repository');
        console.log('4. Add environment variables from your .env.local file');
        return;
    }
    
    const command = gitCommands[i];
    console.log(`\nExecuting: ${command}`);
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`❌ Error: ${error.message}`);
            if (command.includes('remote add') && error.message.includes('remote origin already exists')) {
                console.log('⚠️  Remote origin already exists, continuing...');
            } else {
                return;
            }
        }
        if (stderr) console.log(`⚠️  stderr: ${stderr}`);
        if (stdout) console.log(`✅ stdout: ${stdout}`);
        
        i++;
        executeCommand();
    });
}

executeCommand();