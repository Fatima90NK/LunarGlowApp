import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

const moonImages = {
  fullMoon: "https://upload.wikimedia.org/wikipedia/commons/b/b5/20110319_Supermoon.jpg",
  waningGibbous: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/2013-01-02_00-00-55-Waning-gibbous-moon.jpg/1920px-2013-01-02_00-00-55-Waning-gibbous-moon.jpg",
  lastQuarter: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Waning_gibbous_moon_near_last_quarter_-_23_Sept._2016.png/1920px-Waning_gibbous_moon_near_last_quarter_-_23_Sept._2016.png",
  waningCrescent: "https://upload.wikimedia.org/wikipedia/commons/3/35/Waning_Crescent_Moon%287Sep15%29.jpg",
  newMoon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/New_Moon.jpg/1280px-New_Moon.jpg",
  waxingCrescent: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Waxing_Crescent_Moon_on_4-1-17_%2833627493622%29.jpg",
  firstQuarter: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Daniel_Hershman_-_march_moon_%28by%29.jpg",
  waxingGibbous: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Lune-Nikon-600-F4_Luc_Viatour.jpg/1920px-Lune-Nikon-600-F4_Luc_Viatour.jpg"
};

// Folder to save images
const saveDir = path.join('./src/assets/image-moonphases');
if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });

for (const [name, url] of Object.entries(moonImages)) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(path.join(saveDir, `${name}.jpg`), Buffer.from(buffer));
  console.log(`${name} saved!`);
}
