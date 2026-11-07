// Hobbies page content (Jake's facts).
export const music = {
  stats: [
    { value: '5 h', label: 'of music a day' },
    { value: 'Prog', label: 'my genre, by a mile' },
  ],
  topArtists: ['Dream Theater', 'Tool', 'Toto', 'Steven Wilson', 'Pink Floyd'],
  soundtrack: { artist: 'Pink Floyd', line: 'Full albums, start to finish, while I build.' },
  drummers: [
    { name: 'Mike Portnoy', band: 'Dream Theater' },
    { name: 'Danny Carey', band: 'Tool' },
  ],
};

export const biking = {
  stats: [
    { value: '5', label: 'years riding' },
    { value: '30,000', label: 'km on the clock (roughly)' },
  ],
  longest: { from: 'Coimbatore', to: 'Kanyakumari' },
  home: { name: 'Coimbatore', lat: 11.0168, lon: 76.9558 },
  routes: [
    { name: 'Ooty', lat: 11.4102, lon: 76.695, note: 'The Nilgiris hill station', label: 'right' as const },
    { name: 'Valparai', lat: 10.327, lon: 76.955, note: 'Anamalai hills and tea estates', label: 'left' as const },
    { name: 'Jawadhu Hills', lat: 12.57, lon: 78.88, note: 'Eastern Ghats, near Tiruvannamalai', label: 'left' as const, bend: 0 },
    { name: 'Bandipur', lat: 11.668, lon: 76.63, note: 'National park on the Karnataka border', label: 'left' as const },
  ],
  longestRide: { name: 'Kanyakumari', lat: 8.0883, lon: 77.5385, longest: true, label: 'right' as const },
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
