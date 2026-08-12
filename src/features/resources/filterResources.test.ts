import { filterResources } from './filterResources';
import { makeResource } from '../../test/factories';

const resources = [
  makeResource({ id: '001', title: 'Mindful Moments', tags: ['wellbeing', 'mindfulness'] }),
  makeResource({ id: '002', title: 'The Science of Sleep', tags: ['sleep', 'science'] }),
  makeResource({ id: '003', title: 'Body Scan for Sleep', tags: ['relaxation'] }),
];

describe('filterResources', () => {
  it('returns every resource when the query is empty', () => {
    expect(filterResources(resources, '')).toEqual(resources);
  });

  it('returns every resource when the query is only whitespace', () => {
    expect(filterResources(resources, '   ')).toEqual(resources);
  });

  it('matches on a partial title', () => {
    const result = filterResources(resources, 'mindful');

    expect(result.map((r) => r.id)).toEqual(['001']);
  });

  it('matches on a tag', () => {
    const result = filterResources(resources, 'science');

    expect(result.map((r) => r.id)).toEqual(['002']);
  });

  it('matches title or tags, without duplicating a resource that matches both', () => {
    const result = filterResources(resources, 'sleep');

    expect(result.map((r) => r.id)).toEqual(['002', '003']);
  });

  it('ignores case in both the query and the data', () => {
    expect(filterResources(resources, 'MINDFUL').map((r) => r.id)).toEqual(['001']);
    expect(filterResources(resources, 'Wellbeing').map((r) => r.id)).toEqual(['001']);
  });

  it('ignores surrounding whitespace in the query', () => {
    expect(filterResources(resources, '  sleep  ').map((r) => r.id)).toEqual(['002', '003']);
  });

  it('returns an empty array when nothing matches', () => {
    expect(filterResources(resources, 'zzz')).toEqual([]);
  });
});