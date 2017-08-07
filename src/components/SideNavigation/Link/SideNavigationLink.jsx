// @flow
import React from 'react';
import glamorous from 'glamorous';

type props = {
  className: string,
  children: mixed,
  onClick: void,
  theme: THEME,
};

const SideNavigationLink = ({ className, children, onClick }: props): React$Element<*> =>
  (<div className={className} onClick={onClick}>
    {children}
  </div>);

const style = ({ theme }: { theme: THEME }): {} => ({
  position: 'relative',
  zIndex: 2,
  margin: `0 ${theme.spacing * -0.5}px`,
  padding: `${theme.spacing}px`,
  minWidth: 200,
  borderRadius: 2,
  transition: '.1s background-color ease',
  backgroundColor: theme.greys && theme.greys[90],
  color: theme.greys && theme.greys.white,

  '& + &': {
    borderTop: `1px solid ${theme.greys && theme.greys['100']}`,
  },

  ':hover': {
    backgroundColor: theme.greys && theme.greys['100'],
  },

  ':first-child': {
    marginTop: `${theme.spacing * -0.5}px`,
  },

  ':last-child': {
    marginBottom: `${theme.spacing * -0.5}px`,
  },
});

export default glamorous(SideNavigationLink)(style);