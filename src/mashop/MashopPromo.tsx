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
	x: number;
	y: number;
	scale: number;
	z: number;
	rot: number;
	phase: number;
	island: boolean;
};

const PHONES: PhoneDef[] = [
	{screen: <SplashScreen />, x: -703, y: 80, scale: 0.93, z: 1, rot: -7, phase: 0.0, island: false},
	{screen: <MenuScreen />, x: -364, y: 32, scale: 1.02, z: 3, rot: -3.5, phase: 1.3, island: false},
	{screen: <HomeScreen />, x: 0, y: -9, scale: 1.13, z: 5, rot: 0, phase: 2.4, island: true},
	{screen: <DashboardScreen />, x: 364, y: 32, scale: 1.02, z: 3, rot: 3.5, phase: 3.5, island: true},
	{screen: <SplashScreen />, x: 703, y: 80, scale: 0.93, z: 1, rot: 7, phase: 4.6, island: false},
];

const Phone: React.FC<{def: PhoneDef; index: number}> = ({def, index}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Center establishes first, then the deck fans outward.
	const delay = Math.abs(index - 2) * 7;

	// Spread / rise with a touch of overshoot for a lively "snap".
	const enter = spring({
		fps,
		frame: frame - delay,
		config: {damping: 14, mass: 0.9, stiffness: 110},
	});
	// Opacity with no overshoot.
	const appear = spring({
		fps,
		frame: frame - delay,
		config: {damping: 200},
	});

	// Idle float, eased in by `appear` so it never fights the entrance.
	const bob = Math.sin(frame / 26 + def.phase) * 5 * appear;
	const sway = Math.sin(frame / 34 + def.phase) * 0.4 * appear;

	const x = def.x * enter;
	const riseY = (1 - enter) * 70;
	const scale = def.scale * (0.9 + 0.1 * enter);
	const rot = def.rot * (1 - enter) + sway;
	const opacity = interpolate(appear, [0, 1], [0, 1], {extrapolateRight: 'clamp'});

	return (
		<div
			style={{
				position: 'absolute',
				left: '50%',
				top: '50%',
				zIndex: def.z,
				transform: `translate(-50%, -50%) translate(${x}px, ${def.y + riseY + bob}px) rotate(${rot}deg) scale(${scale})`,
				opacity,
			}}
		>
			{/* ground shadow */}
			<div
				style={{
					position: 'absolute',
					left: '50%',
					bottom: -46,
					transform: 'translateX(-50%)',
					width: 330,
					height: 46,
					background: 'radial-gradient(ellipse at center, rgba(20,30,60,0.30), rgba(20,30,60,0) 70%)',
					filter: 'blur(6px)',
					opacity: appear * 0.9,
				}}
			/>
			<PhoneFrame island={def.island}>{def.screen}</PhoneFrame>
		</div>
	);
};

export const MashopPromo: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	// Slow cinematic push-in across the whole shot.
	const groupScale = interpolate(frame, [0, durationInFrames], [1.0, 1.045], {
		extrapolateRight: 'clamp',
	});

	// Single light sweep across the glossy phones.
	const sweepX = interpolate(frame, [48, 118], [-40, 150], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const sweepOpacity = interpolate(frame, [48, 83, 118], [0, 0.13, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{background: colors.pageBg}}>
			{/* soft backdrop */}
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(120% 120% at 50% 38%, #FFFFFF 0%, #F4F5F8 70%, #ECEEF2 100%)',
				}}
			/>
			{/* faint brand glow behind the hero */}
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(40% 50% at 50% 46%, rgba(244,169,31,0.16), rgba(244,169,31,0) 70%)',
				}}
			/>

			<AbsoluteFill style={{transform: `scale(${groupScale})`}}>
				{PHONES.map((def, i) => (
					<Phone key={i} def={def} index={i} />
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
						background:
							'linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)',
						transform: 'rotate(8deg)',
						opacity: sweepOpacity,
						mixBlendMode: 'soft-light',
					}}
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
