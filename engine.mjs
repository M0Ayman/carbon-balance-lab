/** Carbon Balance Lab v0.1.0, MIT. All flows kg/h unless named otherwise. */
export const MW = Object.freeze({CO2:44.009,H2:2.016,MeOH:32.042,H2O:18.015});
export const FIELDS = [
 ['feed','CO₂ الداخل فقط','CO2 feed','kg/h',0,1e9],
 ['capture','نسبة التقاط CO₂','Capture fraction','%',0,100],
 ['conversion','التحويل الكلي المفترض للميثانول','Assumed overall conversion','%',0,100],
 ['hydrogen','الهيدروجين المتاح','Available H2','kg/h',0,1e9],
 ['hours','ساعات التشغيل السنوية','Annual operating hours','h/year',0,8784],
 ['electricity','كهرباء الالتقاط فقط','Capture electricity intensity','kWh/t CO2 captured',0,1e6],
 ['grid','معامل انبعاثات الكهرباء','Electricity emissions factor','kg CO2e/kWh',0,100]
];
export const DEMO=Object.freeze({feed:1000,capture:90,conversion:80,hydrogen:120,hours:8000,electricity:0,grid:0});
export const PRESETS=Object.freeze({demo:DEMO,limited:{...DEMO,hydrogen:50},zero:{...DEMO,capture:0}});
export function validate(input){
 if(!input || typeof input!=='object' || Array.isArray(input)) throw new Error('Scenario must be an object.');
 const out={};
 for(const [key,,label,,min,max] of FIELDS){
  const raw=input[key];
  if((typeof raw!=='number' && typeof raw!=='string') || (typeof raw==='string' && raw.trim()==='')) throw new Error(`${label}: enter a number (${min} to ${max}).`);
  const value=Number(raw);
  if(!Number.isFinite(value)||value<min||value>max) throw new Error(`${label}: enter a number (${min} to ${max}).`);
  out[key]=value;
 }
 return out;
}
export function calculate(input){
 const x=validate(input);
 const captured=x.feed*x.capture/100;
 const targetCO2=captured*x.conversion/100;
 const extent=Math.min(targetCO2/MW.CO2,x.hydrogen/(3*MW.H2));
 const co2Used=extent*MW.CO2, h2Used=extent*3*MW.H2;
 const methanol=extent*MW.MeOH, water=extent*MW.H2O;
 const uncaptured=x.feed-captured, unusedCO2=Math.max(0,captured-co2Used), unusedH2=Math.max(0,x.hydrogen-h2Used);
 const capturePower=captured/1000*x.electricity;
 const utilityEmissions=capturePower*x.grid;
 const closure=x.feed+x.hydrogen-(uncaptured+unusedCO2+unusedH2+methanol+water);
 return {captured,uncaptured,targetCO2,co2Used,h2Used,methanol,water,unusedCO2,unusedH2,capturePower,utilityEmissions,
 annualMethanol:methanol*x.hours/1000,annualCaptured:captured*x.hours/1000,annualUtility:utilityEmissions*x.hours/1000,
 h2ForTarget:targetCO2/MW.CO2*3*MW.H2,hydrogenLimited:x.hydrogen+1e-10<targetCO2/MW.CO2*3*MW.H2,closure};
}
export function toCSV(input){
 const x=validate(input),r=calculate(x);
 return ['kind,metric,value,unit',...FIELDS.map(([k,,,unit])=>`input,${k},${x[k]},${unit}`),
 ...Object.entries(r).map(([k,v])=>`output,${k},${v},${k==='hydrogenLimited'?'boolean':k==='capturePower'?'kW':k.startsWith('annual')?'t/year':'kg/h'}`)].join('\n');
}
export function parseScenario(text){
 if(typeof text!=='string'||text.length>20000) throw new Error('Paste a scenario JSON object under 20 KB.');
 let obj;try{obj=JSON.parse(text);}catch{throw new Error('Invalid JSON. Paste the full scenario object.');}
 return validate(obj);
}
