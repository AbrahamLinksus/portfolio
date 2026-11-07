// Hobbies page content. Facts are Jake's own; puns are the site's.
export type Stat = { value: string; label: string };
export type Hobby = {
  id: string;
  name: string;
  color: string;
  tagline: string;
  stats: Stat[];
  body: string[];
  stickers: string[];
};

export const hobbies: Hobby[] = [
  {
    id: 'music',
    name: 'Music',
    color: 'var(--teal)',
    tagline: 'My commits come in 7/8.',
    stats: [
      { value: '5 h', label: 'of music a day' },
      { value: 'Prog', label: 'my genre, by a mile' },
      { value: '5', label: 'artists on constant repeat' },
    ],
    body: [
      'About five hours a day, almost all of it progressive. Long songs, strange time signatures, and drummers worth studying.',
    ],
    stickers: [],
  },
];

export const topArtists = ['Dream Theater', 'Tool', 'Toto', 'Steven Wilson', 'Pink Floyd'];

export const drummers = [
  { name: 'Mike Portnoy', band: 'Dream Theater', note: 'Precision and huge, composed fills.' },
  { name: 'Danny Carey', band: 'Tool', note: 'Polyrhythms that somehow still groove.' },
];

export const codingSoundtrack = {
  artist: 'Pink Floyd',
  line: 'Full albums, start to finish. Long tracks mean no skipping and no context switching.',
  pun: 'Comfortably numb to merge conflicts.',
};
