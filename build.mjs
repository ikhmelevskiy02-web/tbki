import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','styles.css','app.js']) await copyFile(file,`dist/${file}`);
await cp('assets','dist/assets',{recursive:true,filter:p=>!p.endsWith('.woff2')});
console.log('Static knowledge workspace built in dist/');
