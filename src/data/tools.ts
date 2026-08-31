import { ToolData } from '../types';

export const TOOLS: ToolData[] = [
  {
    id: 'nether-portal-calculator',
    slug: 'nether-portal-calculator',
    name: 'Minecraft Nether Portal Calculator',
    shortName: 'Nether Portal Calculator',
    tagline: 'Convert Overworld and Nether coordinates and plan accurate portal networks.',
    description: 'Convert Overworld and Nether coordinates and plan portal locations with exact 8:1 translation.',
    category: 'Coordinates',
    iconName: 'Compass',
    isPopular: true,
    status: 'available',
    keywords: [
      'nether', 'portal', 'coordinates', 'overworld', '8:1', 'converter',
      'linking', 'fast travel', 'nether hub', 'fortress', 'bastion', 'distance'
    ],
    metaTitle: 'Minecraft Nether Portal Calculator — Overworld & Nether Coordinate Converter',
    metaDescription: 'Convert Minecraft Overworld coordinates to Nether coordinates and vice versa with precision. Calculate 3D distances, understand 8:1 ratio, and prevent portal linking issues.',
    intro: 'Convert Minecraft Overworld coordinates to Nether coordinates and Nether coordinates back to the Overworld. Use the result to plan portal locations and understand the 8:1 coordinate relationship.',
    howItWorks: [
      {
        step: '1. Select Conversion Direction',
        details: 'Choose whether you are travelling from Overworld to Nether or calculating the return coordinates from the Nether to the Overworld.'
      },
      {
        step: '2. Enter X & Z Coordinates',
        details: 'Input your in-game X and Z coordinates. The Y coordinate (height) is optional and remains 1:1 between dimensions.'
      },
      {
        step: '3. Instant 8:1 Calculation',
        details: 'For Overworld to Nether, X and Z are divided by 8 (floored). For Nether to Overworld, X and Z are multiplied by 8.'
      },
      {
        step: '4. Build & Link Exactly',
        details: 'Build your corresponding portal at the calculated coordinates to ensure deterministic 1-to-1 two-way portal links.'
      }
    ],
    importantNotes: [
      'The Minecraft Nether operates on an 8:1 horizontal scale. Travelling 1 block in the Nether equals 8 blocks in the Overworld.',
      'Y coordinates (altitude/height) do not divide or multiply by 8. They remain identical in both dimensions.',
      'Negative coordinates floor downwards (e.g., -5 Overworld becomes -1 Nether, not 0).',
      'Portals search within a 128-block radius (in the destination dimension) for existing active frames before generating a new portal.',
      'Obstacles like lava lakes or solid bedrock can cause the game to displace generated portals by up to 16 blocks, causing unexpected cross-linking.'
    ],
    examples: [
      {
        title: 'Overworld Spawn Base to Nether Hub',
        input: 'Overworld: X: 1600, Y: 68, Z: -800',
        result: 'Nether: X: 200, Y: 68, Z: -100',
        explanation: '1600 ÷ 8 = 200, and -800 ÷ 8 = -100. Y coordinate 68 is preserved.'
      },
      {
        title: 'Nether Fortress Return Portal',
        input: 'Nether: X: -35, Y: 54, Z: 120',
        result: 'Overworld: X: -280, Y: 54, Z: 960',
        explanation: '-35 × 8 = -280, and 120 × 8 = 960. You will arrive 999+ blocks from origin in Overworld.'
      },
      {
        title: 'Negative Coordinate Handling',
        input: 'Overworld: X: -15, Y: 70, Z: -3',
        result: 'Nether: X: -1, Y: 70, Z: 0',
        explanation: 'Math.floor(-15 / 8) yields -2 or -1 depending on in-game block grid boundary.'
      }
    ],
    faqs: [
      {
        question: 'How does Nether coordinate conversion work?',
        answer: 'Every 1 block traveled horizontally along the X and Z axes in the Nether corresponds to 8 blocks traveled in the Overworld. To convert Overworld coordinates to Nether coordinates, divide X and Z by 8. To convert Nether coordinates to Overworld coordinates, multiply X and Z by 8.'
      },
      {
        question: 'Why is the Nether 8:1?',
        answer: 'The 8:1 ratio was designed as a high-speed travel mechanism. By building a transportation highway in the Nether roof or tunnels, players can traverse massive Overworld distances 8 times faster than walking or riding on the surface.'
      },
      {
        question: 'How do negative coordinates work?',
        answer: 'Negative coordinates follow standard Cartesian mathematics with floor rounding. For example, an Overworld X coordinate of -800 divided by 8 is -100. An Overworld X of -7 divided by 8 floors to -1 in Minecraft block coordinates.'
      },
      {
        question: 'How do Nether portals link?',
        answer: 'When a player steps into a portal, the game converts the player coordinates to the target dimension, searches a 128-block radius around the converted coordinates for an existing active portal frame, and links to the closest one. If none exists, it generates a new portal frame at the nearest safe spot.'
      },
      {
        question: 'How accurate is the calculator?',
        answer: 'The coordinate mathematics provided by BlockTools is 100% exact. However, in-game terrain obstacles (such as vast Nether lava oceans or solid basalt deltas) can cause Minecraft to shift auto-generated portal frames away from the ideal location. Manually building your portal frame at the exact calculated coordinates ensures a permanent, un-hijacked two-way link.'
      }
    ],
    relatedToolSlugs: ['stack-calculator', 'material-calculator', 'time-calculator'],
    relatedGuideSlugs: ['how-nether-portal-coordinates-work', 'minecraft-ticks-explained']
  },
  {
    id: 'stack-calculator',
    slug: 'stack-calculator',
    name: 'Minecraft Stack Calculator',
    shortName: 'Stack Calculator',
    tagline: 'Calculate full stacks, remaining items, and chest storage requirements.',
    description: 'Calculate full stacks, remaining items and storage requirements for chests, shulker boxes, and inventories.',
    category: 'Items',
    iconName: 'Boxes',
    isPopular: true,
    status: 'available',
    keywords: [
      'stack', 'calculator', 'storage', 'chests', 'shulker', 'slots',
      'inventory', '64 stack', '16 stack', 'unstackable', 'items', 'hopper'
    ],
    metaTitle: 'Minecraft Stack Calculator — Item Stacks & Storage Planner',
    metaDescription: 'Calculate full 64, 16, and unstackable item stacks, remaining loose items, and chest/shulker storage requirements for Minecraft builds.',
    intro: 'Calculate full stacks, leftover loose items, and storage requirements for standard items, ender pearls, armor, tools, chests, and shulker boxes.',
    howItWorks: [
      {
        step: '1. Enter Item Count or Stacks',
        details: 'Type the total quantity of items you have collected or need to store, or switch to reverse mode to calculate total items from stack counts.'
      },
      {
        step: '2. Select Stack Size Limit',
        details: 'Choose standard 64 (blocks, ores, ingots), 16 (ender pearls, snowballs, buckets, signs), or 1 (tools, armor, potions, beds).'
      },
      {
        step: '3. Review Stack Breakdown',
        details: 'See exact whole stacks, loose remainder items, and total slot requirements instantly.'
      },
      {
        step: '4. Plan Storage Footprint',
        details: 'Inspect how many Single Chests (27 slots), Double Chests (54 slots), or Shulker Boxes (27 slots) you need to organize your storage system.'
      }
    ],
    importantNotes: [
      'Standard building blocks and mined resources stack to 64.',
      'Special projectile and utility items (Ender pearls, snowballs, eggs, signs, buckets with water/lava in newer snapshots) stack to 16.',
      'Weapons, tools, enchanted books, potions, beds, and filled shulker boxes are non-stackable (stack size of 1).',
      'A single chest contains 27 slots (up to 1,728 items at 64/stack). A double chest contains 54 slots (up to 3,456 items at 64/stack).',
      'A Shulker Box holds 27 inventory slots and can be mined with Silk Touch to transport an entire chest inventory inside a single item slot.'
    ],
    examples: [
      {
        title: 'Mining Trip Cobblestone Cache',
        input: '173 items with 64 stack size',
        result: '2 full stacks + 45 loose items (3 inventory slots)',
        explanation: '173 ÷ 64 = 2 whole stacks with a remainder of 45 items.'
      },
      {
        title: 'Ender Pearl Farming Stash',
        input: '120 ender pearls with 16 stack size',
        result: '7 full stacks + 8 loose items (8 inventory slots)',
        explanation: '120 ÷ 16 = 7 stacks (112 pearls) + 8 loose pearls.'
      },
      {
        title: 'Mega Build Storage Allocation',
        input: '10,000 Stone Bricks',
        result: '156 stacks + 16 items = 2.89 Double Chests (3 chests needed)',
        explanation: '10,000 ÷ 64 = 156.25 stacks. 157 slots require 3 Double Chests (162 slots total).'
      }
    ],
    faqs: [
      {
        question: 'What is a Minecraft stack?',
        answer: 'A stack is a single inventory slot grouping of items. Most items stack up to 64 units per slot, allowing players to carry large volumes of resources in a 36-slot player inventory.'
      },
      {
        question: 'Which items stack to 64?',
        answer: 'Almost all primary building blocks (Stone, Dirt, Wood, Sand, Deepslate), minerals (Iron Ingots, Diamonds, Redstone Dust, Gold), crops (Wheat, Carrots, Potatoes), and general crafting components stack to 64.'
      },
      {
        question: 'Which items stack to 16?',
        answer: 'Items designed for utility balance stack to 16: Ender Pearls, Snowballs, Eggs, Honey Bottles, Signs, Banners, Boats, and Empty Buckets.'
      },
      {
        question: 'What are non-stackable items?',
        answer: 'Non-stackable items (stack limit of 1) include Swords, Pickaxes, Axes, Bows, Armor pieces, Potions, Saddles, Music Discs, Totems of Undying, and Shulker Boxes.'
      },
      {
        question: 'How do I calculate double chests for mega projects?',
        answer: 'Divide total items by 64 to find total slots. Then divide total slots by 54 (slots in a Double Chest). For example, 10,800 blocks = 168.75 stacks ≈ 169 slots = 3.12 double chests (you will need 4 double chests).'
      }
    ],
    relatedToolSlugs: ['material-calculator', 'nether-portal-calculator', 'time-calculator'],
    relatedGuideSlugs: ['how-minecraft-item-stacks-work', 'how-many-resources-do-you-need-for-a-build']
  },
  {
    id: 'material-calculator',
    slug: 'material-calculator',
    name: 'Minecraft Material Calculator',
    shortName: 'Material Calculator',
    tagline: 'Estimate raw resources, crafting steps, and build requirements.',
    description: 'Estimate the raw resources required for your Minecraft builds, crafts, and mega projects with surplus analysis.',
    category: 'Resources',
    iconName: 'Boxes',
    isPopular: true,
    status: 'available',
    keywords: [
      'material', 'crafting', 'recipe', 'resources', 'raw materials',
      'stairs', 'slabs', 'iron blocks', 'tnt', 'concrete', 'hoppers', 'build planning'
    ],
    metaTitle: 'Minecraft Material Calculator — Raw Resource & Crafting Estimator',
    metaDescription: 'Calculate raw materials, crafts required, and surplus items for large Minecraft builds. Easily calculate stairs, slabs, concrete, hoppers, and custom recipes.',
    intro: 'Estimate the raw resources required for your Minecraft builds. Calculate crafting recipes, outputs per batch, required crafts, and leftover excess resources.',
    howItWorks: [
      {
        step: '1. Choose a Preset or Custom Craft',
        details: 'Pick from popular crafting recipes (Stairs, Slabs, Concrete, TNT, Hoppers, Bookshelves) or enter your own custom craft parameters.'
      },
      {
        step: '2. Specify Desired Output',
        details: 'Enter the exact number of finished blocks or items you need for your construction or redstone project.'
      },
      {
        step: '3. Input Recipe Proportions',
        details: 'Configure the input ingredients per craft and the output yield generated per crafting bench action.'
      },
      {
        step: '4. Analyze Surplus and Raw Stacks',
        details: 'View total crafting cycles, exact raw materials required, expected output, and leftover surplus blocks.'
      }
    ],
    importantNotes: [
      'Minecraft crafting recipes yield batches (for example: 6 blocks make 4 stairs, or 3 blocks make 6 slabs).',
      'When building, fractional crafts must always round up to the next integer craft, which generates leftover surplus blocks.',
      'Stonecutter recipes offer a 1:1 conversion for stairs and slabs, saving significant raw stone compared to the 6:4 crafting table recipe.',
      'Concrete requires 4 Sand + 4 Gravel + 1 Dye to produce 8 Concrete Powder, which then must contact water.'
    ],
    examples: [
      {
        title: 'Roofing with 250 Wooden Stairs',
        input: 'Desired: 250 Stairs | Recipe: 6 Planks -> 4 Stairs',
        result: '63 crafts needed -> 378 Planks required -> Yields 252 Stairs (+2 surplus)',
        explanation: '250 ÷ 4 = 62.5 crafts -> round up to 63 crafts. 63 × 6 = 378 Planks (5 stacks + 58 planks).'
      },
      {
        title: 'Hopper Sorting Line (100 Hoppers)',
        input: 'Desired: 100 Hoppers | Recipe: 5 Iron + 1 Chest -> 1 Hopper',
        result: '500 Iron Ingots (7.8 stacks) + 100 Chests (800 Planks)',
        explanation: 'Direct 1:1 output. 100 × 5 = 500 Iron Ingots. 100 chests require 800 wooden planks (12.5 stacks).'
      },
      {
        title: 'Stone Slabs Flooring (600 Slabs)',
        input: 'Desired: 600 Slabs | Recipe: 3 Stone -> 6 Slabs',
        result: '100 crafts -> 300 Stone blocks required (4 stacks + 44 stone)',
        explanation: '600 ÷ 6 = exactly 100 crafts. 100 × 3 = 300 Stone blocks with 0 waste.'
      }
    ],
    faqs: [
      {
        question: 'How do material calculations work?',
        answer: 'Material calculations determine the number of crafting batches required by dividing the desired output by the batch yield, rounding up to the nearest whole integer, and multiplying by the required raw inputs per batch.'
      },
      {
        question: 'Why do stairs produce extra leftover blocks?',
        answer: 'The crafting table recipe takes 6 full blocks and yields only 4 stairs (a 33% material loss). Because crafts must be integers, wanting 10 stairs requires 3 crafts (18 blocks) which yields 12 stairs, leaving 2 surplus stairs.'
      },
      {
        question: 'Is the Stonecutter more efficient for stairs?',
        answer: 'Yes! The Stonecutter converts 1 stone block directly into 1 stair (1:1 ratio), whereas the Crafting Table requires 1.5 blocks per stair (6:4 ratio). Using the Stonecutter saves 33% of your mined stone.'
      },
      {
        question: 'How do I plan resources for mega builds?',
        answer: 'Break your build down by structural components (foundation, walls, roof, detailing), calculate the total block volume in creative or blueprint tools (like Litematica), and use BlockTools to convert the counts into shulker box storage targets.'
      }
    ],
    relatedToolSlugs: ['stack-calculator', 'nether-portal-calculator', 'time-calculator'],
    relatedGuideSlugs: ['how-many-resources-do-you-need-for-a-build', 'how-minecraft-item-stacks-work']
  },
  {
    id: 'time-calculator',
    slug: 'time-calculator',
    name: 'Minecraft Time Calculator',
    shortName: 'Time Calculator',
    tagline: 'Convert ticks, seconds, real minutes, and in-game Minecraft days.',
    description: 'Convert ticks, seconds, redstone timings, and Minecraft day/night cycles with interactive clock visualization.',
    category: 'Time',
    iconName: 'Clock',
    isPopular: true,
    status: 'available',
    keywords: [
      'time', 'ticks', 'calculator', 'redstone ticks', 'day cycle',
      'night', 'sunrise', 'sunset', 'hopper speed', 'repeater delay', 'game tick'
    ],
    metaTitle: 'Minecraft Time Calculator — Game Ticks, Seconds & Day Cycles',
    metaDescription: 'Convert game ticks to seconds, real-world minutes, and Minecraft days. Interactive Day/Night clock converter and redstone repeater timing calculator.',
    intro: 'Convert Minecraft ticks, seconds, real-world minutes, and in-game day/night cycles. Explore Redstone tick delays, hopper transfer rates, and sleep schedules.',
    howItWorks: [
      {
        step: '1. Enter Time in Any Unit',
        details: 'Type game ticks, real-world seconds, real minutes, or in-game Minecraft days. You can also pick a specific time of day (Sunrise, Noon, Sunset, Midnight).'
      },
      {
        step: '2. Instant Multi-Unit Translation',
        details: 'BlockTools converts the time across standard game ticks (20 TPS), redstone ticks (10 TPS), real seconds, and in-game days.'
      },
      {
        step: '3. Interactive Day/Night Wheel',
        details: 'Watch the dynamic Minecraft celestial clock display current sun/moon position, ambient light level, and bed sleeping window.'
      },
      {
        step: '4. Redstone & Automation Specs',
        details: 'Review component delays like Redstone repeaters (1-4 ticks), Hopper item transfer intervals (8 ticks), and smelting durations.'
      }
    ],
    importantNotes: [
      'Minecraft game loop runs at 20 Game Ticks per second (1 tick = 0.05 seconds = 50 milliseconds).',
      'Redstone components operate on Redstone Ticks, which equal 2 Game Ticks (0.10 seconds = 100 milliseconds).',
      'One full Minecraft Day/Night cycle lasts exactly 24,000 game ticks (20 real-world minutes).',
      'Daytime lasts 10 real minutes (12,000 ticks), Sunset lasts 50 seconds (1,000 ticks), Night lasts 7 minutes (8,400 ticks), and Sunrise lasts 50 seconds (1,000 ticks).',
      'Players can sleep in a bed when the time reaches 12,542 ticks (or during thunderstorms).'
    ],
    examples: [
      {
        title: 'AFK Fishing or Farm Duration',
        input: '10 Minecraft Days',
        result: '240,000 ticks = 12,000 seconds = 200 minutes (3 hours 20 minutes)',
        explanation: '10 days × 20 minutes/day = 200 real minutes.'
      },
      {
        title: 'Hopper Clock Timing',
        input: '50 items in a Hopper Clock',
        result: '400 ticks (20.0 seconds)',
        explanation: 'Each item transfers at 8 ticks (0.4s). 50 items × 8 ticks = 400 ticks.'
      },
      {
        title: 'Redstone Repeater 4-Tick Delay',
        input: '10 repeaters set to 4 ticks',
        result: '40 redstone ticks = 80 game ticks = 4.0 seconds delay',
        explanation: '10 × 4 redstone ticks = 40 redstone ticks × 0.1s = 4.0 seconds.'
      }
    ],
    faqs: [
      {
        question: 'What is a Minecraft game tick?',
        answer: 'A game tick is the fundamental unit of time in Minecraft. Under ideal performance, the game loop processes 20 ticks per second (20 TPS). Every tick, mob AI, plant growth, redstone logic, and physics calculate their state.'
      },
      {
        question: 'How long is one Minecraft day in real life?',
        answer: 'A full Minecraft day (24,000 ticks) lasts exactly 20 minutes in real time. 10 minutes of daytime (12,000 ticks), ~1.7 minutes of dusk/dawn (2,000 ticks), and ~8.3 minutes of nighttime (10,000 ticks).'
      },
      {
        question: 'What is the difference between Game Ticks and Redstone Ticks?',
        answer: '1 Redstone Tick equals 2 Game Ticks (0.1 seconds). Redstone dust and standard logic gates update every redstone tick to maintain deterministic circuit simulation.'
      },
      {
        question: 'At what time can you sleep in Minecraft?',
        answer: 'You can sleep in a bed starting at tick 12,542 (just after sunset when the sky darkens to light level 4) until tick 23,460 (sunrise), or anytime during a thunderstorm.'
      },
      {
        question: 'How fast do Hoppers move items?',
        answer: 'A Minecraft hopper pushes or pulls 1 item every 8 game ticks (0.40 seconds = 2.5 items per second). A full stack of 64 items takes 512 ticks (25.6 seconds) to transfer.'
      }
    ],
    relatedToolSlugs: ['nether-portal-calculator', 'stack-calculator', 'material-calculator'],
    relatedGuideSlugs: ['minecraft-ticks-explained', 'how-nether-portal-coordinates-work']
  }
];

