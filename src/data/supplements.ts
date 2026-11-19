export type SupplementCategory =
  | 'Vitamins'
  | 'Minerals & Magnesium'
  | 'Omega-3 & Fish Oil'
  | 'Probiotics & Gut Health'
  | 'Collagen & Beauty'
  | 'Sports & Adaptogens';

export interface ProductVariant {
  id: string;
  label: string;
  servings: number;
  priceSGD: number;
  originalPriceSGD?: number;
}

export interface SupplementFact {
  nutrient: string;
  amount: string;
  dailyValue: string;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface SupplementProduct {
  id: string;
  brand: string;
  name: string;
  subtitle: string;
  category: SupplementCategory;
  healthGoals: string[];
  dietary: string[];
  iTested: boolean;
  kicker?: string;
  rating: number;
  reviewCount: number;
  rank: number;
  image: string;
  variants: ProductVariant[];
  description: string;
  suggestedUse: string;
  otherIngredients: string;
  supplementFacts: {
    servingSize: string;
    rows: SupplementFact[];
  };
  reviews: ProductReview[];
}

export const HERO_SHOWCASE_IMAGE =
  '/src/assets/images/hero_supplements_showcase_1795062043040.jpg';

export const SUPPLEMENTS_CATALOG: SupplementProduct[] = [
  {
    id: 'cgn-gold-c-1000',
    brand: 'California Gold Nutrition',
    name: 'Gold C, USP Grade Vitamin C, 1,000 mg',
    subtitle: 'Buffered & Vegetarian Friendly Immune Support',
    category: 'Vitamins',
    healthGoals: ['Immunity', 'Cellular Energy'],
    dietary: ['Non-GMO', 'Vegan', 'Gluten-Free'],
    iTested: true,
    kicker: 'Best Seller',
    rating: 4.8,
    reviewCount: 118420,
    rank: 1,
    image: '/src/assets/images/product_gold_vitamin_c_1795062042419.jpg',
    variants: [
      { id: 'cgn-c-60', label: '60 Veggie Caps', servings: 60, priceSGD: 7.4, originalPriceSGD: 9.2 },
      { id: 'cgn-c-240', label: '240 Veggie Caps', servings: 240, priceSGD: 22.8, originalPriceSGD: 27.5 },
    ],
    description:
      'Formulated with USP-grade L-ascorbic acid and triple quality tested to ensure potency, purity, and consistent daily antioxidant protection for immune and collagen synthesis support.',
    suggestedUse: 'Take 1 veggie capsule daily, with or without food. Best when taken as directed by a qualified healthcare professional.',
    otherIngredients: 'Modified Cellulose (Hypromellose Veggie Capsule), Magnesium Stearate.',
    supplementFacts: {
      servingSize: '1 Veggie Capsule',
      rows: [
        { nutrient: 'Vitamin C (as Ascorbic Acid)', amount: '1,000 mg', dailyValue: '1,111%' },
      ],
    },
    reviews: [
      {
        id: 'r1',
        author: 'Wei Ming T.',
        location: 'Singapore',
        rating: 5,
        date: 'Oct 2026',
        title: 'Clean daily staple, easy on the stomach',
        body: 'Ordered the 240-count bottle for the household. Arrived in 3 days well-sealed with desiccant packet intact for our humid weather.',
        verifiedPurchase: true,
        helpfulCount: 42,
      },
      {
        id: 'r2',
        author: 'Priya N.',
        location: 'Singapore',
        rating: 5,
        date: 'Sep 2026',
        title: 'Unbeatable price per serving in SG',
        body: 'Checked the iTested certificate directly. Great everyday Vitamin C without unnecessary fillers or artificial colors.',
        verifiedPurchase: true,
        helpfulCount: 19,
      },
    ],
  },
  {
    id: 'cgn-omega3-premium',
    brand: 'California Gold Nutrition',
    name: 'Omega-3 Premium Fish Oil, 180 EPA / 120 DHA',
    subtitle: 'Molecularly Distilled Wild-Caught Fish Gelatin Softgels',
    category: 'Omega-3 & Fish Oil',
    healthGoals: ['Heart & Brain', 'Joint & Bone'],
    dietary: ['Non-GMO', 'Gluten-Free'],
    iTested: true,
    kicker: '#1 in Omega-3',
    rating: 4.8,
    reviewCount: 242910,
    rank: 2,
    image: '/src/assets/images/product_omega3_fish_oil_1795062044137.jpg',
    variants: [
      { id: 'cgn-om-100', label: '100 Fish Softgels', servings: 50, priceSGD: 14.9, originalPriceSGD: 18.5 },
      { id: 'cgn-om-240', label: '240 Fish Softgels', servings: 120, priceSGD: 31.2, originalPriceSGD: 38.0 },
    ],
    description:
      'Featuring globally sourced, molecularly distilled fish oil concentrated to 180 mg EPA and 120 mg DHA per softgel in fish gelatin capsules—free of porcine or bovine derivatives.',
    suggestedUse: 'Take 2 softgels daily, with or without food.',
    otherIngredients: 'Fish Gelatin Softgel (Tilapia), Vegetable Glycerin, Purified Water, Natural Mixed Tocopherols.',
    supplementFacts: {
      servingSize: '2 Softgels',
      rows: [
        { nutrient: 'Total Marine Oil Concentrate', amount: '2,000 mg', dailyValue: '†' },
        { nutrient: 'EPA (Eicosapentaenoic Acid)', amount: '360 mg', dailyValue: '†' },
        { nutrient: 'DHA (Docosahexaenoic Acid)', amount: '240 mg', dailyValue: '†' },
      ],
    },
    reviews: [
      {
        id: 'r3',
        author: 'Daniel K.',
        location: 'Singapore',
        rating: 5,
        date: 'Nov 2026',
        title: 'Zero fishy aftertaste and fresh batch',
        body: 'Fish gelatin softgels are a plus. Softgels are clear and never stick together thanks to climate-controlled shipping.',
        verifiedPurchase: true,
        helpfulCount: 64,
      },
    ],
  },
  {
    id: 'doctors-best-magnesium',
    brand: "Doctor's Best",
    name: 'High Absorption Magnesium, 100% Chelated Lysinate Glycinate',
    subtitle: 'Gentle Chelated Formula for Muscle, Nerve & Sleep Support',
    category: 'Minerals & Magnesium',
    healthGoals: ['Sleep & Calm', 'Muscle & Recovery'],
    dietary: ['Non-GMO', 'Vegan', 'Gluten-Free'],
    iTested: false,
    kicker: 'Best Seller',
    rating: 4.9,
    reviewCount: 96450,
    rank: 3,
    image: '/src/assets/images/product_magnesium_glycinate_1795062043385.jpg',
    variants: [
      { id: 'db-mag-120', label: '120 Tablets', servings: 60, priceSGD: 19.6, originalPriceSGD: 24.0 },
      { id: 'db-mag-240', label: '240 Tablets', servings: 120, priceSGD: 34.5, originalPriceSGD: 42.9 },
    ],
    description:
      'Uses patented Albion TRAACS organic chelated magnesium bound to L-lysine and L-glycine for superior intestinal bioavailability without laxative gastrointestinal discomfort.',
    suggestedUse: 'Take 2 tablets twice daily, or as recommended by a nutritionally informed physician.',
    otherIngredients: 'Microcrystalline Cellulose, Croscarmellose Sodium, Stearic Acid, Hypromellose.',
    supplementFacts: {
      servingSize: '2 Tablets',
      rows: [
        { nutrient: 'Magnesium (from 2,000 mg Magnesium Lysinate Glycinate Chelate)', amount: '200 mg', dailyValue: '48%' },
      ],
    },
    reviews: [
      {
        id: 'r4',
        author: 'Rachel L.',
        location: 'Singapore',
        rating: 5,
        date: 'Oct 2026',
        title: 'Noticeable difference in sleep quality',
        body: 'Switched from magnesium oxide to this chelated glycinate form. Zero stomach upset and helps unwind after late work nights.',
        verifiedPurchase: true,
        helpfulCount: 51,
      },
    ],
  },
  {
    id: 'cgn-lactobif-30',
    brand: 'California Gold Nutrition',
    name: 'LactoBif 30 Probiotics, 30 Billion CFU',
    subtitle: '8 Active Clinically Studied Probiotic Strains · Double-Foil Blister Sealed',
    category: 'Probiotics & Gut Health',
    healthGoals: ['Gut Health', 'Immunity'],
    dietary: ['Non-GMO', 'Vegan', 'Gluten-Free'],
    iTested: true,
    kicker: 'Shelf-Stable Blister Pack',
    rating: 4.8,
    reviewCount: 154300,
    rank: 4,
    image: '/src/assets/images/product_lactobif_probiotics_1795062042882.jpg',
    variants: [
      { id: 'cgn-lb-60', label: '60 Veggie Caps', servings: 60, priceSGD: 26.8, originalPriceSGD: 32.0 },
      { id: 'cgn-lb-120', label: '120 Veggie Caps', servings: 120, priceSGD: 47.9, originalPriceSGD: 56.0 },
    ],
    description:
      'Individually sealed in double-foil blister packs to protect live cultures from oxygen, moisture, and tropical humidity—ideal for Singapore storage without mandatory refrigeration.',
    suggestedUse: 'Take 1 veggie capsule daily, with or without food.',
    otherIngredients: 'Microcrystalline Cellulose, Modified Cellulose (Veggie Capsule), Magnesium Stearate (Non-GMO Vegetable Source).',
    supplementFacts: {
      servingSize: '1 Veggie Capsule',
      rows: [
        { nutrient: 'Probiotic Bacteria Blend (5 Lactobacilli & 3 Bifidobacteria strains)', amount: '30 Billion CFU', dailyValue: '†' },
      ],
    },
    reviews: [
      {
        id: 'r5',
        author: 'Jeremy C.',
        location: 'Singapore',
        rating: 5,
        date: 'Nov 2026',
        title: 'Blister packs survive Singapore humidity',
        body: 'Other probiotic bottles clump up quickly here, whereas LactoBif stays individually sealed until the moment you take one.',
        verifiedPurchase: true,
        helpfulCount: 38,
      },
    ],
  },
  {
    id: 'cgn-collagen-up',
    brand: 'California Gold Nutrition',
    name: 'CollagenUP, Hydrolyzed Marine Collagen Peptides + Hyaluronic Acid + Vitamin C',
    subtitle: 'Unflavored Wild-Caught Fish Collagen · 5,000 mg Per Scoop',
    category: 'Collagen & Beauty',
    healthGoals: ['Skin & Joints', 'Joint & Bone'],
    dietary: ['Non-GMO', 'Gluten-Free'],
    iTested: true,
    kicker: 'Top Rated Beauty',
    rating: 4.7,
    reviewCount: 112640,
    rank: 5,
    image: '/src/assets/images/product_collagen_peptides_1795062043058.jpg',
    variants: [
      { id: 'cgn-col-206', label: '206 g Tub (40 Servings)', servings: 40, priceSGD: 25.4, originalPriceSGD: 30.0 },
      { id: 'cgn-col-464', label: '464 g Tub (90 Servings)', servings: 90, priceSGD: 48.6, originalPriceSGD: 58.0 },
    ],
    description:
      'Enzymatically hydrolyzed low-molecular-weight marine collagen peptides combined with non-animal hyaluronic acid and Vitamin C for rapid dissolution in hot or cold beverages.',
    suggestedUse: 'Mix 1 scoop daily (approx. 5.15 g) into room-temperature water or juice, then stir or blend briskly.',
    otherIngredients: 'None. Contains: Fish (Wild-Caught Cod, Pollock, Haddock).',
    supplementFacts: {
      servingSize: '1 Scoop (approx. 5.15 g)',
      rows: [
        { nutrient: 'Hydrolyzed Marine Collagen Peptides', amount: '5,000 mg', dailyValue: '†' },
        { nutrient: 'Vitamin C (as Calcium Ascorbate)', amount: '90 mg', dailyValue: '100%' },
        { nutrient: 'Hyaluronic Acid (Sodium Hyaluronate)', amount: '60 mg', dailyValue: '†' },
      ],
    },
    reviews: [
      {
        id: 'r6',
        author: 'Siti A.',
        location: 'Singapore',
        rating: 5,
        date: 'Oct 2026',
        title: 'Dissolves cleanly in morning coffee',
        body: 'No strong fishy smell at all when stirred into iced latte or matcha. Noticeably smoother skin after 6 weeks.',
        verifiedPurchase: true,
        helpfulCount: 29,
      },
    ],
  },
  {
    id: 'now-d3-k2',
    brand: 'NOW Foods',
    name: 'Vitamin D-3 & K-2, 5,000 IU / 180 mcg MK-7',
    subtitle: 'Structural Bone & Cardiovascular Synergy Formula',
    category: 'Vitamins',
    healthGoals: ['Joint & Bone', 'Immunity', 'Heart & Brain'],
    dietary: ['Non-GMO', 'Gluten-Free'],
    iTested: false,
    rating: 4.8,
    reviewCount: 74280,
    rank: 6,
    image: '/src/assets/images/product_vitamin_d3_k2_1795062043607.jpg',
    variants: [
      { id: 'now-dk-120', label: '120 Veg Capsules', servings: 120, priceSGD: 16.2, originalPriceSGD: 19.8 },
      { id: 'now-dk-240', label: '240 Veg Capsules', servings: 240, priceSGD: 29.5 },
    ],
    description:
      'Pairs high-potency cholecalciferol (Vitamin D-3) with bioavailable MenaQ7 Vitamin K-2 (MK-7) to direct calcium utilization toward bone density rather than arterial calcification.',
    suggestedUse: 'Take 1 capsule daily with a meal containing healthy fats.',
    otherIngredients: 'Rice Flour, Hypromellose (Cellulose Capsule), Ascorbyl Palmitate, Silicon Dioxide.',
    supplementFacts: {
      servingSize: '1 Veg Capsule',
      rows: [
        { nutrient: 'Vitamin D3 (as Cholecalciferol from Lanolin)', amount: '125 mcg (5,000 IU)', dailyValue: '625%' },
        { nutrient: 'Vitamin K2 (as Menaquinone-7, MK-7)', amount: '180 mcg', dailyValue: '†' },
      ],
    },
    reviews: [
      {
        id: 'r7',
        author: 'Marcus H.',
        location: 'Singapore',
        rating: 5,
        date: 'Sep 2026',
        title: 'Ideal for indoor office schedules',
        body: 'My bloodwork showed low Vitamin D despite living in sunny Singapore because I work indoors all day. Brought my levels right up.',
        verifiedPurchase: true,
        helpfulCount: 33,
      },
    ],
  },
  {
    id: 'thorne-creatine',
    brand: 'Thorne',
    name: 'Creatine, Micronized Creatine Monohydrate Powder',
    subtitle: 'NSF Certified for Sport · Cellular Energy & Lean Muscle',
    category: 'Sports & Adaptogens',
    healthGoals: ['Muscle & Recovery', 'Cellular Energy', 'Heart & Brain'],
    dietary: ['Gluten-Free', 'Vegan'],
    iTested: false,
    kicker: 'NSF Certified for Sport',
    rating: 4.9,
    reviewCount: 41890,
    rank: 7,
    image: '/src/assets/images/product_thorne_creatine_1795062043562.jpg',
    variants: [
      { id: 'th-cr-450', label: '450 g Tub (90 Servings)', servings: 90, priceSGD: 56.5 },
      { id: 'th-cr-225', label: '225 g Tub (45 Servings)', servings: 45, priceSGD: 33.0 },
    ],
    description:
      'Ultra-pure, micronized Creatine Monohydrate screened for over 200 banned substances under NSF Certified for Sport standards. Dissolves rapidly with zero gritty residue.',
    suggestedUse: 'Mix 1 scoop (5 g) with at least 240 mL of water, juice, or your preferred beverage daily.',
    otherIngredients: 'None. Pure Micronized Creatine Monohydrate.',
    supplementFacts: {
      servingSize: '1 Scoop (5 g)',
      rows: [
        { nutrient: 'Creatine Monohydrate', amount: '5 g', dailyValue: '†' },
      ],
    },
    reviews: [
      {
        id: 'r8',
        author: 'Kenneth Y.',
        location: 'Singapore',
        rating: 5,
        date: 'Nov 2026',
        title: 'Gold standard purity, dissolves effortlessly',
        body: 'Worth paying slightly more for Thorne NSF certification. Zero bloating and mixes smoothly into cold water.',
        verifiedPurchase: true,
        helpfulCount: 47,
      },
    ],
  },
  {
    id: 'life-extension-two-per-day',
    brand: 'Life Extension',
    name: 'Two-Per-Day Multivitamin, High-Potency Bioactive Formula',
    subtitle: 'Active Methylated B-Vitamins, Quercetin Phytosome & Chelated Minerals',
    category: 'Vitamins',
    healthGoals: ['Cellular Energy', 'Immunity'],
    dietary: ['Non-GMO', 'Gluten-Free'],
    iTested: false,
    kicker: 'Clinician Favorite',
    rating: 4.8,
    reviewCount: 53410,
    rank: 8,
    image: '/src/assets/images/product_multivitamin_bottle_1795062042998.jpg',
    variants: [
      { id: 'le-2pd-60', label: '60 Capsules (30 Days)', servings: 30, priceSGD: 18.4, originalPriceSGD: 22.0 },
      { id: 'le-2pd-120', label: '120 Capsules (60 Days)', servings: 60, priceSGD: 31.8, originalPriceSGD: 38.0 },
    ],
    description:
      'Delivers broad-spectrum essential vitamins and minerals in bioactive coenzyme forms—including L-5-MTHF folate, methylcobalamin B12, and bio-quercetin phytosome.',
    suggestedUse: 'Take 2 capsules daily in divided doses with meals.',
    otherIngredients: 'Vegetable Cellulose (Capsule), Starch, Maltodextrin, Vegetable Stearate, Silica.',
    supplementFacts: {
      servingSize: '2 Capsules',
      rows: [
        { nutrient: 'Vitamin C (as Ascorbic Acid & Niacinamide Ascorbate)', amount: '470 mg', dailyValue: '522%' },
        { nutrient: 'Vitamin D3 (as Cholecalciferol)', amount: '50 mcg (2,000 IU)', dailyValue: '250%' },
        { nutrient: 'Folate (as L-5-Methyltetrahydrofolate)', amount: '680 mcg DFE', dailyValue: '170%' },
        { nutrient: 'Vitamin B12 (as Methylcobalamin)', amount: '300 mcg', dailyValue: '12,500%' },
        { nutrient: 'Zinc (as Zinc Citrate & OptiZinc)', amount: '25 mg', dailyValue: '227%' },
      ],
    },
    reviews: [
      {
        id: 'r9',
        author: 'Amanda S.',
        location: 'Singapore',
        rating: 5,
        date: 'Oct 2026',
        title: 'Best methylated multi for the price',
        body: 'Hard to find active folate and B12 at this potency locally without paying twice as much.',
        verifiedPurchase: true,
        helpfulCount: 25,
      },
    ],
  },
  {
    id: 'doctors-best-ubiquinol',
    brand: "Doctor's Best",
    name: 'Ubiquinol with Kaneka QH, Active CoQ10, 100 mg',
    subtitle: 'Reduced-Form Coenzyme Q10 for Heart & Mitochondrial Energy',
    category: 'Omega-3 & Fish Oil',
    healthGoals: ['Heart & Brain', 'Cellular Energy'],
    dietary: ['Non-GMO', 'Gluten-Free'],
    iTested: false,
    rating: 4.8,
    reviewCount: 28940,
    rank: 9,
    image: '/src/assets/images/product_coq10_ubiquinol_1795062043636.jpg',
    variants: [
      { id: 'db-ub-60', label: '60 Softgels', servings: 60, priceSGD: 38.9, originalPriceSGD: 46.5 },
      { id: 'db-ub-120', label: '120 Softgels', servings: 120, priceSGD: 68.5, originalPriceSGD: 79.0 },
    ],
    description:
      'Contains genuine Japanese Kaneka Ubiquinol—the active, reduced antioxidant state of CoQ10—formulated in extra virgin olive oil for superior cellular uptake.',
    suggestedUse: 'Take 1 softgel daily with food for maximum absorption.',
    otherIngredients: 'Extra Virgin Olive Oil, Medium-Chain Triglycerides, Gelatin Softgel, Glycerin, Sunflower Lecithin.',
    supplementFacts: {
      servingSize: '1 Softgel',
      rows: [
        { nutrient: 'Ubiquinol (Kaneka Ubiquinol Reduced Form CoQ10)', amount: '100 mg', dailyValue: '†' },
      ],
    },
    reviews: [
      {
        id: 'r10',
        author: 'David G.',
        location: 'Singapore',
        rating: 5,
        date: 'Sep 2026',
        title: 'Kaneka authentic Ubiquinol',
        body: 'Recommended for my parents over 50. Noticeable improvement in afternoon energy without caffeine.',
        verifiedPurchase: true,
        helpfulCount: 17,
      },
    ],
  },
  {
    id: 'cgn-electrolytes-hydration',
    brand: 'California Gold Nutrition',
    name: 'HydrationUP, Zero-Sugar Electrolyte Drink Mix, Citrus',
    subtitle: 'Vitamin C & E + Balanced Sodium, Potassium & Magnesium',
    category: 'Minerals & Magnesium',
    healthGoals: ['Muscle & Recovery', 'Cellular Energy'],
    dietary: ['Non-GMO', 'Vegan', 'Gluten-Free'],
    iTested: true,
    rating: 4.7,
    reviewCount: 31450,
    rank: 10,
    image: '/src/assets/images/product_electrolytes_powder_1795062043212.jpg',
    variants: [
      { id: 'cgn-el-227', label: '227 g Jar (45 Servings)', servings: 45, priceSGD: 19.2 },
      { id: 'cgn-el-pk', label: '30 Stick Packets', servings: 30, priceSGD: 23.4 },
    ],
    description:
      'Clean daily electrolyte hydration powder designed for tropical humidity and endurance training—zero sugar, zero artificial sweeteners, and naturally flavored with real citrus extract.',
    suggestedUse: 'Mix 1 scoop (5.1 g) into 350–500 mL of cold water and shake well.',
    otherIngredients: 'Citric Acid, Natural Citrus Flavor, Stevia Leaf Extract, Silica.',
    supplementFacts: {
      servingSize: '1 Scoop (5.1 g)',
      rows: [
        { nutrient: 'Vitamin C (as Ascorbic Acid)', amount: '245 mg', dailyValue: '272%' },
        { nutrient: 'Calcium (as Calcium Carbonate)', amount: '50 mg', dailyValue: '4%' },
        { nutrient: 'Magnesium (as Magnesium Carbonate)', amount: '65 mg', dailyValue: '15%' },
        { nutrient: 'Sodium (as Pink Himalayan Sea Salt)', amount: '130 mg', dailyValue: '6%' },
        { nutrient: 'Potassium (as Potassium Citrate)', amount: '230 mg', dailyValue: '5%' },
      ],
    },
    reviews: [
      {
        id: 'r11',
        author: 'Ethan W.',
        location: 'Singapore',
        rating: 5,
        date: 'Nov 2026',
        title: 'Lifesaver for East Coast Park runs',
        body: 'Refreshing citrus taste that is not overly sweet. Keeps cramps away during humid morning runs.',
        verifiedPurchase: true,
        helpfulCount: 22,
      },
    ],
  },
  {
    id: 'pure-encapsulations-digestive',
    brand: 'Pure Encapsulations',
    name: 'Probiotic-5 & Digestive Enzyme Complex',
    subtitle: 'Hypoallergenic Multi-Strain Gut Flora + Broad-Spectrum Enzymes',
    category: 'Probiotics & Gut Health',
    healthGoals: ['Gut Health', 'Immunity'],
    dietary: ['Non-GMO', 'Gluten-Free', 'Vegan'],
    iTested: false,
    kicker: 'Hypoallergenic',
    rating: 4.9,
    reviewCount: 19820,
    rank: 11,
    image: '/src/assets/images/product_digestive_probiotic_1795062043511.jpg',
    variants: [
      { id: 'pe-dg-60', label: '60 Capsules', servings: 60, priceSGD: 52.0 },
      { id: 'pe-dg-120', label: '120 Capsules', servings: 120, priceSGD: 94.5 },
    ],
    description:
      'Practitioner-grade, dairy- and soy-free probiotic and plant-derived enzyme blend crafted to support balanced intestinal microflora, nutrient breakdown, and post-meal comfort.',
    suggestedUse: 'Take 1 capsule 1–2 times daily, between or with meals.',
    otherIngredients: 'Vegetarian Capsule (Cellulose, Water), Hypoallergenic Plant Fiber.',
    supplementFacts: {
      servingSize: '1 Capsule',
      rows: [
        { nutrient: 'Probiotic Blend (L. acidophilus, B. longum, L. rhamnosus)', amount: '10 Billion CFU', dailyValue: '†' },
        { nutrient: 'Broad-Spectrum Plant Digestive Enzyme Blend', amount: '180 mg', dailyValue: '†' },
      ],
    },
    reviews: [
      {
        id: 'r12',
        author: 'Cheryl T.',
        location: 'Singapore',
        rating: 5,
        date: 'Oct 2026',
        title: 'Gentle and effective for sensitive digestion',
        body: 'Pure Encapsulations never includes magnesium stearate or unnecessary binders. Helps significantly after heavier meals.',
        verifiedPurchase: true,
        helpfulCount: 15,
      },
    ],
  },
  {
    id: 'jarrow-ashwagandha-ksm66',
    brand: 'Jarrow Formulas',
    name: 'Ashwagandha KSM-66, Full-Spectrum Root Extract, 300 mg',
    subtitle: 'Clinically Studied Adaptogen for Cortisol Balance & Focus',
    category: 'Sports & Adaptogens',
    healthGoals: ['Sleep & Calm', 'Muscle & Recovery'],
    dietary: ['Non-GMO', 'Vegan', 'Gluten-Free'],
    iTested: false,
    rating: 4.7,
    reviewCount: 38640,
    rank: 12,
    image: '/src/assets/images/product_ashwagandha_extract_1795062042742.jpg',
    variants: [
      { id: 'jf-ash-60', label: '60 Veggie Caps', servings: 60, priceSGD: 21.5, originalPriceSGD: 25.0 },
      { id: 'jf-ash-120', label: '120 Veggie Caps', servings: 120, priceSGD: 37.9, originalPriceSGD: 44.0 },
    ],
    description:
      'Standardized full-spectrum KSM-66 root-only Ashwagandha extract (Withania somnifera) clinically evaluated to promote healthy stress resilience, recovery, and calm mental clarity.',
    suggestedUse: 'Take 1 capsule 1–2 times per day with water, or as directed by your healthcare professional.',
    otherIngredients: 'Cellulose, Vegetarian Capsule (Hydroxypropylmethylcellulose, Water), Magnesium Stearate (Vegetable Source), Silicon Dioxide.',
    supplementFacts: {
      servingSize: '1 Veggie Capsule',
      rows: [
        { nutrient: 'KSM-66 Ashwagandha Root Extract (Withania somnifera)', amount: '300 mg', dailyValue: '†' },
      ],
    },
    reviews: [
      {
        id: 'r13',
        author: 'Hafiz R.',
        location: 'Singapore',
        rating: 5,
        date: 'Oct 2026',
        title: 'KSM-66 root extract works reliably',
        body: 'Noticeably calmer evenings and steadier gym recovery after 3 weeks of consistent daily use.',
        verifiedPurchase: true,
        helpfulCount: 31,
      },
    ],
  },
];

export const CATEGORIES: SupplementCategory[] = [
  'Vitamins',
  'Minerals & Magnesium',
  'Omega-3 & Fish Oil',
  'Probiotics & Gut Health',
  'Collagen & Beauty',
  'Sports & Adaptogens',
];

export const TOP_BRANDS = [
  {
    name: 'California Gold Nutrition',
    tagline: 'iTested House Flagship · Everyday Staples',
  },
  {
    name: "Doctor's Best",
    tagline: 'Science-Based Chelated Formulations',
  },
  {
    name: 'NOW Foods',
    tagline: 'Family-Owned Pure Vitamins Since 1968',
  },
  {
    name: 'Thorne',
    tagline: 'NSF Certified for Sport & Clinical Purity',
  },
  {
    name: 'Life Extension',
    tagline: 'Bioactive Longevity & Cellular Science',
  },
  {
    name: 'Pure Encapsulations',
    tagline: 'Hypoallergenic Practitioner Formulas',
  },
];

export const FREE_SG_SHIPPING_THRESHOLD = 30;
export const SG_SHIPPING_FEE = 5.5;

export function formatSGD(amount: number): string {
  return `SG$${amount.toFixed(2)}`;
}

export function getRecommendedDays(servings: number): 30 | 60 | 90 {
  if (servings <= 45) return 30;
  if (servings <= 75) return 60;
  return 90;
}

export function getRecommendedCadence(servings: number): string {
  return `Every ${getRecommendedDays(servings)} days`;
}
