/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import EggTheory from './components/EggTheory';
import Products from './components/Products';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 scroll-smooth selection:bg-yellow-200 selection:text-yellow-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <EggTheory />
        <Products />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
