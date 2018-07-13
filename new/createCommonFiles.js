const fs = require("fs");
const path = require("path");
const helpers = require("../helpers");
const name = process.argv[3]

const loadFile = filePath => {
  return fs.readFileSync(path.resolve(__dirname, filePath), "utf8");
};

/// create things like .gitignore, scripts folder, scripts templates folder, README.md, .env, and package.json
const createCommonFilesAndFolders = () => {
  // creates new project folder first, this is important for all new projects
  fs.mkdirSync(`./${name}`)
  helpers.writeFile(
    `./${name}/.gitignore`,
    loadFile("./files/common/.gitignore")
  );
  helpers.writeFile(`./${name}/README.md`, loadFile("./files/common/README.md"));
  helpers.writeFile(
    `./${name}/package.json`,
    loadFile("./files/common/package.json")
  );

  helpers.writeFile(`./${name}/.env`, "");
  fs.mkdirSync(`./${name}/scripts`);
  fs.mkdirSync(`./${name}/scripts/templates`);
  // synchronously adds key value pair of the project name in the name field to package.json
  // helpers.addKeytoPackageJSON("name", name, name)
};

module.exports = { createCommonFilesAndFolders };