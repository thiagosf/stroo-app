import NextLink, { LinkProps } from 'next/link'

import { isInsideIframe } from '../../../helpers/iframe_utils'

export interface Props extends LinkProps {
  children: React.ReactNode;
  linkProps?: any;
}

export const Link: React.FC<Props> = function ({ children, linkProps = {}, ...props }) {
  const extraProps = isInsideIframe()
    ? { target: '_blank', rel: 'noreferrer' }
    : {}

  return (
    <NextLink {...props}>
      <a {...linkProps} {...extraProps}>
        {children}
      </a>
    </NextLink>
  )
}
