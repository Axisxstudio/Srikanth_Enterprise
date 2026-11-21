import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { business } from '../config/business'

const questions = [
  {
    question: 'What products do you supply?',
    answer: <>We supply boards and sheets, melamine and decorative finishes, woodworking machinery, and workshop tools and handling equipment. <Link to="/products">Browse the product catalogue</Link>.</>,
  },
  {
    question: 'How do I request a quotation?',
    answer: <>Add products to your enquiry list, then open the <Link to="/contact">quotation form</Link>. Select <strong>Prepare Enquiry</strong> to review your summary and share it via WhatsApp. You can also describe what you need in the form.</>,
  },
  {
    question: 'What details should I include in my enquiry?',
    answer: 'Include product names, quantities, and any specifications you know, such as board thickness, sheet size, or finish. For machinery, tell us what you need the machine to do.',
  },
  {
    question: 'Can I check stock, pricing, or delivery options?',
    answer: <>Yes. <Link to="/contact">Contact our team</Link> with the products and quantities you need. Include your delivery location if you’d like us to confirm the available options.</>,
  },
  {
    question: 'Where is your store?',
    answer: <>Visit us at {business.address}. <a href={business.mapDirectionsUrl} target="_blank" rel="noopener noreferrer">Get directions on Google Maps</a>.</>,
  },
]

export function Faq() {
  return (
    <section className="home-faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading">Frequently asked questions</h2>
      <div>
        {questions.map(({ question, answer }) => (
          <details className="faq-item" key={question}>
            <summary>{question}<ChevronDown size={20} aria-hidden="true" /></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
