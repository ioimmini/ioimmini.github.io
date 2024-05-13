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
    },
    dropdown: {
      tistory: 'https://ioimmini.tistory.com/',
    },
  },

  /**
   * definition of featured posts
   */
  featured: [
    {
      title: 'category1',
      category: 'featured-category1',
    },
    {
      title: 'category2',
      category: 'featured-category2',
    },
  ],

  /**
   * metadata for About Page
   */
  timestamps: [
    {
      category: 'Career',
      date: '2022.01.04 - NOW',
      en: 'A Corp.',
      kr: 'A 회사',
      info: 'A 팀',
      link: '',
    },
    {
      category: 'Career',
      date: '2021.01.04 - 2022.01.04',
      en: 'B Corp.',
      kr: 'B 회사',
      info: 'B 팀',
      link: '',
    },
    {
      category: 'Activity',
      date: '2023.07 - NOW',
      en: 'Community',
      kr: '커뮤니티',
      info: 'IT 커뮤니티',
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
      techStack: ['React', 'Next.js', 'Typescript'],
      thumbnailUrl: '', // Path to your in the 'assets' folder
      links: {
        post: '',
        github: '',
        demo: '',
        googlePlay: '',
        appStore: '',
      },
    },
  ],
};
