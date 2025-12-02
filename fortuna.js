const getRokuyo = () => {
  const days = [
    'lucky before midday, unlucky after midday',
    'lucky except around midday',
    'unlucky before midday, lucky after midday',
    'unlucky all day',
    'lucky all day',
    'unlucky except around midday'
  ];

  return days[Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24) + 3) % 6];
};

const getHexagram = () => {
  const hexagrams = [
    ['☷☷', 'field', 'the receptive earth'],
    ['☷☳', 'returning', 'return'],
    ['☷☵', 'leading', 'the army'],
    ['☷☱', 'nearing', 'approach'],
    ['☷☶', 'humbling', 'modestiy'],
    ['☷☲', 'darkening', 'darkening of the light'],
    ['☷☴', 'ascending', 'pushing upward'],
    ['☷☰', 'pervading', 'peace'],
    ['☳☷', 'providing', 'enthusiasm'],
    ['☳☳', 'shaking', 'the arousing thunder'],
    ['☳☵', 'taking apart', 'deliverance'],
    ['☳☱', 'converting', 'the marrying maiden'],
    ['☳☶', 'small exceeding', 'small preponderance'],
    ['☳☲', 'abounding', 'abundance'],
    ['☳☴', 'persevering', 'duration'],
    ['☳☰', 'invigorating', 'great power'],
    ['☵☷', 'grouping', 'holding together'],
    ['☵☳', 'sprouting', 'difficulty at the beginning'],
    ['☵☵', 'gorge', 'the abyssal water'],
    ['☵☱', 'articulating', 'limitation'],
    ['☵☶', 'limping', 'obstruction'],
    ['☵☲', 'after crossing', 'after completion'],
    ['☵☴', 'welling', 'the well'],
    ['☵☰', 'attending', 'waiting'],
    ['☱☷', 'clustering', 'gathering together'],
    ['☱☳', 'following', 'following'],
    ['☱☵', 'confining', 'oppression'],
    ['☱☱', 'open', 'the joyous lake'],
    ['☱☶', 'conjoining', 'influence'],
    ['☱☲', 'skinning', 'revolution'],
    ['☱☴', 'great exceeding', 'great preponderance'],
    ['☱☰', 'displacing', 'breakthrough'],
    ['☶☷', 'stripping', 'splitting apart'],
    ['☶☳', 'swallowing', 'mouth corners'],
    ['☶☵', 'enveloping', 'youthful folly'],
    ['☶☱', 'diminishing', 'decrease'],
    ['☶☶', 'binding', 'the keeping still mountain'],
    ['☶☲', 'adorning', 'grace'],
    ['☶☴', 'correcting', 'work on the decayed'],
    ['☶☰', 'taming', 'great taming'],
    ['☲☷', 'prospering', 'progress'],
    ['☲☳', 'gnawing', 'biting through'],
    ['☲☵', 'before crossing', 'before completion'],
    ['☲☱', 'polarizing', 'opposition'],
    ['☲☶', 'sojourning', 'the wanderer'],
    ['☲☲', 'radiance', 'the clinging fire'],
    ['☲☴', 'holding', 'the cauldron'],
    ['☲☰', 'possessing', 'great possession'],
    ['☴☷', 'viewing', 'contemplation'],
    ['☴☳', 'augmenting', 'increase'],
    ['☴☵', 'dispersing', 'dispersion'],
    ['☴☱', 'returning to center', 'inner truth'],
    ['☴☶', 'infiltrating', 'development'],
    ['☴☲', 'dwelling', 'the family'],
    ['☴☴', 'ground', 'the gentle wind'],
    ['☴☰', 'domesticating', 'small taming'],
    ['☰☷', 'obstructing', 'standstill'],
    ['☰☳', 'without embroiling', 'innocence'],
    ['☰☵', 'disagreeing', 'conflict'],
    ['☰☱', 'treading', 'treading'],
    ['☰☶', 'retiring', 'retreat'],
    ['☰☲', 'agreeing', 'fellowship'],
    ['☰☴', 'coupling', 'coming to meet'],
    ['☰☰', 'force', 'the creative heaven']
  ];

  const flip = () => Math.round(Math.random()) === 1;
  const flips = (n) => Array(n).fill(null).map(() => flip());

  const sum = (xs) => xs.reduce((s, x, i) => s + (x << (xs.length - 1 - i)), 0);

  const hexagram = hexagrams[sum(flips(6))];
  return `${hexagram[0]} ${hexagram[1]}, ${hexagram[2]}`;
};

module.exports = {
  getRokuyo,
  getHexagram
};
