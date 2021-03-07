import React from 'react';
import renderer from 'react-test-renderer';
import Update from '../Update';

test('should render Update Component', () => {
    let fakeProps = {
        id: 1,
        fullname: "fullname",
        phoneNo: "phoneNo",
        completed: false
    };
    const tree = renderer
        .create(<Update state={fakeProps} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
