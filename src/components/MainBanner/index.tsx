import ReactRotatingText from 'react-rotating-text';

import { Author } from '@/src/type';

import Image from '../Image';
import * as S from './styled';

type MainBannerProps = {
  author: Author;
};

const MainBanner: React.FC<MainBannerProps> = ({ author }) => {
  const { stack, name, nickname } = author;

  return (
    <S.Wrapper>
      <S.IntroWrapper>
        <S.Title>
          안녕하세요🌻
          <br />
          <strong>
            <ReactRotatingText items={stack} />
          </strong>
          <span>(을)를</span>
          <br />
          <span>좋아하는</span>
          <br />
          개발자{' '}
          <strong>
            <ReactRotatingText items={[name, nickname]} />
          </strong>
          입니다.
        </S.Title>
        <Image alt='thumbnail' src='thumbnail.webp' loading='eager' />
      </S.IntroWrapper>
    </S.Wrapper>
  );
};

export default MainBanner;
