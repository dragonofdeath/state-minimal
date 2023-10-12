import React, { useEffect, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Card } from './components/ui/card';
import { FontApp } from './tasks/font-picker';
import PackingList from './tasks/packing-list';
import SliderInReact from './tasks/slider-react';
import TickTackToe from './tasks/tik-tack-toe';
import './index.css';

const App: React.FC = () => {
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
              <TabsTrigger value="intro">Intro</TabsTrigger>
              <TabsTrigger value="html_slider">
                The slider problem (html)
              </TabsTrigger>
              <TabsTrigger value="react_slider">
                The slider problem (react)
              </TabsTrigger>
              <TabsTrigger value="whatstate">what is state?</TabsTrigger>
              <TabsTrigger value="too_much">Too much state</TabsTrigger>
              <TabsTrigger value="font">Font picker</TabsTrigger>
              <TabsTrigger value="tick">Tick Tack Toe</TabsTrigger>
              <TabsTrigger value="end">done</TabsTrigger>
            </TabsList>
          </div>
          <div className="py-2 px-3">
            <TabsContent value="intro" className="text-lg">
              <div className="h-[90vh] flex flex-col justify-center items-center">
                <h1 className="text-3xl">State is bad.</h1>
                <h2 className="text-lg">But you can't do much without it</h2>
              </div>
              The research results by some state scientist:
              <img src="/problems.png" alt="problems" />
            </TabsContent>

            <TabsContent value="end" className="text-lg">
              <div className="h-[90vh] flex flex-col justify-center items-center">
                <h1 className="text-3xl">Thank you.</h1>
                <p>
                  How to count state we will learn in 'Make impossible states
                  impossible'
                </p>
              </div>
              <p className="text-xl">LESS STATE - LESS PROBLEMS</p>
            </TabsContent>
            <TabsContent value="too_much" className="grid gap-4 grid-cols-7">
              <Card className="col-span-5 p-8">
                <PackingList />
              </Card>
              <Card className="col-span-2 p-8">
                <p>
                  A task from{' '}
                  <a
                    href="https://react.dev/learn/choosing-the-state-structure"
                    target="_blank"
                    className="ml-1 underline text-blue-500"
                  >
                    react docs
                  </a>
                </p>
                <ul className="list-disc">
                  react does provides some solutions:
                  <li>encourages one source of truth</li>
                  <li>handles updates</li>
                  <li>
                    but can we have even less state in this specific case?
                  </li>
                  <li>derive - don't sync</li>
                </ul>
              </Card>
            </TabsContent>
            <TabsContent value="tick" className="grid gap-4 grid-cols-7">
              <Card className="col-span-5 p-8">
                <TickTackToe />
              </Card>
              <Card className="col-span-2 p-8">
                <ul className="list-disc">
                  <li>what was your state?</li>
                  <li>what bugs does it have?</li>
                  <li>can it be smaller?</li>
                  <li>how would we implement redo?</li>
                  <li>maybe even undo?</li>
                </ul>
              </Card>
            </TabsContent>
            <TabsContent value="html_slider" className="grid gap-4 grid-cols-7">
              <Card className="col-span-5 p-8">
                <iframe
                  src="/slider.html"
                  title="slider"
                  className="w-[100%] h-40"
                />
              </Card>
              <Card className="col-span-2 p-8">
                <ul className="list-disc">
                  <li>what boogs do we have here?</li>
                  <li>is it easy to fix?</li>
                  <li>where is our state?</li>
                </ul>
              </Card>
            </TabsContent>
            <TabsContent
              value="react_slider"
              className="grid gap-4 grid-cols-7"
            >
              <Card className="col-span-5 p-8">
                <SliderInReact />
              </Card>
              <Card className="col-span-2 p-8">
                React slider
                <ul className="list-disc">
                  <li>is it better/worse, why?</li>
                </ul>
              </Card>
            </TabsContent>
            <TabsContent value="whatstate" className="font-lg">
              <h1 className="text-3xl text-center">What is state?</h1>
              <ul className="list-disc w-[800px] mx-auto">
                <li>
                  "state" refers to the stored information at a specific point
                  in time that a program or system uses to operate in other
                  words - it something that changes
                </li>
                <li>but the dom changes</li>
                <li>
                  yes, dom is the state too, but react syncs it perfectly, so we
                  can pretend, that its a view, projection, reflection of the
                  state!
                </li>
              </ul>
              <img
                src="/slider-states.png"
                alt="slider states"
                className="block mx-auto w-[800px]"
              />
            </TabsContent>

            <TabsContent value="font" className="grid gap-4 grid-cols-7">
              <Card className="col-span-5 p-8">
                <FontApp />
              </Card>
              <Card className="col-span-2 p-8">
                Real font object found in the wild
                <ul className="list-disc">
                  <li>fix the thing!</li>
                </ul>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
};

export default App;
