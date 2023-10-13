import React, { useEffect, useState } from 'react';

import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/myselect';

export const CampaignInfo: React.FC = () => {
  const [advertiserId, setAdvertiserId] = useState<string | null>(null);
  const [campaignId, setCampaignId] = useState<string | null>(null);

  const [profit, setProfit] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!advertiserId || !campaignId) return;
    fetchCampaignProfit(advertiserId, campaignId)
      .then((profit) => {
        setProfit(profit);
        setError(null);
      })
      .catch((error) => {
        setProfit(null);
        setError(error);
      });
  }, [advertiserId, campaignId]);

  return (
    <div>
      <AdvertiserSelector onSelect={(id) => setAdvertiserId(id)} />
      {advertiserId && (
        <CampaignSelector
          advertiserId={advertiserId}
          onSelect={setCampaignId}
        />
      )}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {profit && <p className="text-green-500">Profit: {profit}</p>}
    </div>
  );
};

const AdvertiserSelector: React.FC<{ onSelect: (id: string) => void }> = ({
  onSelect,
}) => {
  const [advertiserId, setAdvertiserId] = useState<string>(advertisers[0].id);

  useEffect(() => {
    onSelect(advertiserId);
  }, [advertiserId]);

  return (
    <Label className="flex gap-2 items-center">
      Advertiser
      <Select
        value={advertiserId}
        onValueChange={(id) => setAdvertiserId(id)}
        options={advertisers}
      />
    </Label>
  );
};

const CampaignSelector: React.FC<{
  advertiserId: string;
  onSelect: (id: string) => void;
}> = ({ advertiserId, onSelect }) => {
  const [campaignId, setCampaignId] = useState<string>(
    advertisers[0].campaigns[0].id,
  );

  // Rest options on advertiser change
  useEffect(() => {
    const newCampaignId = advertisers.find((a) => a.id === advertiserId)!
      .campaigns[0].id;
    setCampaignId(newCampaignId);
    onSelect(newCampaignId);
  }, [advertiserId]);

  useEffect(() => {
    if (!campaignId) return;
    onSelect(campaignId);
  }, [campaignId]);

  return (
    <Label className="flex gap-2 items-center">
      Campaign
      <Select
        value={campaignId}
        onValueChange={(id) => setCampaignId(id)}
        options={advertisers.find((a) => a.id === advertiserId)!.campaigns}
      />
    </Label>
  );
};

type Advertiser = {
  id: string;
  campaigns: Campaign[];
  label: string;
};

type Campaign = {
  id: string;
  label: string;
};

const advertisers: Advertiser[] = [
  {
    id: 'adv1',
    campaigns: [
      {
        id: 'camp1',
        label: 'Summer Refresh',
      },
      {
        id: 'camp2',
        label: 'Holiday Cheers',
      },
    ],
    label: 'Coca-Cola',
  },
  {
    id: 'adv2',
    campaigns: [
      {
        id: 'camp3',
        label: 'Just Do It 2023',
      },
      {
        id: 'camp4',
        label: 'Air Max Day',
      },
    ],
    label: 'Nike',
  },
];
const profit = {
  adv1: { camp1: 100, camp2: 200 },
  adv2: { camp3: 300, camp4: 400 },
};

const fetchCampaignProfit = async (
  advertiserId: string,
  campaignId: string,
): Promise<number> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    const money = profit[advertiserId as any][campaignId as any];
    if (money) {
      setTimeout(() => {
        resolve(money);
      }, money);
    } else {
      setTimeout(() => {
        reject(new Error('404'));
      }, 50);
    }
  });
};
