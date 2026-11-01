import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/common/PageLayout';
import { privacy } from '../config/privacy';
import { site } from '../config/site';
import './privacy.css';

interface PolicySection {
  title: string;
  body: ReactNode;
}

const sections: PolicySection[] = [
  {
    title: 'Who we are',
    body: (
      <p>
        {privacy.companyName} (“we”, “us”) runs the {site.name} waitlist. This policy explains what
        personal data we collect when you join it, why we collect it, and the choices you have.
      </p>
    ),
  },
  {
    title: 'What we collect',
    body: (
      <>
        <p>When you join the waitlist we collect:</p>
        <ul>
          <li>your email address;</li>
          <li>your agreement to receive updates, and when you gave it;</li>
          <li>
            technical data such as your IP address and browser type, which our servers may log to
            keep the waitlist secure and to stop spam.
          </li>
        </ul>
        <p>We don’t ask for your name, your location or any payment details.</p>
      </>
    ),
  },
  {
    title: 'How we use it',
    body: (
      <ul>
        <li>to email you updates about {site.name}, including when it launches;</li>
        <li>to count how many people have joined, as a total that doesn’t identify anyone;</li>
        <li>to protect the waitlist from abuse.</li>
      </ul>
    ),
  },
  {
    title: 'Why we’re allowed to use it',
    body: (
      <p>
        We rely on your consent. You give it by ticking the box when you join, and you can withdraw
        it at any time. Withdrawing doesn’t affect anything we did before you withdrew.
      </p>
    ),
  },
  {
    title: 'Who we share it with',
    body: (
      <p>
        We share your data only with the service providers that host this site and send our emails,
        and only so they can do that work for us. We don’t sell your data.
      </p>
    ),
  },
  {
    title: 'How long we keep it',
    body: (
      <p>
        We keep your email until you unsubscribe or ask us to delete it, or until {privacy.retentionPeriod}{' '}
        after {site.name} launches, whichever comes first.
      </p>
    ),
  },
  {
    title: 'Your rights',
    body: (
      <>
        <p>You can ask us to:</p>
        <ul>
          <li>tell you what data we hold about you;</li>
          <li>correct it;</li>
          <li>delete it;</li>
          <li>stop using it for updates.</li>
        </ul>
        <p>
          Every email we send has an unsubscribe link. For anything else, write to{' '}
          <a href={`mailto:${privacy.contactEmail}`}>{privacy.contactEmail}</a>. You can also complain
          to your local data protection authority.
        </p>
      </>
    ),
  },
  {
    title: 'Cookies and storage',
    body: (
      <p>This page doesn’t use advertising or tracking cookies.</p>
    ),
  },
  {
    title: 'Changes to this policy',
    body: (
      <p>
        If we change this policy we’ll update the date at the top. If the change affects how we use
        your email, we’ll tell you before it takes effect.
      </p>
    ),
  },
  {
    title: 'Contact us',
    body: (
      <p>
        Questions about this policy or your data? Email{' '}
        <a href={`mailto:${privacy.contactEmail}`}>{privacy.contactEmail}</a>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `Privacy Policy | ${site.name}`;
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <PageLayout>
      <article className="privacy">
        <h1 className="privacy__title">Privacy Policy</h1>
        <p className="privacy__updated">Last updated {privacy.lastUpdated}</p>

        {sections.map((section) => (
          <section className="privacy__section" key={section.title}>
            <h2>{section.title}</h2>
            {section.body}
          </section>
        ))}

        <Link className="privacy__back" to={site.routes.home}>
          Back to the waitlist
        </Link>
      </article>
    </PageLayout>
  );
}
