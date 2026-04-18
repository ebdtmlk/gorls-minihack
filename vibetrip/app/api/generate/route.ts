import { NextResponse } from "next/server";

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const tripData: Record<string, any[]> = {
  tokyo: [
    {
      playlist: [
        "Kenshi Yonezu - Lemon",
        "Official HIGE DANdism - Pretender",
        "Ado - Usseewa",
        "Yoasobi - Idol",
        "Gen Hoshino - Pop Virus",
        "Hikaru Utada - First Love",
        "King Gnu - Hakujitsu",
        "Yorushika - Say It",
      ],
      outfits: [
        "oversized linen shirt wide leg trousers minimalist tokyo street style",
        "floral midi dress strappy sandals sun hat japan summer",
        "cargo pants crop top platform sneakers harajuku aesthetic",
        "flowy co-ord set bamboo bag cherry blossom japan",
      ],
      activities: [
        "Explore Shibuya Crossing at night and grab ramen in a tiny alley shop",
        "Day trip to Nikko to see the ornate Tosho-gu shrine",
        "TeamLab Planets digital art immersive experience in Toyosu",
        "Vintage thrift shopping in Shimokitazawa neighborhood",
        "Morning visit to Senso-ji temple in Asakusa before crowds arrive",
        "Picnic in Yoyogi Park with konbini snacks and matcha",
      ],
      photos: [
        "golden hour shibuya crossing aerial view tokyo neon lights",
        "senso-ji temple red lanterns asakusa japan misty morning",
        "harajuku takeshita street colorful fashion street photography",
        "mount fuji view chureito pagoda cherry blossoms",
      ],
      itinerary: [
        "Day 1: Morning - Arrive, check in, explore Shinjuku. Afternoon - Meiji Shrine. Evening - Golden Gai for drinks.",
        "Day 2: Morning - Senso-ji temple in Asakusa. Afternoon - TeamLab Planets. Evening - Shibuya crossing and ramen.",
        "Day 3: Morning - Shimokitazawa thrift shopping. Afternoon - Yoyogi Park picnic. Evening - Harajuku Takeshita Street.",
        "Day 4: Morning - Day trip to Nikko shrines. Afternoon - Nature walk. Evening - Conveyor belt sushi.",
        "Day 5: Morning - Tsukiji outer market breakfast. Afternoon - Odaiba. Evening - Rooftop bar in Roppongi.",
      ],
    },
    {
      playlist: [
        "Yoasobi - The Night",
        "Fujii Kaze - Heavn",
        "Ado - New Genesis",
        "Kenshi Yonezu - Pale Blue",
        "Official HIGE DANdism - I LOVE...",
        "Hikaru Utada - Fly Me to the Moon",
        "Yorushika - Elma",
        "King Gnu - Prayer X",
      ],
      outfits: [
        "japanese street fashion oversized blazer wide pants loafers",
        "soft girl aesthetic pastel dress platform shoes tokyo",
        "monochrome black outfit leather jacket tokyo night",
        "vintage denim jacket mini skirt boots japan aesthetic",
      ],
      activities: [
        "Explore the Akihabara electric town and anime shops",
        "Visit the teamLab Borderless digital art museum",
        "Walk through the bamboo grove in Arashiyama day trip",
        "Try a traditional tea ceremony in a historic machiya",
        "Explore Yanaka, Tokyo's old-town neighborhood",
        "Night ramen crawl through Shinjuku back alleys",
      ],
      photos: [
        "tokyo tower view at night cherry blossom spring",
        "arashiyama bamboo grove japan misty morning light",
        "akihabara neon signs night street photography tokyo",
        "yanaka old town tokyo vintage alley japan travel",
      ],
      itinerary: [
        "Day 1: Morning - Tsukiji market breakfast. Afternoon - Ginza shopping. Evening - Tokyo Tower at night.",
        "Day 2: Morning - Akihabara exploration. Afternoon - teamLab Borderless. Evening - Izakaya dinner in Shinjuku.",
        "Day 3: Morning - Yanaka old town walk. Afternoon - Ueno Park and museum. Evening - Craft cocktails in Ginza.",
        "Day 4: Morning - Day trip to Kamakura. Afternoon - Giant Buddha and beaches. Evening - Back to Tokyo for sushi.",
        "Day 5: Morning - Hamarikyu Gardens. Afternoon - Odaiba waterfront. Evening - Farewell dinner in Roppongi.",
      ],
    },
  ],

  paris: [
    {
      playlist: [
        "Edith Piaf - La Vie en Rose",
        "Stromae - Papaoutai",
        "Christine and the Queens - Tilted",
        "Carla Bruni - Quelqu'un m'a dit",
        "Yelle - Je Veux Te Voir",
        "Phoenix - 1901",
        "Air - La Femme D'Argent",
        "Sebastien Tellier - La Ritournelle",
      ],
      outfits: [
        "french girl aesthetic striped shirt beret trench coat paris",
        "chic parisian style silk slip dress loafers gold jewelry",
        "oversized blazer straight jeans white tee ballet flats paris",
        "flowy floral dress espadrilles wicker bag summer paris",
      ],
      activities: [
        "Picnic at Champ de Mars with wine and cheese at sunset",
        "Explore hidden passages and covered arcades of the 2nd arrondissement",
        "Visit Musee d'Orsay impressionist collection on a weekday morning",
        "Browse vintage finds at Marche aux Puces de Saint-Ouen",
        "Stroll through Le Marais and stop at a rooftop bar",
        "Day trip to Versailles gardens and palace",
      ],
      photos: [
        "eiffel tower golden hour paris sunset aesthetic",
        "paris cafe terrace croissant coffee morning light",
        "montmartre cobblestone streets sacre coeur paris",
        "seine river bridge paris night lights reflection",
      ],
      itinerary: [
        "Day 1: Morning - Arrive, drop bags, coffee at a corner cafe. Afternoon - Notre Dame and Ile de la Cite. Evening - Wine at a wine bar in Saint-Germain.",
        "Day 2: Morning - Louvre museum early entry. Afternoon - Tuileries Garden picnic. Evening - Sunset at Eiffel Tower.",
        "Day 3: Morning - Le Marais exploration and falafel. Afternoon - Pompidou Centre. Evening - Rooftop cocktails.",
        "Day 4: Morning - Day trip to Versailles. Afternoon - Palace and gardens. Evening - Return for dinner in Montmartre.",
        "Day 5: Morning - Sacre Coeur and artists square. Afternoon - Vintage shopping. Evening - Farewell dinner at a bistro.",
      ],
    },
  ],

  bali: [
    {
      playlist: [
        "Khruangbin - White Gloves",
        "Glass Animals - Heat Waves",
        "Still Woozy - Goodie Bag",
        "Tash Sultana - Jungle",
        "Rex Orange County - Loving is Easy",
        "Mac DeMarco - Chamber of Reflection",
        "Mild High Club - Skiptracing",
        "Men I Trust - Numb",
      ],
      outfits: [
        "flowy boho dress beach cover up bali summer tropical",
        "linen co-ord set sandals rattan bag bali aesthetic",
        "bikini sarong wrap beach resort wear tropical",
        "crochet top wide leg linen pants sun hat bali",
      ],
      activities: [
        "Watch sunrise at Mount Batur volcano after a 4am hike",
        "Take a cooking class and learn to make nasi goreng",
        "Visit the sacred Tirta Empul water temple for a blessing",
        "Explore the Tegallalang rice terraces at golden hour",
        "Surf lessons at Canggu beach followed by smoothie bowls",
        "Sunset at Tanah Lot sea temple",
      ],
      photos: [
        "bali rice terraces tegallalang golden hour green landscape",
        "uluwatu temple cliff edge bali ocean sunset",
        "bali ubud jungle waterfall tropical lush greenery",
        "canggu beach surf bali sunset silhouette",
      ],
      itinerary: [
        "Day 1: Morning - Arrive in Ubud, check in. Afternoon - Monkey Forest and rice terrace walk. Evening - Traditional dance show.",
        "Day 2: Morning - 4am Batur volcano sunrise hike. Afternoon - Hot springs recovery. Evening - Cooking class dinner.",
        "Day 3: Morning - Tirta Empul temple blessing. Afternoon - Tegallalang rice terraces. Evening - Ubud night market.",
        "Day 4: Morning - Drive to Seminyak. Afternoon - Beach club and surf. Evening - Sunset cocktails at Ku De Ta.",
        "Day 5: Morning - Tanah Lot temple. Afternoon - Canggu cafe hopping. Evening - Farewell dinner on the beach.",
      ],
    },
  ],

  "new york": [
    {
      playlist: [
        "Frank Sinatra - New York New York",
        "Jay-Z - Empire State of Mind",
        "LCD Soundsystem - New York I Love You",
        "The Strokes - Last Nite",
        "Vampire Weekend - A-Punk",
        "Yeah Yeah Yeahs - Maps",
        "Talking Heads - Life During Wartime",
        "Velvet Underground - Walk on the Wild Side",
      ],
      outfits: [
        "new york street style oversized coat straight jeans chelsea boots",
        "brooklyn aesthetic vintage band tee baggy jeans new balance",
        "chic manhattan style blazer midi skirt pointed toe heels",
        "soho fashion crop jacket wide trousers loafers new york",
      ],
      activities: [
        "Walk the High Line from Meatpacking to Hudson Yards",
        "Explore the MET museum rooftop for skyline views",
        "Bagel and lox breakfast at Russ and Daughters on the Lower East Side",
        "Brooklyn Bridge walk followed by DUMBO exploration",
        "Jazz night at Village Vanguard in Greenwich Village",
        "Chelsea galleries and gallery hop on a Saturday afternoon",
      ],
      photos: [
        "new york skyline manhattan golden hour aerial view",
        "brooklyn bridge dumbo new york street photography",
        "central park new york autumn leaves fall aesthetic",
        "new york subway street photography candid urban",
      ],
      itinerary: [
        "Day 1: Morning - Arrive, drop bags, deli breakfast. Afternoon - Central Park and MET museum. Evening - Rooftop bar in Midtown.",
        "Day 2: Morning - Brooklyn Bridge walk. Afternoon - DUMBO and Brooklyn Heights. Evening - Pizza in Williamsburg.",
        "Day 3: Morning - Lower East Side bagels. Afternoon - High Line and Chelsea Market. Evening - Jazz in the West Village.",
        "Day 4: Morning - Soho shopping and brunch. Afternoon - Whitney Museum. Evening - Dinner in the East Village.",
        "Day 5: Morning - Governors Island ferry. Afternoon - Chinatown and Little Italy. Evening - Farewell rooftop cocktails.",
      ],
    },
  ],
};

