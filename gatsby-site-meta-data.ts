export default {
  /**
   * basic Information
   */
  title: `ioimmini.com`,
  description: `나나미짱의 개발일기`,
  language: `ko`,
  siteUrl: `https://ioimmini.com/`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder

  /**
   * comments setting
   */
  comments: {
    utterances: {
      repo: ``,
    },
  },

  /**
   * introduce yourself
   */
  author: {
    name: `최정민`,
    nickname: `nami`,
    stack: ['Frontend', 'React', 'Typescript'],
    bio: {
      email: `jumin0114@gmail.com`,
      residence: 'South Korea',
      bachelorDegree: 'Korea Univ. Electronics and Information Engineering',
    },
    social: {
      github: `https://github.com/ioimmini`,
      tistory: 'https://ioimmini.tistory.com/',
    },
    // dropdown: {
    //   tistory: '',
    // },
  },

  /**
   * definition of featured posts
   */
  featured: [
    {
      title: '🐣 나의 개발일기',
      category: 'develop',
    },
    {
      title: '🔥 핫 이 슈',
      category: 'issue',
    },
  ],

  /**
   * metadata for About Page
   */
  timestamps: [
    {
      category: 'Career',
      date: '2024.06.12 - 2024.09.11',
      en: 'LC9',
      kr: '엘씨나인',
      info: 'Development Team',
      link: '',
    },
    {
      category: 'Activity',
      date: '2024.12.25 - 2024.04.20',
      en: 'Alice',
      kr: '엘리스',
      info: 'Education',
      link: '',
    },
  ],

  /**
   * metadata for Playground Page
   */
  projects: [
    {
      title: 'Portfolio',
      description: '포트폴리오',
      techStack: ['React', 'gatsby.js', 'Typescript'],
      thumbnailUrl: 'Portfolio.gif', // Path to your in the 'assets' folder
      links: {
        post: '',
        github: '',
        demo: 'https://gilded-stardust-fe2dc4.netlify.app/',
        googlePlay: '',
        appStore: '',
      },
    },
    {
      title: '비건로(Vegan-ro)',
      description: '비건 장소 지도',
      techStack: ['React', 'Styled-components'],
      thumbnailUrl: 'veganro.gif', // Path to your in the 'assets' folder
      links: {
        post: '',
        github: '',
        demo: 'https://veganro-frontend.vercel.app/',
        googlePlay: '',
        appStore: '',
      },
    },
    {
      title: '꿀단집(Honey Touse)',
      description: '인테리어 쇼핑몰',
      techStack: ['node.js', 'Express'],
      thumbnailUrl: 'honeytouse.gif', // Path to your in the 'assets' folder
      links: {
        post: '',
        github: '',
        demo: 'https://www.honeytouse.com/',
        googlePlay: '',
        appStore: '',
      },
    },
  ],
};
