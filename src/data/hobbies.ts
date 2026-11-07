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

export const biking = {
  about: [
    "Hill stations are my favourite kind of ride. The climb up is the best part: the hairpins, the air turning cold, the view opening up a little more at every bend.",
    "Riding clears my mind like nothing else does. Out on the road it is just me, the bike and the next corner, and whatever I was stuck on usually sorts itself out by the time I get back.",
  ],
  stats: [
    { value: '5', label: 'years riding' },
    { value: '30,000', label: 'km on the clock (roughly)' },
  ],
  homes: [
    { name: 'Coimbatore', lat: 11.0168, lon: 76.9558, tag: 'HOME' },
    { name: 'Chennai', lat: 13.0827, lon: 80.2707, tag: 'COLLEGE' },
  ],
  view: { lon0: 75.4, lon1: 80.9, lat0: 7.85, lat1: 14.0 },
  regions: [
    { text: 'KERALA', lat: 9.0, lon: 76.9, rotate: -62 },
    { text: 'TAMIL NADU', lat: 10.3, lon: 78.4 },
    { text: 'KARNATAKA', lat: 13.4, lon: 76.2 },
    { text: 'ANDHRA PRADESH', lat: 13.75, lon: 77.9 },
    { text: 'ARABIAN SEA', lat: 11.0, lon: 75.45, sea: true },
    { text: 'BAY OF BENGAL', lat: 11.0, lon: 80.4, rotate: -70, sea: true },
  ],
  routes: [
    { from: 'Coimbatore', name: 'Ooty', lat: 11.4102, lon: 76.695, note: 'The Nilgiris hill station', label: 'right' as const },
    { from: 'Coimbatore', name: 'Bandipur', lat: 11.668, lon: 76.63, note: 'National park on the Karnataka border', label: 'left' as const },
    { from: 'Coimbatore', name: 'Valparai', lat: 10.327, lon: 76.955, note: 'Anamalai hills and tea estates', label: 'left' as const },
    { from: 'Coimbatore', name: 'Alappuzha', lat: 9.4981, lon: 76.3388, note: 'Backwaters on the Kerala coast', label: 'left' as const, bend: -0.12 },
    { from: 'Coimbatore', name: 'Kanyakumari', lat: 8.0883, lon: 77.5385, note: 'The southern tip of India', label: 'right' as const },
    { from: 'Chennai', name: 'Tada', lat: 13.5867, lon: 79.8947, note: 'Just over the Andhra border', label: 'left' as const },
    { from: 'Chennai', name: 'Sriharikota', lat: 13.7199, lon: 80.2304, note: 'Island home of the ISRO launch centre', label: 'above' as const },
    { from: 'Chennai', name: 'Vellore', lat: 12.9165, lon: 79.1325, note: 'Fort city on the Palar', label: 'left' as const, offset: [-18, -26] as [number, number] },
    { from: 'Chennai', name: 'Jawadhu Hills', lat: 12.57, lon: 78.88, note: 'Eastern Ghats, near Tiruvannamalai', label: 'left' as const, offset: [-12, 34] as [number, number] },
    { from: 'Chennai', name: 'Yelagiri', lat: 12.5786, lon: 78.6399, note: 'Hill station in the Eastern Ghats', label: 'left' as const },
    { from: 'Chennai', name: 'Athimoor forests', lat: 12.53, lon: 79.02, note: 'Forest roads near Polur', label: 'right' as const, offset: [16, 34] as [number, number] },
  ],
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
