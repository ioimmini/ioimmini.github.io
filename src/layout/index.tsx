import './style.scss';

import { ThemeProvider } from '@emotion/react';
import { graphql, useStaticQuery } from 'gatsby';
import { ThemeManagerContext } from 'gatsby-emotion-dark-mode';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';

import Footer from '../components/Footer';
import Header from '../components/Header';
import ThemeToggle from '../components/ThemeToggle';
import { darkTheme, lightTheme } from '../styles/const';
import GlobalStyle from '../styles/GlobalStyle';
import * as S from './styled';

type LayoutProps = {
  location: Location;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ location, children }) => {
  const theme = useContext(ThemeManagerContext);

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const { title } = data.site.siteMetadata;

  return (
    <ThemeProvider theme={theme.isDark ? darkTheme : lightTheme}>
      <Helmet>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Sans+KR&display=swap'
          rel='stylesheet'
        />
      </Helmet>
      <GlobalStyle />
      <S.Wrapper>
        <ThemeToggle />
        <S.ContentWrapper>
          {location && <Header location={location} title={title} />}
          <S.Content>{children}</S.Content>
        </S.ContentWrapper>
        <Footer />
      </S.Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
