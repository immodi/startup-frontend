const fs = require("fs");
const path = require("path");

// Specify the target file path
const targetFile = path.join("/usr/share/nginx", ".env");

// Retrieve all system environment variables
const envVars = process.env;

// Convert environment variables to KEY=value format
const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

// Write to the .env file
fs.writeFile(targetFile, envContent, (err) => {
    if (err) {
        console.error(`Failed to write .env file: ${err}`);
        process.exit(1);
    } else {
        console.log(`.env file created successfully at ${targetFile}`);
    }
});
