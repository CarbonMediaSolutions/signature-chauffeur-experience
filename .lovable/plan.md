

# Update Vehicle Categories

The allowed categories should be: **Sports Car**, **Van**, **Convertible**, **Executive**, **Luxury SUV**.

Current data needs these updates:

| Vehicle | Current Category | New Category |
|---------|-----------------|--------------|
| Ford Mustang 5.0 GT | Sports | Sports Car |
| Ford Mustang 5.0 GT (Red) | Convertible | Sports Car |
| Porsche 911 Carrera GTS | Sports | Sports Car |
| Porsche Cayman | Sports | Sports Car |
| Mercedes G63 G Wagon | SUV | Luxury SUV |
| Mercedes GLE 400d | SUV | Luxury SUV |
| Mercedes ML350 | SUV | Luxury SUV |
| Mercedes-AMG E63 S | Sedan | Executive |

Vehicles already correct (no change needed):
- BMW i8 Protonic -- Sports Car
- BMW Z4 M40i (both) -- Convertible
- Ford Mustang GT 5.0 (Red) -- Sports Car
- Mercedes V250 -- Van
- Mercedes-Benz CLS 400d -- Executive
- Porsche Boxster 718 S -- Convertible
- Porsche Macan S -- Luxury SUV

### Implementation
1. **Database update** -- Batch UPDATE to remap `Sports` to `Sports Car`, `SUV` to `Luxury SUV`, and `Sedan` to `Executive`
2. **VehicleForm.tsx** -- Update the category dropdown options to only show the five allowed categories: Sports Car, Van, Convertible, Executive, Luxury SUV

