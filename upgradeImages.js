// const fs = require('fs');
// const fetch = require('node-fetch');
// const path = require('path');

// const apiKey = 'YOUR_DEEPAI_KEY'; // کلید DeepAI
// const jsonPath = path.join(__dirname, 'src', 'data', 'heroes.json');
// const outputFolder = path.join(__dirname, 'src', 'data', 'highres');

// if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });

// // خواندن JSON
// const heroes = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// async function processHero(hero) {
//     try {
//         // دانلود تصویر از لینک
//         const imageResponse = await fetch(hero.image);
//         const buffer = await imageResponse.arrayBuffer();
//         const base64Image = Buffer.from(buffer).toString('base64');

//         // ارسال به DeepAI
//         const response = await fetch('https://api.deepai.org/api/torch-srgan', {
//             method: 'POST',
//             headers: {
//                 'Api-Key': apiKey,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ image:` data:image/png;base64,${base64Image}` })
//         });

//         const result = await response.json();

//         if (result.output_url) {
//             // دانلود تصویر ارتقا یافته
//             const upgradedRes = await fetch(result.output_url);
//             const upgradedBuffer = await upgradedRes.arrayBuffer();
//             const fileName = path.basename(hero.image);
//             fs.writeFileSync(path.join(outputFolder, fileName), Buffer.from(upgradedBuffer));
//             console.log(`✅ ${hero.name} ارتقا یافت!`);
//         } else {
//             console.error(`❌ خطا برای ${hero.name}:`, result);
//         }
//     } catch (err) {
//         console.error(`❌ خطای شبکه برای ${hero.name}:`, err);
//     }
// }

// // پردازش تمام هیروها
// heroes.forEach(hero => {
//     processHero(hero);
// });