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
    id: 'badminton',
    name: 'Badminton',
    color: 'var(--lime)',
    tagline: 'Net positive, every single day.',
    stats: [
      { value: '5', label: 'years playing' },
      { value: '3 h', label: 'on court, every day' },
      { value: '5,000+', label: 'hours on court so far' },
    ],
    body: [
      'Three hours a day on my home court, every day, for five years. It is where I think best: fast decisions, footwork, and reading the next shot before it lands.',
      'Same habit I bring to code. Show up daily, and the reps compound.',
    ],
    stickers: ['Favourite shot: the smash. A real smash hit.', 'I take serving very seriously.', 'Shuttle diplomacy: zero dropped balls.'],
  },
  {
    id: 'drums',
    name: 'Drums',
    color: 'var(--pink)',
    tagline: 'I keep time better than I keep deadlines.',
    stats: [
      { value: '13', label: 'years behind the kit' },
      { value: 'Prog', label: 'and rock, in odd time signatures' },
      { value: '2', label: 'stages: home and church' },
    ],
    body: [
      'Thirteen years on a Yamaha kit with a mix of cymbals I have collected along the way. I play at home and at church, and I am in a progressive rock band.',
      'Favourite thing to play: the full Free Bird outro. Every time.',
    ],
    stickers: ['Band name: still in pre-production.', 'Kit: Yamaha, cymbals: a mixtape.', 'Free Bird, and yes, the long version.'],
  },
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
