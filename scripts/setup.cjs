const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (text) => new Promise((resolve) => rl.question(text, resolve))

async function setup() {
  console.log('\n🚀 Frontend Setup\n')

  const config = {
    VITE_API_URL: await question('API URL (default: http://localhost:3000): ') || 'http://localhost:3000',
  }

  const envContent = Object.entries(config)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')

  fs.writeFileSync('.env', envContent)

  console.log('\n✅ .env file created successfully!\n')
  rl.close()
}

setup()