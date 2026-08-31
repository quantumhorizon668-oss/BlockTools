import React, { useState, useMemo } from 'react';
import { Clock, Sun, Moon, Copy, Check, RotateCcw, Bed, Zap, ArrowRightLeft, Sparkles } from 'lucide-react';
import { MINECRAFT_TIME_MILESTONES } from '../../data/presets';

export function TimeCalculator() {
  const [inputType, setInputType] = useState<'ticks' | 'seconds' | 'minutes' | 'days'>('ticks');
  const [inputValue, setInputValue] = useState<string>('24000');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Normalization to game ticks
  const calculation = useMemo(() => {
    const rawVal = parseFloat(inputValue);
    const validVal = isNaN(rawVal) || rawVal < 0 ? 0 : rawVal;

    let gameTicks = 0;
    if (inputType === 'ticks') {
      gameTicks = validVal;
    } else if (inputType === 'seconds') {
      gameTicks = validVal * 20;
    } else if (inputType === 'minutes') {
      gameTicks = validVal * 60 * 20;
    } else if (inputType === 'days') {
      gameTicks = validVal * 24000;
    }

    const realSeconds = gameTicks / 20;
    const realMinutes = realSeconds / 60;
    const realHours = realMinutes / 60;
    const minecraftDays = gameTicks / 24000;
    const redstoneTicks = gameTicks / 2;

    // Time of day cycle within a 24,000 tick day (0 - 23,999)
    const cycleTick = Math.floor(gameTicks % 24000);
    // In-Game 24h clock: 0 tick = 06:00 AM (Sunrise). Each hour = 1,000 ticks. Each minute = 16.666 ticks.
    const totalMinutesSince6AM = (cycleTick / 24000) * 1440;
    const adjustedMinutes = (totalMinutesSince6AM + 360) % 1440; // 360 mins = 6 hours
    const inGameHours = Math.floor(adjustedMinutes / 60);
    const inGameMins = Math.floor(adjustedMinutes % 60);
    const inGameTimeString = `${inGameHours.toString().padStart(2, '0')}:${inGameMins.toString().padStart(2, '0')}`;

    // Solar angle in degrees (0 deg = dawn/sunrise at 0 ticks, 90 deg = noon at 6000 ticks, 180 deg = sunset at 12000 ticks, 270 deg = midnight at 18000 ticks)
    const celestialAngle = (cycleTick / 24000) * 360;

    // Day phase determination
    let phase = 'Daytime';
    let phaseColor = '#55D66F';
    let canSleep = false;
    if (cycleTick >= 0 && cycleTick < 12000) {
      phase = cycleTick < 1000 ? 'Sunrise / Dawn' : 'Daytime';
      phaseColor = '#55D66F';
    } else if (cycleTick >= 12000 && cycleTick < 13000) {
      phase = 'Sunset / Dusk';
      phaseColor = '#F97316';
      canSleep = cycleTick >= 12542;
    } else if (cycleTick >= 13000 && cycleTick < 23000) {
      phase = 'Nighttime (Monsters Spawn)';
      phaseColor = '#6366F1';
      canSleep = true;
    } else {
      phase = 'Dawn Approaching';
      phaseColor = '#EAB308';
      canSleep = cycleTick < 23460;
    }

    // Automation / Redstone estimates
    // Hopper transfers 1 item every 8 ticks (0.4s)
    const hopperItemsTransferred = Math.floor(gameTicks / 8);
    // Smelting takes 200 ticks (10 seconds) per item
    const itemsSmelted = Math.floor(gameTicks / 200);

    return {
      gameTicks,
      redstoneTicks,
      realSeconds,
      realMinutes,
      realHours,
      minecraftDays,
      cycleTick,
      inGameTimeString,
      celestialAngle,
      phase,
      phaseColor,
      canSleep,
      hopperItemsTransferred,
      itemsSmelted
    };
  }, [inputType, inputValue]);

  const copyToClipboard = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleReset = () => {
    setInputType('ticks');
    setInputValue('24000');
  };

  const handleJumpToMilestone = (ticks: number) => {
    setInputType('ticks');
    setInputValue(ticks.toString());
  };

  return (
    <div className="space-y-6">
      {/* Main Calculator Card */}
      <div className="rounded-2xl border border-[#26372A] bg-[#121C15] p-6 sm:p-8 shadow-xl">
        {/* Unit Selector */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#26372A] pb-6">
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#A7B5A9]">
              Input Time Unit
            </label>
            <p className="text-sm text-[#F1F7F1] mt-0.5">
              Enter time in <strong className="text-[#55D66F]">{inputType.toUpperCase()}</strong> to translate across all Minecraft temporal units.
            </p>
          </div>

          <div className="flex items-center rounded-xl bg-[#0D1510] p-1 border border-[#26372A] w-full sm:w-auto">
            {(['ticks', 'seconds', 'minutes', 'days'] as const).map(unit => (
              <button
                key={unit}
                type="button"
                id={`time-unit-${unit}`}
                onClick={() => setInputType(unit)}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-bold capitalize rounded-lg transition-all ${
                  inputType === unit
                    ? 'bg-[#55D66F] text-[#080D0A] shadow'
                    : 'text-[#A7B5A9] hover:text-[#F1F7F1]'
                }`}
              >
                {unit}
              </button>
            ))}
          </div>
        </div>

        {/* Input Value */}
        <div className="space-y-3 mb-6">
          <label htmlFor="input-time-val" className="text-xs font-semibold text-[#A7B5A9] flex items-center justify-between">
            <span>Enter {inputType === 'ticks' ? 'Game Ticks' : inputType === 'seconds' ? 'Real-World Seconds' : inputType === 'minutes' ? 'Real-World Minutes' : 'Minecraft In-Game Days'}</span>
            <span className="font-mono text-[10px] text-[#6F8072]">
              {inputType === 'ticks' ? '20 ticks = 1s' : inputType === 'days' ? '1 day = 24,000 ticks' : 'Instant conversion'}
            </span>
          </label>
          <div className="relative">
            <input
              id="input-time-val"
              type="number"
              min="0"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="e.g. 24000"
              className="w-full rounded-xl border border-[#26372A] bg-[#0D1510] px-4 py-3.5 text-2xl font-mono font-black text-[#F1F7F1] placeholder-[#6F8072] focus:border-[#55D66F] focus:outline-none focus:ring-1 focus:ring-[#55D66F]"
            />
          </div>
        </div>

        {/* In-Game Time Milestones */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#26372A] pb-6 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#A7B5A9] flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[#55D66F]" />
              Time Jumps:
            </span>
            {MINECRAFT_TIME_MILESTONES.slice(0, 5).map((m, idx) => (
              <button
                key={idx}
                type="button"
                id={`time-milestone-${idx}`}
                onClick={() => handleJumpToMilestone(m.ticks)}
                className="rounded-lg border border-[#26372A] bg-[#0D1510] px-2.5 py-1 text-xs text-[#A7B5A9] hover:border-[#55D66F]/50 hover:text-[#F1F7F1] transition-colors"
                title={`${m.label} (${m.ticks} ticks)`}
              >
                {m.label.split(' (')[0]} ({m.timeString})
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-[#A7B5A9] hover:text-[#EF4444] transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Time</span>
          </button>
        </div>

        {/* Primary Results Display */}
        <div className="rounded-2xl border border-[#55D66F]/40 bg-[#0D1510] p-6 sm:p-8 shadow-[0_0_30px_rgba(85,214,111,0.08)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#55D66F]/10 px-2.5 py-0.5 text-xs font-semibold text-[#55D66F] border border-[#55D66F]/30 mb-2">
                <Clock className="h-3 w-3" />
                Minecraft Temporal Translation
              </span>
              <h3 className="text-2xl font-black text-[#F1F7F1]">
                {calculation.minecraftDays.toFixed(2)} Minecraft Days ({calculation.realMinutes.toFixed(1)} Real Mins)
              </h3>
            </div>

            <button
              type="button"
              id="copy-time-breakdown"
              onClick={() =>
                copyToClipboard(
                  `${calculation.gameTicks.toLocaleString()} Game Ticks = ${calculation.realSeconds.toFixed(1)}s (${calculation.realMinutes.toFixed(2)} mins) = ${calculation.minecraftDays.toFixed(3)} Minecraft Days (In-game time: ${calculation.inGameTimeString})`,
                  'time'
                )
              }
              className="flex items-center gap-1.5 rounded-xl bg-[#55D66F] px-4 py-2 text-xs font-bold text-[#080D0A] transition-all hover:bg-[#9DF0AA] active:scale-95 shadow"
            >
              {copiedKey === 'time' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#080D0A]" />
                  <span>Time Summary Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Time Summary</span>
                </>
              )}
            </button>
          </div>

          {/* Stat Metrics */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
            <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#55D66F]">
                Game Ticks (20 TPS)
              </p>
              <p className="text-2xl sm:text-3xl font-mono font-black text-[#F1F7F1] my-1">
                {calculation.gameTicks.toLocaleString()}
              </p>
              <p className="text-[10px] text-[#A7B5A9]">
                {calculation.redstoneTicks.toLocaleString()} Redstone Ticks
              </p>
            </div>

            <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9DF0AA]">
                Real Seconds
              </p>
              <p className="text-2xl sm:text-3xl font-mono font-black text-[#F1F7F1] my-1">
                {calculation.realSeconds.toLocaleString(undefined, { maximumFractionDigits: 1 })}s
              </p>
              <p className="text-[10px] text-[#A7B5A9]">
                {calculation.realMinutes.toFixed(2)} Real Minutes
              </p>
            </div>

            <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#3B82F6]">
                Minecraft Days
              </p>
              <p className="text-2xl sm:text-3xl font-mono font-black text-[#F1F7F1] my-1">
                {calculation.minecraftDays.toFixed(2)}
              </p>
              <p className="text-[10px] text-[#A7B5A9]">
                1 Day = 24,000 Ticks (20m)
              </p>
            </div>

            <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#FCD34D]">
                In-Game Time
              </p>
              <p className="text-2xl sm:text-3xl font-mono font-black text-[#F1F7F1] my-1">
                {calculation.inGameTimeString}
              </p>
              <p className="text-[10px] text-[#A7B5A9]">
                Tick {calculation.cycleTick.toLocaleString()} / 24,000
              </p>
            </div>
          </div>

          {/* Interactive Day/Night Dial & Status */}
          <div className="rounded-xl border border-[#26372A] bg-[#121C15]/80 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#26372A]/70 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D1510] border border-[#26372A]">
                  {calculation.cycleTick < 12000 ? (
                    <Sun className="h-5 w-5 text-[#FCD34D]" />
                  ) : (
                    <Moon className="h-5 w-5 text-[#6366F1]" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#F1F7F1]">
                    Current Celestial Phase: <span style={{ color: calculation.phaseColor }}>{calculation.phase}</span>
                  </p>
                  <p className="text-xs text-[#A7B5A9]">
                    Solar Progression: {((calculation.cycleTick / 24000) * 100).toFixed(1)}% of 24h cycle
                  </p>
                </div>
              </div>

              {/* Bed Sleep Status */}
              <div className="flex items-center gap-2 rounded-lg border border-[#26372A] bg-[#0D1510] px-3 py-1.5 text-xs">
                <Bed className={`h-4 w-4 ${calculation.canSleep ? 'text-[#55D66F]' : 'text-[#6F8072]'}`} />
                <span className={calculation.canSleep ? 'text-[#55D66F] font-bold' : 'text-[#A7B5A9]'}>
                  {calculation.canSleep ? 'Bed Sleep Allowed' : 'Cannot Sleep (Too Bright)'}
                </span>
              </div>
            </div>

            {/* Redstone & Automation Delay Quick Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="rounded-lg border border-[#26372A] bg-[#0D1510] p-3 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#55D66F]" />
                  <span className="text-[#A7B5A9]">Hopper Item Flow (8t/item):</span>
                </div>
                <span className="font-mono font-bold text-[#F1F7F1]">
                  {calculation.hopperItemsTransferred.toLocaleString()} items
                </span>
              </div>

              <div className="rounded-lg border border-[#26372A] bg-[#0D1510] p-3 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="h-4 w-4 text-[#9DF0AA]" />
                  <span className="text-[#A7B5A9]">Furnace Smelting (200t/item):</span>
                </div>
                <span className="font-mono font-bold text-[#F1F7F1]">
                  {calculation.itemsSmelted.toLocaleString()} items
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
