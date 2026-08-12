import { render, screen } from '@testing-library/react';

describe('test harness', () => {
  it('renders a component and applies jest-dom matchers', () => {
    render(<h1>Resource Centre</h1>);

    expect(
      screen.getByRole('heading', { name: 'Resource Centre' })
    ).toBeInTheDocument();
  });
});