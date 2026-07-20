"use client";

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer/lib/react-pdf.browser";
import type { Style } from "@react-pdf/types";
import type { LocalizedStatement, PdfUiCopy } from "@/lib/capability-pdf/localize";
import { pdfContact } from "@/lib/capability-pdf/shared-copy";
import { siteConfig } from "@/lib/constants/site";

// PDF styles are renderer-local (not Tailwind), so we hardcode the site theme palette here.
// Goal: match website bluish titles/eyebrows and the same border/rule feel.
const c = {
  ink: "#0b1220", // --warm-black
  cream: "#f7f8fa", // --cream
  brand: "#2f6fed", // --brand
  brandDark: "#1d4ed8", // --brand-dark
  border: "#e2e6ee", // --border
  muted: "#5b6577", // --muted-foreground
  card: "#ffffff",
  softBg: "#eef1f5", // --taupe (light neutral)
};

// Shared page frame so header/body/footer stay aligned on every page.
const PAGE_X = 44;
const PAGE_TOP = 60;
const PAGE_BOTTOM = 56;
const HEADER_TOP = 22;
const FOOTER_BOTTOM = 22;

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: c.ink,
    backgroundColor: c.cream,
    paddingTop: PAGE_TOP,
    paddingBottom: PAGE_BOTTOM,
    paddingHorizontal: PAGE_X,
    lineHeight: 1.45,
  },
  cover: {
    padding: 0,
    backgroundColor: c.ink,
  },
  coverImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    objectFit: "cover",
  },
  coverScrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(20,21,24,0.7)",
  },
  coverBody: {
    position: "absolute",
    left: PAGE_X,
    right: PAGE_X,
    bottom: PAGE_BOTTOM,
  },
  brandMark: {
    fontSize: 8,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: c.brand,
    marginBottom: 12,
  },
  coverTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 34,
    lineHeight: 1.12,
    color: c.cream,
    marginBottom: 12,
  },
  coverTagline: {
    fontSize: 11,
    lineHeight: 1.5,
    color: "rgba(247,245,238,0.8)",
    maxWidth: 420,
  },
  coverMeta: {
    marginTop: 28,
    fontSize: 8,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "rgba(247,245,238,0.5)",
  },
  headerBar: {
    position: "absolute",
    top: HEADER_TOP,
    left: PAGE_X,
    right: PAGE_X,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: c.border,
  },
  headerText: {
    fontSize: 7,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: c.muted,
  },
  footerBar: {
    position: "absolute",
    bottom: FOOTER_BOTTOM,
    left: PAGE_X,
    right: PAGE_X,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: c.border,
    fontSize: 7,
    letterSpacing: 1.6,
    color: c.muted,
    textTransform: "uppercase",
  },
  eyebrow: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 3,
    color: c.brandDark,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  h1: {
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
    lineHeight: 1.2,
    color: c.ink,
    marginBottom: 8,
  },
  brandRule: {
    width: 48,
    height: 2,
    backgroundColor: c.brand,
    marginBottom: 16,
    marginTop: 4,
  },
  p: {
    fontSize: 10,
    lineHeight: 1.5,
    color: c.muted,
    marginBottom: 8,
  },
  pStrong: {
    fontSize: 10,
    lineHeight: 1.5,
    color: c.muted,
    marginTop: 6,
    fontFamily: "Helvetica-Bold",
  },
  row: { flexDirection: "row", gap: 14 },
  col: { flex: 1 },
  colWide: { flex: 1.1 },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: c.border,
  },
  bulletNum: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: c.brandDark,
    width: 22,
  },
  bulletText: { flex: 1, fontSize: 9.5, lineHeight: 1.4, color: c.ink },
  card: {
    padding: 12,
    backgroundColor: c.card,
    borderLeftWidth: 2,
    borderLeftColor: c.brand,
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: c.brandDark,
  },
  cardBody: { fontSize: 9.5, color: c.ink, marginTop: 4, lineHeight: 1.5 },
  img: { width: "100%", objectFit: "cover" },
  flowCard: {
    width: "32%",
    padding: 10,
    backgroundColor: c.card,
    borderTopWidth: 2,
    borderTopColor: c.brand,
    marginBottom: 6,
  },
  flowN: { fontFamily: "Helvetica-Bold", fontSize: 10, color: c.brandDark },
  flowT: { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: c.ink, marginTop: 4 },
  flowD: { fontSize: 8.5, color: c.muted, marginTop: 4, lineHeight: 1.4 },
  darkPanel: {
    padding: 14,
    backgroundColor: c.ink,
  },
  darkEyebrow: {
    fontSize: 7.5,
    color: c.brand,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  darkText: { fontSize: 9.5, color: c.cream, lineHeight: 1.45 },
  contactLabel: {
    fontSize: 7.5,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: c.brandDark,
    marginBottom: 4,
  },
  contactValue: { fontSize: 10, color: c.ink },
});

