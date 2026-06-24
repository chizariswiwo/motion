import React from 'react';
import {
	AbsoluteFill,
	Img,
	interpolate,
	random,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import centre from './assets/centre.png';
import gauche1 from './assets/gauche1.png';
import gauche2 from './assets/gauche2.png';
import droite1 from './assets/droite1.png';
import droite2 from './assets/droite2.png';
import logo from './assets/logo.png';

const BLUE = '#122B8D';
const ORANGE = '#E9A911';
const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';

const W = 3840;
const H = 2160;

// Editable copy.
const TXT = {
	p2: 'Vendez et achetez en un clic',
	p3: 'Gérez votre business',
	p4: 'Accès simple et rapide',
	tagline: 'MaShop — votre business, en un clic',
};

/* ----------------------------- Background ------------------------------ */

const Particles: React.FC<{count?: number; blur?: number}> = ({count = 60, blur = 0}) => {
	const frame = useCurrentFrame();
	const dots = new Array(count).fill(0).map((_, i) => {
		const sx = random(`px${i}`);
		const sy = random(`py${i}`);
		const speed = 0.2 + random(`ps${i}`) * 0.7;
		const size = (2 + random(`pz${i}`) * 6) * 2;
		const orange = random(`pc${i}`) > 0.62;
		const phase = random(`pp${i}`) * Math.PI * 2;
		const x = sx * W + Math.sin(frame / 40 + phase) * 30;
		const y = (sy * H - frame * speed * 1.6) % H;
		const yy = y < 0 ? y + H : y;
		const tw = 0.25 + 0.75 * Math.abs(Math.sin(frame * 0.045 + phase));
		return (
			<div
				key={i}
				style={{
					position: 'absolute',
					left: x,
					top: yy,
					width: size,
					height: size,
					borderRadius: '50%',
					background: orange ? ORANGE : '#cfe0ff',
					opacity: tw * (orange ? 0.9 : 0.55),
					boxShadow: `0 0 ${size * 2.5}px ${orange ? ORANGE : '#7da2ff'}`,
				}}
			/>
		);
	});
	return <AbsoluteFill style={{filter: blur ? `blur(${blur}px)` : 'none'}}>{dots}</AbsoluteFill>;
};

const Streaks: React.FC = () => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill style={{overflow: 'hidden'}}>
			{[0, 1, 2].map((i) => {
				const y = 300 + i * 620;
				const x = interpolate((frame + i * 130) % 360, [0, 360], [-1200, W + 400]);
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							top: y,
							left: x,
							width: 900,
							height: 2,
							background: `linear-gradient(90deg, rgba(233,169,17,0) 0%, rgba(233,169,17,0.5) 50%, rgba(233,169,17,0) 100%)`,
							opacity: 0.4,
							transform: 'rotate(-8deg)',
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};

const Background: React.FC = () => {
	const frame = useCurrentFrame();
	const glowX = 50 + Math.sin(frame / 90) * 10;
	const glowY = 60 + Math.cos(frame / 110) * 8;
	return (
		<AbsoluteFill style={{background: '#060c28'}}>
			<AbsoluteFill style={{background: `radial-gradient(120% 110% at 50% 35%, #1b3aa8 0%, ${BLUE} 38%, #0a1645 72%, #060c28 100%)`}} />
			<AbsoluteFill style={{background: `radial-gradient(40% 45% at ${glowX}% ${glowY}%, rgba(233,169,17,0.30), rgba(233,169,17,0) 70%)`}} />
			<AbsoluteFill style={{background: `radial-gradient(30% 35% at 18% 22%, rgba(72,116,255,0.28), rgba(72,116,255,0) 70%)`}} />
			<Streaks />
			<Particles count={60} blur={1.5} />
			<AbsoluteFill style={{background: 'radial-gradient(110% 110% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)'}} />
		</AbsoluteFill>
	);
};

/* ------------------------------- Phone -------------------------------- */

const S = 1.12;

const PhoneShot: React.FC<{
	src: string;
	w: number;
	h: number;
	fromX: number; // entrance start x (relative to final)
	x: number; // final x (canvas-centred)
	y: number;
	scale?: number;
	rotY: number; // starting 3D rotation, settles to 0
	delay: number;
	phase: number;
	glow?: string;
}> = ({src, w, h, fromX, x, y, scale = 1, rotY, delay, phase, glow = ORANGE}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const dispW = w * S * scale;
	const dispH = h * S * scale;

	const enter = spring({fps, frame: frame - delay, config: {damping: 200}, durationInFrames: 50});
	const px = interpolate(enter, [0, 1], [fromX, x]);
	const rise = (1 - enter) * 70;
	const sc = 0.9 + 0.1 * enter;
	const ry = rotY * (1 - enter) + Math.sin(frame / 50 + phase) * 2.5;
	const blur = (1 - enter) * 14;
	const opacity = interpolate(enter, [0, 1], [0, 1], {extrapolateRight: 'clamp'});
	const bob = Math.sin(frame / 32 + phase) * 14 * enter;

	return (
		<div
			style={{
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: `translate(-50%, -50%) translate(${px}px, ${y + rise + bob}px)`,
			}}
		>
			<div
				style={{
					transform: `perspective(3000px) rotateY(${ry}deg) scale(${sc})`,
					filter: `drop-shadow(0 40px 70px rgba(0,0,0,0.55)) drop-shadow(0 0 60px ${glow}55)`,
					opacity,
				}}
			>
				<Img src={src} style={{width: dispW, height: dispH, display: 'block', filter: blur > 0.1 ? `blur(${blur}px)` : 'none'}} />
			</div>
		</div>
	);
};

/* ------------------------------- Text --------------------------------- */

const PremiumText: React.FC<{text: string; top: number; underline?: boolean}> = ({text, top, underline = true}) => {
	const frame = useCurrentFrame();
	const words = text.split(' ');
	return (
		<AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start'}}>
			<div style={{position: 'absolute', top, textAlign: 'center'}}>
				<div style={{display: 'flex', gap: 22, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 2600}}>
					{words.map((word, i) => {
						const local = frame - i * 6;
						const o = interpolate(local, [0, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
						const ty = interpolate(local, [0, 14], [34, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
						const bl = interpolate(local, [0, 14], [12, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
						return (
							<span
								key={i}
								style={{
									fontFamily: FONT,
									fontSize: 96,
									fontWeight: 700,
									color: '#fff',
									letterSpacing: -1,
									opacity: o,
									transform: `translateY(${ty}px)`,
									filter: bl > 0.1 ? `blur(${bl}px)` : 'none',
									textShadow: '0 6px 40px rgba(0,0,0,0.5)',
								}}
							>
								{word}
							</span>
						);
					})}
				</div>
				{underline ? (
					<div
						style={{
							height: 8,
							marginTop: 28,
							marginLeft: 'auto',
							marginRight: 'auto',
							width: 460,
							borderRadius: 8,
							background: `linear-gradient(90deg, ${ORANGE}, #ffd76b)`,
							transform: `scaleX(${interpolate(frame, [words.length * 6 + 6, words.length * 6 + 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})})`,
							boxShadow: `0 0 30px ${ORANGE}aa`,
						}}
					/>
				) : null}
			</div>
		</AbsoluteFill>
	);
};

/* ------------------------------- Rings -------------------------------- */

const Rings: React.FC<{intro?: boolean}> = ({intro = false}) => {
	const frame = useCurrentFrame();
	const grow = intro ? spring({fps: 60, frame, config: {damping: 200}, durationInFrames: 50}) : 1;
	return (
		<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
			<svg width={1800} height={1800} viewBox="0 0 1800 1800" style={{opacity: 0.5 * grow, transform: `scale(${0.7 + 0.3 * grow}) rotate(${frame * 0.15}deg)`}}>
				{[420, 620, 820].map((r, i) => (
					<circle key={i} cx={900} cy={900} r={r} fill="none" stroke={i % 2 ? ORANGE : '#5e84ff'} strokeWidth={2} strokeDasharray={`${14} ${26}`} opacity={0.6 - i * 0.12} />
				))}
			</svg>
		</AbsoluteFill>
	);
};

/* ------------------------------- Logo --------------------------------- */

const LogoReveal: React.FC<{big?: boolean}> = ({big = false}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({fps, frame, config: {damping: 200}, durationInFrames: 40});
	const pulse = interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp'});
	const width = (big ? 1500 : 1200) * (0.9 + 0.1 * s);
	return (
		<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
			{/* expanding light pulse */}
			<div
				style={{
					position: 'absolute',
					width: 700,
					height: 700,
					borderRadius: '50%',
					border: `3px solid ${ORANGE}`,
					opacity: (1 - pulse) * 0.7,
					transform: `scale(${0.4 + pulse * 2.2})`,
				}}
			/>
			{/* glow orb behind logo */}
			<div style={{position: 'absolute', width: 1400, height: 1400, borderRadius: '50%', background: `radial-gradient(circle, rgba(233,169,17,0.28) 0%, rgba(72,116,255,0.16) 40%, rgba(0,0,0,0) 70%)`, opacity: s}} />
			<img
				src={logo}
				alt="mashop"
				style={{
					width,
					opacity: s,
					filter: `brightness(0) invert(1) drop-shadow(0 0 40px rgba(255,255,255,0.45)) drop-shadow(0 0 90px ${ORANGE}66)`,
					transform: `translateY(${(1 - s) * 20}px)`,
				}}
			/>
		</AbsoluteFill>
	);
};

/* ------------------------------ Phases -------------------------------- */

const fadeInOut = (frame: number, dur: number, fin = 14, fout = 14) =>
	Math.min(
		interpolate(frame, [0, fin], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
		interpolate(frame, [dur - fout, dur], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
	);

const PhaseTwo: React.FC = () => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill style={{opacity: fadeInOut(frame, 100)}}>
			<PhoneShot src={gauche1} w={589} h={1308} fromX={-2400} x={-560} y={40} rotY={26} delay={4} phase={1} scale={0.96} glow="#5e84ff" />
			<PhoneShot src={droite1} w={590} h={1308} fromX={2400} x={560} y={40} rotY={-26} delay={12} phase={3} scale={0.96} glow={ORANGE} />
			<PremiumText text={TXT.p2} top={1660} />
		</AbsoluteFill>
	);
};

const PhaseThree: React.FC = () => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill style={{opacity: fadeInOut(frame, 190)}}>
			<PhoneShot src={centre} w={728} h={1471} fromX={0} x={0} y={-170} rotY={10} delay={2} phase={2} scale={1.04} glow={ORANGE} />
			<PremiumText text={TXT.p3} top={1840} />
		</AbsoluteFill>
	);
};

const PhaseFour: React.FC = () => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill style={{opacity: fadeInOut(frame, 160)}}>
			<PhoneShot src={gauche2} w={445} h={1178} fromX={-1400} x={-620} y={0} rotY={22} delay={4} phase={0} scale={1.12} glow="#5e84ff" />
			<PhoneShot src={droite2} w={445} h={1178} fromX={1400} x={620} y={0} rotY={-22} delay={12} phase={4} scale={1.12} glow={ORANGE} />
			<PremiumText text={TXT.p4} top={1700} />
		</AbsoluteFill>
	);
};

const PhaseFive: React.FC = () => {
	const frame = useCurrentFrame();
	const tag = interpolate(frame, [40, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<AbsoluteFill>
			<Rings />
			<LogoReveal big />
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
				<div style={{position: 'absolute', top: 1340, fontFamily: FONT, fontSize: 58, fontWeight: 500, color: '#cdd9ff', letterSpacing: 1, opacity: tag}}>
					{TXT.tagline}
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

/* ------------------------------- Main --------------------------------- */

export const Motion2: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	// Slow cinematic camera push.
	const cam = interpolate(frame, [0, durationInFrames], [1.03, 1.12], {extrapolateRight: 'clamp'});
	const camRot = Math.sin(frame / 150) * 1.2;

	const fadeOut = interpolate(frame, [durationInFrames - 24, durationInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const introBlackout = interpolate(frame, [0, 24], [1, 0], {extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{background: '#000'}}>
			<AbsoluteFill style={{transform: `perspective(4000px) scale(${cam}) rotateY(${camRot}deg)`}}>
				<Background />

				<Sequence from={0} durationInFrames={110}>
					<Rings intro />
					<LogoReveal />
				</Sequence>

				<Sequence from={90} durationInFrames={100}>
					<PhaseTwo />
				</Sequence>

				<Sequence from={180} durationInFrames={190}>
					<PhaseThree />
				</Sequence>

				<Sequence from={360} durationInFrames={160}>
					<PhaseFour />
				</Sequence>

				<Sequence from={510} durationInFrames={90}>
					<PhaseFive />
				</Sequence>
			</AbsoluteFill>

			{/* intro black-in and final fade-to-black */}
			<AbsoluteFill style={{background: '#000', opacity: Math.max(introBlackout, fadeOut), pointerEvents: 'none'}} />
		</AbsoluteFill>
	);
};
