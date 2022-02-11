import React from 'react';
import { render, screen } from '@testing-library/react';
import AppFunctional from './AppFunctional';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  render(<AppFunctional />)
})
afterEach(() => {
  document.body.innerHTML = ''
})

test('renders without errors', () => {
  //this test is automatic because of the beforeEach() function
})

describe(`Checking to see if coordinates, and steps display correctly`, () => {
  
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

test('Testing to see if input changes when something is typed into it', () => {
  
  const email = screen.getByPlaceholderText('type email')

  userEvent.type(email, 'asdf')

  expect(email.value).toEqual('asdf');
})

test('testing submit button with no email', () => {
  const button = document.querySelector('#submit');

  userEvent.click(button);

  const error = screen.findByText('Ouch: email is required')
  expect(error).toBeTruthy();
})

test('testing a submission of andrew@gmail', () => {
  const email = document.querySelector('#email');
  const button = document.querySelector('#submit');

  userEvent.type(email, 'andrew@gmail')
  userEvent.click(button);

  const error = screen.findByText('Ouch: email must be a valid email')
  expect(error).toBeTruthy()
})