function Header({ name, label }: { name: string; label: string }) {
  return (
    <View style={s.headerBar} fixed>
      <Text style={s.headerText}>{siteConfig.name}</Text>
      <Text style={s.headerText}>
        {name} · {label}
      </Text>
    </View>
  );
}

function Footer({
  page,
  total,
  brand,
}: {
  page: number;
  total: number;
  brand: string;
}) {
  return (
    <View style={s.footerBar} fixed>
      <Text>{brand}</Text>
      <Text>
        {String(page).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </Text>
    </View>
  );
}

function SafeImage({
  src,
  style,
}: {
  src?: string;
  style?: Style | Style[];
}) {
  if (!src) return null;
  return <Image src={src} style={style} />;
}

function multiline(text: string) {
  return text.split("\n").map((line, i, arr) => (
    <Text key={`${i}-${line}`}>
      {line}
      {i < arr.length - 1 ? "\n" : ""}
    </Text>
  ));
}

interface Props {
  sub: LocalizedStatement;
  ui: PdfUiCopy;
  images: string[];
}

export function SubSectorStatementDoc({ sub, ui, images }: Props) {
  const img = (i: number) => images[i] ?? images[0];
  const total = 13;

  const halfCaps = Math.ceil(sub.capabilities.length / 2) || 1;
  const capsLeft = sub.capabilities.slice(0, halfCaps);
  const capsRight = sub.capabilities.slice(halfCaps);
  const workA = images.slice(0, 4);
  const workB = images.slice(4, 8);
  const foot = (page: number) => (
    <Footer page={page} total={total} brand={ui.footerBrand} />
  );

  return (
    <Document
      title={ui.documentTitle}
      author={siteConfig.legalName}
      subject={sub.tagline}
      keywords={`${sub.name}, ${sub.categorySlug}, millwork, Sandha Woodworks`}
    >
      <Page size="LETTER" style={s.cover}>
        <SafeImage src={img(0)} style={s.coverImage} />
        <View style={s.coverScrim} />
        <View style={s.coverBody}>
          <Text style={s.brandMark}>
            SANDHA{"\n"}WOODWORKS
          </Text>
          <Text style={s.coverTitle}>{sub.name}</Text>
          <Text style={s.coverTagline}>{sub.tagline}</Text>
          <Text style={s.coverMeta}>{ui.coverMeta}</Text>
        </View>
      </Page>

      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label={ui.sections.introduction} />
        <Text style={s.eyebrow}>{ui.eyebrows.introduction}</Text>
        <Text style={s.h1}>{multiline(ui.headlines.intro)}</Text>
        <View style={s.brandRule} />
        <View style={s.row}>
          <View style={s.colWide}>
            {sub.intro.map((p) => (
              <Text key={p} style={s.p}>
                {p}
              </Text>
            ))}
            {sub.clientNote ? <Text style={s.pStrong}>{sub.clientNote}</Text> : null}
          </View>
          <View style={[s.col, { gap: 6 }]}>
            <SafeImage src={img(1)} style={[s.img, { height: 160 }]} />
            <SafeImage src={img(2)} style={[s.img, { height: 110 }]} />
          </View>
        </View>
        <SafeImage src={img(3)} style={[s.img, { height: 200, marginTop: 16 }]} />
        {foot(1)}
      </Page>

      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label={ui.sections.capabilities} />
        <Text style={s.eyebrow}>{ui.eyebrows.capabilities}</Text>
        <Text style={s.h1}>{multiline(ui.headlines.capabilities)}</Text>
        <View style={s.brandRule} />
        <View style={s.row}>
          {[capsLeft, capsRight].map((col, ci) => (
            <View key={ci} style={s.col}>
              {col.map((item, i) => (
                <View key={item} style={s.bulletRow}>
                  <Text style={s.bulletNum}>
                    {String(ci * halfCaps + i + 1).padStart(2, "0")}
                  </Text>
                  <Text style={s.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        {sub.messaging ? (
          <View style={[s.card, { marginTop: 18 }]}>
            <Text style={s.cardBody}>{sub.messaging}</Text>
          </View>
        ) : null}
        {foot(2)}
      </Page>

      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label={ui.sections.products} />
        <Text style={s.eyebrow}>{ui.eyebrows.products}</Text>
        <Text style={s.h1}>{multiline(ui.headlines.products)}</Text>
        <View style={s.brandRule} />
        <View style={s.row}>
          <View style={s.col}>
            {sub.products.map((item, i) => (
              <View key={item} style={s.bulletRow}>
                <Text style={s.bulletNum}>{String(i + 1).padStart(2, "0")}</Text>
                <Text style={s.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={s.col}>
            <SafeImage src={img(4)} style={[s.img, { height: 280 }]} />
          </View>
        </View>
        {foot(3)}
      </Page>

      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label={ui.sections.manufacturing} />
        <Text style={s.eyebrow}>{ui.eyebrows.manufacturing}</Text>
        <Text style={s.h1}>{multiline(ui.headlines.manufacturing)}</Text>
        <View style={s.brandRule} />
        <View style={s.row}>
          <View style={s.col}>
            {sub.manufacturingFocus.map((item, i) => (
              <View key={item} style={s.card}>
                <Text style={s.cardTitle}>{String(i + 1).padStart(2, "0")}</Text>
                <Text style={s.cardBody}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={[s.col, { gap: 8 }]}>
            <SafeImage src={img(5)} style={[s.img, { height: 180 }]} />
            <View style={s.darkPanel}>
              <Text style={s.darkEyebrow}>{ui.underOneRoofTitle}</Text>
              {ui.underOneRoof.map((item) => (
                <Text key={item} style={[s.darkText, { marginBottom: 5 }]}>
                  · {item}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <SafeImage src={img(6)} style={[s.img, { height: 160, marginTop: 12 }]} />
        {foot(4)}
      </Page>

      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label={ui.sections.standards} />
        <Text style={s.eyebrow}>{ui.eyebrows.standards}</Text>
        <Text style={s.h1}>{multiline(ui.headlines.standards)}</Text>
        <View style={s.brandRule} />
        {sub.qualityStandards.map((item, i) => (
          <View key={item} style={s.bulletRow}>
            <Text style={s.bulletNum}>{String(i + 1).padStart(2, "0")}</Text>
            <Text style={s.bulletText}>{item}</Text>
          </View>
        ))}
        <SafeImage src={img(7)} style={[s.img, { height: 220, marginTop: 20 }]} />
        {foot(5)}
      </Page>

      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label={ui.sections.installation} />
        <Text style={s.eyebrow}>{ui.eyebrows.installation}</Text>
        <Text style={s.h1}>{multiline(ui.headlines.installation)}</Text>
        <View style={s.brandRule} />
        <View style={s.row}>
          <View style={s.col}>
            {sub.installationNotes.map((item, i) => (
              <View key={item} style={s.card}>
                <Text style={s.cardTitle}>{String(i + 1).padStart(2, "0")}</Text>
                <Text style={s.cardBody}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={s.col}>
            <SafeImage src={img(8)} style={[s.img, { height: 320 }]} />
          </View>
        </View>
        {foot(6)}
      </Page>

      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label={ui.sections.selectedWork} />
        <Text style={s.eyebrow}>{ui.eyebrows.selectedWork}</Text>
        <Text style={s.h1}>{ui.headlines.selectedWork}</Text>
        <View style={s.brandRule} />
        {sub.clientNote ? <Text style={s.p}>{sub.clientNote}</Text> : null}
        <View style={[s.row, { flexWrap: "wrap", gap: 8, marginTop: 8 }]}>
          {workA.map((src) => (
            <SafeImage key={src} src={src} style={{ width: "48%", height: 160, objectFit: "cover" }} />
          ))}
        </View>
        {foot(7)}
      </Page>

      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label={ui.sections.selectedWork} />
        <Text style={s.eyebrow}>{ui.eyebrows.selectedWorkCont}</Text>
        <View style={[s.row, { flexWrap: "wrap", gap: 8, marginBottom: 18 }]}>
          {workB.map((src) => (
            <SafeImage key={src} src={src} style={{ width: "48%", height: 140, objectFit: "cover" }} />
          ))}
        </View>
        <Text style={s.eyebrow}>{ui.eyebrows.audience}</Text>
        <Text style={s.h1}>{ui.headlines.audience}</Text>
        <View style={s.brandRule} />
        {sub.audience.map((item, i) => (
          <View key={item} style={s.bulletRow}>
            <Text style={s.bulletNum}>{String(i + 1).padStart(2, "0")}</Text>
            <Text style={s.bulletText}>{item}</Text>
          </View>
        ))}
        {foot(8)}
      </Page>

      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label={ui.sections.about} />
        <Text style={s.eyebrow}>{ui.eyebrows.about}</Text>
        <Text style={s.h1}>{ui.headlines.about}</Text>
        <View style={s.brandRule} />
        <View style={s.row}>
          <View style={s.colWide}>
            <Text style={s.p}>{ui.companyCommitments}</Text>
            {ui.atAGlance.map((item) => (
              <Text key={item} style={[s.p, { color: c.ink, marginBottom: 4 }]}>
                · {item}
              </Text>
            ))}
          </View>
          <View style={[s.col, { gap: 6 }]}>
            <SafeImage src={img(6)} style={[s.img, { height: 200 }]} />
            <SafeImage src={img(7)} style={[s.img, { height: 150 }]} />
          </View>
        </View>
        {foot(9)}
      </Page>

      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label={ui.sections.whatWeWillDo} />
        <Text style={s.eyebrow}>{ui.eyebrows.whatWeWillDo}</Text>
        <Text style={s.h1}>{multiline(ui.headlines.whatWeWillDo)}</Text>
        <View style={s.brandRule} />
        {ui.whatWeWillDoBody.map((p) => (
          <Text key={p.slice(0, 24)} style={s.p}>
            {p}
          </Text>
        ))}
        <View style={[s.darkPanel, { marginTop: 12 }]}>
          {ui.whatWeWillDoPanel.map((line, i) =>
            i === 0 ? (
              <Text key={line} style={s.darkEyebrow}>
                {line}
              </Text>
            ) : (
              <Text key={line} style={[s.darkText, i > 1 ? { marginTop: 4 } : {}]}>
                {line}
              </Text>
            ),
          )}
        </View>
        {foot(10)}
      </Page>

      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label={ui.sections.process} />
        <Text style={s.eyebrow}>{ui.eyebrows.process}</Text>
        <Text style={s.h1}>{multiline(ui.headlines.process)}</Text>
        <View style={s.brandRule} />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
          {ui.projectFlow.map((step) => (
            <View key={step.n} style={s.flowCard}>
              <Text style={s.flowN}>{step.n}</Text>
              <Text style={s.flowT}>{step.t}</Text>
              <Text style={s.flowD}>{step.d}</Text>
            </View>
          ))}
        </View>
        <Text style={{ fontSize: 8, color: c.muted, marginTop: 14 }}>{ui.processNote}</Text>
        {foot(11)}
      </Page>

      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label={ui.sections.closeOut} />
        <Text style={s.eyebrow}>{ui.eyebrows.closeOut}</Text>
        <Text style={s.h1}>{multiline(ui.headlines.closeOut)}</Text>
        <View style={s.brandRule} />
        <View style={s.row}>
          <View style={s.colWide}>
            {ui.closeOutItems.map((item, i) => (
              <View key={item.t} style={s.card}>
                <Text style={s.cardTitle}>
                  {String(i + 1).padStart(2, "0")} · {item.t.toUpperCase()}
                </Text>
                <Text style={s.cardBody}>{item.d}</Text>
              </View>
            ))}
          </View>
          <View style={[s.col, { gap: 8 }]}>
            <SafeImage src={img(9)} style={[s.img, { height: 200 }]} />
            <View style={s.darkPanel}>
              <Text style={s.darkEyebrow}>{ui.serviceLine}</Text>
              <Text style={s.darkText}>{pdfContact.quote}</Text>
              <Text style={[s.darkText, { marginTop: 6 }]}>{pdfContact.phone}</Text>
            </View>
          </View>
        </View>
        {foot(12)}
      </Page>

      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label={ui.sections.contact} />
        <Text style={s.eyebrow}>{ui.eyebrows.contact}</Text>
        <Text style={s.h1}>{multiline(ui.headlines.contact)}</Text>
        <View style={s.brandRule} />
        <View style={[s.row, { marginTop: 12 }]}>
          <View style={s.col}>
            <Text style={s.contactLabel}>{ui.contactLabels.quote}</Text>
            <Text style={s.contactValue}>{pdfContact.quote}</Text>
          </View>
          <View style={s.col}>
            <Text style={s.contactLabel}>{ui.contactLabels.general}</Text>
            <Text style={s.contactValue}>{pdfContact.general}</Text>
          </View>
          <View style={s.col}>
            <Text style={s.contactLabel}>{ui.contactLabels.phone}</Text>
            <Text style={s.contactValue}>{pdfContact.phone}</Text>
          </View>
        </View>
        <View style={[s.row, { marginTop: 24 }]}>
          <View style={s.col}>
            <Text style={s.contactLabel}>{ui.contactLabels.address}</Text>
            <Text style={s.contactValue}>{pdfContact.address}</Text>
          </View>
          <View style={s.col}>
            <Text style={s.contactLabel}>{ui.contactLabels.web}</Text>
            <Text style={s.contactValue}>{pdfContact.web}</Text>
          </View>
          <View style={s.col}>
            <Text style={s.contactLabel}>{ui.contactLabels.linkedin}</Text>
            <Text style={s.contactValue}>{pdfContact.linkedin}</Text>
          </View>
        </View>
        <SafeImage src={img(0)} style={[s.img, { height: 220, marginTop: 28 }]} />
        {foot(13)}
      </Page>
    </Document>
  );
}
