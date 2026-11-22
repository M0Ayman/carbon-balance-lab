import fs from 'node:fs';
import {calculate,parseScenario,toCSV} from './engine.mjs';
try {
 const path=process.argv[2];
 if(!path) throw new Error('Usage: node cli.mjs examples/demo.json [--csv]');
 const x=parseScenario(fs.readFileSync(path,'utf8'));
 console.log(process.argv.includes('--csv')?toCSV(x):JSON.stringify({inputs:x,outputs:calculate(x)},null,2));
} catch(error){console.error(error.message);process.exitCode=1;}
