let generatedFiles = {};

function generateProject(config) {

  const contractName = config.projectType === "erc20"
    ? "EndlessToken"
    : "EndlessNFT";

  const contract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ${contractName} {

    string public name = "Endless";
    string public symbol = "END";

    constructor() {}

}
`;

  const hardhatConfig = `require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    ${config.network}: {
      url: "https://${config.network}.endless.network",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
`;

  const deploy = `async function main() {
  const Contract = await ethers.getContractFactory("${contractName}");
  const contract = await Contract.deploy();
  await contract.waitForDeployment();
  console.log("Deployed to:", await contract.getAddress());
}

main();
`;

  const packageJson = `{
  "name": "${config.projectName.toLowerCase()}",
  "version": "1.0.0",
  "devDependencies": {
    "hardhat": "^2.20.0"
  }
}
`;

  generatedFiles = {
    ["contracts/" + contractName + ".sol"]: contract,
    "hardhat.config.js": hardhatConfig,
    "package.json": packageJson
  };

  if (config.includeDeploy) {
    generatedFiles["scripts/deploy.js"] = deploy;
  }

  return generatedFiles;
}

function generate() {

  const config = {
    projectName: document.getElementById("projectName").value,
    network: document.getElementById("network").value,
    projectType: document.getElementById("projectType").value,
    includeDeploy: document.getElementById("includeDeploy").checked
  };

  const files = generateProject(config);

  let output = "";

  for (let file in files) {
    output += "===== " + file + " =====\n\n";
    output += files[file] + "\n\n";
  }

  document.getElementById("output").textContent = output;
}

async function exportZip() {

  const zip = new JSZip();

  for (let file in generatedFiles) {
    zip.file(file, generatedFiles[file]);
  }

  const content = await zip.generateAsync({ type: "blob" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(content);
  a.download = "endless-blueprint.zip";
  a.click();
}

document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("downloadBtn").addEventListener("click", exportZip);
