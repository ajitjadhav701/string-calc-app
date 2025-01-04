import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('Should render react App component', () => {
  render(<App />);
  const appComponent = screen.getByTestId("app-component");
  expect(appComponent).toBeInTheDocument();
});