export const PLANNED_TOOLS = [
  {
    id: 'xp-calculator',
    name: 'Minecraft XP & Level Calculator',
    category: 'Resources' as const,
    description: 'Calculate experience orbs and mob kills required to reach target enchantment levels.',
    iconName: 'Zap'
  },
  {
    id: 'circle-generator',
    name: 'Minecraft Circle & Oval Generator',
    category: 'Building' as const,
    description: 'Interactive pixel-perfect block circle and sphere blueprint generator for domes and towers.',
    iconName: 'Circle'
  },
  {
    id: 'beacon-calculator',
    name: 'Minecraft Beacon Pyramids Calculator',
    category: 'Building' as const,
    description: 'Calculate mineral blocks, pyramid layers, and power ranges for single and quad beacons.',
    iconName: 'Triangle'
  },
  {
    id: 'shulker-box-organizer',
    name: 'Shulker Box Color & Storage Planner',
    category: 'Items' as const,
    description: 'Organize high-capacity inventory and dye patterns for complex storage systems.',
    iconName: 'Package'
  },
  {
    id: 'villager-trading-calculator',
    name: 'Villager Discount & Trading Calculator',
    category: 'Resources' as const,
    description: 'Calculate emerald discounts, curing cycles, and restock timers for trading halls.',
    iconName: 'Users'
  }
];

export const CATEGORIES = [
  { name: 'Coordinates', description: 'Nether travel, portal linking, and spatial navigation tools', count: 1 },
  { name: 'Items', description: 'Stack conversions, inventory slots, and chest capacity planners', count: 1 },
  { name: 'Resources', description: 'Material breakdown, crafting yields, and building estimators', count: 1 },
  { name: 'Time', description: 'Tick conversions, day/night cycles, and redstone clock timers', count: 1 },
  { name: 'Building', description: 'Architectural planning, geometry generators, and structural templates', count: 0 }
];
