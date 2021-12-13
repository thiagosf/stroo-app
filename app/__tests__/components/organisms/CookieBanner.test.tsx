import React from 'react';
import { mount } from 'enzyme'
import { CookieBanner } from '../../../components/organisms/CookieBanner/CookieBanner'

describe('components/atoms/CookieBanner', () => {
  it('should close cookie banner', async () => {
    let closed = false
    const onClose = () => closed = true
    const comp = mount(
      <CookieBanner onClose={onClose} />,
    )
    comp.find('.cursor-pointer.text-2xl')
      .simulate('click')
    expect(close).toBeTruthy()
    expect(comp.isEmptyRender()).toBeTruthy
  })
})
