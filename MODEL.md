# Model, units and limits

## Basis

All mass flows are kg/h. The feed is the mass flow of CO2 only, not the total flue gas. No inlet inert gas or water is modeled. Capture is a user assumption, not a predicted absorber efficiency. The conversion input is an assumed overall fraction of captured CO2 allocated to the single displayed reaction. It is not a prediction of single-pass conversion or a recycle model.

CO2 + 3 H2 -> CH3OH + H2O

Selectivity to this reaction is assumed 100%. Product flows are chemical component flows, not purified saleable products. There is no separation or purity calculation. No gas volumes or standard-temperature definitions are used.

## Consistent approximate molecular masses

Using rounded conventional atomic weights C=12.011, H=1.008 and O=15.999:

| Species | kg/kmol |
| --- | ---: |
| CO2 | 44.009 |
| H2 | 2.016 |
| CH3OH | 32.042 |
| H2O | 18.015 |

These approximate the NIST reference molecular weights. They are deliberately derived from one internally consistent set so stoichiometric mass closure is exact apart from floating-point arithmetic. They are not all digits copied from NIST and are not isotope-specific masses.

## Equations

Let F be CO2 feed, c capture percent, x assumed conversion percent, H available H2, h annual operating hours, e capture electricity intensity in kWh/t captured, and g electricity emissions factor in kg CO2e/kWh.

- Captured = F*c/100.
- Uncaptured = F-captured.
- Target CO2 = captured*x/100.
- Extent [kmol/h] = min(target CO2/44.009, H/(3*2.016)).
- CO2 consumed = extent*44.009.
- H2 consumed = extent*3*2.016.
- Methanol = extent*32.042.
- Water = extent*18.015.
- Unreacted captured CO2 = captured-CO2 consumed.
- Unreacted H2 = H-H2 consumed.
- H2 needed for target = target CO2/44.009*3*2.016.
- Annual product/capture [t/year] = hourly flow*h/1000.
- Capture electricity power [kW] = captured/1000*e.
- Capture electricity emissions [kg CO2e/h] = power*g.
- Annual capture electricity emissions [t CO2e/year] = power*g*h/1000.
- Closure residual [kg/h] = F+H-(uncaptured+unreacted captured CO2+unreacted H2+methanol+water).

Hours must be between 0 and 8784 inclusive to allow a leap year. Input upper bounds are defensive software guards, not physical operating limits. Missing or blank numbers are errors, not zero. All seven fields are required on JSON import; extra fields are ignored. No unit conversion is performed during import. Numbers use a decimal point; browser support for Arabic-digit number entry may vary.

## Worked synthetic example

Input: F=1000, c=90, x=80, H=120, h=8000, e=0, g=0.

Captured CO2 is 900 kg/h; 100 kg/h is uncaptured. The target reaction consumes 720 kg/h CO2 and needs about 98.947 kg/h H2. Methanol is about 524.216 kg/h and water about 294.731 kg/h. Captured unreacted CO2 is 180 kg/h. Annual captured CO2 is 7200 t/year. Electricity inputs are zero because no utility data was supplied, NOT because the process has no energy demand. All examples are artificial.

## What this cannot establish

No thermodynamic feasibility, temperature, pressure, phase behavior, equilibrium, kinetics, catalyst life, recycle, product separation, solvent demand, thermal duty, compression, glycerol chemistry, equipment size, cost, safety or regulatory compliance. No plant calibration or comparison with Aspen is claimed. Available H2 is an external input, not produced by a modeled reformer. Unreacted captured CO2 has no assumed storage destination.

Capture electricity is only one inventory item. There is no net avoided-emissions result: upstream H2, heat, other utilities, transport, construction, displaced production, leaks, boundaries and carbon release at methanol use are excluded. Enter a documented factor appropriate to your own scenario; no Egypt grid factor or technology benchmark is prefilled.

## Technical sources (checked 22 November 2026)

- US DOE NETL, Syngas Conversion to Methanol, reaction basis: https://www.netl.doe.gov/research/carbon-management/energy-systems/gasification/gasifipedia/methanol
- NIST Chemistry WebBook, carbon dioxide: https://webbook.nist.gov/cgi/cbook.cgi?Name=carbon+dioxide
- NIST Chemistry WebBook, hydrogen: https://webbook.nist.gov/cgi/cbook.cgi?Name=H2
- NIST Chemistry WebBook, methanol: https://webbook.nist.gov/cgi/cbook.cgi?Name=Methanol
- NIST Chemistry WebBook, water: https://webbook.nist.gov/cgi/cbook.cgi?Name=water

The mass-balance and unit-conversion formulas are direct conservation calculations, not empirical correlations. The sources establish the reaction and reference molecular properties, not the performance of this software.
