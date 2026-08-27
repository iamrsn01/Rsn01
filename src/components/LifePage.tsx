import { useState, useMemo, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import tilichoPhoto from '../assets/images/tilicho-lake.jpg';
import {
  Heart,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Mountain,
  Compass,
  Calendar,
  X,
  ChevronRight,
  Search,
  Camera,
  Waves,
  Flame,
  Landmark,
  Briefcase,
  Maximize2,
  CheckCircle2,
  TreePine,
  Users,
  Share2,
  Check,
  ZoomIn
} from 'lucide-react';

export type PlaceCategory = 'all' | 'lakes-treks' | 'mustang' | 'waterfalls-rivers' | 'heritage-hills' | 'friends-life';

export interface ExploredPlace {
  id: string;
  name: string;
  location: string;
  region: string;
  altitude?: string;
  category: 'lakes-treks' | 'mustang' | 'waterfalls-rivers' | 'heritage-hills' | 'friends-life';
  categoryLabel: string;
  bestSeason: string;
  type: string;
  imageUrl: string;
  summary: string;
  highlights: string[];
  travelStory: string[];
}

const exploredPlaces: ExploredPlace[] = [
  {
    id: 'rara-lake',
    name: 'Rara Lake',
    location: 'Mugu District',
    region: 'Karnali Province',
    altitude: '2,990 m (9,810 ft)',
    category: 'lakes-treks',
    categoryLabel: 'Alpine Lake',
    bestSeason: 'Spring & Autumn',
    type: 'Wilderness High Altitude Lake',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    summary: 'The Queen of Lakes in remote Western Nepal — pristine azure waters surrounded by dense pine and juniper forests.',
    highlights: [
      'Crystal-clear waters changing colors with the sun from turquoise to deep royal blue.',
      'Murma Top viewpoint overlooking the entire mirror lake and snowy mountain ridges.',
      'Unspoiled silence, crisp Karnali air, and starlit night skies by the lakeside.'
    ],
    travelStory: [
      'Reaching Rara Lake feels like stepping into an untouched world. Nestled inside Rara National Park, the lake unfolds as a shimmering blue jewel enclosed by towering pine and coniferous forests.',
      'Morning walks along the wooden bridges and shoreline are magical, with mist gently rising from the cold water and reflections of the surrounding hills mirroring perfectly on the tranquil surface.',
      'Hiking up to Murma Top provided an unforgettable panoramic vista of the entire expanse of Rara. It is truly Nepal\'s most serene and soul-refreshing destination.'
    ]
  },
  {
    id: 'tilicho-lake',
    name: 'Tilicho Lake',
    location: 'Manang District',
    region: 'Annapurna Conservation Area',
    altitude: '4,919 m (16,138 ft)',
    category: 'lakes-treks',
    categoryLabel: 'Glacial Wonder',
    bestSeason: 'Sep - Nov & Mar - May',
    type: 'High-Altitude Glacial Trek',
    imageUrl: tilichoPhoto,
    summary: 'One of the highest glacial lakes in the world, framed by the sheer snow-covered Tilicho Peak at nearly 5,000 meters.',
    highlights: [
      'Standing before the sacred shrine and vibrant prayer flags overlooking the azure glacial lake.',
      'Navigating the adrenaline-pumping Landslide Zone between Siri Kharka and Base Camp.',
      'Gazing at the turquoise frozen waters underneath the dramatic 7,134m Tilicho Peak.',
      'Testing personal limits against thin air and rewarding endurance with surreal mountain vistas.'
    ],
    travelStory: [
      'The journey to Tilicho Lake is as demanding as it is exhilarating. Starting from the dry valleys of Manang, the trail cuts across dramatic scree slopes and rugged canyons before arriving at Tilicho Base Camp.',
      'The final morning summit push starts under starry freezing skies. Reaching 4,919 meters and seeing the turquoise blue water surrounded by massive glaciers and snow walls is an emotional triumph.',
      'Standing right by the sacred shrine draped in colorful prayer flags with the vast blue water and snow mountains stretching endlessly ahead leaves an indelible mark of humility and awe.'
    ]
  },
  {
    id: 'abc-base-camp',
    name: 'Annapurna Base Camp (ABC)',
    location: 'Kaski / Myagdi District',
    region: 'Annapurna Sanctuary',
    altitude: '4,130 m (13,550 ft)',
    category: 'lakes-treks',
    categoryLabel: 'Himalayan Sanctuary',
    bestSeason: 'Oct - Dec & Mar - May',
    type: 'Iconic Mountain Sanctuary Trek',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    summary: 'A 360-degree natural amphitheater surrounded by giants including Annapurna I (8,091m), Machhapuchhre, and Hiunchuli.',
    highlights: [
      'Watching golden sunrise rays ignite the face of Annapurna I and Fishtail mountain.',
      'Trekking through lush rhododendron forests, bamboo thickets, and deep river gorges.',
      'Resting at Machhapuchhre Base Camp before the final ascent into the Sanctuary bowl.'
    ],
    travelStory: [
      'The ABC trek takes you through diverse landscapes — from terraced farming hills and roaring rivers to glacial moraines surrounded on all sides by 7,000 and 8,000-meter giants.',
      'Waking up at 4:30 AM at 4,130m to witness the first golden light hit Annapurna South, Annapurna I, and the sacred Machhapuchhre is a spiritual spectacle.',
      'Every step on the trail, from Chhomrong’s endless stone steps to the pristine Himalayan amphitheater, was filled with camaraderie, mountain tea, and pure wonder.'
    ]
  },
  {
    id: 'ghandruk',
    name: 'Ghandruk Village',
    location: 'Kaski District',
    region: 'Gandaki Province',
    altitude: '1,940 m (6,365 ft)',
    category: 'heritage-hills',
    categoryLabel: 'Gurung Heritage',
    bestSeason: 'Year Round',
    type: 'Cultural Hill Village',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=1200&q=80',
    summary: 'A picturesque Gurung heritage village with traditional stone houses, slate roofs, and uninterrupted views of Mount Machhapuchhre.',
    highlights: [
      'Exploring the authentic Gurung cultural museum and heritage cobblestone walkways.',
      'Morning balcony breakfast looking directly at the sharp twin peaks of Mount Fishtail.',
      'Warm local hospitality, traditional attire, and organic local foods.'
    ],
    travelStory: [
      'Ghandruk is the quintessential mountain village. Cobbled alleys snake between neat stone houses, decorated with blooming marigolds and prayer flags waving in the gentle breeze.',
      'Spending quiet evenings listening to local stories, savoring fresh dal bhat, and watching the sunset cast purple hues over Hiunchuli and Annapurna South was pure bliss.',
      'It is the perfect blend of rich culture, serene mountain living, and accessible trekking trails.'
    ]
  },
  {
    id: 'ilam',
    name: 'Ilam (Kanyam & Tea Gardens)',
    location: 'Ilam District',
    region: 'Eastern Nepal',
    altitude: '1,600 m (5,250 ft)',
    category: 'heritage-hills',
    categoryLabel: 'Tea Gardens & Hills',
    bestSeason: 'Autumn & Spring',
    type: 'Scenic Hills & Agricultural Paradise',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    summary: 'Endless rolling emerald hills draped in manicured tea estates, cool mountain breezes, and peaceful countryside roads.',
    highlights: [
      'Walking through the velvet green tea plantations of Kanyam and tasting fresh Orthodox tea.',
      'Horse riding along misty hill slopes and enjoying fresh local dairy products (Chhurpi).',
      'Panoramic sunrise views overlooking the Eastern plains and distant Kanchanjunga range.'
    ],
    travelStory: [
      'Traveling eastward to Ilam is a journey into lush green paradise. As the roads curve upwards, the hills become carpeted in manicured tea bushes that stretch as far as the eye can see.',
      'The morning mist rolling over Kanyam\'s slopes creates a dreamlike atmosphere. Stopping by local tea stalls to sip freshly brewed golden tea was deeply comforting.',
      'Ilam provided a gentle, calm, and soothing contrast to high alpine climbs — a true retreat of green harmony.'
    ]
  },
  {
    id: 'hiley-jharna',
    name: 'Hiley Jharna (Hyatung / Hile Waterfall)',
    location: 'Dhankuta / Terhathum',
    region: 'Eastern Nepal',
    altitude: '1,400 m (4,593 ft)',
    category: 'waterfalls-rivers',
    categoryLabel: 'Roaring Waterfall',
    bestSeason: 'Monsoon & Post-Monsoon',
    type: 'Natural Cascade Expedition',
    imageUrl: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80',
    summary: 'A dramatic, roaring mountain waterfall plunging through rocky gorges into lush forested Eastern river valleys.',
    highlights: [
      'Feeling the thunderous mist and cold water spray on the viewing banks.',
      'Lush green canyon hikes surrounded by singing birds and tropical mountain vegetation.',
      'Scenic stopovers at Hile town enjoying local Tongba and warm mountain delicacies.'
    ],
    travelStory: [
      'Hidden in the verdant hills of Eastern Nepal, Hiley Jharna greets visitors with a majestic roar before it even comes into full view.',
      'The sheer force of water cascading over colossal rocks fills the valley air with a refreshing mist that instantly washes away the fatigue of travel.',
      'Combined with the cool mountain breeze of Dhankuta and Hile, this waterfall journey was one of nature’s most invigorating spectacles.'
    ]
  },
  {
    id: 'rupse-jharna',
    name: 'Rupse Jharna',
    location: 'Myagdi District',
    region: 'Kali Gandaki Gorge',
    altitude: '1,600 m (5,249 ft)',
    category: 'waterfalls-rivers',
    categoryLabel: 'Canyon Waterfall',
    bestSeason: 'Autumn & Spring',
    type: 'Dramatic Roadside Wonder',
    imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    summary: 'A towering natural waterfall cascading down rugged rocky cliffs in the deepest gorge in the world along the Beni-Jomsom highway.',
    highlights: [
      'Standing directly beside the thunderous cascade along the Kali Gandaki canyon.',
      'Spectacular views of rugged cliffs, suspension bridges, and steep mountain gorges.',
      'A thrilling stopover on the expedition towards Lower Mustang.'
    ],
    travelStory: [
      'Driving through the rugged Kali Gandaki corridor, Rupse Jharna suddenly bursts onto the scene like a colossal white curtain dropping from the heavens.',
      'The sheer drop and volume of water crashing into the rocky riverbed below is breathtaking. The sound reverberates through the canyon walls.',
      'Standing at the viewpoint with fine water droplets glistening in the sun was an unforgettable highlight of the Mustang road trip.'
    ]
  },
  {
    id: 'octopus-jharna',
    name: 'Octopus Jharna',
    location: 'Jomsom Trail / Annapurna Circuit',
    region: 'Gandaki Corridor',
    altitude: '2,100 m (6,890 ft)',
    category: 'waterfalls-rivers',
    categoryLabel: 'Multi-stream Cascade',
    bestSeason: 'Post-Monsoon & Spring',
    type: 'Hidden Trail Discovery',
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80',
    summary: 'A uniquely branching waterfall where streams fan out across a wide rocky face resembling the tentacles of an octopus.',
    highlights: [
      'Unique geological rock formations causing multi-tiered branching cascades.',
      'Crystal clean mountain water creating natural mini pools at the base.',
      'A serene, less-crowded photography haven along the trekking route.'
    ],
    travelStory: [
      'Unlike single-plunge waterfalls, Octopus Jharna captivates with its intricate branching patterns. Water divides into dozens of silvery streams cascading over tiered rocks.',
      'We spent an hour resting here, dipping our feet into the cool mountain stream and capturing long-exposure photographs of the flowing water.',
      'It felt like a secret oasis tucked away along the rugged terrain.'
    ]
  },
  {
    id: 'lower-mustang-muktinath',
    name: 'Lower Mustang & Muktinath',
    location: 'Mustang District',
    region: 'Trans-Himalayan Plateau',
    altitude: '3,710 m (12,172 ft)',
    category: 'mustang',
    categoryLabel: 'Sacred Pilgrimage & Desert',
    bestSeason: 'Mar - May & Sep - Nov',
    type: 'Spiritual & Arid Landscape Expedition',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    summary: 'The holy temple of Muktinath with 108 sacred water spouts, framed by the wind-sculpted arid hills and apple orchards of Marpha & Jomsom.',
    highlights: [
      'Receiving blessings at the sacred Muktinath Temple and running through the 108 icy water spouts.',
      'Experiencing the ferocious afternoon winds of Jomsom blowing across the Kali Gandaki basin.',
      'Walking through the stone-paved alleys of Marpha and tasting famous organic dried apples.'
    ],
    travelStory: [
      'Mustang is unlike any other place in Nepal. Passing the Annapurna mountain barrier, the landscape shifts from green forests into a moon-like arid plateau.',
      'Visiting Muktinath at 3,710m was deeply moving. Pilgrims from all across Nepal and the world gather here in peaceful devotion beneath the eternal flame (Jwala Mai).',
      'Cycling and driving through Kagbeni, Jomsom, and Marpha with towering Dhaulagiri and Nilgiri peaks overhead was truly magical.'
    ]
  },
  {
    id: 'upper-mustang-korala',
    name: 'Upper Mustang & Korala Border',
    location: 'Lo Manthang to China Border',
    region: 'Forbidden Kingdom of Lo',
    altitude: '4,660 m (15,288 ft)',
    category: 'mustang',
    categoryLabel: 'The Forbidden Kingdom',
    bestSeason: 'Apr - Nov',
    type: 'High-Altitude Remote Expedition',
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    summary: 'The ancient walled kingdom of Lo Manthang, medieval sky caves, ochre canyon cliffs, reaching the northern Korala border outpost with Tibet/China.',
    highlights: [
      'Exploring the preserved royal palace, monasteries, and ancient walled city of Lo Manthang.',
      'Standing at the Korala Border (Pillar 24) at 4,660m on the vast Tibetan plateau.',
      'Discovering the mystical sky caves of Chhoser carved into colossal red sandstone cliffs.'
    ],
    travelStory: [
      'Upper Mustang feels like journeying back in time hundreds of years. The desert canyons, painted chortens, and whitewashed mud-brick villages preserve centuries of Tibetan-Buddhist culture.',
      'Reaching Lo Manthang after days of traversing high windblown passes was surreal. Walking within the ancient kingdom’s walls felt like living inside a history book.',
      'Continuing all the way up to the historic Korala border at 4,660m, overlooking the vast open Tibetan plateau under deep navy skies, was one of the grandest milestones of my travels.'
    ]
  },
  {
    id: 'dharan',
    name: 'Dharan & Bhedetar',
    location: 'Sunsari / Dhankuta',
    region: 'Eastern Nepal',
    altitude: '349 m - 1,420 m',
    category: 'heritage-hills',
    categoryLabel: 'Cultural Hill Gateway',
    bestSeason: 'Year Round',
    type: 'Urban Charm & Hilltop Viewpoints',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80',
    summary: 'A vibrant Eastern city known for Bhanuchowk clock tower, rich ethnic food, warm culture, and quick scenic getaways up to foggy Bhedetar.',
    highlights: [
      'Panoramic sunset views from the Charles Point tower in cool, foggy Bhedetar.',
      'Exploring the sacred Budhasubba and Dantakali historic temples.',
      'Enjoying Dharan’s vibrant evening street culture, cafes, and famous Eastern snacks.'
    ],
    travelStory: [
      'Dharan has a distinct energy — clean streets, friendly locals, and a stylish youth culture nestled right at the base of the Eastern hills.',
      'A short drive uphill leads to Bhedetar (Sailung), where the hot plains quickly give way to cool rolling clouds and panoramic viewpoints looking over the majestic Sapta Koshi river.',
      'Spending evenings at Bhanuchowk and tasting local delicacies made Dharan an essential cultural memory.'
    ]
  },
  {
    id: 'latarameshwar-mahadev',
    name: 'Latarameshwar Mahadev (Lateshwor)',
    location: 'Makwanpur / Sindhuli',
    region: 'Bagmati Province',
    altitude: '2,200 m (7,217 ft)',
    category: 'heritage-hills',
    categoryLabel: 'Spiritual Mountain Shrine',
    bestSeason: 'Autumn & Spring',
    type: 'Hilltop Forest Pilgrimage',
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    summary: 'A peaceful hilltop shrine dedicated to Lord Shiva, accessible via a refreshing uphill forest hike with 360-degree ridge panoramas.',
    highlights: [
      'Tranquil forest trail surrounded by oak and rhododendron trees.',
      'Serene spiritual atmosphere and panoramic views of rolling hills and distant snowlines.',
      'Quiet meditative sanctuary away from urban hustle.'
    ],
    travelStory: [
      'The trek up to Latarameshwar Mahadev offers the perfect weekend escape into nature and spirituality. The path ascends through peaceful pine and subtropical forest trails.',
      'Upon reaching the hilltop shrine, the cool mountain breeze and continuous ringing of brass temple bells bring an immediate sense of inner peace.',
      'Looking out from the ridge over the green valleys below with friends was both grounding and spiritually rejuvenating.'
    ]
  },
  {
    id: 'trishuli-campfire',
    name: 'Trishuli Riverside Campfire',
    location: 'Trishuli River Corridor',
    region: 'Dhading District',
    altitude: '450 m (1,476 ft)',
    category: 'waterfalls-rivers',
    categoryLabel: 'Riverside Camping',
    bestSeason: 'Oct - May',
    type: 'Starlit Night Camping & Adventure',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
    summary: 'Tenting along the sandy riverbanks of Trishuli, crackling campfires under starry skies, barbecue, acoustic guitars, and river adventures.',
    highlights: [
      'Gathering around a roaring campfire with good music, laughter, and starry skies.',
      'Falling asleep to the gentle rushing sound of the mighty Trishuli river.',
      'Morning river dips and thrilling white-water rafting adventures.'
    ],
    travelStory: [
      'There is nothing quite like pitching tents directly on the white sandy banks of the Trishuli river as the sun sets behind the hills.',
      'As night falls, the crackling campfire becomes the centerpiece for storytelling, music, and deep conversations under a canopy of stars.',
      'Waking up to fresh river air, hot morning tea brewed over coals, and the thrill of the rapids was pure outdoor bliss.'
    ]
  },
  {
    id: 'nuwakot',
    name: 'Historic Nuwakot Durbar',
    location: 'Nuwakot District',
    region: 'Bagmati Province',
    altitude: '900 m (2,952 ft)',
    category: 'heritage-hills',
    categoryLabel: 'Historic Fortress',
    bestSeason: 'Year Round',
    type: 'Heritage & Architectural Exploration',
    imageUrl: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=1200&q=80',
    summary: 'The historic seven-story Saat Tale Durbar palace fortress built by King Prithvi Narayan Shah overlooking the scenic Trishuli valley.',
    highlights: [
      'Exploring the intricate wood carvings and brick architecture of the Saat Tale Durbar.',
      'Walking through the historic Bhairabi Temple and ancient stone courtyards.',
      'Panoramic hilltop sunset views overlooking the confluence of rivers and lush valleys.'
    ],
    travelStory: [
      'Nuwakot is a living historical monument. Perched strategically on a ridge, the iconic red-brick seven-story palace stands as a testament to Nepal\'s unification era.',
      'Walking through the ancient wooden gates and inspecting the traditional architectural craftsmanship transport you directly into the 18th century.',
      'The quiet village atmosphere, cobbled streets, and sweeping valley vistas make Nuwakot a fascinating heritage day trip.'
    ]
  },
  {
    id: 'sundarijal',
    name: 'Sundarijal Nature Trails',
    location: 'Kathmandu Valley Gateway',
    region: 'Shivapuri Nagarjun National Park',
    altitude: '1,460 m (4,790 ft)',
    category: 'waterfalls-rivers',
    categoryLabel: 'Forest Streams & Waterfalls',
    bestSeason: 'Year Round',
    type: 'Forest Stream Hike & Gateway',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    summary: 'Fresh gushing waterfalls, reservoir water streams, and tranquil pine forest trails serving as the gateway to the Helambu and Chisapani treks.',
    highlights: [
      'Hiking alongside cascading mountain river streams and natural water reservoirs.',
      'Refreshing green canopy walks inside Shivapuri National Park.',
      'A beloved nearby weekend nature escape for fresh air and quick trail runs.'
    ],
    travelStory: [
      'Sundarijal is where Kathmandu\'s urban buzz dissolves into the soothing sounds of cascading water and birdsong.',
      'Climbing the stone stairways alongside the gushing pipelines and waterfalls leads deep into the quiet shaded forest trails of Shivapuri.',
      'It has always been a favorite spot for quick spontaneous retreats, boulder hopping, and reconnecting with nature.'
    ]
  },
  {
    id: 'phewa-lake',
    name: 'Phewa Lake, Pokhara',
    location: 'Pokhara Valley',
    region: 'Kaski District',
    altitude: '742 m (2,434 ft)',
    category: 'lakes-treks',
    categoryLabel: 'Iconic Mountain Lake',
    bestSeason: 'Year Round',
    type: 'Boating & Scenic Lakeside Leisure',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    summary: 'The heart of Pokhara — calm waters reflecting the iconic Fishtail peak, colorful wooden boats, and unforgettable lakeside sunsets.',
    highlights: [
      'Rowing colourful traditional wooden boats (Doonga) across to Tal Barahi temple island.',
      'Watching the magical reflection of Mount Machhapuchhre glowing at golden hour.',
      'Vibrant evening lakeside promenades, acoustic live music, and cozy cafes.'
    ],
    travelStory: [
      'Phewa Lake has a timeless charm that never fades no matter how many times you return. Gliding across the glass-like water with oars dipping quietly into the lake brings total peace.',
      'At dusk, when the reflection of Machhapuchhre turns amber and purple on the water, Pokhara reveals its true magic.',
      'Phewa Lake remains the ultimate sanctuary to unwind, celebrate completed treks, and reflect on life.'
    ]
  },
  {
    id: 'friends-more-than-decades',
    name: 'Friends More Than Decades',
    location: 'Lifelong Companions',
    region: 'Through Every Step of Life',
    altitude: 'Infinite Memories',
    category: 'friends-life',
    categoryLabel: 'Lifelong Brotherhood',
    bestSeason: 'Always & Forever',
    type: 'Decade of Unbreakable Bonds',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    summary: 'A heartfelt tribute to my closest friends who have walked beside me through every high and low for more than 10+ years — from school corridors and late-night talks to wild mountain adventures.',
    highlights: [
      'Standing shoulder-to-shoulder through school, college, career transitions, and life milestones.',
      'Countless spontaneous road trips, overnight campfires, and deep conversations under starlit skies.',
      'Unwavering support during tough times, celebrating every victory, and growing up together as family.'
    ],
    travelStory: [
      'True wealth in life is never measured by destinations crossed or titles earned, but by the people who walk beside you along the way. For more than a decade, my closest friends have been my strongest pillar, travel companions, and brothers in every sense of the word.',
      'From packing backpacks for impromptu high-altitude treks to sitting around crackling campfires singing old songs into the night, we have shared triumphs, weathered storms, and grown up together. They are the ones who make the hardest climbs feel effortless and the longest journeys feel like home.',
      'Through every phase of life — early dreams, college struggles, career hurdles, and wild travel adventures across Nepal — they have stood by me with unwavering loyalty, laughter, and honest encouragement. This page is dedicated with deep gratitude to a friendship that has stood strong for over a decade and will continue for a lifetime.'
    ]
  }
];

interface LifePageProps {
  initialStoryId?: string | null;
  onNavigateToWork?: () => void;
}

export default function LifePage({ initialStoryId, onNavigateToWork }: LifePageProps) {
  const [selectedPlace, setSelectedPlace] = useState<ExploredPlace | null>(null);
  const [previewPlace, setPreviewPlace] = useState<ExploredPlace | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<PlaceCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Close preview or modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (previewPlace) {
          setPreviewPlace(null);
        } else if (selectedPlace) {
          handleClosePlace();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewPlace, selectedPlace]);

  // Deep-link support: auto-open story if initialStoryId matches
  useEffect(() => {
    if (initialStoryId) {
      const match = exploredPlaces.find(
        p => p.id.toLowerCase() === initialStoryId.toLowerCase() ||
             p.id.toLowerCase().includes(initialStoryId.toLowerCase())
      );
      if (match) {
        setSelectedPlace(match);
      }
    }
  }, [initialStoryId]);

  const handleOpenPlace = (place: ExploredPlace) => {
    setSelectedPlace(place);
    window.location.hash = `#/blog/life/${place.id}`;
  };

  const handleClosePlace = () => {
    setSelectedPlace(null);
    window.location.hash = '#/blog/life';
  };

  const handleCopyShareLink = (place: ExploredPlace, e?: MouseEvent) => {
    if (e) e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}#/blog/life/${place.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(place.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredPlaces = useMemo(() => {
    return exploredPlaces.filter(place => {
      const matchesSearch =
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = activeCategory === 'all' || place.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCategory]);

  const counts = useMemo(() => ({
    all: exploredPlaces.length,
    'lakes-treks': exploredPlaces.filter(p => p.category === 'lakes-treks').length,
    mustang: exploredPlaces.filter(p => p.category === 'mustang').length,
    'waterfalls-rivers': exploredPlaces.filter(p => p.category === 'waterfalls-rivers').length,
    'heritage-hills': exploredPlaces.filter(p => p.category === 'heritage-hills').length,
    'friends-life': exploredPlaces.filter(p => p.category === 'friends-life').length,
  }), []);

  return (
    <section className="min-h-screen px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">

        {/* Page Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 sm:p-12 shadow-2xl shadow-black/20 relative overflow-hidden"
        >
          <div className="absolute right-[-5%] top-[-10%] w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-[20%] bottom-[-20%] w-80 h-80 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2.5 text-emerald-400 font-mono text-xs uppercase tracking-[0.25em]">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                  <Compass className="h-4 w-4" />
                </div>
                <span>Life & Exploration Travelogue</span>
              </div>

              {onNavigateToWork && (
                <button
                  onClick={onNavigateToWork}
                  className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-purple-400 px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                  <span>Switch to Work Page</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <h1 className="mt-5 font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Journeys, High Passes & <span className="text-emerald-400">Hidden Trails</span>.
            </h1>

            <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-zinc-400 font-light">
              A personal visual travelogue of memorable places and lifelong milestones I have explored across Nepal — from the high glacial peaks of Tilicho (4,919m) and pristine waters of Rara, to the ancient walled kingdom of Upper Mustang and the enduring bonds of friendship.
            </p>

            {/* Travel Stats Quick Ribbon */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/5">
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="block text-2xl font-bold text-white font-display">17</span>
                <span className="text-[11px] font-mono text-emerald-300">Life Stories & Places</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="block text-2xl font-bold text-white font-display">4,919 m</span>
                <span className="text-[11px] font-mono text-sky-300">Highest (Tilicho)</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="block text-2xl font-bold text-white font-display">10+ Yrs</span>
                <span className="text-[11px] font-mono text-teal-300">Friendship Bond</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="block text-2xl font-bold text-white font-display">Korala 🇨🇳</span>
                <span className="text-[11px] font-mono text-amber-300">Border Reached</span>
              </div>
            </div>

            {/* Search & Category Filter Bar */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search destinations (e.g. Rara, Tilicho, Mustang, Friends)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${activeCategory === 'all'
                      ? 'bg-emerald-600 text-white font-medium shadow-md shadow-emerald-900/30'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                >
                  All ({counts.all})
                </button>

                <button
                  onClick={() => setActiveCategory('lakes-treks')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${activeCategory === 'lakes-treks'
                      ? 'bg-sky-600 text-white font-medium shadow-md shadow-sky-900/30'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-sky-300 hover:bg-white/10 border border-white/5'
                    }`}
                >
                  <Mountain className="w-3.5 h-3.5 text-sky-400" />
                  <span>Lakes & Treks ({counts['lakes-treks']})</span>
                </button>

                <button
                  onClick={() => setActiveCategory('mustang')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${activeCategory === 'mustang'
                      ? 'bg-amber-600 text-white font-medium shadow-md shadow-amber-900/30'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-amber-300 hover:bg-white/10 border border-white/5'
                    }`}
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mustang ({counts.mustang})</span>
                </button>

                <button
                  onClick={() => setActiveCategory('waterfalls-rivers')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${activeCategory === 'waterfalls-rivers'
                      ? 'bg-cyan-600 text-white font-medium shadow-md shadow-cyan-900/30'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-cyan-300 hover:bg-white/10 border border-white/5'
                    }`}
                >
                  <Waves className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Waterfalls ({counts['waterfalls-rivers']})</span>
                </button>

                <button
                  onClick={() => setActiveCategory('heritage-hills')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${activeCategory === 'heritage-hills'
                      ? 'bg-emerald-600 text-white font-medium shadow-md shadow-emerald-900/30'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-emerald-300 hover:bg-white/10 border border-white/5'
                    }`}
                >
                  <TreePine className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Hills & Heritage ({counts['heritage-hills']})</span>
                </button>

                <button
                  onClick={() => setActiveCategory('friends-life')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${activeCategory === 'friends-life'
                      ? 'bg-teal-600 text-white font-medium shadow-md shadow-teal-900/30'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-teal-300 hover:bg-white/10 border border-white/5'
                    }`}
                >
                  <Users className="w-3.5 h-3.5 text-teal-400" />
                  <span>Friends ({counts['friends-life']})</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Explored Places Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredPlaces.map((place, index) => (
              <motion.article
                key={place.id}
                id={place.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="group rounded-3xl border border-white/10 bg-[#070707] flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/20 overflow-hidden relative"
              >
                {/* Photo Thumbnail Container - Clickable to Preview */}
                <div 
                  onClick={() => setPreviewPlace(place)}
                  title="Click to preview full-screen image"
                  className="relative h-48 w-full overflow-hidden bg-zinc-900 cursor-zoom-in group/img"
                >
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 filter brightness-[0.9] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-black/30" />

                  {/* Hover Preview Overlay Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px] pointer-events-none">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 border border-white/20 text-white text-xs font-mono font-medium shadow-xl">
                      <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Preview Image</span>
                    </div>
                  </div>

                  {/* Category Pill on Photo */}
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold backdrop-blur-md bg-black/60 text-emerald-300 border border-white/10">
                      {place.categoryLabel}
                    </span>
                  </div>

                  {/* 1-Click Copy Direct Link Button */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleCopyShareLink(place, e)}
                      title="Copy direct shareable link for friends"
                      className="p-2 rounded-full backdrop-blur-md bg-black/60 hover:bg-emerald-600 text-zinc-300 hover:text-white transition-all border border-white/10 cursor-pointer flex items-center gap-1"
                    >
                      {copiedId === place.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {place.altitude && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium backdrop-blur-md bg-black/60 text-sky-200 border border-sky-500/20 flex items-center gap-1">
                        <Mountain className="w-3 h-3 text-sky-400" />
                        {place.altitude.split('(')[0]}
                      </span>
                    )}
                  </div>

                  {/* Quick Expand Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenPlace(place);
                    }}
                    title="Read Story"
                    aria-label="Expand Travelogue"
                    className="absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-md bg-black/60 text-white hover:bg-emerald-600 transition-colors border border-white/10 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Location subtitle */}
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono mb-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{place.location}, {place.region}</span>
                    </div>

                    <h2 className="font-display text-xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {place.name}
                    </h2>

                    <p className="mt-2.5 text-xs leading-relaxed text-zinc-400 font-light line-clamp-3">
                      {place.summary}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-500">
                      {place.type.split(' ')[0]} • {place.bestSeason}
                    </span>

                    <button
                      onClick={() => handleOpenPlace(place)}
                      className="text-xs font-semibold text-emerald-400 hover:text-white flex items-center gap-1 transition-colors pl-2 cursor-pointer"
                    >
                      <span>Read Story</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Travelogue Detail Reader */}
        <AnimatePresence>
          {selectedPlace && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
              onClick={handleClosePlace}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass rounded-3xl border border-white/10 shadow-2xl space-y-6"
              >
                {/* Header Banner Image - Clickable for Fullscreen View */}
                <div 
                  onClick={() => setPreviewPlace(selectedPlace)}
                  title="Click to expand full-screen photo"
                  className="relative h-64 sm:h-72 w-full overflow-hidden rounded-t-3xl bg-zinc-900 cursor-zoom-in group/modalimg"
                >
                  <img
                    src={selectedPlace.imageUrl}
                    alt={selectedPlace.name}
                    className="w-full h-full object-cover filter brightness-[0.85] transition-transform duration-700 group-hover/modalimg:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/40" />

                  {/* Top Left Zoom Indicator */}
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium backdrop-blur-md bg-black/60 text-emerald-300 border border-white/10 opacity-80 group-hover/modalimg:opacity-100 transition-opacity">
                      <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Click to preview image</span>
                    </span>
                  </div>

                  {/* Header Top Controls */}
                  <div className="absolute top-4 right-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleCopyShareLink(selectedPlace)}
                      className="px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-emerald-600 text-white text-xs font-mono font-medium transition-all border border-white/10 backdrop-blur-md cursor-pointer flex items-center gap-1.5"
                    >
                      {copiedId === selectedPlace.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share Link</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleClosePlace}
                      aria-label="Close modal"
                      className="p-2 rounded-full bg-black/60 hover:bg-white/20 text-white transition-colors border border-white/10 backdrop-blur-md cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold bg-emerald-600/90 text-white backdrop-blur-md">
                        {selectedPlace.categoryLabel}
                      </span>
                      {selectedPlace.altitude && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-sky-600/90 text-white backdrop-blur-md flex items-center gap-1">
                          <Mountain className="w-3 h-3" />
                          {selectedPlace.altitude}
                        </span>
                      )}
                    </div>

                    <h2 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight drop-shadow-md">
                      {selectedPlace.name}
                    </h2>
                    <p className="text-xs font-mono text-emerald-300 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedPlace.location}, {selectedPlace.region}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6 pt-0">
                  {/* Key Highlights */}
                  <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-5 space-y-2.5">
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 font-semibold block">
                      Memorable Highlights & Experiences:
                    </span>
                    <div className="space-y-2">
                      {selectedPlace.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Travel Story Paragraphs */}
                  <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-300 font-light border-y border-white/5 py-6">
                    {selectedPlace.travelStory.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Meta Tags and Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                      <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                        Season: {selectedPlace.bestSeason}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                        Type: {selectedPlace.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewPlace(selectedPlace)}
                        className="px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/10 text-white text-xs font-semibold transition-all border border-white/10 cursor-pointer flex items-center gap-1.5"
                      >
                        <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Preview Full Photo</span>
                      </button>

                      <button
                        onClick={() => handleCopyShareLink(selectedPlace)}
                        className="px-4 py-2 rounded-full bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        {copiedId === selectedPlace.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Share with Friends</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleClosePlace}
                        className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full-Screen High-Resolution Image Lightbox Preview */}
        <AnimatePresence>
          {previewPlace && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-4 sm:p-8 bg-black/95 backdrop-blur-2xl"
              onClick={() => setPreviewPlace(null)}
            >
              {/* Top Bar Controls */}
              <div 
                className="w-full max-w-6xl flex items-center justify-between z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-emerald-600/90 text-white backdrop-blur-md shadow-md">
                    {previewPlace.categoryLabel}
                  </span>
                  {previewPlace.altitude && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sky-600/90 text-white backdrop-blur-md flex items-center gap-1.5 shadow-md">
                      <Mountain className="w-3.5 h-3.5" />
                      {previewPlace.altitude}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopyShareLink(previewPlace)}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-emerald-600 text-white text-xs font-mono font-medium transition-all border border-white/15 backdrop-blur-md cursor-pointer flex items-center gap-2 shadow-lg"
                  >
                    {copiedId === previewPlace.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share Story</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setPreviewPlace(null)}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 backdrop-blur-md cursor-pointer shadow-lg"
                    aria-label="Close Preview"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Center High-Resolution Image */}
              <div 
                className="relative my-auto max-h-[75vh] max-w-5xl flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/90"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  src={previewPlace.imageUrl}
                  alt={previewPlace.name}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl select-none"
                />
              </div>

              {/* Bottom Caption Bar */}
              <div 
                className="w-full max-w-4xl text-center z-10 pb-2 space-y-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-display text-xl sm:text-3xl font-bold text-white tracking-wide drop-shadow-lg">
                  {previewPlace.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-emerald-400 flex items-center justify-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {previewPlace.location}, {previewPlace.region} • {previewPlace.type}
                </p>
                <p className="text-[11px] font-mono text-zinc-500 pt-1">
                  Press ESC or click anywhere outside image to close
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
