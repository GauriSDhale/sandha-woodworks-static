/**
 * Generates EN capabilityPdf + capabilityPdfDetails from source TS.
 * FR shared chrome is written here; FR details are translated in a sibling step.
 * Run: node scripts/generate-capability-pdf-locales.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const require = createRequire(import.meta.url);
const jiti = require("jiti")(import.meta.url);
const { subSectorStatements } = jiti(
  path.join(root, "src/lib/constants/sub-sector-statements.ts"),
);
const sectorsEn = JSON.parse(
  fs.readFileSync(path.join(root, "src/locales/en/sectors.json"), "utf8"),
);
const sectorsFr = JSON.parse(
  fs.readFileSync(path.join(root, "src/locales/fr/sectors.json"), "utf8"),
);

function findSubCard(locales, market, slug) {
  return locales?.marketDetails?.[market]?.subSectors?.[slug] ?? null;
}

const detailsEn = {};
const detailsFr = {};

for (const p of subSectorStatements) {
  detailsEn[p.slug] = {
    name: p.name,
    tagline: p.tagline,
    messaging: p.messaging,
    intro: p.intro,
    capabilities: p.capabilities,
    products: p.products,
    manufacturingFocus: p.manufacturingFocus,
    qualityStandards: p.qualityStandards,
    installationNotes: p.installationNotes,
    audience: p.audience,
    clientNote: p.clientNote,
  };

  const cardFr = findSubCard(sectorsFr, p.categorySlug, p.slug);
  // FR body: seed name from markets FR; keep EN for deep fields until translated
  // (parity requires same keys — fill with EN as draft for lists we haven't FR'd yet,
  // then overwrite with proper FR in frCapabilityDetails below if present)
  detailsFr[p.slug] = {
    name: cardFr?.name ?? p.name,
    tagline: p.tagline,
    messaging: p.messaging,
    intro: [...p.intro],
    capabilities: [...p.capabilities],
    products: [...p.products],
    manufacturingFocus: [...p.manufacturingFocus],
    qualityStandards: [...p.qualityStandards],
    installationNotes: [...p.installationNotes],
    audience: [...p.audience],
    clientNote: p.clientNote,
  };

  // Prefer FR card description = tagline + clientNote when it matches EN pattern
  if (cardFr?.description) {
    const enCombo = `${p.tagline} ${p.clientNote}`.trim();
    const enCard = findSubCard(sectorsEn, p.categorySlug, p.slug)?.description;
    if (enCard === enCombo || enCard?.startsWith(p.tagline)) {
      // Split FR description back into tagline + clientNote when possible
      // Use full FR description as tagline when we can't split cleanly; clientNote from EN for now
      detailsFr[p.slug].tagline = cardFr.description;
      // If EN card was tagline + " " + clientNote, try to only use name from FR and
      // put FR description as tagline with empty clientNote to avoid duplication on cover
      // Better: tagline = FR description, clientNote = "" when card FR replaced both
      detailsFr[p.slug].clientNote = "";
    }
  }
}

const capabilityPdfEn = {
  viewer: {
    preparingEyebrow: "Preparing your capability statement",
    preparingHint: "Loading photos and building the PDF — usually a few seconds.",
    print: "Print",
    download: "Download",
    close: "Close",
    goBack: "Go back",
    errorTitle: "Could not open the PDF",
    titleSuffix: "Capability Statement",
    iframeTitle: "{{name}} capability statement",
  },
  document: {
    title: "{{name}} Capability Statement",
    footerBrand: "Capability · 2026",
    coverMeta: "Cover · 01",
    sections: {
      introduction: "Introduction",
      capabilities: "Capabilities",
      products: "Products",
      manufacturing: "Manufacturing",
      standards: "Standards",
      installation: "Installation",
      selectedWork: "Selected work",
      about: "About",
      whatWeWillDo: "What we will do",
      process: "Process",
      closeOut: "Close-out",
      contact: "Contact",
    },
    eyebrows: {
      introduction: "01 · Introduction",
      capabilities: "02 · {{name}} capabilities",
      products: "03 · Products & fixtures",
      manufacturing: "04 · Manufacturing focus",
      standards: "05 · Codes, standards & compliance",
      installation: "06 · Installation approach",
      selectedWork: "07 · Selected work",
      selectedWorkCont: "07 · Selected work (cont.)",
      audience: "08 · Who we work with",
      about: "About Sandha Woodworks",
      whatWeWillDo: "What we will do on your project",
      process: "How we run your project — award to warranty",
      closeOut: "Close-out, warranty & after-care",
      contact: "Contact",
    },
    headlines: {
      intro: "{{name}} millwork,\nengineered by Sandha.",
      capabilities: "Purpose-built scope,\nnot a generic package.",
      products: "The product library\nbehind {{name}} packages.",
      manufacturing: "How we build it\nfor {{name}}.",
      standards: "Built to the codes\nthat matter on site.",
      installation: "On site.\nOn schedule. Low disruption.",
      selectedWork: "Details, finishes, fit.",
      audience: "Partners on {{name}} work.",
      about: "At a glance",
      whatWeWillDo: "One PM.\nOne team. No hand-offs, no mixing of jobs.",
      process: "A single, continuous flow.\nOwned by one PM.",
      closeOut: "The job isn't done when it's installed.\nIt's done when you're covered.",
      contact: "Every {{name}} package — engineered, fabricated, finished and installed by\none team.",
    },
    underOneRoofTitle: "Under one roof",
    processNote:
      "Every step above is owned end-to-end by your Sandha Project Manager. No hand-offs. No mixed jobs.",
    serviceLine: "Service line",
    contactLabels: {
      quote: "Quote requests",
      general: "General",
      phone: "Phone",
      address: "Address",
      web: "Web",
      linkedin: "LinkedIn",
    },
    whatWeWillDoBody: [
      "On every Sandha {{name}} project, one dedicated Project Manager owns the file from the moment the contract is signed until the warranty period ends. You call one person. You email one person. That person knows your drawings, your schedule, your site super, and every change you've signed.",
      "We do not rotate PMs mid-job. We do not split a single scope across three coordinators who each own a slice. Your PM runs your engineering, your shop drawings, your procurement, your production slot, your finishing, your delivery windows, your install crew and your deficiency close-out — as one continuous responsibility.",
      "Behind that PM sits the same Sandha team on every project: our engineers, our CNC operators, our finishers, our lead installers. Not a rotating cast of subcontractors. That is what keeps the quality consistent from the first sample to the last punch-list item.",
    ],
    whatWeWillDoPanel: [
      "One name on the file — award to warranty close-out.",
      "One facility fabricates, finishes and packs every piece.",
      "The same crew lead runs mobilization, install and deficiency.",
    ],
  },
  shared: {
    underOneRoof: [
      "Engineering & shop drawings",
      "CNC fabrication",
      "Finishing & spray booths",
      "Project management",
      "Logistics & delivery",
      "Site installation",
      "Warranty & service",
    ],
    atAGlance: [
      "Head office & manufacturing — Brantford, Ontario",
      "In-house engineering, CNC, finishing, PM, install",
      "Serving Canada + United States",
      "Made in Canada · AWMAC-aligned · ISO-aligned QA",
      "One project manager — from award through warranty",
    ],
    companyCommitments:
      "We built the company around three commitments: build to the spec, hit the schedule, and answer the phone after the job is closed. Everything else — the CNC line, the finishing booths, the install crews, the PMs — exists to make those three commitments true on every job we sign.",
    projectFlow: [
      {
        n: "01",
        t: "Project award",
        d: "Contract signed, dedicated PM assigned, kickoff scheduled with GC and design team.",
      },
      {
        n: "02",
        t: "Kickoff & site review",
        d: "Scope, spec, schedule, submittal log and site conditions confirmed with all trades.",
      },
      {
        n: "03",
        t: "Engineering",
        d: "In-house engineers translate the architect's intent into buildable, code-compliant assemblies.",
      },
      {
        n: "04",
        t: "Shop drawings",
        d: "Full-set drawings issued for review — sections, elevations, hardware, finish schedule.",
      },
      {
        n: "05",
        t: "Approvals & samples",
        d: "Finish samples, mock-ups and revisions cycled until signed off by architect and owner.",
      },
      {
        n: "06",
        t: "Procurement",
        d: "Materials, veneers, stone, hardware, appliances released against long-lead schedule.",
      },
      {
        n: "07",
        t: "Manufacturing",
        d: "CNC cutting, edge-banding, solid-surface work and assembly on our shop floor.",
      },
      {
        n: "08",
        t: "Finishing",
        d: "In-house spray booths — stain, catalyzed lacquer, conversion varnish, factory-cured.",
      },
      {
        n: "09",
        t: "Quality control",
        d: "Every unit checked against approved shop drawings before it leaves the building.",
      },
      {
        n: "10",
        t: "Packaging & logistics",
        d: "Blanket-wrapped, crated where required, sequenced to the site install schedule.",
      },
      {
        n: "11",
        t: "Delivery",
        d: "Direct-to-site delivery windows coordinated with GC and building management.",
      },
      {
        n: "12",
        t: "Installation",
        d: "Sandha install crews — no third-party subs — set, scribe and commission every piece.",
      },
      {
        n: "13",
        t: "Deficiency & punch-list",
        d: "PM walks the space with GC and consultant, tracks and closes every item.",
      },
      {
        n: "14",
        t: "Close-out",
        d: "As-builts, O&M manuals, finish schedules, warranty documents and touch-up kits handed over.",
      },
      {
        n: "15",
        t: "Warranty & after-care",
        d: "1-year standard warranty (custom terms per contract) — same PM answers service calls.",
      },
    ],
    closeOutItems: [
      {
        t: "Substantial completion",
        d: "Final walk with GC, consultant and owner. Every deficiency logged and dated.",
      },
      {
        t: "Deficiency close-out",
        d: "Sandha crews return until the punch-list is zero — no partial hand-offs.",
      },
      {
        t: "Close-out package",
        d: "As-built drawings, O&M manuals, finish schedules, cleaning instructions, touch-up kits, MSDS and warranty certificates handed over on completion.",
      },
      {
        t: "Standard warranty",
        d: "12-month warranty on materials, finishes, hardware and workmanship, effective from substantial completion.",
      },
      {
        t: "Custom warranty terms",
        d: "Extended terms — 2, 5 or project-specific — are honoured per the executed contract for that scope. Whatever we signed, we stand behind.",
      },
      {
        t: "After-care service",
        d: "During and after the warranty period, service calls route to the same Project Manager who built the job. One number. Fast response. Documented follow-up.",
      },
    ],
  },
};

const capabilityPdfFr = {
  viewer: {
    preparingEyebrow: "Préparation de votre énoncé de capacité",
    preparingHint: "Chargement des photos et création du PDF — quelques secondes en général.",
    print: "Imprimer",
    download: "Télécharger",
    close: "Fermer",
    goBack: "Retour",
    errorTitle: "Impossible d'ouvrir le PDF",
    titleSuffix: "Énoncé de capacité",
    iframeTitle: "Énoncé de capacité — {{name}}",
  },
  document: {
    title: "Énoncé de capacité — {{name}}",
    footerBrand: "Capacité · 2026",
    coverMeta: "Couverture · 01",
    sections: {
      introduction: "Introduction",
      capabilities: "Capacités",
      products: "Produits",
      manufacturing: "Fabrication",
      standards: "Normes",
      installation: "Installation",
      selectedWork: "Travaux sélectionnés",
      about: "À propos",
      whatWeWillDo: "Ce que nous ferons",
      process: "Processus",
      closeOut: "Clôture",
      contact: "Contact",
    },
    eyebrows: {
      introduction: "01 · Introduction",
      capabilities: "02 · Capacités {{name}}",
      products: "03 · Produits et appareillages",
      manufacturing: "04 · Focus fabrication",
      standards: "05 · Codes, normes et conformité",
      installation: "06 · Approche d'installation",
      selectedWork: "07 · Travaux sélectionnés",
      selectedWorkCont: "07 · Travaux sélectionnés (suite)",
      audience: "08 · Avec qui nous travaillons",
      about: "À propos de Sandha Woodworks",
      whatWeWillDo: "Ce que nous ferons sur votre projet",
      process: "Comment nous menons votre projet — de l'attribution à la garantie",
      closeOut: "Clôture, garantie et service après-vente",
      contact: "Contact",
    },
    headlines: {
      intro: "Ébénisterie {{name}},\nconçue par Sandha.",
      capabilities: "Une portée sur mesure,\npas un ensemble générique.",
      products: "La bibliothèque de produits\nderrière les ensembles {{name}}.",
      manufacturing: "Comment nous le fabriquons\npour {{name}}.",
      standards: "Construit selon les codes\nqui comptent sur le chantier.",
      installation: "Sur place.\nDans les délais. Peu de perturbation.",
      selectedWork: "Détails, finis, ajustement.",
      audience: "Partenaires sur les projets {{name}}.",
      about: "En un coup d'œil",
      whatWeWillDo: "Un GP.\nUne équipe. Pas de relais, pas de mélanges de dossiers.",
      process: "Un flux unique et continu.\nPorté par un seul GP.",
      closeOut: "Le travail n'est pas terminé une fois installé.\nIl l'est lorsque vous êtes couverts.",
      contact:
        "Chaque ensemble {{name}} — ingénierie, fabrication, finition et installation par\nune seule équipe.",
    },
    underOneRoofTitle: "Sous un même toit",
    processNote:
      "Chaque étape ci-dessus est portée de bout en bout par votre chargé de projet Sandha. Pas de relais. Pas de dossiers mélangés.",
    serviceLine: "Ligne de service",
    contactLabels: {
      quote: "Demandes de devis",
      general: "Général",
      phone: "Téléphone",
      address: "Adresse",
      web: "Web",
      linkedin: "LinkedIn",
    },
    whatWeWillDoBody: [
      "Sur chaque projet Sandha {{name}}, un chargé de projet dédié possède le dossier dès la signature du contrat jusqu'à la fin de la période de garantie. Vous appelez une personne. Vous écrivez à une personne. Cette personne connaît vos dessins, votre échéancier, votre surintendant de chantier et chaque changement que vous avez signé.",
      "Nous ne changeons pas de GP en cours de mandat. Nous ne répartissons pas une même portée entre trois coordonnateurs qui n'en détiennent chacun qu'une tranche. Votre GP dirige votre ingénierie, vos dessins d'atelier, vos approvisionnements, votre créneau de production, votre finition, vos fenêtres de livraison, votre équipe d'installation et la clôture des défectuosités — comme une responsabilité continue.",
      "Derrière ce GP se trouve la même équipe Sandha sur chaque projet : nos ingénieurs, nos opérateurs CNC, nos finisseurs, nos chefs d'installation. Pas un casting tournant de sous-traitants. C'est ce qui maintient la qualité constante, du premier échantillon au dernier point de la liste de défectuosités.",
    ],
    whatWeWillDoPanel: [
      "Un nom sur le dossier — de l'attribution à la clôture de garantie.",
      "Une seule usine fabrique, finit et emballe chaque pièce.",
      "Le même chef d'équipe mène la mobilisation, l'installation et les défectuosités.",
    ],
  },
  shared: {
    underOneRoof: [
      "Ingénierie et dessins d'atelier",
      "Fabrication CNC",
      "Finition et cabines de pulvérisation",
      "Gestion de projet",
      "Logistique et livraison",
      "Installation sur site",
      "Garantie et service",
    ],
    atAGlance: [
      "Siège et fabrication — Brantford, Ontario",
      "Ingénierie, CNC, finition, GP et installation à l'interne",
      "Au service du Canada et des États-Unis",
      "Fabriqué au Canada · Aligné AWMAC · AQ alignée ISO",
      "Un chargé de projet — de l'attribution à la garantie",
    ],
    companyCommitments:
      "Nous avons bâti l'entreprise autour de trois engagements : construire selon le devis, respecter l'échéancier et répondre au téléphone après la clôture du chantier. Tout le reste — la ligne CNC, les cabines de finition, les équipes d'installation, les GP — existe pour rendre ces trois engagements vrais sur chaque mandat que nous signons.",
    projectFlow: [
      {
        n: "01",
        t: "Attribution du projet",
        d: "Contrat signé, GP dédié assigné, lancement planifié avec l'EG et l'équipe de conception.",
      },
      {
        n: "02",
        t: "Lancement et revue de site",
        d: "Portée, devis, échéancier, journal des soumissions et conditions de site confirmés avec tous les métiers.",
      },
      {
        n: "03",
        t: "Ingénierie",
        d: "Nos ingénieurs à l'interne traduisent l'intention de l'architecte en assemblages constructibles et conformes aux codes.",
      },
      {
        n: "04",
        t: "Dessins d'atelier",
        d: "Jeu complet émis pour revue — coupes, élévations, quincaillerie, calendrier de finition.",
      },
      {
        n: "05",
        t: "Approbations et échantillons",
        d: "Échantillons de finition, maquettes et révisions jusqu'à l'approbation de l'architecte et du propriétaire.",
      },
      {
        n: "06",
        t: "Approvisionnement",
        d: "Matériaux, placages, pierre, quincaillerie et appareils libérés selon le calendrier des longs délais.",
      },
      {
        n: "07",
        t: "Fabrication",
        d: "Découpe CNC, chant, surface solide et assemblage dans notre atelier.",
      },
      {
        n: "08",
        t: "Finition",
        d: "Cabines de pulvérisation à l'interne — teinture, laque catalysée, vernis de conversion, séchage en usine.",
      },
      {
        n: "09",
        t: "Contrôle de la qualité",
        d: "Chaque unité vérifiée selon les dessins d'atelier approuvés avant de quitter le bâtiment.",
      },
      {
        n: "10",
        t: "Emballage et logistique",
        d: "Emballage sous couverture, caisse au besoin, séquencé selon l'échéancier d'installation.",
      },
      {
        n: "11",
        t: "Livraison",
        d: "Fenêtres de livraison directe au site coordonnées avec l'EG et la gestion de l'immeuble.",
      },
      {
        n: "12",
        t: "Installation",
        d: "Équipes d'installation Sandha — sans sous-traitants tiers — pose, ajustement et mise en service de chaque pièce.",
      },
      {
        n: "13",
        t: "Défectuosités et liste de punch",
        d: "Le GP visite l'espace avec l'EG et le consultant, suit et ferme chaque point.",
      },
      {
        n: "14",
        t: "Clôture",
        d: "Remise des plans tels que construits, manuels O&M, calendriers de finition, documents de garantie et trousses de retouche.",
      },
      {
        n: "15",
        t: "Garantie et service après-vente",
        d: "Garantie standard d'un an (conditions sur mesure selon le contrat) — le même GP répond aux appels de service.",
      },
    ],
    closeOutItems: [
      {
        t: "Achèvement substantiel",
        d: "Visite finale avec l'EG, le consultant et le propriétaire. Chaque défectuosité consignuée et datée.",
      },
      {
        t: "Clôture des défectuosités",
        d: "Les équipes Sandha reviennent jusqu'à ce que la liste de punch soit à zéro — pas de remises partielles.",
      },
      {
        t: "Dossier de clôture",
        d: "Plans tels que construits, manuels O&M, calendriers de finition, consignes d'entretien, trousses de retouche, FDS et certificats de garantie remis à l'achèvement.",
      },
      {
        t: "Garantie standard",
        d: "Garantie de 12 mois sur les matériaux, finis, quincaillerie et main-d'œuvre, à compter de l'achèvement substantiel.",
      },
      {
        t: "Conditions de garantie sur mesure",
        d: "Des conditions prolongées — 2, 5 ans ou spécifiques au projet — sont honorées selon le contrat exécuté pour cette portée. Ce que nous avons signé, nous le soutenons.",
      },
      {
        t: "Service après-vente",
        d: "Pendant et après la période de garantie, les appels de service sont acheminés au même chargé de projet qui a mené le mandat. Un numéro. Réponse rapide. Suivi documenté.",
      },
    ],
  },
};

const outEnPdf = path.join(root, "src/locales/en/capabilityPdf.json");
const outFrPdf = path.join(root, "src/locales/fr/capabilityPdf.json");
const outEnDetails = path.join(root, "src/locales/en/capabilityPdfDetails.json");
const outFrDetails = path.join(root, "src/locales/fr/capabilityPdfDetails.json");

fs.writeFileSync(outEnPdf, JSON.stringify(capabilityPdfEn, null, 2) + "\n");
fs.writeFileSync(outFrPdf, JSON.stringify(capabilityPdfFr, null, 2) + "\n");
fs.writeFileSync(outEnDetails, JSON.stringify(detailsEn, null, 2) + "\n");
fs.writeFileSync(outFrDetails, JSON.stringify(detailsFr, null, 2) + "\n");

const structural = subSectorStatements.map((p) => ({
  slug: p.slug,
  categorySlug: p.categorySlug,
  poolKey: p.poolKey,
  poolOffset: p.poolOffset,
}));
fs.writeFileSync(
  path.join(root, "scripts/_pdf-structural.json"),
  JSON.stringify(structural, null, 2) + "\n",
);

console.log("Wrote", outEnPdf);
console.log("Wrote", outFrPdf);
console.log("Wrote", outEnDetails, Object.keys(detailsEn).length, "slugs");
console.log("Wrote", outFrDetails);
console.log(
  "Note: FR details currently seed name (+ card description as tagline where applicable); deep body still EN draft pending full translation.",
);
