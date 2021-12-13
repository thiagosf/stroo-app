import React from 'react';
import { shallow } from 'enzyme'
import { HoverUnderlined } from '../../../components/atoms/HoverUnderlined/HoverUnderlined'

describe('components/atoms/HoverUnderlined', () => {
  it('should get right classes', async () => {
    const comp = shallow(
      <HoverUnderlined>Text</HoverUnderlined>,
    )
    expect(comp.text().includes('Text')).toBeTruthy()
  })
})
