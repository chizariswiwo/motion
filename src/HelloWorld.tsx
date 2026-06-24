import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	random,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export type HelloWorldProps = {
	title: string;
	subtitle: string;
};

// A field of deterministic twinkling stars in the background.
// Note: random() with a static seed is used instead of Math.random()
// so every render produces an identical, reproducible result.
const Stars: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const stars = new Array(80).fill(0).map((_, i) => {
		const x = random(`x-${i}`) * width;
		const y = random(`y-${i}`) * height;
		const size = 1 + random(`size-${i}`) * 3;
		// Twinkle: opacity oscillates based on the frame, offset per star.
		const phase = random(`phase-${i}`) * Math.PI * 2;
		const opacity = 0.3 + 0.7 * Math.abs(Math.sin(frame / 15 + phase));

		return (
			<div
				key={i}
				style={{
					position: 'absolute',
					left: x,
					top: y,
					width: size,
					height: size,
					borderRadius: '50%',
					background: 'white',
					opacity,
				}}
			/>
		);
	});

	return <AbsoluteFill>{stars}</AbsoluteFill>;
};

// The title springs in and scales up.
const Title: React.FC<{text: string}> = ({text}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const entrance = spring({
		fps,
		frame,
		config: {damping: 200},
	});

	const scale = interpolate(entrance, [0, 1], [0.7, 1]);
	const opacity = interpolate(entrance, [0, 1], [0, 1]);

	return (
		<h1
			style={{
				fontFamily: 'Helvetica, Arial, sans-serif',
				fontSize: 130,
				fontWeight: 800,
				color: 'white',
				margin: 0,
				transform: `scale(${scale})`,
				opacity,
			}}
		>
			{text}
		</h1>
	);
};

// The subtitle fades and slides up after the title.
const Subtitle: React.FC<{text: string}> = ({text}) => {
	const frame = useCurrentFrame();

	const opacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const translateY = interpolate(frame, [0, 20], [30, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<p
			style={{
				fontFamily: 'Helvetica, Arial, sans-serif',
				fontSize: 52,
				fontWeight: 400,
				color: '#9ad0ff',
				margin: 0,
				marginTop: 24,
				opacity,
				transform: `translateY(${translateY}px)`,
			}}
		>
			{text}
		</p>
	);
};

export const HelloWorld: React.FC<HelloWorldProps> = ({title, subtitle}) => {
	return (
		<AbsoluteFill style={{background: 'linear-gradient(180deg, #0b1026 0%, #1b2a5e 100%)'}}>
			<Stars />
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					textAlign: 'center',
				}}
			>
				<Title text={title} />
				{/* The subtitle only starts animating 25 frames in.
				    layout="none" keeps it in the centered flex column
				    instead of Sequence's default AbsoluteFill wrapper. */}
				<Sequence from={25} layout="none">
					<Subtitle text={subtitle} />
				</Sequence>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
