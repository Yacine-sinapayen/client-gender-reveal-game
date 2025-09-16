import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

describe('Home', () => {
  it('renders the App component', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    // prints out the jsx in the App component unto the command line
    //screen.debug(); 
  });
});