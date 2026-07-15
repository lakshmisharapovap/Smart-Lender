import { Logo } from "./Logo";
import { Twitter, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-footer py-16 text-white/80">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-white/60">
              Empowering microlenders across India with powerful, easy-to-use loan management tools.
            </p>
          </div>
          <div>
            <p className="mb-4 font-semibold text-white">Product</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              <li><a href="#apply" className="hover:text-white">Loan Application</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 font-semibold text-white">Admin Contact</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" /><a href="tel:+919502086565" className="hover:text-white">+91 95020 86565</a></li>
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" /><a href="mailto:dattunayak19s@gmail.com" className="hover:text-white">dattunayak19s@gmail.com</a></li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" /><span>Tenali, Andhra Pradesh, India</span></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 font-semibold text-white">Legal</p>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-white">Privacy Policy</a></li>
              <li><a className="hover:text-white">Terms of Service</a></li>
              <li><a className="hover:text-white">Cookie Policy</a></li>
              <li><a className="hover:text-white">Compliance</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row">
          <p>© 2026 SmartLender. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a aria-label="Twitter" className="hover:text-white"><Twitter className="h-4 w-4" /></a>
            <a aria-label="LinkedIn" className="hover:text-white"><Linkedin className="h-4 w-4" /></a>
            <a aria-label="GitHub" className="hover:text-white"><Github className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
