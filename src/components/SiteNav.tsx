import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';
import { DropdownNavigation } from './ui/dropdown-navigation';
import {
  Server, Cpu, Shield, Zap, FileText, Eye, Users, Building2,
  Stethoscope, Factory, AlertTriangle, DollarSign, Lock,
  HelpCircle, Phone, Info,
} from 'lucide-react';

const NAV_ITEMS = [
  {
    id: 1,
    label: 'Platform',
    link: '/platform',
    subMenus: [
      {
        title: 'Sovereign Stack',
        items: [
          { label: 'Sovereign runtime', description: 'On-prem \u00b7 air-gapped \u00b7 your hardware', icon: Server, link: '/platform' },
          { label: 'Model router', description: 'Right model per task', icon: Cpu, link: '/platform' },
          { label: 'Hallucination control', description: '4-layer citation \u00b7 grounding', icon: Shield, link: '/platform' },
        ],
      },
      {
        title: 'Capabilities',
        items: [
          { label: 'Enterprise connectors', description: 'SAP \u00b7 Epic \u00b7 Salesforce', icon: Zap, link: '/platform' },
          { label: 'Governance', description: 'Audit trail \u00b7 approvals \u00b7 RBAC', icon: Eye, link: '/platform' },
          { label: 'Security & compliance', description: 'GDPR \u00b7 HIPAA \u00b7 SOC 2', icon: Lock, link: '/security' },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Agents',
    link: '/agents',
    subMenus: [
      {
        title: 'Live Agents',
        items: [
          { label: 'Invoice Intelligence', description: 'Handwritten to ERP in 30s', icon: FileText, link: '/agents' },
          { label: 'PCR Intelligence', description: '1.2M reports \u00b7 root cause in hours', icon: Cpu, link: '/agents' },
          { label: 'Voice AI \u00b7 SOAP', description: 'Doctor talks \u00b7 note done in ~30s', icon: Stethoscope, link: '/agents' },
        ],
      },
      {
        title: 'Agent Pattern',
        items: [
          { label: 'READ \u00b7 THINK \u00b7 DO \u00b7 PROVE', description: 'The 4-verb agent anatomy', icon: Zap, link: '/agents' },
          { label: 'Patient Experience OS', description: '$400K+ recovered per location', icon: Phone, link: '/agents' },
          { label: 'Voucher Matching', description: '200-page vouchers in 5 minutes', icon: FileText, link: '/agents' },
        ],
      },
    ],
  },
  {
    id: 3,
    label: 'Solutions',
    link: '/solutions',
    subMenus: [
      {
        title: 'By Industry',
        items: [
          { label: 'Finance & Logistics', description: 'Invoices \u00b7 vouchers \u00b7 trade docs', icon: Building2, link: '/solutions#finance-logistics' },
          { label: 'Healthcare', description: 'SOAP \u00b7 ICD-10 \u00b7 patient experience', icon: Stethoscope, link: '/solutions#healthcare' },
          { label: 'Manufacturing', description: 'PCR \u00b7 8D \u00b7 supplier traceability', icon: Factory, link: '/solutions#manufacturing' },
        ],
      },
      {
        title: 'By Challenge',
        items: [
          { label: 'Why generic AI fails', description: '6 walls every enterprise hits', icon: AlertTriangle, link: '/why-generic-fail' },
          { label: 'Cost climbing', description: 'Token bill is exponential', icon: DollarSign, link: '/why-generic-fail' },
          { label: 'Competitors', description: 'artiGen vs the alternatives', icon: Users, link: '/competitors' },
        ],
      },
    ],
  },
  {
    id: 4,
    label: 'About',
    link: '/about',
    subMenus: [
      {
        title: 'Company',
        items: [
          { label: 'About', description: 'From idea to production', icon: Info, link: '/about' },
          { label: 'Solutions by industry', description: '10 industries \u00b7 5 agents', icon: Users, link: '/solutions' },
          { label: 'FAQ', description: 'Questions we hear most', icon: HelpCircle, link: '/faq' },
          { label: 'Contact', description: 'Two doors \u00b7 one phone call', icon: Phone, link: '/contact' },
        ],
      },
    ],
  },
  { id: 5, label: 'Pricing', link: '/pricing' },
];

const ALL = [
  { to: '/', label: 'Home' },
  { to: '/platform', label: 'Platform' },
  { to: '/agents', label: 'Agents' },
  { to: '/why-generic-fail', label: 'Why generic fails' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/competitors', label: 'Competitors' },
  { to: '/security', label: 'Security' },
  { to: '/faq', label: 'FAQ' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: 'rgba(255,255,255,0.92)', borderBottom: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <nav className="w-full mx-auto px-8 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <svg width="28" height="28" viewBox="0 0 100 101" fill="#000000" xmlns="http://www.w3.org/2000/svg">
            <path d="M63.5616 99.8354V71.8189H53.4245C38.904 73.1887 27.6713 63.3258 27.6713 50.4492C27.6713 40.3122 35.0685 27.9832 50.4108 27.9832C54.7946 27.9832 62.1918 29.901 67.3974 37.0243C72.6027 44.1477 71.2329 50.175 71.7809 71.8189C72.3632 94.8255 90.5024 100.219 100 100.037C99.4521 78.9422 100.822 46.0654 97.5344 36.7487C96.5803 34.0459 96.0732 31.2711 95.6166 30.7231C89.0413 34.5586 79.178 34.5586 71.7809 27.1614C64.1095 19.4901 65.4796 9.35307 68.2192 3.87218C62.1918 1.13232 55.0684 0.313437 51.7809 0.313731C50.6849 0.314025 38.0822 -1.60607 22.7398 8.25536C11.6458 15.386 0 29.0504 0 51.2695C0 68.2937 9.86291 82.7783 20 89.9011C35.5962 100.86 48.7672 99.8354 63.5616 99.8354Z" />
            <path d="M99.9864 13.2121C99.9864 20.5091 94.0709 26.4246 86.7742 26.4246C79.4772 26.4246 73.5618 20.5091 73.5618 13.2121C73.5618 5.91544 79.4772 0 86.7742 0C94.0709 0 99.9864 5.91544 99.9864 13.2121Z" />
          </svg>
          <span className="font-display font-semibold text-[20px] tracking-card">
            <span style={{ color: '#000000' }}>attentions</span><span style={{ color: '#000000' }}>.ai</span>
          </span>
        </Link>

        <div className="hidden lg:block">
          <DropdownNavigation navItems={NAV_ITEMS} />
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link to="/contact" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold text-[#1c1c1e] border border-[rgba(0,0,0,0.12)] hover:bg-[rgba(0,0,0,0.04)] transition-colors" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Contact us</Link>
          <a href="mailto:hello@attentions.ai" className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold text-white bg-[#1c1c1e] hover:bg-[#333] transition-colors" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Book a call</a>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="lg:hidden w-10 h-10 rounded-lg border border-[rgba(0,0,0,0.12)] flex flex-col items-center justify-center gap-[4px]"
                aria-label="Open menu"
              >
                <span className="block w-4 h-[1.5px] bg-[#1c1c1e]" />
                <span className="block w-4 h-[1.5px] bg-[#1c1c1e]" />
                <span className="block w-4 h-[1.5px] bg-[#1c1c1e]" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[90] bg-ink/30 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-0 z-[100] p-6 overflow-y-auto" style={{ background: 'var(--bg-hero)' }}>
                <div className="flex items-center justify-between mb-10">
                  <span className="font-display font-semibold text-[18px] text-white">Menu</span>
                  <Dialog.Close asChild>
                    <button className="w-10 h-10 rounded-lg border text-white text-xl" style={{ borderColor: 'rgba(255,255,255,0.15)' }} aria-label="Close menu">×</button>
                  </Dialog.Close>
                </div>
                <nav className="flex flex-col gap-3">
                  {ALL.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="font-display text-[22px] text-white py-1"
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>
                <a href="mailto:hello@attentions.ai" className="btn-primary mt-10 w-full justify-center">Book a call</a>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </nav>
    </header>
  );
}
