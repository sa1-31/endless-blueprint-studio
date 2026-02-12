function generate() {

  const config = {
    projectName: document.getElementById("projectName").value,
    network: document.getElementById("network").value,
    projectType: document.getElementById("projectType").value,
    includeTests: document.getElementById("includeTests").checked,
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
