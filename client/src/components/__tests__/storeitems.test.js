import React from 'react';
import ReactDOM from 'react-dom';
import StoreItems from '../StoreItems';
import{render, screen} from '@testing-library/react';
describe('Test For StoreItems', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<StoreItems data={[]} />, div);
    }
    );
    it('renders button correctly', () => {
        const{getByTestId}=render(<StoreItems data={[]} />);
        expect(screen.getByTestId('storeitems')).toBeTruthy();
        
    }

    );

    it('shows items', () => {
        const items = [{id:1,name:'item1',image:''},{id:2,name:'item2',image:''}];
        const store = render(<StoreItems data={items} />);
       expect(screen.getByTestId('storeitems')).toBeTruthy();
        
    }
  
        );
}
);