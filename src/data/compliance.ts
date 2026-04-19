// src/data/compliance.ts
// Shared compliance certifications list. Used by SecurityPage's
// compliance band and CinematicFooter's compliance strip.

export const COMPLIANCE = [
  'GDPR',
  'HIPAA',
  'SOC 2 Type II',
  'ISO 27001',
  'PCI DSS',
  'Air-gapped',
] as const;

export type Compliance = typeof COMPLIANCE[number];
