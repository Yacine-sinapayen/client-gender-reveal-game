import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../pages/Register'; // Assurez-vous que le chemin est correct

describe('Register', () => {
  it('renders the Register component', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    // prints out the jsx in the App component unto the command line
    //screen.debug();  
  });
});