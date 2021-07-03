const tesseract = require('tesseract.js');

const config = {
  lang: 'eng',
  oem: 1,
  psm: 3,
}

const worker = tesseract.createWorker({
});

(async() => {
  await worker.load();
  await worker.loadLanguage();
  await worker.initialize();
  const { data: { text } } = await worker.recognize('../assets/image.png');
  console.log(text);
  await worker.terminate();
})();

