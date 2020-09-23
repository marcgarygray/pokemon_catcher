import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, RenderResult } from '@testing-library/react';
import Home, { emptyInventoryMessage } from '../components/Home';
import { Factory } from '../types';

const renderWithRouter: Factory<RenderResult> = () => {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
};

test('Shows empty inventory list message when no inventory is present', () => {
  const { queryByText } = renderWithRouter();
  const emptyMessage = queryByText(emptyInventoryMessage);
  expect(emptyMessage).not.toBeNull();
});
