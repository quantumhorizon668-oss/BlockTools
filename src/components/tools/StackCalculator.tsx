import React, { useState, useMemo } from 'react';
import { Boxes, Copy, Check, RotateCcw, Archive, Sparkles } from 'lucide-react';
import { ITEM_STACK_PRESETS } from '../../data/presets';

export function StackCalculator() {
  const [mode, setMode] = useState<'items-to-stacks' | 'stacks-to-items'>('items-to-stacks');
  const [itemCountInput, setItemCountInput] = useState<string>('173');
  const [stacksInput, setStacksInput] = useState<string>('2');
  const [looseInput, setLooseInput] = useState<string>('45');
  const [stackSize, setStackSize] = useState<number>(64);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Calculation logic
  const calculation = useMemo(() => {
    let totalItems = 0;

    if (mode === 'items-to-stacks') {
      const parsed = parseInt(itemCountInput, 10);
      totalItems = isNaN(parsed) || parsed < 0 ? 0 : parsed;
    } else {
      const s = parseInt(stacksInput, 10) || 0;
      const l = parseInt(looseInput, 10) || 0;

      totalItems = Math.max(0, s * stackSize + l);
    }

    const fullStacks = Math.floor(totalItems / stackSize);
    const remainder = totalItems % stackSize;

    // Number of inventory slots occupied.
    // Every full stack occupies one slot.
    // A remainder occupies one additional slot.
    const totalSlots = fullStacks + (remainder > 0 ? 1 : 0);

    // Storage requirements
    // Single Chest: 27 slots
    // Double Chest: 54 slots
    // Shulker Box: 27 slots
    // Player Inventory: 36 slots (27 main + 9 hotbar)

    const singleChestsExact = totalSlots / 27;
    const singleChestsCeil =
      Math.ceil(totalSlots / 27) || (totalItems > 0 ? 1 : 0);

    const doubleChestsExact = totalSlots / 54;
    const doubleChestsCeil =
      Math.ceil(totalSlots / 54) || (totalItems > 0 ? 1 : 0);

    const shulkerBoxesExact = totalSlots / 27;
    const shulkerBoxesCeil =
      Math.ceil(totalSlots / 27) || (totalItems > 0 ? 1 : 0);

    const playerInventoriesExact = totalSlots / 36;
    const playerInventoriesCeil =
      Math.ceil(totalSlots / 36) || (totalItems > 0 ? 1 : 0);

    return {
      totalItems,
      fullStacks,
      remainder,
      totalSlots,

      singleChestsExact,
      singleChestsCeil,

      doubleChestsExact,
      doubleChestsCeil,

      shulkerBoxesExact,
      shulkerBoxesCeil,

      playerInventoriesExact,
      playerInventoriesCeil,
    };
  }, [mode, itemCountInput, stacksInput, looseInput, stackSize]);

  const copyToClipboard = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleReset = () => {
    setItemCountInput('64');
    setStacksInput('1');
    setLooseInput('0');
    setStackSize(64);
  };

  const quickQuantities = [64, 128, 256, 500, 1000, 1728, 3456, 10000];

  return (
    <div className="space-y-6">
      {/* Main Calculator Card */}
      <div className="rounded-2xl border border-[#26372A] bg-[#121C15] p-6 sm:p-8 shadow-xl">

        {/* Mode Selector */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#26372A] pb-6">
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#A7B5A9]">
              Calculation Mode
            </label>

            <p className="text-sm text-[#F1F7F1] mt-0.5">
              {mode === 'items-to-stacks' ? (
                <span>
                  Convert{' '}
                  <strong className="text-[#55D66F]">
                    Total Items
                  </strong>{' '}
                  into{' '}
                  <strong className="text-[#9DF0AA]">
                    Stacks & Remainders
                  </strong>
                </span>
              ) : (
                <span>
                  Convert{' '}
                  <strong className="text-[#9DF0AA]">
                    Stacks + Items
                  </strong>{' '}
                  into{' '}
                  <strong className="text-[#55D66F]">
                    Total Item Count
                  </strong>
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center rounded-xl bg-[#0D1510] p-1 border border-[#26372A] w-full sm:w-auto">

            <button
              type="button"
              id="mode-items-to-stacks"
              onClick={() => setMode('items-to-stacks')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'items-to-stacks'
                  ? 'bg-[#55D66F] text-[#080D0A] shadow'
                  : 'text-[#A7B5A9] hover:text-[#F1F7F1]'
              }`}
            >
              Items → Stacks
            </button>

            <button
              type="button"
              id="mode-stacks-to-items"
              onClick={() => setMode('stacks-to-items')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'stacks-to-items'
                  ? 'bg-[#55D66F] text-[#080D0A] shadow'
                  : 'text-[#A7B5A9] hover:text-[#F1F7F1]'
              }`}
            >
              Stacks → Items
            </button>

          </div>
        </div>

        {/* Stack Size Limit Selector */}
        <div className="mb-6 space-y-2">
          <label className="text-xs font-semibold text-[#A7B5A9] flex items-center justify-between">
            <span>Item Stack Limit</span>
            <span className="font-mono text-[10px] text-[#6F8072]">
              Default: 64 per slot
            </span>
          </label>

          <div className="grid grid-cols-3 gap-3">
            {[
              {
                size: 64,
                label: '64 Items / Stack',
                desc: 'Blocks, Ores, Ingots, Food',
              },
              {
                size: 16,
                label: '16 Items / Stack',
                desc: 'Pearls, Snowballs, Signs, Buckets',
              },
              {
                size: 1,
                label: '1 / Non-Stackable',
                desc: 'Armor, Tools, Potions, Beds',
              },
            ].map(tier => (
              <button
                key={tier.size}
                type="button"
                id={`stack-size-${tier.size}`}
                onClick={() => setStackSize(tier.size)}
                className={`flex flex-col items-start rounded-xl p-3.5 text-left border transition-all ${
                  stackSize === tier.size
                    ? 'border-[#55D66F] bg-[#0D1510] shadow-[0_0_15px_rgba(85,214,111,0.15)] ring-1 ring-[#55D66F]'
                    : 'border-[#26372A] bg-[#0D1510]/60 hover:border-[#37523C] hover:text-[#F1F7F1]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-base font-black font-mono ${
                      stackSize === tier.size
                        ? 'text-[#55D66F]'
                        : 'text-[#F1F7F1]'
                    }`}
                  >
                    {tier.size}
                  </span>

                  <span className="text-[10px] font-semibold text-[#A7B5A9]">
                    Max Slot
                  </span>
                </div>

                <span className="text-xs font-bold text-[#F1F7F1] mt-0.5">
                  {tier.label}
                </span>

                <span className="text-[11px] text-[#6F8072] mt-0.5 line-clamp-1">
                  {tier.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        {mode === 'items-to-stacks' ? (
          <div className="space-y-3 mb-6">

            <label
              htmlFor="input-item-count"
              className="text-xs font-semibold text-[#A7B5A9] flex items-center justify-between"
            >
              <span>Total Item Quantity</span>

              <span className="font-mono text-[10px] text-[#6F8072]">
                Enter any amount
              </span>
            </label>

            <div className="relative">
              <input
                id="input-item-count"
                type="number"
                min="0"
                value={itemCountInput}
                onChange={e => setItemCountInput(e.target.value)}
                placeholder="e.g. 173"
                className="w-full rounded-xl border border-[#26372A] bg-[#0D1510] px-4 py-3.5 text-2xl font-mono font-black text-[#F1F7F1] placeholder-[#6F8072] focus:border-[#55D66F] focus:outline-none focus:ring-1 focus:ring-[#55D66F]"
              />
            </div>

            {/* Quick preset quantities */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-[#6F8072] mr-1">
                Quick pick:
              </span>

              {quickQuantities.map(q => (
                <button
                  key={q}
                  type="button"
                  id={`quick-qty-${q}`}
                  onClick={() => setItemCountInput(q.toString())}
                  className="rounded-md border border-[#26372A] bg-[#0D1510] px-2 py-0.5 text-xs font-mono text-[#A7B5A9] hover:border-[#55D66F]/50 hover:text-[#F1F7F1] transition-colors"
                >
                  {q.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">

            <div className="space-y-1.5">
              <label
                htmlFor="input-stacks-count"
                className="text-xs font-semibold text-[#A7B5A9]"
              >
                Number of Full Stacks
              </label>

              <input
                id="input-stacks-count"
                type="number"
                min="0"
                value={stacksInput}
                onChange={e => setStacksInput(e.target.value)}
                placeholder="e.g. 2"
                className="w-full rounded-xl border border-[#26372A] bg-[#0D1510] px-4 py-3.5 text-2xl font-mono font-black text-[#F1F7F1] placeholder-[#6F8072] focus:border-[#55D66F] focus:outline-none focus:ring-1 focus:ring-[#55D66F]"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="input-loose-count"
                className="text-xs font-semibold text-[#A7B5A9]"
              >
                Remaining Loose Items
              </label>

              <input
                id="input-loose-count"
                type="number"
                min="0"
                max={stackSize - 1}
                value={looseInput}
                onChange={e => setLooseInput(e.target.value)}
                placeholder="e.g. 45"
                className="w-full rounded-xl border border-[#26372A] bg-[#0D1510] px-4 py-3.5 text-2xl font-mono font-black text-[#F1F7F1] placeholder-[#6F8072] focus:border-[#55D66F] focus:outline-none focus:ring-1 focus:ring-[#55D66F]"
              />
            </div>

          </div>
        )}

        {/* Quick Item Category Presets */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#26372A] pb-6 mb-6">

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#A7B5A9] flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[#55D66F]" />
              Quick Types:
            </span>

            {ITEM_STACK_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                id={`item-preset-${idx}`}
                onClick={() => setStackSize(preset.stackSize)}
                className={`rounded-lg border px-2.5 py-1 text-xs transition-colors ${
                  stackSize === preset.stackSize
                    ? 'border-[#55D66F]/50 bg-[#55D66F]/10 text-[#55D66F]'
                    : 'border-[#26372A] bg-[#0D1510] text-[#A7B5A9] hover:text-[#F1F7F1]'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            id="reset-stack-calc"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-[#A7B5A9] hover:text-[#EF4444] transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>

        </div>

        {/* Result Breakdown Card */}
        <div className="rounded-2xl border border-[#55D66F]/40 bg-[#0D1510] p-6 sm:p-8 shadow-[0_0_30px_rgba(85,214,111,0.08)]">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#55D66F]/10 px-2.5 py-0.5 text-xs font-semibold text-[#55D66F] border border-[#55D66F]/30 mb-2">
                <Boxes className="h-3 w-3" />
                Stack Calculation Output
              </span>

              <h3 className="text-2xl font-black text-[#F1F7F1]">
                {calculation.fullStacks} Full Stacks{' '}
                {calculation.remainder > 0 &&
                  `+ ${calculation.remainder} Items`}
              </h3>
            </div>

            <button
              type="button"
              id="copy-stack-breakdown"
              onClick={() =>
                copyToClipboard(
                  `${calculation.totalItems.toLocaleString()} items = ${calculation.fullStacks} stacks (${stackSize}/stack) + ${calculation.remainder} loose items (${calculation.totalSlots} slots / ${calculation.doubleChestsCeil} Double Chests)`,
                  'breakdown'
                )
              }
              className="flex items-center gap-1.5 rounded-xl bg-[#55D66F] px-4 py-2 text-xs font-bold text-[#080D0A] transition-all hover:bg-[#9DF0AA] active:scale-95 shadow"
            >
              {copiedKey === 'breakdown' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#080D0A]" />
                  <span>Breakdown Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Breakdown</span>
                </>
              )}
            </button>

          </div>

          {/* Stat Metrics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">

            <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#55D66F]">
                Full Stacks
              </p>

              <p className="text-3xl sm:text-4xl font-mono font-black text-[#F1F7F1] my-1">
                {calculation.fullStacks.toLocaleString()}
              </p>

              <p className="text-[11px] text-[#A7B5A9]">
                {calculation.fullStacks * stackSize} items in complete slots
              </p>
            </div>

            <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9DF0AA]">
                Remaining Items
              </p>

              <p className="text-3xl sm:text-4xl font-mono font-black text-[#F1F7F1] my-1">
                {calculation.remainder}
              </p>

              <p className="text-[11px] text-[#A7B5A9]">
                Loose items in partial slot
              </p>
            </div>

            <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#3B82F6]">
                Total Slots Occupied
              </p>

              <p className="text-3xl sm:text-4xl font-mono font-black text-[#F1F7F1] my-1">
                {calculation.totalSlots.toLocaleString()}
              </p>

              <p className="text-[11px] text-[#A7B5A9]">
                {calculation.totalItems.toLocaleString()} total items
              </p>
            </div>

          </div>

          {/* Storage Container Breakdown */}
          <div className="rounded-xl border border-[#26372A] bg-[#121C15]/80 p-5 space-y-4">

            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F1F7F1] flex items-center gap-1.5">
              <Archive className="h-4 w-4 text-[#55D66F]" />
              Storage Footprint Planner
            </h4>

            <p className="text-xs text-[#6F8072]">
              How much storage space your calculated items occupy.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

              {/* Double Chests */}
              <div className="rounded-lg border border-[#26372A] bg-[#0D1510] p-3 text-center">
                <p className="text-xs text-[#A7B5A9] font-medium">
                  Double Chests
                </p>

                <p className="text-xl font-bold font-mono text-[#F1F7F1] my-1">
                  {calculation.doubleChestsCeil}
                </p>

                <p className="text-[10px] text-[#6F8072]">
                  {calculation.totalSlots} / 54 slots used
                </p>
              </div>

              {/* Single Chests */}
              <div className="rounded-lg border border-[#26372A] bg-[#0D1510] p-3 text-center">
                <p className="text-xs text-[#A7B5A9] font-medium">
                  Single Chests
                </p>

                <p className="text-xl font-bold font-mono text-[#F1F7F1] my-1">
                  {calculation.singleChestsCeil}
                </p>

                <p className="text-[10px] text-[#6F8072]">
                  {calculation.totalSlots} / 27 slots used
                </p>
              </div>

              {/* Shulker Boxes */}
              <div className="rounded-lg border border-[#26372A] bg-[#0D1510] p-3 text-center">
                <p className="text-xs text-[#A7B5A9] font-medium">
                  Shulker Boxes
                </p>

                <p className="text-xl font-bold font-mono text-[#55D66F] my-1">
                  {calculation.shulkerBoxesCeil}
                </p>

                <p className="text-[10px] text-[#6F8072]">
                  {calculation.totalSlots} / 27 slots used
                </p>
              </div>

              {/* Player Inventories */}
              <div className="rounded-lg border border-[#26372A] bg-[#0D1510] p-3 text-center">
                <p className="text-xs text-[#A7B5A9] font-medium">
                  Player Inventories
                </p>

                <p className="text-xl font-bold font-mono text-[#F1F7F1] my-1">
                  {calculation.playerInventoriesCeil}
                </p>

                <p className="text-[10px] text-[#6F8072]">
                  {calculation.totalSlots} / 36 slots used
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}