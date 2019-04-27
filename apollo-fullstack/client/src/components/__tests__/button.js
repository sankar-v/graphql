import React from 'react';

import { render, cleanup } from '../../test-utils';
import Button from '../button';

describe('Button', ()=> {
    //automaticallly unmount and cleanup DOM after test is done..
    afterEach(cleanup);

    it('renders without error',() => {
        render(<Button>Hello world</Button>);
    });
});