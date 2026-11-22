# Carbon Balance Lab

Version 0.1.0 | MIT license | Educational first release

Carbon Balance Lab is an Arabic/English educational tool for CO2 capture mass balances and ideal methanol production limited by hydrogen supply. It runs offline in a browser and includes source code, examples, tests and an MIT license.

Developed with AI assistance. Not a validated process simulator or a substitute for Aspen. No plant validation, external adoption or eligibility for sponsorship programs is claimed.

## ابدأ من هنا

1. فك ضغط الملف على الكمبيوتر.
2. افتح `app.html` في Chrome أو Firefox أو Edge. لا يحتاج إنترنت أو حساب.
3. جرّب المثال الأساسي، وبعده سيناريو الهيدروجين الأقل.
4. غيّر قيمة واحدة كل مرة وشوف تأثيرها. المدخل الأول هو كتلة CO2 نفسه، مش غاز المداخن كله.
5. احفظ المدخلات بنسخ JSON أو نزّل النتائج CSV. التغييرات لا تُحفظ تلقائيًا.

على الموبايل استخدم رابط النسخة المستضافة الذي أُرسل مع المشروع. فتح ملفات HTML المحلية يعتمد على نظام الهاتف ومدير الملفات؛ الكمبيوتر هو المسار الأبسط للنسخة التي تعمل بدون إنترنت.

## What it does

- Capture/uncaptured CO2 mass flows from an explicit pure-CO2 basis.
- Assumed overall conversion, capped by available hydrogen.
- Ideal methanol and water production, unreacted CO2/H2 and mass closure.
- Hourly and annual throughputs with operating hours supplied by the user.
- Optional capture-electricity demand and its associated emissions only.
- Scenario JSON import/export and results CSV download.
- Three synthetic example scenarios, a command-line interface and automated tests.

No external runtime libraries, trackers, backend, accounts or network requests. The hosted delivery service is separate from the independent offline software. Inputs are held in memory and reset on reload. No confidential thesis data is bundled.

## Run the tests (optional, for development)

Install Node.js version 18 or later yourself if it is not already available. There are no packages to install.

```sh
node --test tests/*.test.mjs
node cli.mjs examples/demo.json
node cli.mjs examples/limited.json --csv > results.csv
```

`npm test` is an optional alias. `package.json` is marked private to prevent accidental registry publication. This does not change the MIT source license.

## Model boundary

See `MODEL.md` for every equation, unit, assumption and technical source. This is NOT an equilibrium or kinetic simulation, solvent design tool, glycerol reformer, safety calculation, cost estimator or full lifecycle assessment. It is not validated against a plant or thesis dataset. Captured carbon and carbon in methanol are not automatically permanent removal or avoided emissions. Do not use this app for certified design or environmental claims.

## Files you can edit

- `engine.mjs`: the shared equations and validation, used by the app and CLI.
- `build-offline.mjs`: generates the self-contained `app.html` from the engine and UI source. Run after editing the engine or UI.
- `ui-source.js` and `shell.html`: plain browser UI source.
- `tests/engine.test.mjs`: known answers, edge cases and conservation checks.
- `examples/`: reusable inputs. All are synthetic, not measured research.
- `CONTRIBUTING.md`: honest next steps and code review checklist.

The source archive does not contain the hosted delivery page. The standalone app uses the same calculation engine.

## Release status and attribution

Developed with AI assistance. Not a validated process simulator or a substitute for Aspen. No plant validation, external adoption or eligibility for sponsorship programs is claimed.
