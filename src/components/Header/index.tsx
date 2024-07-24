import React from 'react';

import * as S from './styled';

type HeaderProps = {
  title: string;
  location: Location;
};

const Header: React.FC<HeaderProps> = ({ title, location }) => {
  const { pathname } = location;

  return (
    <S.Wrapper>
      <S.Header>
        <div>
          <div className='pc-only'>
            <S.MenuLink to='/' isselected='false'>
              {title}
            </S.MenuLink>
          </div>
          <div className='mobile-only mobile-logo'>
            <S.MenuLink to='/' isselected='false'>
              nami
            </S.MenuLink>
          </div>
        </div>
        <S.Menu>
          <S.MenuLink to='/posts' isselected={(pathname === '/posts').toString()}>
            posts
          </S.MenuLink>
          <S.MenuLink to='/about' isselected={(pathname === '/about').toString()}>
            about
          </S.MenuLink>
          <S.MenuLink to='/project' isselected={(pathname === '/project').toString()}>
            project
          </S.MenuLink>
        </S.Menu>
      </S.Header>
    </S.Wrapper>
  );
};

export default Header;
