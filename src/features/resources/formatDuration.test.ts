import { formatDuration } from './formatDuration';

describe('formatDuration', () => {
  it('describes audio categories as listening time', () => {
    expect(formatDuration(25, 'Podcasts')).toBe('25 min listen');
    expect(formatDuration(15, 'Meditation')).toBe('15 min listen');
  });

  it('describes written categories as reading time', () => {
    expect(formatDuration(8, 'Articles')).toBe('8 min read');
    expect(formatDuration(5, 'Newsletters')).toBe('5 min read');
    expect(formatDuration(10, 'Recipes')).toBe('10 min read');
  });

  it('describes fitness content as workout time', () => {
    expect(formatDuration(10, 'Fitness')).toBe('10 min workout');
  });

  it('handles a duration of one minute', () => {
    expect(formatDuration(1, 'Articles')).toBe('1 min read');
  });
});