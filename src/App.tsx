/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Products from './components/Products';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 scroll-smooth selection:bg-yellow-200 selection:text-yellow-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Products />
      </main>
      <Footer />
    </div>
  );
}
