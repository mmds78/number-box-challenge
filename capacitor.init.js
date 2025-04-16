
const { exec } = require('child_process');

// Run capacitor init with the appropriate configuration
exec('npx cap init number-box-challenge app.lovable.856e4cae39d84f23ba79d833eb1bb3db', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
  console.log('Capacitor initialized successfully!');
});
