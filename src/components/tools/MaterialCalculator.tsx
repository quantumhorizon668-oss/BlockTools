import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Layers,
  Copy,
  Check,
  RotateCcw,
  Search,
  ChevronDown,
  Hammer,
  Info,
  BookOpen,
} from 'lucide-react';
import {
  MINECRAFT_ITEMS,
  MINECRAFT_RECIPES,
  type MinecraftItem,
  type MinecraftRecipe,
} from '../../data/minecraftData';

const MAX_SUGGESTIONS = 500;

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/minecraft:/g, '')
    .replace(/[_-]+/g, ' ')
    .trim();
}

function formatNumber(value: number) {
  return value.toLocaleString();
}

function getRecipeIngredients(recipe: MinecraftRecipe) {
  return recipe.ingredients;
}

function calculateRecipe(recipe: MinecraftRecipe, target: number) {
  const safeTarget = Math.max(1, Math.floor(target || 1));
  const craftsRequired = Math.ceil(safeTarget / recipe.outputCount);
  const expectedOutput = craftsRequired * recipe.outputCount;
  const surplus = expectedOutput - safeTarget;

  const materials = getRecipeIngredients(recipe).map((ingredient) => {
    const totalUnits = ingredient.count * craftsRequired;
    const stackSize = ingredient.stackSize || 64;
    return {
      ...ingredient,
      totalUnits,
      fullStacks: Math.floor(totalUnits / stackSize),
      remainder: totalUnits % stackSize,
    };
  });

  return {
    target: safeTarget,
    craftsRequired,
    expectedOutput,
    surplus,
    materials,
  };
}

