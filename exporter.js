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
