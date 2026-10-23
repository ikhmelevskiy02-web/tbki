import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
await mkdir('dist/assets',{recursive:true});
for(const file of ['index.html','styles.css']) await copyFile(file,`dist/${file}`);
await cp('assets/tbki-logo.svg','dist/assets/tbki-logo.svg');
console.log('Static knowledge base built in dist/');
