import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from './theme';
import centre from './assets/centre.png';
import gauche1 from './assets/gauche1.png';
import gauche2 from './assets/gauche2.png';
import droite1 from './assets/droite1.png';
import droite2 from './assets/droite2.png';

// Global scale applied to the native pixel sizes of the phone cut-outs.
const S = 0.7;

type PhoneDef = {
	src: string;
	w: number; // native width
	h: number; // native height
	x: number; // final x offset (centre-based)
	y: number; // final y offset from canvas centre
	z: number;
	delay: number; // entrance start frame
	phase: number; // idle-float phase
};

// Reveal order via delay: centre, then the two inner screens, then the two
// outer logo screens. Each entry keeps its native aspect (perspective is
// already baked into the image).
const PHONES: PhoneDef[] = [
	{src: centre, w: 728, h: 1471, x: 0, y: -3, z: 10, delay: 6, phase: 2.4},
	{src: gauche1, w: 589, h: 1308, x: -330, y: 54, z: 8, delay: 34, phase: 1.3},
	{src: droite1, w: 590, h: 1308, x: 330, y: 54, z: 8, delay: 50, phase: 3.5},
	{src: gauche2, w: 445, h: 1178, x: -620, y: 100, z: 6, delay: 82, phase: 0.0},
	{src: droite2, w: 445, h: 1178, x: 620, y: 100, z: 6, delay: 96, phase: 4.6},
];

const Phone: React.FC<{def: PhoneDef}> = ({def}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const dispW = def.w * S;
	const dispH = def.h * S;

	// Smooth, professional entrance — no bounce.
	const enter = spring({
		fps,
		frame: frame - def.delay,
		config: {damping: 200},
		durationInFrames: 36,
	});

	// Slide outward from behind the centre as they appear.
	const x = def.x * (0.45 + 0.55 * enter);
	const rise = (1 - enter) * 80;
	const scale = 0.86 + 0.14 * enter;
	const blur = (1 - enter) * 6;
	const opacity = interpolate(enter, [0, 1], [0, 1], {extrapolateRight: 'clamp'});

	// Idle float, eased in by the entrance.
	const bob = Math.sin(frame / 27 + def.phase) * 5 * enter;
	const sway = Math.sin(frame / 36 + def.phase) * 0.3 * enter;

	return (
		<div
			style={{
				position: 'absolute',
				left: '50%',
				top: '50%',
				zIndex: def.z,
				transform: `translate(-50%, -50%) translate(${x}px, ${def.y + rise + bob}px)`,
			}}
		>
			{/* soft ground shadow */}
			<div
				style={{
					position: 'absolute',
					left: '50%',
					bottom: -34,
					transform: 'translateX(-50%)',
					width: dispW * 0.82,
					height: 42,
					background: 'radial-gradient(ellipse at center, rgba(20,30,60,0.26), rgba(20,30,60,0) 70%)',
					filter: 'blur(8px)',
					opacity: enter * 0.9,
				}}
			/>
			<div
				style={{
					transform: `rotate(${sway}deg) scale(${scale})`,
					filter: blur > 0.05 ? `blur(${blur}px)` : 'none',
					opacity,
				}}
			>
				<Img src={def.src} style={{width: dispW, height: dispH, display: 'block'}} />
			</div>
		</div>
	);
};

export const MashopPromo: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	// Slow cinematic push-in across the whole shot.
	const groupScale = interpolate(frame, [0, durationInFrames], [1.0, 1.04], {extrapolateRight: 'clamp'});

	// One light sweep after the deck has assembled.
	const sweepX = interpolate(frame, [140, 205], [-40, 150], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const sweepOpacity = interpolate(frame, [140, 172, 205], [0, 0.1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{background: colors.pageBg}}>
			<AbsoluteFill style={{background: 'radial-gradient(120% 120% at 50% 40%, #FFFFFF 0%, #F5F6F8 72%, #EDEFF2 100%)'}} />
			<AbsoluteFill style={{background: 'radial-gradient(36% 46% at 50% 48%, rgba(244,169,31,0.12), rgba(244,169,31,0) 70%)'}} />

			<AbsoluteFill style={{transform: `scale(${groupScale})`}}>
				{PHONES.map((def, i) => (
					<Phone key={i} def={def} />
				))}
			</AbsoluteFill>

			<AbsoluteFill style={{overflow: 'hidden', pointerEvents: 'none'}}>
				<div
					style={{
						position: 'absolute',
						top: '-20%',
						left: `${sweepX}%`,
						width: '24%',
						height: '140%',
						background: 'linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)',
						transform: 'rotate(8deg)',
						opacity: sweepOpacity,
						mixBlendMode: 'soft-light',
					}}
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
