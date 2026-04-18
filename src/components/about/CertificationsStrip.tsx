import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { whiteCardStyle } from '../common/whiteCard';
import { CERTIFICATIONS, PAGE_ACCENT as ACCENT } from '../../data/about';

/**
 * CertificationsStrip — 4-cert badge grid below ClientsStrip.
 * SOC 2 Type 1 / HIPAA / GDPR / ISO 27001 with Lucide icons.
 */
export default function CertificationsStrip() {
  const [ref, inView] = useInView<HTMLElement>(0.2);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="micro-upper" style={{ color: 'rgba(0,0,0,0.55)' }}>
            Certified &amp; compliant
          </div>
        </motion.div>

        <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-4">
          {CERTIFICATIONS.map((cert, idx) => {
            const Icon: LucideIcon =
              (Lucide as unknown as Record<string, LucideIcon>)[cert.iconName] ??
              Lucide.ShieldCheck;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
                className="flex flex-col items-center text-center p-6 md:p-7"
                style={whiteCardStyle({ shadow: 'sm' })}
              >
                <div
                  className="w-[64px] h-[64px] rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: `${ACCENT}10`,
                    border: `1px solid ${ACCENT}20`,
                  }}
                >
                  <Icon size={28} style={{ color: ACCENT }} aria-hidden="true" />
                </div>
                <div
                  className="mb-1"
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(20px, 1.6vw, 24px)',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    color: '#000000',
                  }}
                >
                  {cert.name}
                </div>
                <div
                  className="micro-upper"
                  style={{ color: ACCENT, fontSize: 11 }}
                >
                  {cert.statusLabel}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-center text-[14px]"
          style={{ color: 'rgba(0,0,0,0.50)', fontStyle: 'italic', fontFamily: 'var(--serif)' }}
        >
          Audit reports available on request under NDA.
        </motion.div>
      </div>
    </section>
  );
}
