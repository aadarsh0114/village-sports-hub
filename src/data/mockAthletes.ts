import { Athlete, Opportunity } from '../types/sports';

export const INITIAL_ATHLETES: Athlete[] = [
  {
    id: 1,
    name: "Arjun Reddy",
    sport: "Cricket",
    location: "Choutuppal, Nalgonda, Telangana",
    village: "Choutuppal",
    mandal: "Choutuppal",
    district: "Nalgonda",
    state: "Telangana",
    age: "17 (U-18)",
    ageGroup: "U-18",
    gender: "Male",
    category: "Right-arm Fast Bowler & All-rounder",
    verified: true,
    verificationDate: "Aug 2026",
    verificationAuthority: "Telangana District Sports Authority (TDSA)",
    photo: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=600",
    avatarSeed: "arjun-reddy-cricket",
    accentColor: "#166534",
    bio: "Paces consistently at 134 km/h using tape-ball and leather ball on rural clay pitches. Led Nalgonda Rural XI to the state zonal quarter-finals with a match-winning 5-wicket haul and quick 48 off 26 balls.",
    coach: {
      name: "Coach Raghavendra Rao",
      club: "Nalgonda Rural Cricket Club",
      phone: "+91 98480 23110",
      verified: true
    },
    stats: {
      "Bowling Speed": "134 km/h",
      "Wickets": "38 in 14 matches",
      "Economy Rate": "4.12",
      "Batting Strike Rate": "142.6",
      "Best Figures": "5/18"
    },
    physicalMetrics: {
      height: "183 cm (6'0\")",
      weight: "72 kg",
      wingspan: "188 cm",
      yoYoScore: "19.8",
      verticalJump: "62 cm"
    },
    achievements: [
      "District U-19 Championship Best Bowler (2026)",
      "Player of the Match - South Telangana Rural Trophy",
      "Shortlisted for South Zone Academy Selection Trials"
    ],
    videos: [
      {
        title: "Bowling Action Analysis & 134 km/h Spell vs Warangal Rural",
        duration: "03:45",
        recordedAt: "July 2026",
        notes: "Shot with high-speed side angle camera at Choutuppal Sports Ground.",
        highlights: [
          { time: "00:15", label: "Run-up & Clean Action" },
          { time: "01:05", label: "In-swinger delivery off the seam" },
          { time: "02:10", label: "Bouncer at 134 km/h" },
          { time: "03:00", label: "Clean Bowled Stumps Flying" }
        ]
      },
      {
        title: "Lower Order Power Hitting - 48 (26) Highlights",
        duration: "02:15",
        recordedAt: "May 2026",
        highlights: [
          { time: "00:20", label: "Straight Lofted Drive" },
          { time: "01:10", label: "Pull Shot for Six over Midwicket" }
        ]
      }
    ],
    needs: {
      goal: 18000,
      current: 12500,
      reason: "Professional leather cricket kit, fast bowling spike shoes & travel for State Academy Selection in Hyderabad.",
      backersCount: 14,
      breakdown: [
        { item: "SG Fast Bowling Spikes (UK 9)", cost: 4500 },
        { item: "English Willow Bat & Protective Gear", cost: 8500 },
        { item: "Bus Travel & Stay for Hyderabad Trials (7 Days)", cost: 5000 }
      ]
    },
    scoutNotesCount: 5,
    trialsAttended: 3,
    status: "Ready for Trials",
    dateRegistered: "2026-06-12"
  },
  {
    id: 2,
    name: "Sana Begum",
    sport: "Athletics",
    location: "Jadcherla, Mahbubnagar, Telangana",
    village: "Jadcherla",
    mandal: "Jadcherla",
    district: "Mahbubnagar",
    state: "Telangana",
    age: "16 (U-16)",
    ageGroup: "U-16",
    gender: "Female",
    category: "100m & 200m Sprinter",
    verified: true,
    verificationDate: "Sep 2026",
    verificationAuthority: "Athletics Federation of India (District Chapter)",
    photo: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=600",
    avatarSeed: "sana-begum-athletics",
    accentColor: "#047857",
    bio: "Natural speed powerhouse trained on village farm tracks without synthetic surfaces. Clocked 12.18s electronically at State Youth Meet, finishing on the podium against athletes with professional coaching.",
    coach: {
      name: "Master K. Satyanarayana",
      club: "Jadcherla Govt High School Sports Club",
      phone: "+91 94401 55291",
      verified: true
    },
    stats: {
      "100m Personal Best": "12.18s (Electronic)",
      "200m Personal Best": "25.10s",
      "Reaction Time": "0.162s",
      "State Rank": "Top 3 in Telangana U-16"
    },
    physicalMetrics: {
      height: "164 cm",
      weight: "53 kg",
      speed100m: "12.18s",
      yoYoScore: "20.2",
      verticalJump: "54 cm"
    },
    achievements: [
      "Gold Medal - South Zone Inter-District Athletics 100m",
      "Silver Medal - Telangana State Youth Athletics Championship 200m",
      "District Record Holder U-16 100m Sprint"
    ],
    videos: [
      {
        title: "100m Final Sprint - 12.18s State Championship",
        duration: "01:20",
        recordedAt: "August 2026",
        notes: "Race start from lane 4, explosive drive phase and upright sprint mechanic.",
        highlights: [
          { time: "00:08", label: "Block Start Reaction" },
          { time: "00:22", label: "30m Drive Phase Acceleration" },
          { time: "00:45", label: "Top Speed Stride Frequency" },
          { time: "01:05", label: "Photo Finish Dip" }
        ]
      }
    ],
    needs: {
      goal: 22000,
      current: 17800,
      reason: "Track sprint spikes, high-protein athletic nutrition & transport for National Junior Athletics Trials in Ranchi.",
      backersCount: 22,
      breakdown: [
        { item: "Puma EvoSpeed Sprint Spikes", cost: 7200 },
        { item: "3 Months Sports Nutrition & Whey Protein", cost: 6800 },
        { item: "Train travel & stay for National Junior Trials", cost: 8000 }
      ]
    },
    scoutNotesCount: 8,
    trialsAttended: 4,
    status: "Ready for Trials",
    dateRegistered: "2026-05-18"
  },
  {
    id: 3,
    name: "Vikram Singh",
    sport: "Football",
    location: "Kazipet, Warangal, Telangana",
    village: "Kazipet",
    mandal: "Hanamkonda",
    district: "Warangal",
    state: "Telangana",
    age: "18 (U-19)",
    ageGroup: "U-18",
    gender: "Male",
    category: "Centre Forward / Striker",
    verified: true,
    verificationDate: "July 2026",
    verificationAuthority: "Warangal District Football Association",
    photo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600",
    avatarSeed: "vikram-singh-football",
    accentColor: "#0284c7",
    bio: "Dynamic attacking forward known for aggressive pressing and lethal first-touch finishing inside the box. Scored 19 goals in 14 matches for Warangal District Youth League with exceptional off-the-ball movement.",
    coach: {
      name: "Coach Anthony D'Souza",
      club: "Kakatiya Youth Football Club",
      phone: "+91 97011 88421",
      verified: true
    },
    stats: {
      "Goals Scored": "19 in 14 matches",
      "Assists": "7",
      "Shots on Target": "72%",
      "Top Sprint Speed": "32.4 km/h",
      "Minutes per Goal": "64 min"
    },
    physicalMetrics: {
      height: "178 cm",
      weight: "69 kg",
      yoYoScore: "21.4",
      speed100m: "11.6s",
      verticalJump: "68 cm"
    },
    achievements: [
      "Golden Boot - Telangana Youth Football Cup 2026",
      "Best Striker - Kakatiya Invitational Trophy",
      "Hat-trick in District Semi-Final vs Nizamabad"
    ],
    videos: [
      {
        title: "Match Highlights - All 19 Goals & Movement Breakdown",
        duration: "04:12",
        recordedAt: "June 2026",
        notes: "Curated breakdown of headers, left-foot volleys, and counter-attack transitions.",
        highlights: [
          { time: "00:25", label: "Near post flick header" },
          { time: "01:30", label: "25-yard dipping strike vs Nizamabad" },
          { time: "02:45", label: "High press interception and chip" },
          { time: "03:40", label: "Clean bicycle kick finish" }
        ]
      }
    ],
    needs: {
      goal: 15000,
      current: 9200,
      reason: "Firm ground professional football studs, shin pads, and travel expenses for I-League 2nd Division club trials in Goa.",
      backersCount: 11,
      breakdown: [
        { item: "Nike Mercurial FG Football Boots", cost: 6500 },
        { item: "Compression base-layers & kit set", cost: 2500 },
        { item: "Train travel to Goa trial camp & lodging (5 days)", cost: 6000 }
      ]
    },
    scoutNotesCount: 4,
    trialsAttended: 2,
    status: "Ready for Trials",
    dateRegistered: "2026-07-02"
  },
  {
    id: 4,
    name: "Manjula Nayak",
    sport: "Kabaddi",
    location: "Kondapak, Siddipet, Telangana",
    village: "Kondapak",
    mandal: "Kondapak",
    district: "Siddipet",
    state: "Telangana",
    age: "19 (U-21)",
    ageGroup: "U-21",
    gender: "Female",
    category: "Right Corner Defender / Ankle Hold Specialist",
    verified: true,
    verificationDate: "May 2026",
    verificationAuthority: "Telangana Kabaddi Association",
    photo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
    avatarSeed: "manjula-nayak-kabaddi",
    accentColor: "#b45309",
    bio: "Unstoppable right corner with 84% tackle success rate in state tournaments. Famous in northern Telangana rural circles for her lightning-quick diving ankle holds that neutralized national-level raiders.",
    coach: {
      name: "Coach Rambabu Goud",
      club: "Siddipet Rural Sports Foundation",
      phone: "+91 99890 12044",
      verified: true
    },
    stats: {
      "Tackle Success Rate": "84%",
      "Tackle Points": "52 in 10 matches",
      "High 5s (5+ points)": "6 matches",
      "Super Tackles": "9"
    },
    physicalMetrics: {
      height: "168 cm",
      weight: "65 kg",
      yoYoScore: "18.5",
      verticalJump: "58 cm"
    },
    achievements: [
      "Best Defender - Telangana State Senior Women's Kabaddi 2026",
      "Captain - Siddipet District Women's Team",
      "Represented Telangana at All-India Rural Games"
    ],
    videos: [
      {
        title: "Masterclass: Diving Ankle Hold & Chain Defense Highlights",
        duration: "03:10",
        recordedAt: "July 2026",
        notes: "Tactical match footage against reigning state champions Karimnagar.",
        highlights: [
          { time: "00:18", label: "Solo diving ankle lock" },
          { time: "01:12", label: "Super tackle with left corner" },
          { time: "02:20", label: "Thigh hold on bonus line" }
        ]
      }
    ],
    needs: {
      goal: 14000,
      current: 14000,
      reason: "Kabaddi wrestling mat shoes, knee brace supports & coaching camp fee at Sports Authority of India (SAI) sub-centre.",
      backersCount: 19,
      breakdown: [
        { item: "Asics Matflex Kabaddi Shoes", cost: 4200 },
        { item: "Orthopedic Neoprene Knee Sleeves", cost: 2800 },
        { item: "SAI Sub-Centre Monthly Hostel & Diet", cost: 7000 }
      ]
    },
    scoutNotesCount: 7,
    trialsAttended: 5,
    status: "In Academy Camp",
    dateRegistered: "2026-04-10"
  },
  {
    id: 5,
    name: "Raju Lavudya",
    sport: "Archery",
    location: "Bhadrachalam, Bhadradri Kothagudem, Telangana",
    village: "Dummagudem",
    mandal: "Dummagudem",
    district: "Bhadradri Kothagudem",
    state: "Telangana",
    age: "15 (U-16)",
    ageGroup: "U-16",
    gender: "Male",
    category: "Recurve Bow - 50m & 60m Cadet",
    verified: true,
    verificationDate: "August 2026",
    verificationAuthority: "Archery Association of India Tribal Sports Cell",
    photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600",
    avatarSeed: "raju-lavudya-archery",
    accentColor: "#4338ca",
    bio: "Tribal youth talent from the Godavari basin who transitioned from indigenous bamboo bow to Olympic recurve bow in just 14 months. Scored 648/720 in the 60m Cadet District trials.",
    coach: {
      name: "Coach Venkatesh Dora",
      club: "Tribal Welfare Sports Academy, Bhadrachalam",
      phone: "+91 94900 66311",
      verified: true
    },
    stats: {
      "60m Cadet Score": "648 / 720",
      "10s & Xs Count": "28 arrows",
      "Average Arrow Score": "9.0",
      "Release Consistency": "97%"
    },
    physicalMetrics: {
      height: "172 cm",
      weight: "58 kg",
      wingspan: "176 cm",
      yoYoScore: "17.4"
    },
    achievements: [
      "Gold Medal - National Tribal Youth Archery Championship 2026",
      "Silver Medal - South Zone Inter-School Recurve Meet",
      "Awarded Best Emerging Archer by Telangana Sports Ministry"
    ],
    videos: [
      {
        title: "60m Recurve Precision Shooting - Slow Motion Anchor Release",
        duration: "02:40",
        recordedAt: "July 2026",
        notes: "Detailed biomechanical recording showing clicker release consistency.",
        highlights: [
          { time: "00:15", label: "Draw & Anchor Point Alignment" },
          { time: "01:00", label: "Clicker timing & finger tab release" },
          { time: "01:55", label: "Triple 10 X-Ring end" }
        ]
      }
    ],
    needs: {
      goal: 35000,
      current: 21500,
      reason: "Carbon arrows set (Easton Carbon One), Hoyt Formula recurve limbs, and Olympic trials travel.",
      backersCount: 26,
      breakdown: [
        { item: "Set of 12 Easton Carbon One Target Arrows", cost: 16000 },
        { item: "Carbon Fiber Recurve Limbs (38 lbs)", cost: 12000 },
        { item: "National Trials Entry & Travel to Jamshedpur", cost: 7000 }
      ]
    },
    scoutNotesCount: 9,
    trialsAttended: 3,
    status: "Seeking Sponsorship",
    dateRegistered: "2026-06-25"
  },
  {
    id: 6,
    name: "Kavitha Rathod",
    sport: "Wrestling",
    location: "Armoor, Nizamabad, Telangana",
    village: "Armoor",
    mandal: "Armoor",
    district: "Nizamabad",
    state: "Telangana",
    age: "17 (U-18)",
    ageGroup: "U-18",
    gender: "Female",
    category: "Freestyle 53 kg Class",
    verified: false,
    verificationDate: "Verification In Progress",
    verificationAuthority: "Nizamabad Akhada Federation",
    photo: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
    avatarSeed: "kavitha-rathod-wrestling",
    accentColor: "#c2410c",
    bio: "Trains in traditional mud akhadas and synthetic mat facilities. Undefeated at the rural Dangal level across Nizamabad and Adilabad border districts with formidable arm-throw and leg-defence technique.",
    coach: {
      name: "Ustad Hanumanth Pehalwan",
      club: "Armoor Jai Bhavani Akhada",
      phone: "+91 98850 44321",
      verified: true
    },
    stats: {
      "Weight Category": "53 kg Freestyle",
      "Rural Bout Record": "24 Wins - 2 Losses",
      "Pin-fall Victories": "14",
      "Technical Superiority": "7 matches"
    },
    physicalMetrics: {
      height: "159 cm",
      weight: "52.8 kg",
      yoYoScore: "19.0",
      verticalJump: "52 cm"
    },
    achievements: [
      "Champion - North Telangana Kesari Dangal 2026",
      "Silver Medal - State Freestyle Wrestling Trials 53kg",
      "District Champion for 2 consecutive years"
    ],
    videos: [
      {
        title: "Final Bout Highlights - North Telangana Kesari",
        duration: "03:30",
        recordedAt: "August 2026",
        notes: "Full recording of 6-point takedown in the second round.",
        highlights: [
          { time: "00:20", label: "Arm drag takedown" },
          { time: "01:15", label: "Single leg defense and sprawl" },
          { time: "02:40", label: "Gut wrench turn for 4 points" }
        ]
      }
    ],
    needs: {
      goal: 16000,
      current: 6400,
      reason: "Wrestling singlet, Olympic mat shoes, recovery supplements & travel to Haryana National selection camp.",
      backersCount: 8,
      breakdown: [
        { item: "UWW Approved Wrestling Singlet & Boots", cost: 5500 },
        { item: "High protein recovery supplements (3 months)", cost: 4500 },
        { item: "Train travel to Rohtak camp & registration fees", cost: 6000 }
      ]
    },
    scoutNotesCount: 3,
    trialsAttended: 1,
    status: "Seeking Sponsorship",
    dateRegistered: "2026-08-01"
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 1,
    title: "Telangana Cricket Association U-19 State Trials",
    org: "Hyderabad & Telangana Cricket Association",
    sport: "Cricket",
    type: "Trial",
    location: "Gymkhana Grounds, Secunderabad",
    district: "Hyderabad",
    state: "Telangana",
    deadline: "Oct 18, 2026",
    ageEligibility: "Born on or after Sep 1, 2007 (U-19)",
    selectionBenefits: [
      "Direct entry into State Ranji Trophy Junior feeder squad",
      "Full accommodation, kit sponsorship & monthly stipend ₹15,000",
      "BCCI certified level-3 coaching & biomechanical analysis"
    ],
    contactPerson: "K. Murali (Chief Junior Selector)",
    quotaSlots: 24,
    description: "Open talent hunt for fast bowlers clocking 130+ km/h and top-order rural batsmen. Special quotas reserved for athletes outside Hyderabad and Ranga Reddy districts.",
    isVerifiedOrg: true
  },
  {
    id: 2,
    title: "Rural Athletics Excellence Fellowship 2026-27",
    org: "Inspire Institute of Sport (IIS) Grassroots Foundation",
    sport: "Athletics",
    type: "Scholarship",
    location: "Bellary / Hyderabad Assessment Centre",
    district: "Hyderabad",
    state: "Telangana & All-India",
    deadline: "Nov 05, 2026",
    ageEligibility: "Ages 14 to 18 (Sprint, Middle Distance & Jumps)",
    selectionBenefits: [
      "100% covered residential Olympic training facility scholarship",
      "International coaching staff, physiotherapy & scientific nutrition",
      "Formal high school / college education integration"
    ],
    contactPerson: "Dr. Sunita Sharma (Head of Talent ID)",
    quotaSlots: 15,
    description: "Multi-year talent development scholarship targeting raw sprint and jump talent from rural and tribal talukas. Travel reimbursement provided for all shortlisted finalists.",
    isVerifiedOrg: true
  },
  {
    id: 3,
    title: "Pro Kabaddi League Junior Grassroots Scout Camp",
    org: "Telugu Titans Youth Development Cell",
    sport: "Kabaddi",
    type: "Coaching",
    location: "Gachibowli Indoor Stadium, Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    deadline: "Oct 28, 2026",
    ageEligibility: "Ages 17 to 21 (Weight below 85kg)",
    selectionBenefits: [
      "Opportunity to earn developmental feeder contract with PKL franchise",
      "15-day intense residential tactical camp with foreign strength coaches",
      "Free high-performance sports kit and travel reimbursement"
    ],
    contactPerson: "Coach Srinivas Reddy (Lead Youth Scout)",
    quotaSlots: 30,
    description: "Intensive 3-day scouting camp looking specifically for aggressive corners, cover defenders, and do-or-die raiders from Telangana and Andhra district leagues.",
    isVerifiedOrg: true
  },
  {
    id: 4,
    title: "Sports Authority of India (SAI) Football Residency Quota",
    org: "SAI Regional Centre & All India Football Federation",
    sport: "Football",
    type: "Quota",
    location: "SAI Training Centre, Guntur & Hyderabad",
    district: "Hyderabad",
    state: "Telangana / AP",
    deadline: "Nov 15, 2026",
    ageEligibility: "Born between 2008 and 2011 (U-16 & U-18)",
    selectionBenefits: [
      "Govt of India sports residency boarding, lodging & education",
      "Participation in Hero Elite League and Subroto Cup",
      "Sports equipment allowance & insurance cover"
    ],
    contactPerson: "P. Raghunath (SAI Football Coordinator)",
    quotaSlots: 20,
    description: "Selection trials for entry into the government-funded sports academy hostel. Assessment tests include 30m sprint, agility T-test, and 11v11 match play.",
    isVerifiedOrg: true
  }
];