const defaultTrip = {
  playlist: [
    "Khruangbin - White Gloves",
    "Glass Animals - Heat Waves",
    "Tash Sultana - Jungle",
    "Rex Orange County - Loving is Easy",
    "Still Woozy - Goodie Bag",
    "Men I Trust - Numb",
    "Mac DeMarco - Chamber of Reflection",
    "Mild High Club - Skiptracing",
  ],
  outfits: [
    "travel outfit linen pants white shirt minimalist aesthetic",
    "summer travel dress sandals straw hat wanderlust",
    "street style oversized jacket straight jeans sneakers travel",
    "boho chic maxi dress rattan bag travel aesthetic",
  ],
  activities: [
    "Explore the local market and try street food",
    "Visit the most iconic landmark at sunrise",
    "Take a cooking class and learn a local dish",
    "Wander the old town streets with no plan",
    "Find a rooftop bar for sunset drinks",
    "Day trip to a nearby natural wonder",
  ],
  photos: [
    "golden hour travel aesthetic wanderlust landscape",
    "local market colorful street photography travel",
    "old town cobblestone streets travel aesthetic morning",
    "rooftop view city sunset travel golden hour",
  ],
  itinerary: [
    "Day 1: Morning - Arrive and explore the neighborhood. Afternoon - Visit main landmark. Evening - Local dinner spot.",
    "Day 2: Morning - Market and street food breakfast. Afternoon - Museum or cultural site. Evening - Sunset rooftop.",
    "Day 3: Morning - Cooking class. Afternoon - Old town wander. Evening - Live music or night market.",
    "Day 4: Morning - Day trip to nature. Afternoon - Scenic views. Evening - Back for a nice dinner.",
    "Day 5: Morning - Slow morning at a cafe. Afternoon - Last minute shopping. Evening - Farewell dinner.",
  ],
};

export async function POST(req: Request) {
  const { location } = await req.json();

  const key = location?.toLowerCase().trim();
  const options = tripData[key];
  const result = options ? pick(options) : defaultTrip;

  return NextResponse.json(result);
}
