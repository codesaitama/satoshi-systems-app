import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

/*
# .env
NODE_ENV=development
PORT=8626
# Set your database/API connection information here
API_KEY=**************************
API_URL=**************************
DB_HOST=188.121.44.185
DB_USER=achana
DB_PASS=CodeSaitama@2323
DB_DATABASE=satoshiDB

SECRET_JWT=thisbethewaymando
*/
