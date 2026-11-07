// Hobbies page content (Jake's facts).
export const music = {
  about: [
    "Music is how I set my head for whatever comes next. Something slow and atmospheric when I need to calm down, something long and layered when I need to think, something heavy when I need to get fired up.",
    "I don't treat it as background noise. I listen to full albums, start to finish, and I pay attention to how they're built: the odd time signatures, the drum parts, the way a record moves from one idea to the next.",
  ],
  genre: 'Prog, by a mile',
  topArtists: ['Dream Theater', 'Pink Floyd', 'Tool', 'Toto', 'Steven Wilson'],
  soundtrack: { artist: 'Pink Floyd', line: 'Full albums, start to finish, while I build.' },
  drummers: [
    { name: 'Mike Portnoy', band: 'Dream Theater' },
    { name: 'Danny Carey', band: 'Tool' },
  ],
};

export type Ride = { name: string; lat: number; lon: number; note: string; longest?: boolean; label?: 'left' | 'right' | 'above' | 'below' | 'below-left' | 'right-up'; bend?: number };
export type RideBase = {
  from: string;
  home: { name: string; lat: number; lon: number; tag: string };
  homeLabel?: 'left' | 'right';
  view: { lon0: number; lon1: number; lat0: number; lat1: number };
  regions: { text: string; lat: number; lon: number; rotate?: number; sea?: boolean }[];
  rides: Ride[];
};

export const biking = {
  stats: [
    { value: '5', label: 'years riding' },
    { value: '30,000', label: 'km on the clock (roughly)' },
  ],
  longest: { from: 'Coimbatore', to: 'Kanyakumari' },
  bases: [
    {
      from: 'Coimbatore',
      home: { name: 'Coimbatore', lat: 11.0168, lon: 76.9558, tag: 'HOME' },
      view: { lon0: 75.5, lon1: 78.4, lat0: 7.85, lat1: 11.95 },
      regions: [
        { text: 'KERALA', lat: 10.75, lon: 76.15, rotate: -62 },
        { text: 'TAMIL NADU', lat: 10.0, lon: 77.6 },
        { text: 'KARNATAKA', lat: 11.85, lon: 75.75 },
        { text: 'ARABIAN SEA', lat: 9.0, lon: 75.6, sea: true },
      ],
      rides: [
        { name: 'Ooty', lat: 11.4102, lon: 76.695, note: 'The Nilgiris hill station', label: 'right' },
        { name: 'Bandipur', lat: 11.668, lon: 76.63, note: 'National park on the Karnataka border', label: 'left' },
        { name: 'Valparai', lat: 10.327, lon: 76.955, note: 'Anamalai hills and tea estates', label: 'left' },
        { name: 'Alappuzha', lat: 9.4981, lon: 76.3388, note: 'Backwaters on the Kerala coast', label: 'right', bend: -0.15 },
        { name: 'Kanyakumari', lat: 8.0883, lon: 77.5385, note: 'The southern tip of India', longest: true, label: 'right' },
      ],
    },
    {
      from: 'Chennai',
      home: { name: 'Chennai', lat: 13.0827, lon: 80.2707, tag: 'COLLEGE' },
      homeLabel: 'left',
      view: { lon0: 78.2, lon1: 80.75, lat0: 12.2, lat1: 13.95 },
      regions: [
        { text: 'TAMIL NADU', lat: 12.3, lon: 79.3 },
        { text: 'ANDHRA PRADESH', lat: 13.85, lon: 78.4 },
        { text: 'BAY OF BENGAL', lat: 12.45, lon: 80.3, rotate: -70, sea: true },
      ],
      rides: [
        { name: 'Tada', lat: 13.5867, lon: 79.8947, note: 'Just over the Andhra border', label: 'left' },
        { name: 'Sriharikota', lat: 13.7199, lon: 80.2304, note: 'Island home of the ISRO launch centre', label: 'left' },
        { name: 'Vellore', lat: 12.9165, lon: 79.1325, note: 'Fort city on the Palar', label: 'above' },
        { name: 'Jawadhu Hills', lat: 12.57, lon: 78.88, note: 'Eastern Ghats, near Tiruvannamalai', label: 'below-left', bend: 0 },
        { name: 'Yelagiri', lat: 12.5786, lon: 78.6399, note: 'Hill station in the Eastern Ghats', label: 'left', bend: -0.14 },
        { name: 'Athimoor forests', lat: 12.53, lon: 79.02, note: 'Forest roads near Polur', label: 'right-up', bend: 0.7 },
      ],
    },
  ] as RideBase[],
};

export const drums = {
  stats: [
    { value: '13', label: 'years behind the kit' },
    { value: 'Prog', label: 'and rock' },
    { value: '2', label: 'stages: home and church' },
  ],
  favourite: 'Free Bird',
};

export const badminton = {
  line: 'Three hours a day on my home court, every day, for five years.',
  photoSlots: 3,
};
