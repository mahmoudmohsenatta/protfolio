import assert from 'node:assert/strict';
import test from 'node:test';

import { ACTIVITIES, PLANS, venueById } from '../data/catalog.ts';
import { bookingCode, distanceKm, formatSAR, nextSlot, slotsForDay, timeOfDay } from '../lib/format.ts';

test('every activity references an existing Riyadh or Jeddah venue', () => {
  assert.ok(ACTIVITIES.length >= 16);
  for (const act of ACTIVITIES) {
    const venue = venueById(act.venueId);
    assert.ok(venue, `missing venue for ${act.id}`);
    assert.ok(['riyadh', 'jeddah'].includes(venue.city));
    assert.ok(act.title.en.length > 0 && act.title.ar.length > 0);
  }
});

test('plans are ordered by increasing credits and price', () => {
  for (let i = 1; i < PLANS.length; i++) {
    assert.ok(PLANS[i].credits > PLANS[i - 1].credits);
    assert.ok(PLANS[i].priceSar > PLANS[i - 1].priceSar);
  }
});

test('timeOfDay buckets morning, afternoon, evening accurately', () => {
  assert.equal(timeOfDay('06:30'), 'morning');
  assert.equal(timeOfDay('14:00'), 'afternoon');
  assert.equal(timeOfDay('19:30'), 'evening');
});

test('slotsForDay and nextSlot produce deterministic future slots', () => {
  const act = ACTIVITIES[0];
  const day = new Date(2030, 0, 15);
  const s1 = slotsForDay(act, day, new Date(2030, 0, 14));
  const s2 = slotsForDay(act, day, new Date(2030, 0, 14));
  assert.deepEqual(s1, s2);
  assert.ok(s1.length > 0);
  const upcoming = nextSlot(act);
  assert.ok(upcoming !== undefined);
});

test('distanceKm, bookingCode, and formatSAR return valid outputs', () => {
  const v1 = venueById('v1');
  const v2 = venueById('v2');
  const km = distanceKm(v1, v2);
  assert.ok(km > 1 && km < 50);
  assert.match(bookingCode(), /^NB-[A-Z0-9]{6}$/);
  assert.match(formatSAR(199, 'en'), /199/);
  assert.match(formatSAR(199, 'ar'), /199/);
});

