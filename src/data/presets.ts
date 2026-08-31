export interface NetherPreset {
  name: string;
  category: string;
  overworld: { x: number; y: number; z: number };
  nether: { x: number; y: number; z: number };
  description: string;
}

export const NETHER_PRESETS: NetherPreset[] = [
  {
    name: 'Spawn Base & Portal Room',
    category: 'Overworld Starting Point',
    overworld: { x: 0, y: 64, z: 0 },
    nether: { x: 0, y: 64, z: 0 },
    description: 'World origin standard spawn alignment'
  },
  {
    name: 'Nether Fortress Outpost',
    category: 'Nether Structure',
    overworld: { x: 1200, y: 70, z: -800 },
    nether: { x: 150, y: 70, z: -100 },
    description: 'Blaze spawner & wither skeleton farm linkage'
  },
  {
    name: 'Bastion Remnant Loot Base',
    category: 'Nether Structure',
    overworld: { x: -2400, y: 55, z: 1600 },
    nether: { x: -300, y: 55, z: 200 },
    description: 'Piglin bartering and ancient debris excavation site'
  },
  {
    name: 'Stronghold End Portal Base',
    category: 'End Gateway',
    overworld: { x: -1680, y: 32, z: 2400 },
    nether: { x: -210, y: 32, z: 300 },
    description: 'Fast shortcut to the Ender Dragon portal'
  }
];

export interface CraftingRecipePreset {
  id: string;
  name: string;
  category: string;
  ingredients: { name: string; amountPerCraft: number; baseStackSize: number }[];
  outputPerCraft: number;
  outputName: string;
  outputStackSize: number;
  description: string;
  tip?: string;
}

export const CRAFTING_PRESETS: CraftingRecipePreset[] = [
  {
    id: 'stairs',
    name: 'Stairs (Wood, Stone, Deepslate)',
    category: 'Building Blocks',
    ingredients: [{ name: 'Blocks / Planks', amountPerCraft: 6, baseStackSize: 64 }],
    outputPerCraft: 4,
    outputName: 'Stairs',
    outputStackSize: 64,
    description: 'Crafting Table standard stair recipe (33.3% block loss compared to Stonecutter).',
    tip: 'Pro tip: Using a Stonecutter gives 1 stair per 1 block, saving 33% resources!'
  },
  {
    id: 'slabs',
    name: 'Slabs (Wood, Stone, Quartz)',
    category: 'Building Blocks',
    ingredients: [{ name: 'Blocks / Planks', amountPerCraft: 3, baseStackSize: 64 }],
    outputPerCraft: 6,
    outputName: 'Slabs',
    outputStackSize: 64,
    description: 'Converts 3 blocks into 6 half-slabs with 100% material efficiency.'
  },
  {
    id: 'concrete-powder',
    name: 'Concrete Powder',
    category: 'Building Blocks',
    ingredients: [
      { name: 'Sand', amountPerCraft: 4, baseStackSize: 64 },
      { name: 'Gravel', amountPerCraft: 4, baseStackSize: 64 },
      { name: 'Dye', amountPerCraft: 1, baseStackSize: 64 }
    ],
    outputPerCraft: 8,
    outputName: 'Concrete Powder Blocks',
    outputStackSize: 64,
    description: 'Batch of 8 concrete powder blocks. Requires water contact to solidify.'
  },
  {
    id: 'tnt',
    name: 'TNT Explosive',
    category: 'Utility & Mining',
    ingredients: [
      { name: 'Gunpowder', amountPerCraft: 5, baseStackSize: 64 },
      { name: 'Sand', amountPerCraft: 4, baseStackSize: 64 }
    ],
    outputPerCraft: 1,
    outputName: 'TNT Blocks',
    outputStackSize: 64,
    description: 'Essential for Netherite mining tunnels and blast mining.'
  },
  {
    id: 'hopper',
    name: 'Hopper',
    category: 'Redstone & Automation',
    ingredients: [
      { name: 'Iron Ingots', amountPerCraft: 5, baseStackSize: 64 },
      { name: 'Chest (8 Planks)', amountPerCraft: 1, baseStackSize: 64 }
    ],
    outputPerCraft: 1,
    outputName: 'Hoppers',
    outputStackSize: 64,
    description: 'Item transportation and sorting hopper (each hopper consumes 5 iron + 8 wooden planks).'
  },
  {
    id: 'bookshelf',
    name: 'Bookshelf (Enchanting / Library)',
    category: 'Enchanting & Decor',
    ingredients: [
      { name: 'Wooden Planks', amountPerCraft: 6, baseStackSize: 64 },
      { name: 'Books (3 Paper + 1 Leather)', amountPerCraft: 3, baseStackSize: 64 }
    ],
    outputPerCraft: 1,
    outputName: 'Bookshelves',
    outputStackSize: 64,
    description: '15 bookshelves are required to power a Level 30 Enchanting Table (90 planks, 135 sugar cane, 45 leather).'
  },
  {
    id: 'chest',
    name: 'Storage Chest',
    category: 'Storage',
    ingredients: [{ name: 'Wooden Planks', amountPerCraft: 8, baseStackSize: 64 }],
    outputPerCraft: 1,
    outputName: 'Chests',
    outputStackSize: 64,
    description: 'Standard 27-slot storage chest.'
  },
  {
    id: 'iron-block',
    name: 'Iron Block / Golem Core',
    category: 'Minerals & Compaction',
    ingredients: [{ name: 'Iron Ingots', amountPerCraft: 9, baseStackSize: 64 }],
    outputPerCraft: 1,
    outputName: 'Iron Blocks',
    outputStackSize: 64,
    description: 'Compact mineral storage block or iron golem construction component (4 blocks = 36 ingots).'
  }
];

