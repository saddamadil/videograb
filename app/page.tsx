'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Downloader from '@/components/Downloader';
import HowItWorks from '@/components/HowItWorks';
import ToolsGrid from '@/components/ToolsGrid';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { tools } from '@/lib/tools';

export default function Home() {
  const [activeTool, setActiveTool] = useState(0);
  const activeGroup = tools[activeTool].navGroup;

  function selectTool(id: number) {
    setActiveTool(id);
    document.querySelector('.tool-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <Nav activeGroup={activeGroup} onSelectGroup={selectTool} />
      <main>
        <Hero />
        <Downloader activeTool={activeTool} setActiveTool={selectTool} />
        <HowItWorks />
        <ToolsGrid onSelect={selectTool} />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
