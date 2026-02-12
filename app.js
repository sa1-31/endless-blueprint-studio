console.log("App loaded successfully");

let generatedFiles = {};

document.addEventListener("DOMContentLoaded", function () {

  const generateBtn = document.getElementById("generateBtn");
  const downloadBtn = document.getElementById("downloadBtn");

  if (!generateBtn) {
    console.error("Generate button not found!");
    return;
  }

  generateBtn.addEventListener("click", function () {
    console.log("Generate clicked");

    const projectName = document.getElementById("projectName").value;
    const network = document.getElementById("network").value;
    const projectType = document.getElementById("projectType").value;

    const contractName =
      projectType === "erc20" ? "EndlessToken" : "EndlessNFT";

    const contract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ${contractName} {
    string public name = "Endless";
    string public symbol = "END";
}
`;

    generatedFiles = {
      ["contracts/" + contractName + ".sol"]: contract
    };

    document.getElementById("output").textContent =
      "===== contracts/" + contractName + ".sol =====\n\n" + contract;
  });

  downloadBtn.addEventListener("click", async function () {
    if (Object.keys(generatedFiles).length === 0) {
      alert("Generate project first!");
      return;
    }

    const zip = new JSZip();

    for (let file in generatedFiles) {
      zip.file(file, generatedFiles[file]);
    }

    const content = await zip.generateAsync({ type: "blob" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = "endless-blueprint.zip";
    a.click();
  });

});
