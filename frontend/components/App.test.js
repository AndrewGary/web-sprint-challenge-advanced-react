import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppFunctional from './AppFunctional';
import userEvent from '@testing-library/user-event';


beforeEach(() => {
  render(<AppFunctional />)
})
afterEach(() => {
  document.body.innerHTML = ''
})

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test('renders without errors', () => {
  //this test is automatic
})

describe(`Checking to see if coordinates display correctly`, () => {

  // up = document.querySelector('#up')
  // down = document.querySelector('#down')
  // left = document.querySelector('#left')
  // right = document.querySelector('#right')
  // reset = document.querySelector('#reset')
  // submit = document.querySelector('#submit')
  
  test('initial render has correct coordinates', () => {

    const coord = screen.getByText('Coordinates: (2, 2)')
    expect(coord).toBeTruthy();
  })

  test('Action press up, press right, check coords', () => {
    const up = document.querySelector('#up')
    const right = document.querySelector('#right')

    userEvent.click(up);
    userEvent.click(right);

    const coords = screen.getByText('Coordinates: (3, 1)')
    const steps = screen.getByText('You moved 2 times');

    expect(coords).toBeTruthy();
    expect(steps).toBeTruthy();
  })

  test('Action press down, press left, press up, check coords', () => {
    const up = document.querySelector('#up')
    const left = document.querySelector('#left')
    const down = document.querySelector('#down')

    userEvent.click(down);
    userEvent.click(left);
    userEvent.click(up);

    const coords = screen.getByText('Coordinates: (1, 2)')
    const steps = screen.getByText('You moved 3 times');

    expect(coords).toBeTruthy();
    expect(steps).toBeTruthy();
  })

})

