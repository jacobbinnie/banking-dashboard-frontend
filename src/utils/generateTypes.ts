require("dotenv").config();
const { execSync } = require("child_process");

const databaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api-json`;

// Run the openapi-generator-cli command
const command = `npx openapi-generator-cli generate -i ${databaseUrl} -g typescript-axios -o types/generated`;
execSync(command, { stdio: "inherit" });
