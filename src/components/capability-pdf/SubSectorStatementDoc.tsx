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
import {
  atAGlance,
  closeOutItems,
  companyCommitments,
  pdfContact,
  projectFlow,
  underOneRoof,
} from "@/lib/capability-pdf/shared-copy";
import type { SubSectorStatement } from "@/lib/constants/sub-sector-statements";
import { siteConfig } from "@/lib/constants/site";

const c = {
  ink: "#141518",
  cream: "#f7f5ee",
  brand: "#C9A96A",
  brandDark: "#9a7c40",
  border: "#e6e2d6",
  muted: "#6f6a5c",
  card: "#ffffff",
  softBg: "#f2ede0",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: c.ink,
    backgroundColor: c.cream,
    paddingTop: 60,
    paddingBottom: 56,
    paddingHorizontal: 44,
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
    left: 44,
    right: 44,
    bottom: 56,
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
    top: 22,
    left: 44,
    right: 44,
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
    bottom: 22,
    left: 44,
    right: 44,
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

function Footer({ page, total }: { page: number; total: number }) {
  return (
    <View style={s.footerBar} fixed>
      <Text>Capability · 2026</Text>
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

interface Props {
  sub: SubSectorStatement;
  images: string[];
}

export function SubSectorStatementDoc({ sub, images }: Props) {
  const img = (i: number) => images[i] ?? images[0];
  const total = 13;

  const halfCaps = Math.ceil(sub.capabilities.length / 2);
  const capsLeft = sub.capabilities.slice(0, halfCaps);
  const capsRight = sub.capabilities.slice(halfCaps);
  const workA = images.slice(0, 4);
  const workB = images.slice(4, 8);

  return (
    <Document
      title={`${sub.name} Capability Statement`}
      author={siteConfig.legalName}
      subject={sub.tagline}
      keywords={`${sub.name}, ${sub.categorySlug}, millwork, Sandha Woodworks`}
    >
      {/* Cover */}
      <Page size="LETTER" style={s.cover}>
        <SafeImage src={img(0)} style={s.coverImage} />
        <View style={s.coverScrim} />
        <View style={s.coverBody}>
          <Text style={s.brandMark}>
            SANDHA{"\n"}WOODWORKS
          </Text>
          <Text style={s.coverTitle}>{sub.name}</Text>
          <Text style={s.coverTagline}>{sub.tagline}</Text>
          <Text style={s.coverMeta}>Cover · 01</Text>
        </View>
      </Page>

      {/* 01 Introduction */}
      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label="Introduction" />
        <Text style={s.eyebrow}>01 · Introduction</Text>
        <Text style={s.h1}>
          {sub.name} millwork,{"\n"}engineered by Sandha.
        </Text>
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
        <Footer page={1} total={total} />
      </Page>

      {/* 02 Capabilities */}
      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label="Capabilities" />
        <Text style={s.eyebrow}>02 · {sub.name} capabilities</Text>
        <Text style={s.h1}>
          Purpose-built scope,{"\n"}not a generic package.
        </Text>
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
        <Footer page={2} total={total} />
      </Page>

      {/* 03 Products */}
      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label="Products" />
        <Text style={s.eyebrow}>03 · Products & fixtures</Text>
        <Text style={s.h1}>
          The product library{"\n"}behind {sub.name.toLowerCase()} packages.
        </Text>
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
        <Footer page={3} total={total} />
      </Page>

      {/* 04 Manufacturing */}
      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label="Manufacturing" />
        <Text style={s.eyebrow}>04 · Manufacturing focus</Text>
        <Text style={s.h1}>
          How we build it{"\n"}for {sub.name.toLowerCase()}.
        </Text>
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
              <Text style={s.darkEyebrow}>Under one roof</Text>
              {underOneRoof.map((item) => (
                <Text key={item} style={[s.darkText, { marginBottom: 5 }]}>
                  · {item}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <SafeImage src={img(6)} style={[s.img, { height: 160, marginTop: 12 }]} />
        <Footer page={4} total={total} />
      </Page>

      {/* 05 Standards */}
      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label="Standards" />
        <Text style={s.eyebrow}>05 · Codes, standards & compliance</Text>
        <Text style={s.h1}>
          Built to the codes{"\n"}that matter on site.
        </Text>
        <View style={s.brandRule} />
        {sub.qualityStandards.map((item, i) => (
          <View key={item} style={s.bulletRow}>
            <Text style={s.bulletNum}>{String(i + 1).padStart(2, "0")}</Text>
            <Text style={s.bulletText}>{item}</Text>
          </View>
        ))}
        <SafeImage src={img(7)} style={[s.img, { height: 220, marginTop: 20 }]} />
        <Footer page={5} total={total} />
      </Page>

      {/* 06 Installation */}
      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label="Installation" />
        <Text style={s.eyebrow}>06 · Installation approach</Text>
        <Text style={s.h1}>
          On site.{"\n"}On schedule. Low disruption.
        </Text>
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
        <Footer page={6} total={total} />
      </Page>

      {/* 07 Selected work */}
      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label="Selected work" />
        <Text style={s.eyebrow}>07 · Selected work</Text>
        <Text style={s.h1}>Details, finishes, fit.</Text>
        <View style={s.brandRule} />
        {sub.clientNote ? <Text style={s.p}>{sub.clientNote}</Text> : null}
        <View style={[s.row, { flexWrap: "wrap", gap: 8, marginTop: 8 }]}>
          {workA.map((src) => (
            <SafeImage key={src} src={src} style={{ width: "48%", height: 160, objectFit: "cover" }} />
          ))}
        </View>
        <Footer page={7} total={total} />
      </Page>

      {/* 07 cont + audience */}
      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label="Selected work" />
        <Text style={s.eyebrow}>07 · Selected work (cont.)</Text>
        <View style={[s.row, { flexWrap: "wrap", gap: 8, marginBottom: 18 }]}>
          {workB.map((src) => (
            <SafeImage key={src} src={src} style={{ width: "48%", height: 140, objectFit: "cover" }} />
          ))}
        </View>
        <Text style={s.eyebrow}>08 · Who we work with</Text>
        <Text style={s.h1}>Partners on {sub.name.toLowerCase()} work.</Text>
        <View style={s.brandRule} />
        {sub.audience.map((item, i) => (
          <View key={item} style={s.bulletRow}>
            <Text style={s.bulletNum}>{String(i + 1).padStart(2, "0")}</Text>
            <Text style={s.bulletText}>{item}</Text>
          </View>
        ))}
        <Footer page={8} total={total} />
      </Page>

      {/* About */}
      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label="About" />
        <Text style={s.eyebrow}>About Sandha Woodworks</Text>
        <Text style={s.h1}>At a glance</Text>
        <View style={s.brandRule} />
        <View style={s.row}>
          <View style={s.colWide}>
            <Text style={s.p}>{companyCommitments}</Text>
            {atAGlance.map((item) => (
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
        <Footer page={9} total={total} />
      </Page>

      {/* What we will do */}
      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label="What we will do" />
        <Text style={s.eyebrow}>What we will do on your project</Text>
        <Text style={s.h1}>
          One PM.{"\n"}One team. No hand-offs, no mixing of jobs.
        </Text>
        <View style={s.brandRule} />
        <Text style={s.p}>
          On every Sandha {sub.name.toLowerCase()} project, one dedicated Project Manager owns the
          file from the moment the contract is signed until the warranty period ends. You call one
          person. You email one person. That person knows your drawings, your schedule, your site
          super, and every change you've signed.
        </Text>
        <Text style={s.p}>
          We do not rotate PMs mid-job. We do not split a single scope across three coordinators who
          each own a slice. Your PM runs your engineering, your shop drawings, your procurement,
          your production slot, your finishing, your delivery windows, your install crew and your
          deficiency close-out — as one continuous responsibility.
        </Text>
        <Text style={s.p}>
          Behind that PM sits the same Sandha team on every project: our engineers, our CNC
          operators, our finishers, our lead installers. Not a rotating cast of subcontractors. That
          is what keeps the quality consistent from the first sample to the last punch-list item.
        </Text>
        <View style={[s.darkPanel, { marginTop: 12 }]}>
          <Text style={s.darkEyebrow}>One name on the file — award to warranty close-out.</Text>
          <Text style={s.darkText}>One facility fabricates, finishes and packs every piece.</Text>
          <Text style={[s.darkText, { marginTop: 4 }]}>
            The same crew lead runs mobilization, install and deficiency.
          </Text>
        </View>
        <Footer page={10} total={total} />
      </Page>

      {/* Process flow */}
      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label="Process" />
        <Text style={s.eyebrow}>How we run your project — award to warranty</Text>
        <Text style={s.h1}>
          A single, continuous flow.{"\n"}Owned by one PM.
        </Text>
        <View style={s.brandRule} />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
          {projectFlow.map((step) => (
            <View key={step.n} style={s.flowCard}>
              <Text style={s.flowN}>{step.n}</Text>
              <Text style={s.flowT}>{step.t}</Text>
              <Text style={s.flowD}>{step.d}</Text>
            </View>
          ))}
        </View>
        <Text style={{ fontSize: 8, color: c.muted, marginTop: 14 }}>
          Every step above is owned end-to-end by your Sandha Project Manager. No hand-offs. No mixed
          jobs.
        </Text>
        <Footer page={11} total={total} />
      </Page>

      {/* Close-out */}
      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label="Close-out" />
        <Text style={s.eyebrow}>Close-out, warranty & after-care</Text>
        <Text style={s.h1}>
          The job isn't done when it's installed.{"\n"}It's done when you're covered.
        </Text>
        <View style={s.brandRule} />
        <View style={s.row}>
          <View style={s.colWide}>
            {closeOutItems.map((item, i) => (
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
              <Text style={s.darkEyebrow}>Service line</Text>
              <Text style={s.darkText}>{pdfContact.quote}</Text>
              <Text style={[s.darkText, { marginTop: 6 }]}>{pdfContact.phone}</Text>
            </View>
          </View>
        </View>
        <Footer page={12} total={total} />
      </Page>

      {/* Contact */}
      <Page size="LETTER" style={s.page}>
        <Header name={sub.name} label="Contact" />
        <Text style={s.eyebrow}>Contact</Text>
        <Text style={s.h1}>
          Every {sub.name.toLowerCase()} package — engineered, fabricated, finished and installed by
          one team.
        </Text>
        <View style={s.brandRule} />
        <View style={[s.row, { marginTop: 12 }]}>
          <View style={s.col}>
            <Text style={s.contactLabel}>Quote requests</Text>
            <Text style={s.contactValue}>{pdfContact.quote}</Text>
          </View>
          <View style={s.col}>
            <Text style={s.contactLabel}>General</Text>
            <Text style={s.contactValue}>{pdfContact.general}</Text>
          </View>
          <View style={s.col}>
            <Text style={s.contactLabel}>Phone</Text>
            <Text style={s.contactValue}>{pdfContact.phone}</Text>
          </View>
        </View>
        <View style={[s.row, { marginTop: 24 }]}>
          <View style={s.col}>
            <Text style={s.contactLabel}>Address</Text>
            <Text style={s.contactValue}>{pdfContact.address}</Text>
          </View>
          <View style={s.col}>
            <Text style={s.contactLabel}>Web</Text>
            <Text style={s.contactValue}>{pdfContact.web}</Text>
          </View>
          <View style={s.col}>
            <Text style={s.contactLabel}>LinkedIn</Text>
            <Text style={s.contactValue}>{pdfContact.linkedin}</Text>
          </View>
        </View>
        <SafeImage src={img(0)} style={[s.img, { height: 220, marginTop: 28 }]} />
        <Footer page={13} total={total} />
      </Page>
    </Document>
  );
}
