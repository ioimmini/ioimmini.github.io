import Image from '../Image';
import * as S from './styled';

const Information: React.FC = () => {
  return (
    <S.Wrapper>
      <S.ImageSection>
        <Image alt='profile' src='profile.png' width='100px' />
      </S.ImageSection>
      <S.TextSection>
        <div>Jeongmin Choi (Nami)</div>
        <div>
          <div>새로운 것을 배우고 성장하고 싶은</div>
        </div>
        <div>
          <div> 개발자 최정민입니다.</div>
        </div>
      </S.TextSection>
    </S.Wrapper>
  );
};

export default Information;
