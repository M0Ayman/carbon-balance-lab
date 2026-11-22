import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const engine=read('engine.mjs').replace(/^export /gm,'');
const html=read('shell.html').replace('/*APP_CODE*/',()=>engine+'\n'+read('ui-source.js'));
fs.writeFileSync(path.join(root,'app.html'),html);
console.log('Built app.html');
