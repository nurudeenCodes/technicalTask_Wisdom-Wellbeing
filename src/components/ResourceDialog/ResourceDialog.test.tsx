import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResourceDialog } from './ResourceDialog';
import { makeResource } from '../../test/factories';

describe('ResourceDialog', () => {
  it('renders nothing when no resource is selected', () => {
    render(<ResourceDialog resource={null} onClose={() => {}} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows the full resource detail when one is selected', () => {
    const resource = makeResource({
      title: 'Mindful Moments',
      description: 'A calming podcast focused on mindfulness techniques.',
      category: 'Podcasts',
      durationMinutes: 25,
      dateUploaded: new Date('2025-07-10'),
    });

    render(<ResourceDialog resource={resource} onClose={() => {}} />);

    const dialog = screen.getByRole('dialog', { name: 'Mindful Moments' });

    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('A calming podcast focused on mindfulness techniques.')).toBeInTheDocument();
    expect(screen.getByText('25 min listen')).toBeInTheDocument();
    expect(screen.getByText('10 July 2025')).toBeInTheDocument();
  });

  it('shows every tag, including beyond the three shown on the card', () => {
    const resource = makeResource({ tags: ['one', 'two', 'three', 'four', 'five'] });

    render(<ResourceDialog resource={resource} onClose={() => {}} />);

    ['one', 'two', 'three', 'four', 'five'].forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('closes when the close button is activated', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<ResourceDialog resource={makeResource()} onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: /close/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<ResourceDialog resource={makeResource()} onClose={onClose} />);
    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});