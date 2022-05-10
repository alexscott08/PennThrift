import Form from '../Form';
import * as React from 'react';
import '@testing-library/jest-dom';
import {render,fireEvent} from '@testing-library/react';
describe('Test For form', () => {
test('renders form', () => {
    const { getByTestId } = render(<Form name="Register" error={null} userDetails={() => {}} reset={() => {}} />);
     const usernamelabel = getByTestId('username-label');
     const email = getByTestId('email');
     const form = getByTestId('form');
    expect(form).toBeInTheDocument();

});
test('renders form with error', () => {
    const { getByTestId } = render(<Form name="Register" error="Error" userDetails={() => {}} reset={() => {}} />);
        const error = getByTestId('error');
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe("Error");
});

test('renders username label', () => {
    const { getByTestId } = render(<Form name="Register" error={null} userDetails={() => {}} reset={() => {}} />);
    const usernamelabel = getByTestId('username-label');
    expect(usernamelabel).toBeInTheDocument();

});
test('renders email label', () => {
    const { getByTestId } = render(<Form name="Register" error={null} userDetails={() => {}} reset={() => {}} />);
    const email = getByTestId('email');
    expect(email).toBeInTheDocument();

});
test('test',()=>{  expect(true).toBeTruthy(); }  )
});

