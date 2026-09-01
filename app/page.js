'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Coins,
  Compass,
  Search,
  Shield,
  Sparkles,
  Star,
  Sword,
  Wallet,
  ImagePlus,
  BadgeCheck,
  Plus,
} from 'lucide-react';

const rarityStyles = {
  Common: 'bg-slate-100 text-slate-700 border-slate-200',
  Rare: 'bg-blue-100 text-blue-700 border-blue-200',
  Epic: 'bg-violet-100 text-violet-700 border-violet-200',
  Legendary: 'bg-amber-100 text-amber-700 border-amber-200',
};

const marketplaceCards = [
  {
    id: 1,
    name: 'Astra Sentinel',
    rarity: 'Legendary',
    attack: 98,
    defense: 88,
    price: 1.75,
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Nova Rift',
    rarity: 'Epic',
    attack: 86,
    defense: 71,
    price: 1.2,
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Arc Templar',
    rarity: 'Rare',
    attack: 72,
    defense: 68,
    price: 0.8,
    image:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Cinder Warden',
    rarity: 'Common',
    attack: 52,
    defense: 60,
    price: 0.45,
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80',
  },
];

const ownedCards = [
  { id: 11, name: 'Ember Rift', rarity: 'Rare', attack: 77, defense: 74, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80' },
  { id: 12, name: 'Crown Guard', rarity: 'Epic', attack: 81, defense: 79, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80' },
  { id: 13, name: 'Moonblade', rarity: 'Legendary', attack: 94, defense: 86, image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80' },
];

const tabs = ['Marketplace', 'My Collection', 'Minting Studio'];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('Marketplace');
  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState('All');
  const [listPrice, setListPrice] = useState('1.2');
  const [selectedCard, setSelectedCard] = useState(null);

  const filteredCards = useMemo(() => {
    return marketplaceCards.filter((card) => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = rarityFilter === 'All' || card.rarity === rarityFilter;
      return matchesSearch && matchesRarity;
    });
  }, [searchTerm, rarityFilter]);

  const previewCard = {
    name: 'Echo Phoenix',
    rarity: 'Epic',
    attack: 83,
    defense: 76,
    image:
      'https://images.unsplash.com/photo-1528819622761-6bcf042e7fd4?auto=format&fit=crop&w=900&q=80',
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">Aetheria</p>
              <p className="text-xs text-slate-500">Digital Card Exchange</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium transition ${
                  activeTab === tab
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 md:flex">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Sepolia Testnet
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-500">
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-8 grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-soft">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              <Star className="h-3.5 w-3.5" />
              Elite Game NFT Marketplace
            </div>
            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Trade legendary card collections with institutional-grade clarity.
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-600">
              Discover premium digital cards, build your deck, and collect rare tactical assets secured by verified on-chain ownership.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-500">
                Explore Cards
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                <Compass className="h-4 w-4" />
                View Collections
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-2xl font-bold text-slate-900">24.8K</p>
                <p className="mt-1 text-sm text-slate-500">Cards Minted</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-2xl font-bold text-slate-900">3.9K</p>
                <p className="mt-1 text-sm text-slate-500">Active Traders</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-2xl font-bold text-slate-900">98.2%</p>
                <p className="mt-1 text-sm text-slate-500">Buyback Trust</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Featured Card</p>
                <h2 className="mt-1 text-2xl font-bold">{previewCard.name}</h2>
              </div>
              <div className={`rounded-full border px-3 py-1 text-xs font-semibold ${rarityStyles[previewCard.rarity]}`}>
                {previewCard.rarity}
              </div>
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <img src={previewCard.image} alt={previewCard.name} className="h-64 w-full object-cover" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <Sword className="h-4 w-4 text-blue-600" />
                  Attack
                </div>
                <p className="mt-2 text-2xl font-bold text-slate-900">{previewCard.attack}</p>
              </div>
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <Shield className="h-4 w-4 text-violet-600" />
                  Defense
                </div>
                <p className="mt-2 text-2xl font-bold text-slate-900">{previewCard.defense}</p>
              </div>
            </div>
          </div>
        </section>

        {activeTab === 'Marketplace' && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-600">Marketplace</p>
                <h3 className="mt-2 text-2xl font-bold">Live card listings</h3>
              </div>

              <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <Search className="h-4 w-4 text-slate-500" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search cards"
                    className="w-44 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>

                <select
                  value={rarityFilter}
                  onChange={(e) => setRarityFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
                >
                  <option value="All">All Rarities</option>
                  <option value="Common">Common</option>
                  <option value="Rare">Rare</option>
                  <option value="Epic">Epic</option>
                  <option value="Legendary">Legendary</option>
                </select>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {filteredCards.map((card) => (
                <article key={card.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="relative">
                    <img src={card.image} alt={card.name} className="h-52 w-full object-cover" />
                    <div className="absolute left-3 top-3 rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-700">
                      {card.rarity}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">{card.name}</h4>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Card #{card.id}</p>
                      </div>
                      <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                        <Coins className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-slate-50 p-2 text-center">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">ATK</p>
                        <p className="mt-1 text-lg font-bold text-slate-900">{card.attack}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-2 text-center">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">DEF</p>
                        <p className="mt-1 text-lg font-bold text-slate-900">{card.defense}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Price</p>
                        <p className="text-2xl font-bold text-slate-900">{card.price} ETH</p>
                      </div>
                      <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500">
                        Buy Card
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'My Collection' && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-600">Collection</p>
                <h3 className="mt-2 text-2xl font-bold">Your owned cards</h3>
              </div>
              <button className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                Filter: All Cards
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {ownedCards.map((card) => (
                <article key={card.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <img src={card.image} alt={card.name} className="h-52 w-full object-cover" />
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{card.name}</h4>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Collection #{card.id}</p>
                      </div>
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${rarityStyles[card.rarity]}`}>
                        {card.rarity}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Attack</p>
                        <p className="text-xl font-bold text-slate-900">{card.attack}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Defense</p>
                        <p className="text-xl font-bold text-slate-900">{card.defense}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCard(card)}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                    >
                      <BadgeCheck className="h-4 w-4" />
                      List for Sale
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'Minting Studio' && (
          <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-600">Minting Studio</p>
              <h3 className="mt-2 text-2xl font-bold">Create a new card</h3>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Card Name</label>
                  <input defaultValue="Echo Phoenix" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-800 outline-none focus:border-blue-400" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Rarity</label>
                    <select defaultValue="Epic" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-800 outline-none focus:border-blue-400">
                      <option>Common</option>
                      <option>Rare</option>
                      <option>Epic</option>
                      <option>Legendary</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Starting Price (ETH)</label>
                    <input value={listPrice} onChange={(e) => setListPrice(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-800 outline-none focus:border-blue-400" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Attack</label>
                    <input defaultValue="83" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-800 outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Defense</label>
                    <input defaultValue="76" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-800 outline-none focus:border-blue-400" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Image URL</label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                    <ImagePlus className="h-4 w-4 text-slate-400" />
                    <input defaultValue="https://images.unsplash.com/..." className="w-full bg-transparent text-slate-800 outline-none" />
                  </div>
                </div>

                <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500">
                  <Plus className="h-4 w-4" />
                  Mint Card to Marketplace
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-slate-900">Live preview</h4>
                <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${rarityStyles[previewCard.rarity]}`}>
                  {previewCard.rarity}
                </span>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <img src={previewCard.image} alt="Preview card" className="h-72 w-full object-cover" />
              </div>

              <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Name</p>
                    <h5 className="mt-2 text-2xl font-bold text-slate-900">{previewCard.name}</h5>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Price</p>
                    <p className="mt-2 text-2xl font-bold text-blue-600">{listPrice} ETH</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">ATK</p>
                    <p className="mt-2 text-xl font-bold text-slate-900">{previewCard.attack}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">DEF</p>
                    <p className="mt-2 text-xl font-bold text-slate-900">{previewCard.defense}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {selectedCard && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/25 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-600">List for sale</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">{selectedCard.name}</h3>
              </div>
              <button type="button" onClick={() => setSelectedCard(null)} className="text-sm font-medium text-slate-500">
                Close
              </button>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
              <img src={selectedCard.image} alt={selectedCard.name} className="h-60 w-full object-cover" />
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Listing Price (ETH)</label>
                <input defaultValue="1.2" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none focus:border-blue-400" />
              </div>

              <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
                Confirm Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
