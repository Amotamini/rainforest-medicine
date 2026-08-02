import { site } from "./content";

export function applyMailto(gatheringTitle?: string) {
  const subject = gatheringTitle
    ? `Application — ${gatheringTitle}`
    : "Application — Rainforest Medicine Gathering";
  const body = [
    "Please answer as fully as you can. Everything here is held in confidence.",
    "",
    "Full name:",
    "Age (participants must be 18 or over):",
    "Country / city:",
    "Which gathering: " + (gatheringTitle ?? ""),
    "",
    "What is calling you to this gathering:",
    "Previous experience with plant medicine, if any:",
    "",
    "— Health —",
    "Any heart condition, high blood pressure, or a pacemaker:",
    "Diabetes:",
    "Epilepsy or seizures, in you or an immediate family member:",
    "Liver or kidney condition:",
    "Asthma, and which inhaler:",
    "Thyroid condition, and which medication:",
    "Are you pregnant, or could you be:",
    "",
    "— Medication —",
    "All prescription medication you are currently taking:",
    "Antidepressants or SSRIs, now or in the last two months:",
    "Any recreational drug use in the last two months:",
    "Herbs or supplements you take regularly:",
    "",
    "Anything else we should know:",
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
