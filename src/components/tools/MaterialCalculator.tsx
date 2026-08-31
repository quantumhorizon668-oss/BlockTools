import React, { useState, useMemo } from 'react';
import { Layers, Copy, Check, RotateCcw, Plus, Trash2, Sparkles, Hammer, Info } from 'lucide-react';
import { CRAFTING_PRESETS, CraftingRecipePreset } from '../../data/presets';

interface CustomIngredient {
  name: string;
  amountPerCraft: number;
}

export function MaterialCalculator() {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('stairs');
  const [desiredOutput, setDesiredOutput] = useState<string>('250');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Custom craft state
  const [customOutputName, setCustomOutputName] = useState<string>('Custom Crafted Item');
  const [customOutputPerCraft, setCustomOutputPerCraft] = useState<string>('4');
  const [customIngredients, setCustomIngredients] = useState<CustomIngredient[]>([
    { name: 'Base Material Block', amountPerCraft: 6 }
  ]);

  const activePreset = useMemo(() => {
    return CRAFTING_PRESETS.find(p => p.id === selectedPresetId) || CRAFTING_PRESETS[0];
  }, [selectedPresetId]);

  // Calculation logic
  const calculation = useMemo(() => {
    const target = parseInt(desiredOutput, 10);
    const validTarget = isNaN(target) || target < 1 ? 1 : target;

    if (activeTab === 'presets') {
      const outputYield = activePreset.outputPerCraft;
      const craftsRequired = Math.ceil(validTarget / outputYield);
      const totalExpectedOutput = craftsRequired * outputYield;
      const extraSurplus = totalExpectedOutput - validTarget;

      const rawIngredients = activePreset.ingredients.map(ing => {
        const totalUnits = craftsRequired * ing.amountPerCraft;
        const fullStacks = Math.floor(totalUnits / ing.baseStackSize);
        const remainder = totalUnits % ing.baseStackSize;
        return {
          name: ing.name,
          unitsPerCraft: ing.amountPerCraft,
          totalUnits,
          fullStacks,
          remainder,
          stackSize: ing.baseStackSize
        };
      });

      return {
        target: validTarget,
        outputName: activePreset.outputName,
        craftsRequired,
        totalExpectedOutput,
        extraSurplus,
        rawIngredients,
        tip: activePreset.tip
      };
    } else {
      const outputYield = parseInt(customOutputPerCraft, 10) || 1;
      const craftsRequired = Math.ceil(validTarget / outputYield);
      const totalExpectedOutput = craftsRequired * outputYield;
      const extraSurplus = totalExpectedOutput - validTarget;

      const rawIngredients = customIngredients.map(ing => {
        const totalUnits = craftsRequired * (ing.amountPerCraft || 1);
        const fullStacks = Math.floor(totalUnits / 64);
        const remainder = totalUnits % 64;
        return {
          name: ing.name || 'Raw Ingredient',
          unitsPerCraft: ing.amountPerCraft || 1,
          totalUnits,
          fullStacks,
          remainder,
          stackSize: 64
        };
      });

      return {
        target: validTarget,
        outputName: customOutputName || 'Crafted Items',
        craftsRequired,
        totalExpectedOutput,
        extraSurplus,
        rawIngredients,
        tip: undefined
      };
    }
  }, [activeTab, activePreset, desiredOutput, customOutputName, customOutputPerCraft, customIngredients]);

  const copyShoppingList = () => {
    const lines = [
      `Minecraft Build Material Plan — ${calculation.target} ${calculation.outputName}`,
      `Total Crafts: ${calculation.craftsRequired} (Yield: ${calculation.totalExpectedOutput}, Surplus: ${calculation.extraSurplus})`,
      'Raw Ingredients Required:'
    ];
    calculation.rawIngredients.forEach(ing => {
      lines.push(`• ${ing.name}: ${ing.totalUnits.toLocaleString()} total (${ing.fullStacks} stacks + ${ing.remainder} items)`);
    });
    const text = lines.join('\n');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey('shopping-list');
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleAddIngredient = () => {
    if (customIngredients.length < 6) {
      setCustomIngredients([...customIngredients, { name: `Ingredient ${customIngredients.length + 1}`, amountPerCraft: 1 }]);
    }
  };

  const handleRemoveIngredient = (index: number) => {
    if (customIngredients.length > 1) {
      setCustomIngredients(customIngredients.filter((_, i) => i !== index));
    }
  };

  const handleIngredientChange = (index: number, field: keyof CustomIngredient, val: any) => {
    const updated = [...customIngredients];
    updated[index] = { ...updated[index], [field]: val };
    setCustomIngredients(updated);
  };

  const handleReset = () => {
    setDesiredOutput('100');
    if (activeTab === 'custom') {
      setCustomOutputName('Custom Crafted Item');
      setCustomOutputPerCraft('4');
      setCustomIngredients([{ name: 'Base Material Block', amountPerCraft: 6 }]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Material Calculator Card */}
      <div className="rounded-2xl border border-[#26372A] bg-[#121C15] p-6 sm:p-8 shadow-xl">
        {/* Tab Selector: Presets vs Custom Recipe */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#26372A] pb-6">
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#A7B5A9]">
              Recipe System
            </label>
            <p className="text-sm text-[#F1F7F1] mt-0.5">
              {activeTab === 'presets' ? (
                <span>Standard <strong className="text-[#55D66F]">Common Recipes</strong> (Stairs, Slabs, Concrete, TNT, Hoppers)</span>
              ) : (
                <span>Custom <strong className="text-[#9DF0AA]">Custom Recipe Builder</strong> (Configure any ingredient ratios)</span>
              )}
            </p>
          </div>

          <div className="flex items-center rounded-xl bg-[#0D1510] p-1 border border-[#26372A] w-full sm:w-auto">
            <button
              type="button"
              id="tab-recipe-presets"
              onClick={() => setActiveTab('presets')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'presets'
                  ? 'bg-[#55D66F] text-[#080D0A] shadow'
                  : 'text-[#A7B5A9] hover:text-[#F1F7F1]'
              }`}
            >
              Recipe Presets
            </button>
            <button
              type="button"
              id="tab-recipe-custom"
              onClick={() => setActiveTab('custom')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'custom'
                  ? 'bg-[#55D66F] text-[#080D0A] shadow'
                  : 'text-[#A7B5A9] hover:text-[#F1F7F1]'
              }`}
            >
              Custom Craft
            </button>
          </div>
        </div>

        {/* Recipe Selection (Presets or Custom Inputs) */}
        {activeTab === 'presets' ? (
          <div className="mb-6 space-y-3">
            <label className="text-xs font-semibold text-[#A7B5A9] flex items-center justify-between">
              <span>Select Crafting Recipe Preset</span>
              <span className="font-mono text-[10px] text-[#6F8072]">8 Built-in Presets</span>
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {CRAFTING_PRESETS.map(preset => {
                const isSelected = preset.id === selectedPresetId;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    id={`preset-btn-${preset.id}`}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`flex flex-col items-start rounded-xl p-3 text-left border transition-all ${
                      isSelected
                        ? 'border-[#55D66F] bg-[#0D1510] shadow-[0_0_15px_rgba(85,214,111,0.15)] ring-1 ring-[#55D66F]'
                        : 'border-[#26372A] bg-[#0D1510]/60 hover:border-[#37523C] hover:text-[#F1F7F1]'
                    }`}
                  >
                    <span className={`text-xs font-bold ${isSelected ? 'text-[#55D66F]' : 'text-[#F1F7F1]'}`}>
                      {preset.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#A7B5A9] mt-1">
                      Yield: {preset.outputPerCraft} per craft
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-[#A7B5A9] mt-1 italic">
              {activePreset.description}
            </p>
          </div>
        ) : (
          <div className="mb-6 space-y-4 rounded-xl border border-[#26372A] bg-[#0D1510] p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#A7B5A9]">Target Item Name</label>
                <input
                  type="text"
                  value={customOutputName}
                  onChange={e => setCustomOutputName(e.target.value)}
                  placeholder="e.g. Quartz Pillar / Redstone Lamp"
                  className="w-full rounded-lg border border-[#26372A] bg-[#121C15] px-3 py-2 text-sm text-[#F1F7F1] focus:border-[#55D66F] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#A7B5A9]">Yield Output Per Craft</label>
                <input
                  type="number"
                  min="1"
                  value={customOutputPerCraft}
                  onChange={e => setCustomOutputPerCraft(e.target.value)}
                  placeholder="e.g. 4"
                  className="w-full rounded-lg border border-[#26372A] bg-[#121C15] px-3 py-2 text-sm font-mono text-[#F1F7F1] focus:border-[#55D66F] focus:outline-none"
                />
              </div>
            </div>

            {/* Custom Ingredients List */}
            <div className="space-y-2 pt-2 border-t border-[#26372A]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#A7B5A9]">Required Ingredients Per Craft</span>
                {customIngredients.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="flex items-center gap-1 text-xs font-semibold text-[#55D66F] hover:underline"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Ingredient</span>
                  </button>
                )}
              </div>

              {customIngredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={ing.name}
                    onChange={e => handleIngredientChange(idx, 'name', e.target.value)}
                    placeholder="Ingredient Name (e.g. Stone)"
                    className="flex-1 rounded-lg border border-[#26372A] bg-[#121C15] px-3 py-1.5 text-xs text-[#F1F7F1]"
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[11px] text-[#A7B5A9]">Qty:</span>
                    <input
                      type="number"
                      min="1"
                      value={ing.amountPerCraft}
                      onChange={e => handleIngredientChange(idx, 'amountPerCraft', parseInt(e.target.value, 10) || 1)}
                      className="w-16 rounded-lg border border-[#26372A] bg-[#121C15] px-2 py-1.5 text-xs font-mono text-[#F1F7F1]"
                    />
                  </div>
                  {customIngredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(idx)}
                      className="p-1 text-[#EF4444] hover:bg-[#EF4444]/10 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Desired Output Input */}
        <div className="space-y-3 mb-6">
          <label htmlFor="input-desired-output" className="text-xs font-semibold text-[#A7B5A9] flex items-center justify-between">
            <span>Desired Output Amount for your Build</span>
            <span className="font-mono text-[10px] text-[#6F8072]">Target Blocks Needed</span>
          </label>
          <div className="relative">
            <input
              id="input-desired-output"
              type="number"
              min="1"
              value={desiredOutput}
              onChange={e => setDesiredOutput(e.target.value)}
              placeholder="e.g. 250"
              className="w-full rounded-xl border border-[#26372A] bg-[#0D1510] px-4 py-3.5 text-2xl font-mono font-black text-[#F1F7F1] placeholder-[#6F8072] focus:border-[#55D66F] focus:outline-none focus:ring-1 focus:ring-[#55D66F]"
            />
          </div>

          {/* Quick preset amounts */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-[#6F8072] mr-1">Quick pick:</span>
            {[64, 100, 250, 500, 1000, 2500].map(amt => (
              <button
                key={amt}
                type="button"
                id={`mat-qty-${amt}`}
                onClick={() => setDesiredOutput(amt.toString())}
                className="rounded-md border border-[#26372A] bg-[#0D1510] px-2 py-0.5 text-xs font-mono text-[#A7B5A9] hover:border-[#55D66F]/50 hover:text-[#F1F7F1] transition-colors"
              >
                {amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Bar */}
        <div className="flex justify-end border-b border-[#26372A] pb-4 mb-6">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-[#A7B5A9] hover:text-[#EF4444] transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Recipe Form</span>
          </button>
        </div>

        {/* Primary Result Calculation Card */}
        <div className="rounded-2xl border border-[#55D66F]/40 bg-[#0D1510] p-6 sm:p-8 shadow-[0_0_30px_rgba(85,214,111,0.08)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#55D66F]/10 px-2.5 py-0.5 text-xs font-semibold text-[#55D66F] border border-[#55D66F]/30 mb-2">
                <Hammer className="h-3 w-3" />
                Crafting Calculation Output
              </span>
              <h3 className="text-2xl font-black text-[#F1F7F1]">
                {calculation.craftsRequired.toLocaleString()} Crafts Required
              </h3>
            </div>

            <button
              type="button"
              id="copy-shopping-list-btn"
              onClick={copyShoppingList}
              className="flex items-center gap-1.5 rounded-xl bg-[#55D66F] px-4 py-2 text-xs font-bold text-[#080D0A] transition-all hover:bg-[#9DF0AA] active:scale-95 shadow"
            >
              {copiedKey === 'shopping-list' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#080D0A]" />
                  <span>Shopping List Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Shopping List</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
            <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#55D66F]">
                Total Crafts Needed
              </p>
              <p className="text-3xl sm:text-4xl font-mono font-black text-[#F1F7F1] my-1">
                {calculation.craftsRequired.toLocaleString()}
              </p>
              <p className="text-[11px] text-[#A7B5A9]">
                Crafting actions on bench
              </p>
            </div>

            <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9DF0AA]">
                Expected Total Yield
              </p>
              <p className="text-3xl sm:text-4xl font-mono font-black text-[#F1F7F1] my-1">
                {calculation.totalExpectedOutput.toLocaleString()}
              </p>
              <p className="text-[11px] text-[#A7B5A9]">
                Total {calculation.outputName} produced
              </p>
            </div>

            <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#3B82F6]">
                Extra Surplus Leftover
              </p>
              <p className="text-3xl sm:text-4xl font-mono font-black text-[#F1F7F1] my-1">
                +{calculation.extraSurplus}
              </p>
              <p className="text-[11px] text-[#A7B5A9]">
                Surplus beyond target ({calculation.target})
              </p>
            </div>
          </div>

          {/* Raw Materials Shopping List Breakdown */}
          <div className="rounded-xl border border-[#26372A] bg-[#121C15]/80 p-5 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F1F7F1] flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-[#55D66F]" />
              Raw Materials Shopping List
            </h4>

            <div className="space-y-2.5">
              {calculation.rawIngredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-[#26372A] bg-[#0D1510] p-3 gap-2"
                >
                  <div>
                    <p className="text-sm font-bold text-[#F1F7F1]">{ing.name}</p>
                    <p className="text-xs text-[#A7B5A9]">
                      {ing.unitsPerCraft} units per craft × {calculation.craftsRequired} crafts
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-base font-mono font-black text-[#55D66F]">
                        {ing.totalUnits.toLocaleString()} Total
                      </p>
                      <p className="text-xs font-mono text-[#A7B5A9]">
                        {ing.fullStacks} Stacks {ing.remainder > 0 && `+ ${ing.remainder} items`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Tip */}
          {calculation.tip && (
            <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-[#55D66F]/30 bg-[#55D66F]/5 p-3 text-xs text-[#9DF0AA]">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              <p>{calculation.tip}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
