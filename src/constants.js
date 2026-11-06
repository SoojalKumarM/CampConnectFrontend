export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const INTERESTS = [
  'Coding', 'AI & ML', 'Startups', 'Reading', 'Music', 'Guitar', 'Movies', 'Anime', 'Gaming', 'Football', 'Cricket',
  'Basketball', 'Gym', 'Running', 'Yoga', 'Hiking', 'Travel', 'Photography', 'Art', 'Dance', 'Cooking', 'Coffee',
  'Volunteering', 'Debate', 'Public speaking', 'Writing', 'Podcasts', 'Fashion', 'Pets', 'Chess', 'Meditation', 'Research',
];

export const GENDERS = [
  { value: 'MAN', label: 'Man' }, { value: 'WOMAN', label: 'Woman' },
  { value: 'NON_BINARY', label: 'Non-binary' }, { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
];

export const LOOKING_FOR = [
  { value: 'SERIOUS_RELATIONSHIP', label: 'A serious relationship', hint: 'Something meaningful and long-term' },
  { value: 'DATING_SEE_WHERE_IT_GOES', label: 'Dating, see where it goes', hint: 'Getting to know someone, no pressure' },
  { value: 'FRIENDSHIP_FIRST', label: 'Friendship first', hint: 'Build a real bond, then see' },
  { value: 'OPEN_TO_ANYTHING', label: 'Open to anything', hint: 'Meet people and let it flow' },
];
export const lookingForLabel = (v) => LOOKING_FOR.find((l) => l.value === v)?.label || '';
export const genderLabel = (v) => GENDERS.find((g) => g.value === v)?.label || '';

export const COUNTRY_CODES = [
  { code: '+91', label: '🇮🇳 +91' }, { code: '+36', label: '🇭🇺 +36' }, { code: '+1', label: '🇺🇸 +1' },
  { code: '+44', label: '🇬🇧 +44' }, { code: '+49', label: '🇩🇪 +49' }, { code: '+971', label: '🇦🇪 +971' },
  { code: '+92', label: '🇵🇰 +92' }, { code: '+880', label: '🇧🇩 +880' }, { code: '+94', label: '🇱🇰 +94' },
  { code: '+977', label: '🇳🇵 +977' }, { code: '+61', label: '🇦🇺 +61' }, { code: '+234', label: '🇳🇬 +234' },
  { code: '+20', label: '🇪🇬 +20' }, { code: '+90', label: '🇹🇷 +90' },
];

export const REPORT_REASONS = ['Fake profile or impersonation', 'Harassment or abusive behaviour', 'Inappropriate photos or content', 'Spam or scam', 'Underage user', 'Other'];