export function MaterialCalculator() {
  const [search, setSearch] = useState('Warped Stairs');
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const [desiredOutput, setDesiredOutput] = useState('250');
  const [copied, setCopied] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleOutsideClick);
  
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const suggestions = useMemo(() => {
    const query = normalize(search);
    if (!query) return MINECRAFT_ITEMS.slice(0, MAX_SUGGESTIONS);

    const words = query.split(/\s+/).filter(Boolean);

    return MINECRAFT_ITEMS
      .map((item) => {
        const name = normalize(item.displayName);
        const id = normalize(item.name);
        let score = 0;

        if (name === query || id === query) score += 100;
        if (name.startsWith(query) || id.startsWith(query)) score += 50;
        if (name.includes(query) || id.includes(query)) score += 20;

        for (const word of words) {
          if (name.startsWith(word)) score += 8;
          else if (name.includes(word)) score += 3;
          else if (id.includes(word)) score += 2;
        }

        return { item, score };
      })
      .filter((entry) => entry.score > 0)
      .sort(
        (a, b) =>
          b.score - a.score ||
          a.item.displayName.localeCompare(b.item.displayName)
      )
      .slice(0, MAX_SUGGESTIONS)
      .map((entry) => entry.item);
  }, [search]);

  const selectedItem = useMemo<MinecraftItem | null>(() => {
    if (selectedItemId == null) return null;
    return MINECRAFT_ITEMS.find((item) => item.id === selectedItemId) ?? null;
  }, [selectedItemId]);

  const recipes = useMemo<MinecraftRecipe[]>(() => {
    if (!selectedItemId) return [];
    return MINECRAFT_RECIPES.filter(
      (recipe) => recipe.outputId === selectedItemId
    );
  }, [selectedItemId]);

  const selectedRecipe = recipes[selectedRecipeIndex] ?? recipes[0] ?? null;

  const calculation = useMemo(() => {
    if (!selectedRecipe) return null;

    const target = Math.max(1, parseInt(desiredOutput, 10) || 1);
    return calculateRecipe(selectedRecipe, target);
  }, [selectedRecipe, desiredOutput]);

  const chooseItem = (item: MinecraftItem) => {
    setSelectedItemId(item.id);
    setSearch(item.displayName);
    setSelectedRecipeIndex(0);
    setSearchOpen(false);
  };

  const handleReset = () => {
    const defaultItem = MINECRAFT_ITEMS.find(
      (item) => item.name === 'oak_stairs'
    ) ?? MINECRAFT_ITEMS[0];

    if (defaultItem) {
      setSelectedItemId(defaultItem.id);
      setSearch(defaultItem.displayName);
    }

    setSelectedRecipeIndex(0);
    setDesiredOutput('250');
    setCopied(false);
  };

  const copyShoppingList = async () => {
    if (!selectedItem || !selectedRecipe || !calculation) return;

    const lines = [
      `BlockTools Material Plan — ${calculation.target} ${selectedItem.displayName}`,
      `Recipe: ${calculation.craftsRequired} crafts`,
      `Yield per craft: ${selectedRecipe.outputCount}`,
      `Expected output: ${calculation.expectedOutput}`,
      `Surplus: ${calculation.surplus}`,
      '',
      'Materials:',
      ...calculation.materials.map(
        (material) =>
          `• ${material.displayName}: ${formatNumber(material.totalUnits)} total (${material.fullStacks} stacks${
            material.remainder ? ` + ${material.remainder} items` : ''
          })`
      ),
    ];

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be unavailable in some browsers/contexts.
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#26372A] bg-[#121C15] p-6 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 border-b border-[#26372A] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#A7B5A9]">
              Minecraft Recipe Calculator
            </label>
            <p className="mt-1 text-sm text-[#F1F7F1]">
              Search an item and let BlockTools detect the recipe, yield, and
              material quantities automatically.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-1.5 text-xs text-[#A7B5A9] transition-colors hover:text-[#EF4444]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>

        {/* Item search */}
        <div className="mb-6 space-y-2" ref={searchRef}>
          <label
            htmlFor="minecraft-item-search"
            className="flex items-center justify-between text-xs font-semibold text-[#A7B5A9]"
          >
            <span>What do you want to craft?</span>
            <span className="font-mono text-[10px] text-[#6F8072]">
              Java Edition data
            </span>
          </label>

          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6F8072]" />

            <input
              id="minecraft-item-search"
              type="text"
              value={search}
              onFocus={() => setSearchOpen(true)}
              onChange={(event) => {
                setSearch(event.target.value);
                setSelectedItemId(null);
                setSelectedRecipeIndex(0);
                setSearchOpen(true);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') setSearchOpen(false);
                if (event.key === 'Enter' && suggestions[0]) {
                  event.preventDefault();
                  chooseItem(suggestions[0]);
                }
              }}
              placeholder="Search Minecraft items..."
              autoComplete="off"
              className="w-full rounded-xl border border-[#26372A] bg-[#0D1510] py-4 pl-12 pr-12 text-lg font-semibold text-[#F1F7F1] placeholder-[#6F8072] focus:border-[#55D66F] focus:outline-none focus:ring-1 focus:ring-[#55D66F]"
            />

            <ChevronDown
              className={`pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6F8072] transition-transform ${
                searchOpen ? 'rotate-180' : ''
              }`}
            />

            {searchOpen && suggestions.length > 0 && (
              <div className="absolute z-30 mt-2 max-h-80 w-full overflow-y-auto rounded-xl border border-[#26372A] bg-[#0D1510] shadow-2xl custom-scrollbar">                {suggestions.map((item) => {
                  const itemRecipes = MINECRAFT_RECIPES.filter(
                    (recipe) => recipe.outputId === item.id
                  );

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => chooseItem(item)}
                      className="flex w-full items-center justify-between gap-4 border-b border-[#26372A] px-4 py-3 text-left last:border-b-0 hover:bg-[#121C15]"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#F1F7F1]">
                          {item.displayName}
                        </p>
                        <p className="truncate text-[11px] font-mono text-[#6F8072]">
                          {item.name}
                        </p>
                      </div>

                      <span className="shrink-0 text-[10px] text-[#A7B5A9]">
                        {itemRecipes.length
                          ? `${itemRecipes.length} recipe${
                              itemRecipes.length === 1 ? '' : 's'
                            }`
                          : 'No recipe'}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Selected item / recipe */}
        {selectedItem ? (
          <div className="mb-6 rounded-xl border border-[#26372A] bg-[#0D1510] p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#55D66F]/30 bg-[#55D66F]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#55D66F]">
                  <BookOpen className="h-3 w-3" />
                  Selected Item
                </span>
                <h3 className="mt-2 text-xl font-black text-[#F1F7F1]">
                  {selectedItem.displayName}
                </h3>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-[10px] uppercase tracking-wider text-[#6F8072]">
                  Stack Size
                </p>
                <p className="font-mono text-lg font-black text-[#9DF0AA]">
                  {selectedItem.stackSize}
                </p>
              </div>
            </div>

            {recipes.length > 1 && (
              <div className="mb-4">
                <label
                  htmlFor="recipe-selector"
                  className="mb-2 block text-xs font-semibold text-[#A7B5A9]"
                >
                  Choose Recipe
                </label>

                <select
                  id="recipe-selector"
                  value={selectedRecipeIndex}
                  onChange={(event) =>
                    setSelectedRecipeIndex(Number(event.target.value))
                  }
                  className="w-full rounded-lg border border-[#26372A] bg-[#121C15] px-3 py-2.5 text-sm text-[#F1F7F1] focus:border-[#55D66F] focus:outline-none"
                >
                  {recipes.map((recipe, index) => (
                    <option key={`${recipe.id}-${index}`} value={index}>
                      Recipe {index + 1} — {recipe.outputCount} output per craft
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedRecipe ? (
              <div className="rounded-lg border border-[#26372A] bg-[#121C15] p-4">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#55D66F]">
                      Recipe detected automatically
                    </p>
                    <p className="mt-1 text-xs text-[#A7B5A9]">
                      No ingredient quantities need to be entered manually.
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] uppercase text-[#6F8072]">
                      Yield / Craft
                    </p>
                    <p className="text-2xl font-black font-mono text-[#F1F7F1]">
                      {selectedRecipe.outputCount}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {selectedRecipe.ingredients.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="flex items-center justify-between rounded-lg border border-[#26372A] bg-[#0D1510] px-3 py-2.5"
                    >
                      <span className="text-sm font-semibold text-[#F1F7F1]">
                        {ingredient.displayName}
                      </span>
                      <span className="font-mono text-sm font-black text-[#55D66F]">
                        × {ingredient.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-[#26372A] bg-[#121C15] p-4 text-sm text-[#A7B5A9]">
                This item exists in the Minecraft item data, but no supported
                crafting recipe was found for it.
              </div>
            )}
          </div>
        ) : (
          <div className="mb-6 rounded-xl border border-dashed border-[#26372A] bg-[#0D1510]/60 p-5 text-center">
            <Search className="mx-auto mb-2 h-5 w-5 text-[#6F8072]" />
            <p className="text-sm font-semibold text-[#A7B5A9]">
              Search for a Minecraft item to begin.
            </p>
          </div>
        )}

        {/* Desired output */}
        <div className="mb-6 space-y-3">
          <label
            htmlFor="input-desired-output"
            className="flex items-center justify-between text-xs font-semibold text-[#A7B5A9]"
          >
            <span>How many do you need?</span>
            <span className="font-mono text-[10px] text-[#6F8072]">
              Final output target
            </span>
          </label>

          <input
            id="input-desired-output"
            type="number"
            min="1"
            value={desiredOutput}
            onChange={(event) => setDesiredOutput(event.target.value)}
            className="w-full rounded-xl border border-[#26372A] bg-[#0D1510] px-4 py-3.5 text-2xl font-mono font-black text-[#F1F7F1] placeholder-[#6F8072] focus:border-[#55D66F] focus:outline-none focus:ring-1 focus:ring-[#55D66F]"
          />

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-[11px] text-[#6F8072]">Quick pick:</span>
            {[64, 100, 250, 500, 1000, 2500].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setDesiredOutput(String(amount))}
                className="rounded-md border border-[#26372A] bg-[#0D1510] px-2 py-0.5 text-xs font-mono text-[#A7B5A9] transition-colors hover:border-[#55D66F]/50 hover:text-[#F1F7F1]"
              >
                {formatNumber(amount)}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        {selectedRecipe && calculation && (
          <div className="rounded-2xl border border-[#55D66F]/40 bg-[#0D1510] p-6 sm:p-8 shadow-[0_0_30px_rgba(85,214,111,0.08)]">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="mb-2 inline-flex items-center gap-1 rounded-full border border-[#55D66F]/30 bg-[#55D66F]/10 px-2.5 py-0.5 text-xs font-semibold text-[#55D66F]">
                  <Hammer className="h-3 w-3" />
                  Automatic Calculation
                </span>

                <h3 className="text-2xl font-black text-[#F1F7F1]">
                  {formatNumber(calculation.craftsRequired)} Crafts Required
                </h3>
              </div>

              <button
                type="button"
                onClick={copyShoppingList}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#55D66F] px-4 py-2 text-xs font-bold text-[#080D0A] transition-all hover:bg-[#9DF0AA] active:scale-95 shadow"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Shopping List Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy Shopping List
                  </>
                )}
              </button>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#55D66F]">
                  Crafts Needed
                </p>
                <p className="my-1 text-3xl font-mono font-black text-[#F1F7F1]">
                  {formatNumber(calculation.craftsRequired)}
                </p>
                <p className="text-[11px] text-[#A7B5A9]">
                  crafting operations
                </p>
              </div>

              <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9DF0AA]">
                  Expected Output
                </p>
                <p className="my-1 text-3xl font-mono font-black text-[#F1F7F1]">
                  {formatNumber(calculation.expectedOutput)}
                </p>
                <p className="text-[11px] text-[#A7B5A9]">
                  {selectedItem.displayName}
                </p>
              </div>

              <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#3B82F6]">
                  Surplus
                </p>
                <p className="my-1 text-3xl font-mono font-black text-[#F1F7F1]">
                  +{formatNumber(calculation.surplus)}
                </p>
                <p className="text-[11px] text-[#A7B5A9]">
                  beyond requested amount
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#26372A] bg-[#121C15]/80 p-5">
              <h4 className="mb-4 flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#F1F7F1]">
                <Layers className="h-4 w-4 text-[#55D66F]" />
                Materials Required
              </h4>

              <div className="space-y-2.5">
                {calculation.materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex flex-col gap-2 rounded-lg border border-[#26372A] bg-[#0D1510] p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-bold text-[#F1F7F1]">
                        {material.displayName}
                      </p>
                      <p className="text-xs text-[#A7B5A9]">
                        {material.count} per craft ×{' '}
                        {formatNumber(calculation.craftsRequired)} crafts
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-base font-mono font-black text-[#55D66F]">
                        {formatNumber(material.totalUnits)} total
                      </p>
                      <p className="text-xs font-mono text-[#A7B5A9]">
                        {material.fullStacks} stacks
                        {material.remainder > 0
                          ? ` + ${material.remainder} items`
                          : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-[#55D66F]/30 bg-[#55D66F]/5 p-3 text-xs text-[#9DF0AA]">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Recipe, yield, ingredient quantities, and stack sizes come from
                the bundled Minecraft Java Edition dataset. The calculator
                rounds crafts up because Minecraft crafting produces complete
                recipe outputs.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
