import fetch from 'cross-fetch';
import React, { useEffect, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import './index.css';

import './App.css';

type DocsList = Array<{ name: string; url: string }>;

const App: React.FC = () => {
  const [docsList, setDocsList] = useState<DocsList>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/docs_list')
      .then(async (res) => res.json())
      .then((data) => {
        setDocsList(data);
      });
  }, []);
  console.log(docsList);

  return (
    <main className="App">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
};

export default App;
