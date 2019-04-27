import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
    renderApollo,
    cleanup,
    getByTestId,
    fireEvent,
    waitForElement,
    render,
} from '../../test-utils';

import ActionButton, {
    GET_LAUNCH_DETAILS,
    CANCEL_TRIP,
    TOGGLE_CART
} from '../action-button';

import { GET_CART_ITEMS} from '../../pages/cart';

const mockLaunch = {
    __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    __typename: 'Rocket',
    id: 1,
    name: 'tester',
    type: 'test',
  },
  mission: {
    __typename: 'Mission',
    id: 1,
    name: 'test mission',
    missionPatch: '/',
  },
  site: 'earth',
  isInCart: false,
};

describe('action button', () =>{
    //automatically unmount and cleanup DOM
    afterEach(cleanup);
    it('renders without error', ()=> {
        const { getByTestId } = renderApollo(<ActionButton />);
        expect(getByTestId('action-button')).toBeTruthy();
    });
});

it('shows correct label', ()=> {
    const { getByText, container} = renderApollo(<ActionButton/>);
    getByText(/add to cart/i);

    renderApollo(<ActionButton isInCart={true} />, { container });
    getByText(/remove from cart/i);

    /**
   * This test is a bit tricky, since the button doesn't _render_
   * anything based on the response from the mutation.
   *
   * We test this by only mocking one mutation at a time. If the component
   * tried to execute any mutation not mocked, it would throw an
   * error
   */
  it('fires correct mutation with variables', async () => {
      const cache = new InMemoryCache();

})


