import { describe, expect, it } from 'vitest';
import {
  dayKey,
  groupBy,
  isoWeek,
  periodKey,
  periodLabel,
  periodRange,
  shiftPeriod,
  yearGrid,
} from './calendar';

describe('dayKey', () => {
  it('buckets by JST', () => {
    expect(dayKey(new Date('2026-10-25T14:59:59Z'))).toBe('2026-10-25');
    expect(dayKey(new Date('2026-10-25T15:00:00Z'))).toBe('2026-10-26');
  });
});

describe('isoWeek', () => {
  it('handles year boundaries', () => {
    expect(isoWeek('2026-01-01')).toEqual({ year: 2026, week: 1 });
    expect(isoWeek('2027-01-01')).toEqual({ year: 2026, week: 53 });
    expect(isoWeek('2024-12-30')).toEqual({ year: 2025, week: 1 });
    expect(isoWeek('2026-10-25')).toEqual({ year: 2026, week: 43 });
  });
});

describe('periods', () => {
  it('computes keys', () => {
    expect(periodKey('day', '2026-10-25')).toBe('2026-10-25');
    expect(periodKey('week', '2026-10-25')).toBe('2026-W43');
    expect(periodKey('month', '2026-10-25')).toBe('2026-10');
    expect(periodKey('year', '2026-10-25')).toBe('2026');
  });

  it('computes ranges', () => {
    expect(periodRange('week', '2026-W43')).toEqual({ from: '2026-10-19', to: '2026-10-25' });
    expect(periodRange('month', '2024-02')).toEqual({ from: '2024-02-01', to: '2024-02-29' });
    expect(periodRange('year', '2026')).toEqual({ from: '2026-01-01', to: '2026-12-31' });
  });

  it('shifts periods', () => {
    expect(shiftPeriod('day', '2026-12-31', 1)).toBe('2027-01-01');
    expect(shiftPeriod('week', '2026-W53', 1)).toBe('2027-W01');
    expect(shiftPeriod('week', '2026-W01', -1)).toBe('2025-W52');
    expect(shiftPeriod('month', '2026-01', -1)).toBe('2025-12');
    expect(shiftPeriod('year', '2026', 1)).toBe('2027');
  });

  it('labels periods', () => {
    expect(periodLabel('day', '2026-10-25')).toBe('Sun, Oct 25, 2026');
    expect(periodLabel('week', '2026-W43')).toBe('Week 43, 2026 (Oct 19 – Oct 25)');
    expect(periodLabel('month', '2026-10')).toBe('October 2026');
  });
});

describe('groupBy', () => {
  it('groups latest first', () => {
    const items = ['2026-09-30T00:00:00Z', '2026-10-25T00:00:00Z', '2026-10-01T00:00:00Z'].map(
      (s) => new Date(s),
    );
    const groups = groupBy(items, (d) => d, 'month');
    expect(groups.map(([key, group]) => [key, group.length])).toEqual([
      ['2026-10', 2],
      ['2026-09', 1],
    ]);
    expect(groups[0][1][0].toISOString()).toBe('2026-10-25T00:00:00.000Z');
  });
});

describe('grids', () => {
  it('covers a year in Sunday-first columns', () => {
    const grid = yearGrid('2026');
    expect(grid[0][4]).toBe('2026-01-01');
    expect(grid.flat().filter(Boolean)).toHaveLength(365);
  });
});
