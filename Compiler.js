const CompilingLanguage = "YourLang";
const CompilingLanguageVersion = "1.0.0";

const fs = require('fs');

const {exec} = require('child_process');
exec("node " + CompilingLanguage +".js", {
  cwd: CompilingLanguage + "/"
}, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  process.stdout.write(stdout);
  if(!fs.existsSync(`./${CompilingLanguage}-${CompilingLanguageVersion}`)) {
    fs.mkdirSync(`./${CompilingLanguage}-${CompilingLanguageVersion}`);
  }

  fs.writeFileSync(`./${CompilingLanguage}-${CompilingLanguageVersion}/lc_build.out`, stdout);
  fs.cpSync(`./${CompilingLanguage}/build`, `./${CompilingLanguage}-${CompilingLanguageVersion}`, {
    overwrite: true,
    recursive: true
  });
});