const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const jPath = path.join(__dirname, "j9.6/bin/jconsole");

const app = express();
app.use(express.json());

app.post("/eval", (req, res) => {
  const code = req.body.code ?? "";

  const j = spawn(jPath, [], { stdio: "pipe" });

  let output = "";

  j.stdout.on("data", (d) => (output += d.toString()));
  j.stderr.on("data", (d) => (output += d.toString()));

  // Prevent hanging
  const kill = setTimeout(() => j.kill("SIGKILL"), 2000);

  j.stdin.write(code + "\nexit 0\n");
  j.stdin.end();

  j.on("close", () => {
    clearTimeout(kill);
    res.send({ output });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`J backend running on port ${port}`));
