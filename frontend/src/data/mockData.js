export const articles = [
  {
    id: 1,
    type: 'article',
    category: 'Design',
    title: 'Color Fundamentals And Psychology Of Colors',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua ex ea com enim ad minim veniam.',
    content: [
      'Xorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua ex ea com enim ad minim veniam',
      'Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua ex ea com enim ad minimdog veniam',
    ],
    heroText: 'WORDS OF COMFORT',
    author: {
      name: "Leah O'Daniel",
      role: 'Editor',
      avatar: 'https://i.pravatar.cc/80?img=5',
    },
    image: 'https://picsum.photos/seed/woc1/800/500',
    date: 'Jan 15, 2024',
    readTime: '5 min read',
    latestPodcast: {
      name: 'Salma Hayek',
      role: 'Guest',
      avatar: 'https://i.pravatar.cc/80?img=9',
    },
  },
  {
    id: 2,
    type: 'article',
    category: 'Typography',
    title: 'The Art of Choosing the Right Typeface',
    excerpt:
      'Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.',
    content: [
      'Typography can make or break a design. The right typeface sets the tone for your entire visual identity and shapes how readers experience your content.',
      'When choosing typefaces, consider your audience, the medium, and the message you want to convey. A well-chosen font elevates even the simplest layout.',
    ],
    heroText: 'TYPE MATTERS',
    author: {
      name: 'Marcus Webb',
      role: 'Designer',
      avatar: 'https://i.pravatar.cc/80?img=12',
    },
    image: 'https://picsum.photos/seed/type22/800/500',
    date: 'Feb 3, 2024',
    readTime: '4 min read',
    latestPodcast: {
      name: 'James Okafor',
      role: 'Host',
      avatar: 'https://i.pravatar.cc/80?img=68',
    },
  },
  {
    id: 3,
    type: 'article',
    category: 'Inspiration',
    title: 'Building a Visual Design System From Scratch',
    excerpt:
      'A design system is a set of standards to manage design at scale, reducing redundancy while creating a shared visual language.',
    content: [
      'Design systems help teams build consistent, scalable products. They are living documents that evolve with your product and the team that maintains them.',
      'Start with the basics: colors, typography, spacing. Then layer on components, patterns, and documentation that your whole team can rely on.',
    ],
    heroText: 'DESIGN SYSTEMS',
    author: {
      name: 'Amara Osei',
      role: 'Art Director',
      avatar: 'https://i.pravatar.cc/80?img=25',
    },
    image: 'https://picsum.photos/seed/dsys33/800/500',
    date: 'Mar 8, 2024',
    readTime: '7 min read',
    latestPodcast: {
      name: 'Nina Adeyemi',
      role: 'Guest',
      avatar: 'https://i.pravatar.cc/80?img=47',
    },
  },
];

export const podcasts = [
  {
    id: 10,
    type: 'audio',
    title: 'Observe Good Designs And Train Your Eyes',
    duration: '23:45',
    progress: 40,
    isPlaying: false,
    host: {
      name: 'Salma Hayek',
      role: 'Guest',
      avatar: 'https://i.pravatar.cc/80?img=9',
    },
  },
  {
    id: 11,
    type: 'audio',
    title: 'The Creative Process: From Brief to Final Delivery',
    duration: '41:20',
    progress: 0,
    isPlaying: false,
    host: {
      name: 'James Okafor',
      role: 'Host',
      avatar: 'https://i.pravatar.cc/80?img=68',
    },
  },
];

export const feedItems = [
  articles[0],
  podcasts[0],
  articles[1],
  podcasts[1],
  articles[2],
];
