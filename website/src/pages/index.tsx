import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HeroBanner() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/what-is-ui-kitten">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--outline button--lg"
            style={{marginLeft: '1rem'}}
            to="/docs/components/overview">
            Components
          </Link>
        </div>
      </div>
    </header>
  );
}

type FeatureItem = {
  title: string;
  description: string;
};

const features: FeatureItem[] = [
  {
    title: 'Eva Design System',
    description:
      'Powered by Eva Design System with complete theming support. Two built-in themes (light and dark) and a deep-learning color generator for creating custom themes.',
  },
  {
    title: '30+ UI Components',
    description:
      'Production-ready components including buttons, inputs, selects, calendars, modals, navigation, and more. All components are accessible and customizable.',
  },
  {
    title: 'React Native 0.81',
    description:
      'Built for modern React Native with React 19 support. Works with Expo 54 and supports both iOS and Android with web support via React Native Web.',
  },
  {
    title: 'Runtime Theming',
    description:
      'Switch between light and dark themes at runtime. Create branded themes with Eva Colors deep-learning color generator.',
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--3')}>
      <div className="padding-horiz--md padding-vert--lg">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function QuickStart() {
  return (
    <section className={styles.quickStart}>
      <div className="container">
        <h2>Quick Start</h2>
        <pre className={styles.codeBlock}>
          <code>
            {`npm i @ui-kitten/components @ui-kitten/eva react-native-svg`}
          </code>
        </pre>
      </div>
    </section>
  );
}

export default function Home(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="React Native UI Components powered by Eva Design System">
      <HeroBanner />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
        <QuickStart />
      </main>
    </Layout>
  );
}