export const DISTRICT_MAP_DATA = [
  { district: "Nalgonda", athletesCount: 18, sports: ["Cricket", "Athletics", "Kabaddi"], state: "Telangana" },
  { district: "Warangal", athletesCount: 22, sports: ["Football", "Athletics", "Badminton"], state: "Telangana" },
  { district: "Mahbubnagar", athletesCount: 16, sports: ["Athletics", "Kabaddi", "Wrestling"], state: "Telangana" },
  { district: "Siddipet", athletesCount: 14, sports: ["Kabaddi", "Archery", "Volleyball"], state: "Telangana" },
  { district: "Bhadradri Kothagudem", athletesCount: 12, sports: ["Archery", "Athletics", "Football"], state: "Telangana" },
  { district: "Nizamabad", athletesCount: 15, sports: ["Wrestling", "Kabaddi", "Cricket"], state: "Telangana" },
  { district: "Sangareddy", athletesCount: 11, sports: ["Cricket", "Football", "Athletics"], state: "Telangana" },
  { district: "Karimnagar", athletesCount: 19, sports: ["Kabaddi", "Athletics", "Cricket"], state: "Telangana" },
  { district: "Khammam", athletesCount: 13, sports: ["Football", "Volleyball", "Archery"], state: "Telangana" }
];
