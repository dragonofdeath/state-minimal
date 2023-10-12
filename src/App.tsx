import fetch from 'cross-fetch';
import React, { useEffect, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import SliderInReact from './tasks/slider-react';
import TickTackToe from './tasks/tik-tack-toe';

import './index.css';
import PackingList from './tasks/packing-list';
import { FontApp } from './tasks/font-picker';

type DocsList = Array<{ name: string; url: string }>;

const App: React.FC = () => {
  // const [docsList, setDocsList] = useState<DocsList>([]);

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/docs_list')
  //     .then(async (res) => res.json())
  //     .then((data) => {
  //       setDocsList(data);
  //     });
  // }, []);
  // console.log(docsList);

  const [selectedTab, setSelectedTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    return tab || '1';
  });

  // sync tab to query string
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab !== selectedTab) {
      params.set('tab', selectedTab);
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${params}`,
      );
    }
  }, [selectedTab]);

  return (
    <main>
      <div className="overflow-hidden rounded-lg border bg-background shadow m-6 min-h-full">
        <Tabs
          defaultValue="account"
          className="w-[100%]"
          value={selectedTab}
          onValueChange={setSelectedTab}
        >
          <div className="p-2 border-b">
            <TabsList>
              <TabsTrigger value="1">Tick Tack Toe</TabsTrigger>
              <TabsTrigger value="2">The slider problem</TabsTrigger>
              <TabsTrigger value="3">Too much state</TabsTrigger>
              <TabsTrigger value="4">Font picker</TabsTrigger>
            </TabsList>
          </div>
          <div className="py-2 px-3">
            <TabsContent value="3">
              A task from{' '}
              <a
                href="https://react.dev/learn/choosing-the-state-structure"
                target="_blank"
                className="ml-1 underline text-blue-500"
              >
                react docs
              </a>
              <hr className="my-2" />
              <PackingList />
            </TabsContent>
            <TabsContent value="1">
              <TickTackToe />
            </TabsContent>
            <TabsContent value="2">
              Native html slider
              <iframe
                src="/slider.html"
                title="slider"
                className="w-[100%] h-40"
              />
              <hr />
              React slider
              <SliderInReact />
            </TabsContent>
            <TabsContent value="4">
              <FontApp />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
};

export default App;
