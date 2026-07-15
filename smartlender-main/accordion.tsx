import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What is SmartLender?", a: "SmartLender is an all-in-one loan management platform built for microlenders and small lending businesses to record loans, track payments and manage clients." },
  { q: "How does the free trial work?", a: "Every plan includes a 1-month free trial with full feature access. No credit card required to start." },
  { q: "Can I import my existing loan data?", a: "Yes. Import clients and active loans from a CSV or Excel spreadsheet in a few clicks." },
  { q: "Is my data secure?", a: "Your data is encrypted in transit and at rest, backed up daily, and hosted in secure data centres." },
  { q: "Do you support multiple currencies?", a: "Yes. Default is Indian Rupees (₹) with support for additional currencies on the Professional and Enterprise plans." },
];

export function Faq() {
  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent">Got Questions?</p>
          <h2 className="mt-4 text-4xl font-bold text-brand-deep sm:text-5xl">
            Frequently Asked <span className="text-brand-accent">Questions</span>
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-12 w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger className="py-6 text-left text-lg font-semibold text-brand-deep hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-ink-muted">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
