const { exec, spawn } = require('child_process');

exec('dir /d', (error, stdout, stderr) => {
    if (error) {
        console.error(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: \n ${stdout}`);
});

const child = spawn('dir', { shell: true });

child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

child.on('error', (error) => {
    console.error(`error: ${error.message}`);
});

child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