export const ITEM_STACK_PRESETS = [
  { name: 'Building Blocks (Cobble, Stone, Dirt)', stackSize: 64, icon: 'Square' },
  { name: 'Minerals (Diamonds, Iron, Gold, Coal)', stackSize: 64, icon: 'Gem' },
  { name: 'Ender Pearls & Snowballs', stackSize: 16, icon: 'Circle' },
  { name: 'Signs, Banners & Buckets', stackSize: 16, icon: 'Tag' },
  { name: 'Tools, Armor & Weapons', stackSize: 1, icon: 'Shield' },
  { name: 'Potions, Stews & Beds', stackSize: 1, icon: 'FlaskConical' },
  { name: 'Shulker Boxes (Full or Empty)', stackSize: 1, icon: 'Package' }
];

export const MINECRAFT_TIME_MILESTONES = [
  { ticks: 0, timeString: '06:00', label: 'Sunrise / Dawn Begins', phase: 'day', color: '#FCD34D' },
  { ticks: 1000, timeString: '07:00', label: 'Full Daytime', phase: 'day', color: '#55D66F' },
  { ticks: 6000, timeString: '12:00', label: 'Solar Noon (Sun Overhead)', phase: 'day', color: '#9DF0AA' },
  { ticks: 12000, timeString: '18:00', label: 'Sunset / Dusk Begins', phase: 'dusk', color: '#F97316' },
  { ticks: 12542, timeString: '18:32', label: 'Bed Sleep Allowed Window', phase: 'dusk', color: '#A855F7' },
  { ticks: 13000, timeString: '19:00', label: 'Monsters Start Spawning', phase: 'night', color: '#EF4444' },
  { ticks: 18000, timeString: '00:00', label: 'Midnight (Moon Overhead)', phase: 'night', color: '#6366F1' },
  { ticks: 23000, timeString: '05:00', label: 'Dawn Approaching', phase: 'dawn', color: '#EAB308' },
  { ticks: 24000, timeString: '06:00', label: 'New Minecraft Day', phase: 'day', color: '#FCD34D' }
];
