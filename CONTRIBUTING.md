# Contributing

This is a small first release with an educational model. Start by running the examples and reading MODEL.md. Be honest about AI assistance, external references and the parts you have actually tested.

## First useful improvements

- Add a second, independently solved mass-balance example as a test.
- Improve Arabic number-entry guidance and screen-reader labels.
- Add schema-versioned scenario files and unit-aware import, with tests for old files.
- Add sensitivity sweeps over capture or available hydrogen. Keep the shared engine as the only source of calculation logic.
- Collect feedback from a real student or engineer, with their consent. Describe that feedback accurately rather than inventing users or adoption.

## Later, research-dependent work

Glycerol reforming, syngas chemistry, absorber models and equilibrium require a separate, literature-grounded scope and independent validation. Do not add a conversion factor and label it a validated process model. Temperature and pressure input boxes without a thermodynamic model would be misleading.

## Before a change is ready

1. Explain the issue, units and model boundary.
2. Write a known-answer or edge-case test.
3. Run `node --test tests/*.test.mjs`.
4. Run `node build-offline.mjs` after engine or UI edits.
5. Open app.html and test at phone and desktop widths. Check invalid inputs, zero feed, limited hydrogen, JSON import and CSV export.
6. Update MODEL.md if a formula, constant, assumption or unit changes.
7. Do not add network access, telemetry or stored personal data without explicit design and privacy review.
