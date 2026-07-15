/**
 * One-shot generator for storeCatalog EN/FR locale files.
 * Run: node scripts/generate-store-catalog.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const require = createRequire(import.meta.url);
const jiti = require("jiti")(import.meta.url);
const { products } = jiti(path.join(root, "src/store/data/products.ts"));

const materialsFr = {
  "Solid Oak": "Chêne massif",
  MDF: "MDF",
  "Solid Walnut": "Noyer massif",
  Plywood: "Contreplaqué",
  "Solid Maple": "Érable massif",
  "Engineered Wood": "Bois d'ingénierie",
  "Solid Birch": "Bouleau massif",
};

const finishesFr = {
  "Stained Oak": "Chêne teinté",
  "Painted White": "Blanc peint",
  "Stained Walnut": "Noyer teinté",
  "Gloss White": "Blanc brillant",
  "Painted Blue": "Bleu peint",
  "Painted Grey": "Gris peint",
  Natural: "Naturel",
  Charcoal: "Charcoal",
  Cream: "Crème",
  "Matte Black": "Noir mat",
};

const deliveriesFr = {
  "3–4 weeks (made to order)": "3–4 semaines (sur commande)",
  "2–3 weeks": "2–3 semaines",
  "4–6 weeks (made to order)": "4–6 semaines (sur commande)",
  "3–5 weeks (made to order)": "3–5 semaines (sur commande)",
  "3–4 weeks": "3–4 semaines",
  "5–7 weeks (made to order)": "5–7 semaines (sur commande)",
  "3–5 weeks": "3–5 semaines",
  "1–2 weeks": "1–2 semaines",
  "6–8 weeks (includes site measurement)": "6–8 semaines (mesure sur place comprise)",
  "2–4 weeks": "2–4 semaines",
  "6–8 weeks (made to order)": "6–8 semaines (sur commande)",
};

const specKeysFr = {
  "Box Material": "Matériau du caisson",
  "Door Style": "Style de porte",
  "Hinge Type": "Type de charnière",
  "Drawer Slides": "Glissières de tiroirs",
  "Adjustable Shelves": "Tablettes réglables",
  Assembly: "Assemblage",
  Warranty: "Garantie",
  Certifications: "Certifications",
  Opening: "Ouverture",
  Interior: "Intérieur",
  Drawers: "Tiroirs",
  "Pull-Out Baskets": "Paniers extractibles",
  "Max Shelf Load": "Charge max. tablette",
  Mounting: "Fixation",
  Doors: "Portes",
  Countertop: "Plan de travail",
  "Water Resistance": "Résistance à l'eau",
  "Max Weight": "Poids max.",
  Hardware: "Quincaillerie",
  "Sink Cutouts": "Découpes d'évier",
  "Mirror Included": "Miroir inclus",
  "Double Hang Rail": "Barre double",
  "Single Hang Rail": "Barre simple",
  "Shoe Racks": "Racks à chaussures",
  "Free Design Service": "Service de design gratuit",
  "Door System": "Système de portes",
  "Internal Shelves": "Tablettes internes",
  "Hanging Rail": "Barre de penderie",
  "Mirror Option": "Option miroir",
  Shelves: "Tablettes",
  "Hanging Rails": "Barres de penderie",
  "Interior Shelves": "Tablettes intérieures",
  "Max TV Size": "Taille TV max.",
  "Cable Management": "Gestion des câbles",
  "Open Shelf": "Tablette ouverte",
  Cabinets: "Cabinets",
  Legs: "Pieds",
  "LED Lighting": "Éclairage DEL",
  Compartments: "Compartiments",
  "TV Niche Size": "Taille niche TV",
  "Open Shelves": "Tablettes ouvertes",
  "Closed Cabinets": "Cabinets fermés",
  "Fireplace Alcove": "Alcôve pour foyer",
  Lighting: "Éclairage",
  "Locking Drawer": "Tiroir verrouillable",
  "Filing Drawers": "Tiroirs de classement",
  "Bookcase Shelves": "Tablettes de bibliothèque",
  "File Size": "Format de dossiers",
  Lock: "Serrure",
  "Anti-Tilt": "Anti-basculement",
  "Weight Capacity": "Capacité de charge",
  "Shelf Load": "Charge tablette",
  "Back Panel": "Panneau arrière",
  "Closed Compartments": "Compartiments fermés",
  "Printer Tray": "Plateau imprimante",
  "Upper Cabinets": "Cabinets hauts",
  "Tall Utility Cabinet": "Cabinet utilitaire haut",
  "Base Cabinet": "Cabinet de bas",
  "Moisture Resistance": "Résistance à l'humidité",
  "Pull-Down Shelf": "Tablette abattante",
  "Sink Cutout": "Découpe d'évier",
  "Under-Sink Access": "Accès sous évier",
  "Bar Seating Overhang": "Surplomb pour sièges de bar",
  "Toe Kick": "Plinthe",
  Rotation: "Rotation",
};

const specValuesFr = {
  "1 (centre)": "1 (centre)",
  "1 (letter/legal size)": "1 (format lettre/légal)",
  "1 (with pull-out hamper)": "1 (avec panier extractible)",
  "1 soft-close": "1 fermeture amortie",
  '1/4" Oak veneer plywood': 'Contreplaqué plaqué chêne 1/4"',
  "120 lbs": "120 lb",
  "2 (door each side)": "2 (porte de chaque côté)",
  "2 (soft-close)": "2 (fermeture amortie)",
  '2 pre-cut (18" diameter)': '2 précoupées (diamètre 18")',
  "2 rotating": "2 rotatives",
  "2 soft-close": "2 fermeture amortie",
  "2 with soft-close doors": "2 avec portes à fermeture amortie",
  "25 lbs": "25 lb",
  "3 (above washer/dryer)": "3 (au-dessus laveuse/sécheuse)",
  "3 (soft-close)": "3 (fermeture amortie)",
  "3 adjustable": "3 réglables",
  "3 open + 2 closed": "3 ouvertes + 2 fermées",
  "3 soft-close": "3 fermeture amortie",
  "3 years": "3 ans",
  '3/4" Baltic Birch Plywood': 'Contreplaqué bouleau Baltique 3/4"',
  '3/4" Furniture-Grade Plywood': 'Contreplaqué meuble 3/4"',
  '3/4" Maple Plywood': 'Contreplaqué érable 3/4"',
  '3/4" Plywood': 'Contreplaqué 3/4"',
  "30 lbs per basket": "30 lb par panier",
  "4 (deep, soft-close)": "4 (profonds, fermeture amortie)",
  "4 (full-extension, soft-close)": "4 (extension totale, fermeture amortie)",
  "4 (soft-close)": "4 (fermeture amortie)",
  '4" recessed': '4" encastrée',
  "40 lbs each": "40 lb chacune",
  "5 years": "5 ans",
  "5 years on boxes, 2 years on hardware": "5 ans sur caissons, 2 ans sur quincaillerie",
  "5 years on cabinet, 2 years on hardware": "5 ans sur cabinet, 2 ans sur quincaillerie",
  "50 lbs per shelf": "50 lb par tablette",
  "6 (soft-close)": "6 (fermeture amortie)",
  "6 (soft-close, full-extension)": "6 (fermeture amortie, extension totale)",
  "6 adjustable": "6 réglables",
  '70" recommended': '70" recommandé',
  '8 (full-extension)': "8 (extension totale)",
  "8 adjustable": "8 réglables",
  "80 lbs per drawer": "80 lb par tiroir",
  '85" recommended': '85" recommandé',
  "AWMAC GIS, CARB2 Compliant": "AWMAC GIS, conforme CARB2",
  Available: "Disponible",
  "Bi-fold (Shaker)": "Pliantes (Shaker)",
  "Brushed Gold (included)": "Or brossé (inclus)",
  "Built-in rear routing holes": "Trous de passage intégrés à l'arrière",
  "Central locking (2 keys included)": "Verrouillage central (2 clés incluses)",
  "Concealed Soft-Close": "Amortie dissimulée",
  "Floor-Standing": "Sur pied",
  "Full 360°": "360° complets",
  "Full 360Â°": "360° complets",
  "Full-Extension Soft-Close": "Extension totale, fermeture amortie",
  "Full-Extension Undermount": "Sous-montage à extension totale",
  "Full-Rotation Lazy Susan": "Lazy Susan à rotation complète",
  "Full-width (1)": "Pleine largeur (1)",
  "Full-width (above)": "Pleine largeur (au-dessus)",
  Included: "Inclus",
  "Included (insert not included)": "Inclus (insert non inclus)",
  "Integrated (remote-controlled)": "Intégré (télécommande)",
  "Integrated LED strip (warm white)": "Bande DEL intégrée (blanc chaud)",
  "Letter & Legal": "Lettre et légal",
  Lifetime: "À vie",
  "Lifetime on boxes, 5 years on hardware": "À vie sur caissons, 5 ans sur quincaillerie",
  "Lifetime structural": "Structurelle à vie",
  "Lifetime structural, 5 years hardware": "Structurelle à vie, 5 ans quincaillerie",
  "Lifetime structural, 5 years on hardware": "Structurelle à vie, 5 ans sur quincaillerie",
  "Marine-grade": "Qualité marine",
  "Marine-grade PVD finish": "Fini PVD qualité marine",
  "Marine-grade finish": "Fini qualité marine",
  "Matte Black": "Noir mat",
  "Not included": "Non inclus",
  Open: "Ouvert",
  "Pre-assembled": "Préassemblé",
  "Pre-cut (included)": "Précoupé (inclus)",
  "Professional installation recommended": "Installation professionnelle recommandée",
  "Pull-Out Organizer System": "Système d'organisation extractible",
  "Push-to-Open": "Push-to-open",
  "Rear routing holes": "Trous de passage arrière",
  Shaker: "Shaker",
  "Shaker (4 doors)": "Shaker (4 portes)",
  "Shaker, Soft-Close": "Shaker, fermeture amortie",
  "Slab (Modern)": "Dalle (moderne)",
  "Slab High-Gloss": "Dalle haute brillance",
  "Slab with Handle": "Dalle avec poignée",
  "Soft-Close": "Fermeture amortie",
  "Soft-Close Blum": "Fermeture amortie Blum",
  "Soft-Close Sliding (aluminium track)": "Coulissante amortie (rail aluminium)",
  "Solid Oak + Plywood Back": "Chêne massif + dos contreplaqué",
  'Solid walnut tapered (4")': 'Noyer massif conique (4")',
  "Wall-Hung": "Suspendu",
  "Wall-Hung (bracket included)": "Suspendu (support inclus)",
  "Wall-Mounted (floating)": "Fixé au mur (flottant)",
  "Wall-mounted system": "Système mural",
  "Waterproof paint system": "Système de peinture étanche",
  Yes: "Oui",
  "Yes (adjustable height)": "Oui (hauteur réglable)",
  "Yes (keyed lock)": "Oui (serrure à clé)",
  "Yes (matching frame)": "Oui (cadre assorti)",
};

const descriptionsFr = {
  "prod-001":
    "Notre cabinet de bas Heritage Oak apporte chaleur et durabilité à toute cuisine canadienne. Fabriqué en chêne massif d'origine responsable, avec construction de tiroirs en queue-d'aronde et glissières à extension totale à fermeture amortie. Chaque pièce est finie à la main dans notre usine de 40 000 pi² à Brantford.",
  "prod-002":
    "Un cabinet de bas Shaker intemporel en fini blanc peint net. Cadre MDF solide, charnières réglables dissimulées, tiroirs profonds et laque de finition résistante à l'usure quotidienne de la cuisine.",
  "prod-003":
    "Cabinet de bas exquis en noyer massif pour les propriétaires exigeants. Le grain riche et naturel du noyer noir nord-américain rend chaque pièce unique. Fini à l'huile à pores ouverts qui révèle la profondeur tout en protégeant la surface.",
  "prod-004":
    "Cabinet mural blanc haute brillance élégant avec quincaillerie push-to-open pour une esthétique de cuisine moderne sans poignées. La surface réfléchissante amplifie la lumière naturelle et crée une impression d'espace aéré.",
  "prod-005":
    " Affirmez votre style avec notre cabinet mural Shaker bleu peint. Une peinture sur mesure riche, entre marine et ardoise, est appliquée sur notre porte Shaker MDF solide, avec une laque protectrice transparente.",
  "prod-006":
    "Complétez votre ensemble de bas Heritage Oak avec ces cabinets hauts assortis. Panneaux assortis au grain et fini coordonné pour une cuisine haut de gamme sans rupture visuelle.",
  "prod-007":
    "Maximisez l'angle de votre cuisine avec notre cabinet de bas d'angle usiné avec précision. Système de tablette rotative lazy Susan pour un accès facile à chaque article. S'accorde parfaitement avec nos séries Heritage et Shaker.",
  "prod-008":
    "Notre cabinet mural d'angle aveugle est muni d'un système d'organisation extractible breveté qui ramène les articles cachés vers l'avant pour une visibilité totale. Fini les objets perdus au fond de l'angle.",
  "prod-009":
    "Un imposant cabinet haut Shaker du sol au plafond offrant un généreux rangement pour électroménagers, denrées sèches ou garde-manger. Construit avec notre caisson signature en contreplaqué et un système de tablettes réglables.",
  "prod-010":
    "Un garde-manger indépendant magnifiquement fabriqué en chêne massif. Tiroirs extractibles profonds à la base, tablettes médianes réglables et deux portes en haut pour un rangement organisé.",
  "prod-011":
    "La solution idéale pour les espaces étroits : un garde-manger pleine hauteur avec 8 paniers en fil extractibles. Idéal pour combler l'espace entre électroménagers ou dans un office/butler's pantry.",
  "prod-012":
    "Une vanité flottante murale moderne en fini blanc mat. Les lignes épurées et le support dissimulé créent l'illusion du flottement et agrandissent la salle de bain. Livrée avec caisson en bois massif et porte à fermeture amortie.",
  "prod-013":
    "Parfaite pour une salle de bain principale, notre vanité double évier de 60\" offre des zones de rangement distinctes pour deux. 6 tiroirs à fermeture amortie et 2 compartiments à portes, en gris charcoal sophistiqué avec quincaillerie or brossé.",
  "prod-014":
    "Une vanité de style farmhouse rustique et raffinée, avec miroir encadré assorti. Le fini crème chaleureux et les panneaux de porte d'inspiration shiplap apportent un charme cottage, tandis que l'intérieur accueille une quincaillerie moderne à fermeture amortie.",
  "prod-015":
    "Compacte et élégante, cette vanité suspendue de 24\" est la solution idéale pour petites salles de bain ou cabinets de toilette. Le fini noir mat ajoute une touche contemporaine audacieuse.",
  "prod-016":
    "Transformez votre walk-in avec notre système modulaire entièrement personnalisable. Barres de penderie, tablettes réglables, modules de tiroirs et rack à chaussures. Conçu pour les maisons canadiennes avec finis résistants à l'humidité et construction certifiée AWMAC.",
  "prod-017":
    "Une garde-robe élégante du sol au plafond avec portes coulissantes ultra silencieuses sur rails aluminium premium. L'option porte miroir reflète la lumière et agrandit visuellement la pièce.",
  "prod-018":
    "Améliorez une garde-robe standard avec ce système d'organisation complet. Livré en trousse complète avec toute la quincaillerie de montage. Installation en quelques heures grâce au guide étape par étape inclus.",
  "prod-019":
    "Une garde-robe indépendante qui combine un espace de penderie en haut et de généreux tiroirs profonds en bas. La construction en érable massif assure des décennies d'usage, tandis que le fini naturel complète tout décor de chambre.",
  "prod-020":
    "Console TV mid-century moderne à profil bas, avec pieds en bois massif élégamment effilés. Deux cabinets à portes cannelées encadrent une tablette centrale ouverte, le tout dans un fini noyer chaud qui s'accorde aux intérieurs contemporains ou transitionnels.",
  "prod-021":
    "Un meuble TV flottant mural en gris mat qui libère le sol et agrandit visuellement le salon. Tablettes ouvertes rétroéclairées DEL, deux compartiments à portes dissimulées et gestion des câbles intégrée.",
  "prod-022":
    "Un meuble divertissement mural imposant conçu comme pièce maîtresse du salon. Niche TV centrale, bibliothèques latérales, cabinets de bas et alcôve pour foyer électrique intégré.",
  "prod-023":
    "Une console média pratique et élégante en bouleau massif, avec ample rangement pour consoles de jeu, lecteurs multimédia et accessoires. Deux tiroirs et deux cabinets gardent tout organisé; la tablette centrale ouverte offre un accès facile.",
  "prod-024":
    "Affirmez votre bureau à domicile avec ce cabinet exécutif en noyer massif. Tiroir de classement verrouillable, section bibliothèque réglable et rangement dissimulé pour fournitures. Conçu pour ceux qui valorisent fonction et présence.",
  "prod-025":
    "Un classeur latéral robuste avec tiroirs à extension totale sur roulements à billes, mécanisme anti-basculement et serrure centrale. Accepte les dossiers suspendus lettre et légal. Le fini gris peint convient à tout environnement professionnel.",
  "prod-026":
    "Une bibliothèque ouverte classique à tablettes réglables, idéale pour livres, classeurs ou objets décoratifs. Le cadre en chêne massif et le fini naturel apportent de la chaleur à toute bibliothèque ou bureau.",
  "prod-027":
    "Une tour de rangement haute et étroite conçue pour les bureaux à domicile où l'espace au sol est précieux. Combinaison de tablettes ouvertes, compartiments à portes et plateau dédié à l'imprimante.",
  "prod-028":
    "Une trousse complète pour transformer la buanderie. Cabinets hauts au-dessus de la laveuse/sécheuse, grand cabinet utilitaire/balai et cabinet de bas avec panier extractible. Fini blanc net avec traitement résistant à l'humidité.",
  "prod-029":
    "Tirez le maximum de l'espace vertical de votre buanderie avec ce cabinet empilable au-dessus laveuse/sécheuse. Le mécanisme de tablette abattante met les articles rangés en hauteur à portée de main, sans escabeau.",
  "prod-030":
    "Un cabinet de bas conçu pour un évier utilitaire de buanderie. Compartiment ouvert sous l'évier pour l'accès à la plomberie et deux compartiments latéraux à portes pour les produits de nettoyage.",
  "prod-031":
    "Transformez votre cuisine avec cet îlot signature. Corps gris peint contrastant avec rail supérieur en chêne naturel, 4 tiroirs profonds, 2 grands compartiments à portes et surplomb d'un côté pour 3 tabourets de bar.",
  "prod-032":
    "Un cabinet d'angle lazy Susan à plateau rond complet qui pivote à 360° pour un accès facile à chaque article. Portes pliantes qui s'ouvrent en douceur; plateaux rotatifs robustes notés 40 lb par tablette.",
};

// Fix stray space in prod-005 FR
descriptionsFr["prod-005"] = descriptionsFr["prod-005"].trimStart();

const descriptionsEn = Object.fromEntries(products.map((p) => [p.id, p.description]));

const sampleReviewsEn = [
  {
    name: "Michael T.",
    date: "March 2025",
    rating: 5,
    text: "Exceptional quality. The craftsmanship is evident the moment you see it. Installed perfectly and the finish is flawless.",
  },
  {
    name: "Sarah L.",
    date: "January 2025",
    rating: 5,
    text: "Sandha Woodworks delivered exactly what was promised and on time. The soft-close mechanism works beautifully.",
  },
  {
    name: "David K.",
    date: "November 2024",
    rating: 4,
    text: "Very happy with the purchase. Took a week longer than expected but the quality is excellent.",
  },
];

const sampleReviewsFr = [
  {
    name: "Michael T.",
    date: "Mars 2025",
    rating: 5,
    text: "Qualité exceptionnelle. Le savoir-faire se voit dès le premier regard. Installation parfaite et fini impeccable.",
  },
  {
    name: "Sarah L.",
    date: "Janvier 2025",
    rating: 5,
    text: "Sandha Woodworks a livré exactement ce qui était promis, et à temps. Le mécanisme de fermeture amortie fonctionne à merveille.",
  },
  {
    name: "David K.",
    date: "Novembre 2024",
    rating: 4,
    text: "Très satisfait de l'achat. Une semaine de plus que prévu, mais la qualité est excellente.",
  },
];

function identityFrom(keys) {
  return Object.fromEntries(keys.map((k) => [k, k]));
}

const materials = [...new Set(products.map((p) => p.material))];
const finishes = [...new Set(products.map((p) => p.finish))];
const deliveries = [...new Set(products.map((p) => p.deliveryEstimate))];
const specKeys = [...new Set(products.flatMap((p) => Object.keys(p.specifications)))];
const specValues = [...new Set(products.flatMap((p) => Object.values(p.specifications)))];

const en = {
  materials: identityFrom(materials),
  finishes: identityFrom(finishes),
  deliveries: identityFrom(deliveries),
  specKeys: identityFrom(specKeys),
  specValues: identityFrom(specValues),
  descriptions: descriptionsEn,
  sampleReviews: sampleReviewsEn,
};

const fr = {
  materials: Object.fromEntries(materials.map((k) => [k, materialsFr[k] ?? k])),
  finishes: Object.fromEntries(finishes.map((k) => [k, finishesFr[k] ?? k])),
  deliveries: Object.fromEntries(deliveries.map((k) => [k, deliveriesFr[k] ?? k])),
  specKeys: Object.fromEntries(specKeys.map((k) => [k, specKeysFr[k] ?? k])),
  specValues: Object.fromEntries(specValues.map((k) => [k, specValuesFr[k] ?? k])),
  descriptions: Object.fromEntries(
    products.map((p) => [p.id, descriptionsFr[p.id] ?? p.description]),
  ),
  sampleReviews: sampleReviewsFr,
};

const missingFrVals = specValues.filter((v) => !(v in specValuesFr) && !/^\d+$/.test(v) && !/^\d+"$/.test(v) && v !== '72" × 44"' && !["AWMAC GIS"].includes(v));
if (missingFrVals.length) {
  console.warn("Untranslated spec values (kept EN):", missingFrVals);
}

const outEn = path.join(root, "src/locales/en/storeCatalog.json");
const outFr = path.join(root, "src/locales/fr/storeCatalog.json");
fs.writeFileSync(outEn, JSON.stringify(en, null, 2) + "\n");
fs.writeFileSync(outFr, JSON.stringify(fr, null, 2) + "\n");
console.log("Wrote", outEn);
console.log("Wrote", outFr);
