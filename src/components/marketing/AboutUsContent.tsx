"use client";

import { useTranslation } from "react-i18next";
import { PageHero, CtaBanner, SectionLabel } from "@/components/marketing/PageSections";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import {
  certificationItems,
  missionVisionItems,
  teamMembers,
  timelineItems,
  valueItems,
  whyChooseUsItems,
} from "@/lib/constants/about";
import { pageMedia, teamMedia } from "@/lib/constants/media";
import { siteConfig } from "@/lib/constants/site";

export function AboutUsContent() {
  const { t } = useTranslation("about");
  const facilityFeatures = t("facility.features", { returnObjects: true }) as string[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        image={pageMedia.aboutHero}
      />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{t("journey.label")}</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
            {t("journey.title")}
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            {t("journey.description", { founded: siteConfig.founded })}
          </p>
          <div className="mt-12 space-y-8 border-l border-border pl-8">
            {timelineItems.map((item) => {
              const yearLabel =
                "yearKey" in item ? t(`timeline.${item.id}.year`) : item.year;
              return (
                <article key={item.id} className="relative">
                  <span className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full bg-black" />
                  <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    {yearLabel}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">
                    {t(`timeline.${item.id}.title`)}
                  </h3>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {t(`timeline.${item.id}.description`)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel>{t("story.label")}</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
              {t("story.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t("story.p1", { founded: siteConfig.founded })}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t("story.p2")}
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <YouTubeEmbed videoId="NaiV8PdLmxM" title={t("story.videoTitle")} />
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{t("certifications.label")}</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
            {t("certifications.title")}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {certificationItems.map((cert) => (
              <article key={cert.id} className="rounded-2xl border border-border bg-white p-6">
                <p className="type-eyebrow text-muted-foreground">
                  {cert.year}
                </p>
                <h3 className="mt-3 text-lg font-semibold">
                  {t(`certifications.items.${cert.id}.name`)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(`certifications.items.${cert.id}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-dark px-4 py-10 text-surface-cream sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {missionVisionItems.map((id) => (
            <article key={id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">{t(`missionVision.${id}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-surface-cream/70">
                {t(`missionVision.${id}.description`)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{t("values.label")}</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
            {t("values.title")}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {valueItems.map((id) => (
              <article key={id} className="rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold">{t(`values.items.${id}.title`)}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {t(`values.items.${id}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-muted">
        <div className="relative">
          <img
            src={pageMedia.aboutFacilityInterior}
            alt={t("facilityPhoto.caption")}
            className="aspect-[21/9] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <p className="absolute bottom-4 left-4 max-w-xl text-sm text-white/80 sm:bottom-6 sm:left-6 sm:text-base">
            {t("facilityPhoto.caption")}
          </p>
        </div>
      </section>

      <section className="bg-muted px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>{t("facility.label")}</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
              {t("facility.title", { sqFt: siteConfig.facilitySqFt })}
            </h2>
            <ul className="mt-6 space-y-3">
              {facilityFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel>{t("whyChooseUs.label")}</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
              {t("whyChooseUs.title")}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {whyChooseUsItems.map((id) => (
                <article key={id} className="rounded-2xl border border-border bg-white p-5">
                  <h3 className="font-semibold">{t(`whyChooseUs.items.${id}.title`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(`whyChooseUs.items.${id}.description`)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 py-10 sm:px-6 lg:px-8">
        <SectionLabel className="text-center">{t("teamFloor.label")}</SectionLabel>
        <h2 className="font-display mt-4 text-center text-3xl font-semibold md:text-5xl">
          {t("teamFloor.title")}
        </h2>
        <div className="mx-auto mt-8 max-w-7xl overflow-hidden rounded-2xl">
          <img
            src={pageMedia.aboutTeam}
            alt={t("teamFloor.imageAlt")}
            className="aspect-[21/9] w-full object-cover"
          />
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{t("leadership.label")}</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
            {t("leadership.title")}
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">{t("leadership.description")}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article
                key={member.id}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                <div className="aspect-[4/4] overflow-hidden bg-muted">
                  <img
                    src={teamMedia[member.avatarKey]}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brand">
                    {t(`leadership.members.${member.id}.title`)}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {t(`leadership.members.${member.id}.description`)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow={t("cta.eyebrow")}
        title={t("cta.title")}
        primaryLabel={t("cta.primaryLabel")}
        secondaryLabel={t("cta.secondaryLabel")}
        secondaryHref="/portfolio"
      />
    </>
  );
}
