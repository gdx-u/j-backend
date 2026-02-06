const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const j_path = path.join(__dirname, "j9.6/bin/jconsole");

app.post("/eval", (req, res) => {
    const code = req.body.code ?? "";

    const j_process = spawn(j_path, [], { stdio: "pipe" });
    let output = "";

    j_process.stdout.on("data", (data) => output += data.toString());
    j_process.stderr.on("data", (data) => output += data.toString());

    // Kill the process if it runs longer than 30 seconds
    const kill_timeout = setTimeout(() => {
        j_process.kill("SIGKILL");
        output += "\n[Error: Execution timed out after 30 seconds]";
        res.send({ output });
    }, 30000);

    j_process.stdin.write(code + "\nexit 0\n");
    j_process.stdin.end();

    j_process.on("close", () => {
        clearTimeout(kill_timeout);
        res.send({ output });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`J backend running on port ${port}`));
