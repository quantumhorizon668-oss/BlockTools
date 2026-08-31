import React, { useState, useMemo } from 'react';
import { Compass, Copy, Check, RotateCcw, ArrowRightLeft, MapPin, AlertCircle, Info, Sparkles } from 'lucide-react';
import { NETHER_PRESETS, NetherPreset } from '../../data/presets';

export function NetherPortalCalculator() {
  const [direction, setDirection] = useState<'overworld-to-nether' | 'nether-to-overworld'>('overworld-to-nether');
  const [xCoord, setXCoord] = useState<string>('800');
  const [yCoord, setYCoord] = useState<string>('68');
  const [zCoord, setZCoord] = useState<string>('-400');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Math conversions
  const calculation = useMemo(() => {
    const xNum = parseFloat(xCoord);
    const yNum = parseFloat(yCoord);
    const zNum = parseFloat(zCoord);

    const isXValid = !isNaN(xNum) && isFinite(xNum);
    const isZValid = !isNaN(zNum) && isFinite(zNum);
    const isYValid = !isNaN(yNum) && isFinite(yNum);

    if (!isXValid || !isZValid) {
      return {
        isValid: false,
        xResult: null,
        yResult: isYValid ? yNum : 64,
        zResult: null,
        error: 'Please enter valid numerical coordinates for X and Z.'
      };
    }

    let calculatedX: number;
    let calculatedZ: number;

    if (direction === 'overworld-to-nether') {
      // Overworld -> Nether: divide by 8
      calculatedX = Math.floor(xNum / 8);
      calculatedZ = Math.floor(zNum / 8);
    } else {
      // Nether -> Overworld: multiply by 8
      calculatedX = Math.round(xNum * 8);
      calculatedZ = Math.round(zNum * 8);
    }

    const calculatedY = isYValid ? Math.round(yNum) : 64;

    // 2D distance traveled
    const overworldDistance = direction === 'overworld-to-nether'
      ? Math.sqrt(xNum * xNum + zNum * zNum)
      : Math.sqrt(calculatedX * calculatedX + calculatedZ * calculatedZ);
      
    const netherDistance = direction === 'overworld-to-nether'
      ? Math.sqrt(calculatedX * calculatedX + calculatedZ * calculatedZ)
      : Math.sqrt(xNum * xNum + zNum * zNum);

    return {
      isValid: true,
      xResult: calculatedX,
      yResult: calculatedY,
      zResult: calculatedZ,
      overworldDistance: Math.round(overworldDistance),
      netherDistance: Math.round(netherDistance),
      error: null
    };
  }, [xCoord, yCoord, zCoord, direction]);

  const copyToClipboard = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleReset = () => {
    setXCoord('0');
    setYCoord('64');
    setZCoord('0');
  };

  const loadPreset = (preset: NetherPreset) => {
    if (direction === 'overworld-to-nether') {
      setXCoord(preset.overworld.x.toString());
      setYCoord(preset.overworld.y.toString());
      setZCoord(preset.overworld.z.toString());
    } else {
      setXCoord(preset.nether.x.toString());
      setYCoord(preset.nether.y.toString());
      setZCoord(preset.nether.z.toString());
    }
  };

  const fullCoordinateString = calculation.isValid
    ? `X: ${calculation.xResult}, Y: ${calculation.yResult}, Z: ${calculation.zResult}`
    : '';

  const tpCommand = calculation.isValid
    ? `/tp @p ${calculation.xResult} ${calculation.yResult} ${calculation.zResult}`
    : '';

  return (
    <div className="space-y-6">
      {/* Main Interactive Calculator Card */}
      <div className="rounded-2xl border border-[#26372A] bg-[#121C15] p-6 sm:p-8 shadow-xl">
        {/* Direction Selector */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#26372A] pb-6">
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#A7B5A9]">
              Conversion Direction
            </label>
            <p className="text-sm text-[#F1F7F1] mt-0.5">
              {direction === 'overworld-to-nether' ? (
                <span>Converting <strong className="text-[#55D66F]">Overworld</strong> to <strong className="text-[#9DF0AA]">Nether</strong> (÷ 8)</span>
              ) : (
                <span>Converting <strong className="text-[#9DF0AA]">Nether</strong> to <strong className="text-[#55D66F]">Overworld</strong> (× 8)</span>
              )}
            </p>
          </div>

          <div className="flex items-center rounded-xl bg-[#0D1510] p-1 border border-[#26372A] w-full sm:w-auto">
            <button
              type="button"
              id="dir-ow-to-nether"
              onClick={() => setDirection('overworld-to-nether')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                direction === 'overworld-to-nether'
                  ? 'bg-[#55D66F] text-[#080D0A] shadow'
                  : 'text-[#A7B5A9] hover:text-[#F1F7F1]'
              }`}
            >
              Overworld → Nether
            </button>
            <button
              type="button"
              id="dir-nether-to-ow"
              onClick={() => setDirection('nether-to-overworld')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                direction === 'nether-to-overworld'
                  ? 'bg-[#55D66F] text-[#080D0A] shadow'
                  : 'text-[#A7B5A9] hover:text-[#F1F7F1]'
              }`}
            >
              Nether → Overworld
            </button>
          </div>
        </div>

        {/* Coordinate Inputs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
          {/* X Input */}
          <div className="space-y-1.5">
            <label htmlFor="input-x" className="flex items-center justify-between text-xs font-semibold text-[#A7B5A9]">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-[#EF4444]" />
                X Coordinate (East / West)
              </span>
              <span className="font-mono text-[10px] text-[#6F8072]">Required</span>
            </label>
            <div className="relative">
              <input
                id="input-x"
                type="number"
                value={xCoord}
                onChange={e => setXCoord(e.target.value)}
                placeholder="e.g. 800"
                className="w-full rounded-xl border border-[#26372A] bg-[#0D1510] px-4 py-3 text-lg font-mono font-bold text-[#F1F7F1] placeholder-[#6F8072] focus:border-[#55D66F] focus:outline-none focus:ring-1 focus:ring-[#55D66F]"
              />
            </div>
          </div>

          {/* Y Input (Optional) */}
          <div className="space-y-1.5">
            <label htmlFor="input-y" className="flex items-center justify-between text-xs font-semibold text-[#A7B5A9]">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-[#55D66F]" />
                Y Altitude (Height)
              </span>
              <span className="font-mono text-[10px] text-[#6F8072]">1:1 Unchanged</span>
            </label>
            <div className="relative">
              <input
                id="input-y"
                type="number"
                value={yCoord}
                onChange={e => setYCoord(e.target.value)}
                placeholder="e.g. 64"
                className="w-full rounded-xl border border-[#26372A] bg-[#0D1510] px-4 py-3 text-lg font-mono font-bold text-[#F1F7F1] placeholder-[#6F8072] focus:border-[#55D66F] focus:outline-none focus:ring-1 focus:ring-[#55D66F]"
              />
            </div>
          </div>

          {/* Z Input */}
          <div className="space-y-1.5">
            <label htmlFor="input-z" className="flex items-center justify-between text-xs font-semibold text-[#A7B5A9]">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-[#3B82F6]" />
                Z Coordinate (North / South)
              </span>
              <span className="font-mono text-[10px] text-[#6F8072]">Required</span>
            </label>
            <div className="relative">
              <input
                id="input-z"
                type="number"
                value={zCoord}
                onChange={e => setZCoord(e.target.value)}
                placeholder="e.g. -400"
                className="w-full rounded-xl border border-[#26372A] bg-[#0D1510] px-4 py-3 text-lg font-mono font-bold text-[#F1F7F1] placeholder-[#6F8072] focus:border-[#55D66F] focus:outline-none focus:ring-1 focus:ring-[#55D66F]"
              />
            </div>
          </div>
        </div>

        {/* Quick Presets & Reset Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#26372A] pb-6 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#A7B5A9] flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[#55D66F]" />
              Quick Presets:
            </span>
            {NETHER_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                id={`preset-nether-${idx}`}
                onClick={() => loadPreset(preset)}
                className="rounded-lg border border-[#26372A] bg-[#0D1510] px-2.5 py-1 text-xs text-[#A7B5A9] hover:border-[#55D66F]/50 hover:text-[#F1F7F1] transition-colors"
                title={preset.description}
              >
                {preset.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            id="reset-nether-coords"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-[#A7B5A9] hover:text-[#EF4444] transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Coordinates</span>
          </button>
        </div>

        {/* Primary Result Display */}
        {calculation.isValid ? (
          <div className="rounded-2xl border border-[#55D66F]/40 bg-[#0D1510] p-6 sm:p-8 shadow-[0_0_30px_rgba(85,214,111,0.08)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#55D66F]/10 px-2.5 py-0.5 text-xs font-semibold text-[#55D66F] border border-[#55D66F]/30 mb-2">
                  <MapPin className="h-3 w-3" />
                  Target Destination Result
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#F1F7F1]">
                  {direction === 'overworld-to-nether' ? 'Nether Portal Coordinates' : 'Overworld Portal Coordinates'}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  id="copy-coords-btn"
                  onClick={() => copyToClipboard(fullCoordinateString, 'coords')}
                  className="flex items-center gap-1.5 rounded-xl bg-[#55D66F] px-4 py-2 text-xs font-bold text-[#080D0A] transition-all hover:bg-[#9DF0AA] active:scale-95 shadow"
                >
                  {copiedKey === 'coords' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#080D0A]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Coordinates</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  id="copy-tp-btn"
                  onClick={() => copyToClipboard(tpCommand, 'tp')}
                  className="flex items-center gap-1.5 rounded-xl border border-[#26372A] bg-[#121C15] px-3 py-2 text-xs font-semibold text-[#A7B5A9] hover:text-[#F1F7F1] hover:border-[#55D66F]/40 transition-colors"
                  title="Copy Minecraft Teleport Command"
                >
                  {copiedKey === 'tp' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#55D66F]" />
                      <span>Command Copied!</span>
                    </>
                  ) : (
                    <>
                      <span className="font-mono">/tp</span>
                      <span>Command</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Coordinate Stat Boxes */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
              {/* X Box */}
              <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#EF4444]">
                  Target X
                </p>
                <p className="text-3xl sm:text-4xl font-mono font-black text-[#F1F7F1] my-1">
                  {calculation.xResult}
                </p>
                <p className="text-[11px] text-[#A7B5A9]">
                  {direction === 'overworld-to-nether' ? `Floored (${xCoord} ÷ 8)` : `Exact (${xCoord} × 8)`}
                </p>
              </div>

              {/* Y Box */}
              <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#55D66F]">
                  Target Y (Height)
                </p>
                <p className="text-3xl sm:text-4xl font-mono font-black text-[#F1F7F1] my-1">
                  {calculation.yResult}
                </p>
                <p className="text-[11px] text-[#A7B5A9]">
                  1:1 Scale (Unchanged)
                </p>
              </div>

              {/* Z Box */}
              <div className="rounded-xl border border-[#26372A] bg-[#121C15] p-4 text-center">
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#3B82F6]">
                  Target Z
                </p>
                <p className="text-3xl sm:text-4xl font-mono font-black text-[#F1F7F1] my-1">
                  {calculation.zResult}
                </p>
                <p className="text-[11px] text-[#A7B5A9]">
                  {direction === 'overworld-to-nether' ? `Floored (${zCoord} ÷ 8)` : `Exact (${zCoord} × 8)`}
                </p>
              </div>
            </div>

            {/* Travel Efficiency Metric */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-[#26372A] bg-[#121C15]/70 px-4 py-3 text-xs text-[#A7B5A9]">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="h-4 w-4 text-[#55D66F]" />
                <span>
                  <strong>8:1 Travel Advantage:</strong> Walking{' '}
                  <span className="font-mono text-[#55D66F] font-bold">{calculation.netherDistance} blocks</span> in the Nether covers{' '}
                  <span className="font-mono text-[#F1F7F1] font-bold">{calculation.overworldDistance} blocks</span> in the Overworld.
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#6F8072] shrink-0">
                1 Nether Step = 8 Overworld Steps
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-xl border border-[#EF4444]/40 bg-[#EF4444]/10 p-4 text-sm text-[#EF4444]">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{calculation.error}</p>
          </div>
        )}
      </div>

      {/* Pro Linking Tip Card */}
      <div className="rounded-2xl border border-[#26372A] bg-[#0D1510] p-6 text-sm text-[#A7B5A9] flex items-start gap-3">
        <Info className="h-5 w-5 text-[#55D66F] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-[#F1F7F1]">Pro Linking Tip for Server Hubs</p>
          <p className="text-xs leading-relaxed text-[#A7B5A9]">
            Never rely on auto-generated portals. To guarantee deterministic 1-to-1 two-way portal links without cross-talk, always enter the Nether, mine down the automatically generated portal, and reconstruct the obsidian frame at the exact calculated coordinates above.
          </p>
        </div>
      </div>
    </div>
  );
}
