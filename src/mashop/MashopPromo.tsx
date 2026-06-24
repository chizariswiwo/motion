import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from './theme';
import {PhoneFrame} from './PhoneFrame';
import {SplashScreen} from './screens/SplashScreen';
import {MenuScreen} from './screens/MenuScreen';
import {HomeScreen} from './screens/HomeScreen';
import {DashboardScreen} from './screens/DashboardScreen';

type PhoneDef = {
	screen: React.ReactNode;
	island: boolean;
	x: number; // final x offset
	y: number; // final y offset
	scale: number; // final scale
	rotY: number; // starting 3D Y rotation (settles to 0)
	z: number;
	delay: number; // entrance start frame
	phase: number; // idle-float phase
};

// Reveal order: center first, then left, then right, then the two orange
// logo screens last.
const PHONES: PhoneDef[] = [
	{screen: <HomeScreen />, island: true, x: 0, y: -9, scale: 1.13, rotY: 0, z: 10, delay: 8, phase: 2.4},
	{screen: <MenuScreen />, island: false, x: -364, y: 28, scale: 1.02, rotY: 20, z: 8, delay: 40, phase: 1.3},
	{screen: <DashboardScreen />, island: true, x: 364, y: 28, scale: 1.02, rotY: -20, z: 8, delay: 58, phase: 3.5},
	{screen: <SplashScreen />, island: false, x: -703, y: 80, scale: 0.93, rotY: 26, z: 6, delay: 92, phase: 0.0},
	{screen: <SplashScreen />, island: true, x: 703, y: 80, scale: 0.93, rotY: -26, z: 6, delay: 106, phase: 4.6},
];

const Phone: React.FC<{def: PhoneDef}> = ({def}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Smooth, professional entrance — no bounce.
	const enter = spring({
		fps,
		frame: frame - def.delay,
		config: {damping: 200},
		durationInFrames: 38,
	});

	// Phones slide outward from behind the center as they appear.
	const x = def.x * (0.42 + 0.58 * enter);
	const rise = (1 - enter) * 78;
	const scale = def.scale * (0.84 + 0.16 * enter);
	const rotY = def.rotY * (1 - enter);
	const blur = (1 - enter) * 7;
	const opacity = interpolate(enter, [0, 1], [0, 1], {extrapolateRight: 'clamp'});

	// Idle float, eased in by the entrance so it never fights the reveal.
	const bob = Math.sin(frame / 26 + def.phase) * 5 * enter;
	const sway = Math.sin(frame / 34 + def.phase) * 0.35 * enter;

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
			{/* ground shadow (stays flat, not rotated) */}
			<div
				style={{
					position: 'absolute',
					left: '50%',
					bottom: -48,
					transform: 'translateX(-50%)',
					width: 330 * def.scale,
					height: 48,
					background: 'radial-gradient(ellipse at center, rgba(20,30,60,0.28), rgba(20,30,60,0) 70%)',
					filter: 'blur(7px)',
					opacity: enter * 0.9,
				}}
			/>
			{/* 3D-rotated phone */}
			<div
				style={{
					transform: `perspective(2200px) rotateY(${rotY}deg) rotateZ(${sway}deg) scale(${scale})`,
					filter: blur > 0.05 ? `blur(${blur}px)` : 'none',
					opacity,
				}}
			>
				<PhoneFrame island={def.island}>{def.screen}</PhoneFrame>
			</div>
		</div>
	);
};

export const MashopPromo: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	// Slow cinematic push-in across the whole shot.
	const groupScale = interpolate(frame, [0, durationInFrames], [1.0, 1.04], {
		extrapolateRight: 'clamp',
	});

	// One light sweep after the deck has assembled.
	const sweepX = interpolate(frame, [150, 220], [-40, 150], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const sweepOpacity = interpolate(frame, [150, 185, 220], [0, 0.12, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{background: colors.pageBg}}>
			{/* soft backdrop */}
			<AbsoluteFill style={{background: 'radial-gradient(120% 120% at 50% 38%, #FFFFFF 0%, #F4F5F8 70%, #ECEEF2 100%)'}} />
			{/* faint brand glow behind the hero */}
			<AbsoluteFill style={{background: 'radial-gradient(38% 48% at 50% 46%, rgba(244,169,31,0.14), rgba(244,169,31,0) 70%)'}} />

			<AbsoluteFill style={{transform: `scale(${groupScale})`}}>
				{PHONES.map((def, i) => (
					<Phone key={i} def={def} />
				))}
			</AbsoluteFill>

			{/* light sweep */}
			<AbsoluteFill style={{overflow: 'hidden', pointerEvents: 'none'}}>
				<div
					style={{
						position: 'absolute',
						top: '-20%',
						left: `${sweepX}%`,
						width: '26%',
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
