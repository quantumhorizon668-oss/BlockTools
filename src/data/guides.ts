import { GuideData } from '../types';

export const GUIDES: GuideData[] = [
  {
    id: 'how-nether-portal-coordinates-work',
    slug: 'how-nether-portal-coordinates-work',
    title: 'How Nether Portal Coordinates Work in Minecraft',
    subtitle: 'Master the 8:1 dimensional scale, link portals without crosstalk, and build high-speed Nether transportation hubs.',
    readTime: '4 min read',
    category: 'Coordinates',
    publishDate: 'Updated for 1.21+',
    metaTitle: 'How Nether Portal Coordinates Work — Minecraft Linking Guide',
    metaDescription: 'Learn how Minecraft calculates Nether portal coordinates using the 8:1 scale. Build perfect Nether hubs and fix unwanted portal cross-linking.',
    summary: 'A complete breakdown of Minecraft coordinate translation between the Overworld and the Nether, including the math, linking mechanics, and best practices for building Nether hubs.',
    relatedToolSlug: 'nether-portal-calculator',
    keyTakeaways: [
      'The horizontal ratio between the Overworld and the Nether is 8:1 (X and Z divide or multiply by 8).',
      'The vertical Y coordinate is 1:1 and does not change between dimensions.',
      'Portals search within a 128-block radius in the target dimension to find existing obsidian frames.',
      'Building your return portal manually at exact calculated coordinates prevents portal hijacking.'
    ],
    sections: [
      {
        heading: 'The 8:1 Coordinate Principle',
        content: 'In Minecraft, the Nether is spatially compressed by a factor of 8 horizontally. Moving 100 blocks in the Nether is equivalent to traversing 800 blocks in the Overworld. This makes the Nether the primary highway network for long-distance travel on survival multiplayer servers.'
      },
      {
        heading: 'The Exact Mathematical Formula',
        content: 'When converting coordinates from the Overworld to the Nether, you divide both the X and Z coordinates by 8. When returning from the Nether to the Overworld, you multiply X and Z by 8. The Y coordinate (height / altitude) remains completely unchanged.',
        subsections: [
          {
            title: 'Overworld to Nether',
            text: 'Nether X = Math.floor(Overworld X ÷ 8)\nNether Z = Math.floor(Overworld Z ÷ 8)\nNether Y = Overworld Y'
          },
          {
            title: 'Nether to Overworld',
            text: 'Overworld X = Nether X × 8\nOverworld Z = Nether Z × 8\nOverworld Y = Nether Y'
          }
        ]
      },
      {
        heading: 'How Portals Search and Link',
        content: 'When you step into a portal, the game takes your player coordinates, translates them to the destination dimension, and searches for an active portal within a 128-block 3D radius. If multiple portals exist within this search bounding box, it binds to the physically closest active frame. If no portal is found, the game generates a new frame at the nearest open location (which may be shifted up to 16 blocks due to terrain or lava).'
      },
      {
        heading: 'Preventing Portal Crossing & Mismatches',
        content: 'Auto-generated portals frequently suffer from "portal hijacking" where two different Overworld portals connect to the same Nether portal because the Nether portal was generated off-center. To fix this, always calculate the exact target coordinates using the BlockTools Nether Portal Calculator, travel through, deconstruct any displaced frame, and place the obsidian blocks at the exact calculated coordinate.'
      }
    ],
    faqs: [
      {
        question: 'Can two Overworld portals link to one Nether portal?',
        answer: 'Yes! If two Overworld portals are built within 1,024 blocks of each other, their ideal Nether coordinates will be within 128 blocks. If you do not build paired Nether portals at exact coordinates, both Overworld gates will link to whichever Nether portal was generated first.'
      },
      {
        question: 'Does the Y level matter for portal linking?',
        answer: 'Yes. While Y does not scale by 8, the game uses 3D Euclidean distance (sqrt(dx² + dy² + dz²)) when searching for the nearest active portal. Placing portals at similar Y levels guarantees reliable pairing.'
      }
    ]
  },
  {
    id: 'how-minecraft-item-stacks-work',
    slug: 'how-minecraft-item-stacks-work',
    title: 'How Minecraft Item Stacks and Storage Capacity Work',
    subtitle: 'Understand stack limits, inventory slots, chest capacities, and high-efficiency shulker box storage.',
    readTime: '3 min read',
    category: 'Items',
    publishDate: 'Updated for 1.21+',
    metaTitle: 'Minecraft Item Stacks & Storage System Guide — BlockTools',
    metaDescription: 'A practical guide to Minecraft stack mechanics, 64 vs 16 vs 1 item limits, single and double chest capacity calculations, and shulker box logistics.',
    summary: 'Learn how inventory grouping works in Minecraft, why certain items stack to 16 or 1, and how to mathematically size your storage room chests for survival builds.',
    relatedToolSlug: 'stack-calculator',
    keyTakeaways: [
      'Items stack in three standard tiers: 64 (blocks/ores), 16 (tools/utility), and 1 (equipment/potions).',
      'A player inventory contains 36 slots (holding up to 2,304 items stacked to 64).',
      'A Double Chest has 54 slots (holding 3,456 items), while a Shulker Box has 27 slots (holding 1,728 items).',
      'Automated sorting systems rely on 64-stack and 16-stack item filters with hopper comparators.'
    ],
    sections: [
      {
        heading: 'Why Items Have Stack Limits',
        content: 'Stack limits are a fundamental game balance mechanic. Bulk materials (dirt, stone, minerals) stack to 64 so players can carry building supplies. Powerful utility items like Ender Pearls, Snowballs, and Signs stack to 16 to prevent spamming in combat. Tools, weapons, potions, and armor do not stack at all (stack of 1) because each instance carries independent durability, enchantments, and potion effects.'
      },
      {
        heading: 'Container Capacity Cheat Sheet',
        content: 'When designing storage systems, knowing slot limits helps you calculate how many chests or shulker boxes you need before embarking on massive quarrying or farming projects:',
        subsections: [
          {
            title: 'Container Slot Totals',
            text: '• Player Hotbar: 9 slots (576 items @ 64/stack)\n• Main Player Inventory: 27 slots (1,728 items)\n• Single Chest / Barrel / Shulker Box: 27 slots (1,728 items)\n• Double Chest: 54 slots (3,456 items)\n• Hopper: 5 slots (320 items)'
          }
        ]
      },
      {
        heading: 'Shulker Box Storage Compression',
        content: 'Shulker boxes retain their contents when broken. Because a single inventory slot can hold one Shulker Box (which holds 27 stacks), a player carrying 36 Shulker Boxes can transport 972 stacks — equal to 62,208 items in a single trip!'
      }
    ],
    faqs: [
      {
        question: 'Why do Ender Pearls only stack to 16?',
        answer: 'Ender pearls allow instant teleportation. Limiting the stack size to 16 prevents players from effortlessly escaping danger repeatedly without sacrificing inventory capacity.'
      },
      {
        question: 'Can you stack empty buckets or filled buckets?',
        answer: 'Empty buckets stack to 16. In standard Java Edition survival, buckets filled with water, lava, or milk do not stack (stack size of 1).'
      }
    ]
  },
  {
    id: 'how-many-resources-do-you-need-for-a-build',
    slug: 'how-many-resources-do-you-need-for-a-build',
    title: 'How to Estimate Materials for Large Minecraft Builds',
    subtitle: 'From geometric formulas to crafting yields and stonecutter shortcuts, learn how to calculate resources efficiently.',
    readTime: '5 min read',
    category: 'Resources',
    publishDate: 'Updated for 1.21+',
    metaTitle: 'Estimating Resources for Large Minecraft Builds — Crafting Guide',
    metaDescription: 'Calculate the exact blocks and raw materials needed for survival builds. Learn crafting batch yields, surplus planning, and stonecutter efficiency.',
    summary: 'A step-by-step methodology for calculating block volumes, crafting loss, and raw ingredient requirements for large Minecraft castles, roofs, and redstone machines.',
    relatedToolSlug: 'material-calculator',
    keyTakeaways: [
      'Always calculate crafting batch yields (e.g. 6 blocks = 4 stairs in Crafting Table vs 1 = 1 in Stonecutter).',
      'Account for the "Integer Craft Ceiling" where fractional crafts create leftover surplus blocks.',
      'Multiply wall perimeters by height, subtracting window openings, to get accurate shell counts.',
      'Add a 5-10% surplus buffer for scaffolding, decorative misplacements, and creeper explosions.'
    ],
    sections: [
      {
        heading: 'Deconstructing Complex Structures',
        content: 'When planning a large build in survival, never guess resource counts by eye. Break the build down into primitive shapes: rectangular prisms (walls and foundations), cylinders or domes (towers and roofs), and decorative trims (stairs, slabs, lanterns).'
      },
      {
        heading: 'The Stonecutter Advantage',
        content: 'Crafting stone stairs at a Crafting Table requires 6 blocks and yields only 4 stairs — resulting in a 33.3% loss of raw stone. Using a Stonecutter produces 1 stair per 1 stone block with zero waste. For a build requiring 1,000 stairs, the Stonecutter saves 500 stone blocks (almost 8 full stacks).'
      },
      {
        heading: 'Multi-Step Recipe Math',
        content: 'For composite items like Bookshelves (6 Planks + 3 Books = 6 Planks + 9 Paper + 3 Leather = 6 Planks + 9 Sugar Cane + 3 Leather), always trace backwards to the base gatherable materials. Use the BlockTools Material Calculator to see both the raw gather counts and the crafted components.'
      }
    ],
    faqs: [
      {
        question: 'How do I calculate blocks for a hollow wall?',
        answer: 'For a rectangular room of width W, length L, and height H: Total Blocks = 2 × (W + L - 2) × H. Subtract any door and window holes from this number.'
      },
      {
        question: 'What is the fastest way to gather concrete?',
        answer: 'Mix 4 Sand + 4 Gravel + 1 Dye to produce 8 Concrete Powder. Place the powder next to a water source block (or in an automated off-hand blast chamber) to convert it into solid concrete instantly.'
      }
    ]
  },
  {
    id: 'minecraft-ticks-explained',
    slug: 'minecraft-ticks-explained',
    title: 'Minecraft Game Ticks, Redstone Ticks, and In-Game Time Explained',
    subtitle: 'Decode TPS, 20-minute day/night cycles, repeater delays, hopper speeds, and clock synchronization.',
    readTime: '4 min read',
    category: 'Time',
    publishDate: 'Updated for 1.21+',
    metaTitle: 'Minecraft Ticks & Time Explained — Redstone & Day Cycle Guide',
    metaDescription: 'Understand how Minecraft game ticks (20 TPS), redstone ticks (10 TPS), and the 24,000 tick day/night cycle work with real-world time conversions.',
    summary: 'The ultimate guide to Minecraft temporal mechanics. Learn how the internal game loop updates, how redstone components delay signals, and how in-game time translates to real minutes.',
    relatedToolSlug: 'time-calculator',
    keyTakeaways: [
      'Minecraft runs at 20 Game Ticks per second (1 tick = 0.05 seconds = 50ms).',
      'Redstone components tick at half the rate: 1 Redstone Tick = 2 Game Ticks = 0.10s.',
      'A full day/night cycle takes exactly 24,000 game ticks (20 real-world minutes).',
      'Hopper clocks and pulse extenders rely on precise tick-based item transfer rates (8 ticks/item).'
    ],
    sections: [
      {
        heading: 'The 20 TPS Game Loop',
        content: 'Minecraft simulates its universe through an internal clock that ticks 20 times every second under normal server performance (20 TPS). During each tick, the game updates entity pathfinding, mob spawning, block state changes (such as crops growing or fire spreading), and player movement.'
      },
      {
        heading: 'Game Ticks vs. Redstone Ticks',
        content: 'Redstone logic operates at a slower interval to prevent infinite calculation loops and excessive CPU lag. 1 Redstone Tick corresponds to 2 Game Ticks (0.1 seconds). When you set a Redstone Repeater to 4 ticks of delay, it creates a 4-redstone-tick (8 game ticks, or 0.40 seconds) pause.'
      },
      {
        heading: 'The 24,000-Tick In-Game Day',
        content: 'Time in Minecraft is tracked by an integer from 0 to 24,000 ticks:',
        subsections: [
          {
            title: 'Minecraft Daily Schedule',
            text: '• Tick 0 (06:00): Sunrise begins\n• Tick 1,000 (07:00): Full daylight\n• Tick 6,000 (12:00): Solar noon (sun directly overhead)\n• Tick 12,000 (18:00): Sunset begins\n• Tick 12,542 (18:32): Players can sleep in beds\n• Tick 13,000 (19:00): Monsters begin spawning\n• Tick 18,000 (00:00): Midnight (moon directly overhead)\n• Tick 23,000 (05:00): Dawn approaches'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'What causes server tick lag (Low TPS)?',
        answer: 'When a server has too many loaded entities (villagers, mobs, loose items on ground), complex redstone clocks, or massive automated farms, the CPU cannot compute a tick within 50ms, causing the server TPS to drop below 20 and the world to feel like slow-motion.'
      },
      {
        question: 'How do you calculate AFK farm rates per hour?',
        answer: 'One real-world hour contains 72,000 game ticks, which equals exactly 3 full Minecraft days (3 × 24,000 ticks). If a farm produces 100 items per in-game day, it produces 300 items per real hour.'
      }
    ]
  }
];
