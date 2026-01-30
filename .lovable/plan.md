

# Add 4 New Vehicles to Fleet

## Summary
Add four new luxury vehicles to the database with their specifications extracted from the provided reference images.

---

## Vehicles to Add

| Vehicle | Category | Daily Rate | Seats | Engine | Acceleration |
|---------|----------|------------|-------|--------|--------------|
| Mercedes-Benz CLS 400d | Executive | R8,000 | 4 | 3.0L Turbo-Diesel | - |
| Porsche 911 Carrera GTS | Sports | R8,000 | 4 | 3.6L Twin-Turbo Flat-Six | 3.5s |
| Porsche Macan S | Luxury SUV | R5,000 | 5 | Twin-Turbo V6 | - |
| Porsche Cayman | Sports | R6,500 | 2 | 2.5L Turbo Flat-Four | 4.2s |

---

## Implementation

### Database Insert

Use SQL INSERT statements to add vehicles to the `vehicles` table with:

- Unique slug IDs (e.g., `mercedes-cls-400d`, `porsche-911-gts`)
- Full descriptions from the reference images
- Placeholder images (stock photos) until you upload actual vehicle photos
- All specifications: transmission, seats, fuel type, acceleration, engine details
- Set `is_active = true` so they appear on the fleet page immediately

---

## Vehicle Details

### 1. Mercedes-Benz CLS 400d
- **ID**: `mercedes-cls-400d`
- **Category**: Executive
- **Rate**: R8,000
- **Engine**: 3.0L Turbo-Diesel
- **Transmission**: Automatic
- **Seats**: 4
- **Fuel**: Diesel
- **Description**: Sleek luxury coupe combining elegance with dynamic performance

### 2. Porsche 911 Carrera GTS
- **ID**: `porsche-911-carrera-gts`
- **Category**: Sports
- **Rate**: R8,000
- **Engine**: 3.6L Twin-Turbo Flat-Six
- **Transmission**: Automatic
- **Seats**: 4
- **Fuel**: Petrol
- **Acceleration**: 0-100 km/h in 3.5 seconds
- **Description**: High-performance sports car with thrilling speed and elegant design

### 3. Porsche Macan S
- **ID**: `porsche-macan-s`
- **Category**: Luxury SUV
- **Rate**: R5,000
- **Engine**: Twin-Turbo V6
- **Transmission**: Automatic
- **Seats**: 5
- **Fuel**: Petrol
- **Description**: Refined performance SUV blending practicality with Porsche sportiness

### 4. Porsche Cayman
- **ID**: `porsche-cayman`
- **Category**: Sports
- **Rate**: R6,500
- **Engine**: 2.5L Turbo Flat-Four
- **Transmission**: Automatic
- **Seats**: 2
- **Fuel**: Petrol
- **Acceleration**: 0-100 km/h in 4.2 seconds
- **Top Speed**: 285 km/h
- **Description**: Mid-engine roadster with precision engineering and open-top exhilaration

---

## Technical Details

### SQL Insert Statement (Example)
```sql
INSERT INTO vehicles (
  id, name, category, daily_rate, image, description, 
  engine, transmission, seats, fuel_type, drive_type,
  acceleration, top_speed, is_active, featured
) VALUES (
  'porsche-911-carrera-gts',
  'Porsche 911 Carrera GTS',
  'Sports',
  8000,
  'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800',
  'The Porsche 911 Carrera GTS is a high-performance sports car...',
  '3.6L Twin-Turbo Flat-Six',
  'Automatic',
  4,
  'Petrol',
  'Rear-Wheel Drive',
  '0-100 km/h in 3.5 seconds',
  NULL,
  true,
  false
);
```

---

## Notes

- **Images**: Will use high-quality stock photos from Unsplash as placeholders
- **"Hot" Badge**: Can mark any of these as `is_hot = true` if you want them featured
- **Featured**: Can set `featured = true` to show in homepage carousel

