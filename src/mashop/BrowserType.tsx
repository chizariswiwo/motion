import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const URL = 'www.jennyparia.com';

// Dark theme
const CHOCOLATE = '#B5793E';
const GRAY = '#9aa0a6';
const PAGE = '#202124';
const CHROME = '#292a2d';
const TABSTRIP = '#1d1e20';
const ADDR = '#3c4043';
const ICON = '#c4c7ca';
const TEXT = '#e8eaed';
const PLACEHOLDER = '#9aa0a6';

const TYPE_START = 30;
const PER_CHAR = 6; // slower typing
const TYPE_END = TYPE_START + URL.length * PER_CHAR; // ~138
const ENTER = TYPE_END + 18; // ~156

const Spinner: React.FC<{size?: number; color?: string; stroke?: number}> = ({size = 26, color = GRAY, stroke = 3}) => {
	const frame = useCurrentFrame();
	const rot = (frame * 11) % 360;
	const r = 12 - stroke;
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" style={{transform: `rotate(${rot}deg)`}}>
			<circle cx={12} cy={12} r={r} fill="none" stroke={color} strokeOpacity={0.25} strokeWidth={stroke} />
			<path d={`M12 ${12 - r} a ${r} ${r} 0 0 1 ${r} ${r}`} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
		</svg>
	);
};

const Globe: React.FC<{size?: number; color?: string}> = ({size = 18, color = ICON}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7}>
		<circle cx="12" cy="12" r="9" />
		<path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
	</svg>
);

const NavIcon: React.FC<{d: string; color?: string}> = ({d, color = ICON}) => (
	<svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d={d} />
	</svg>
);

export const BrowserType: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const intro = spring({fps, frame, config: {damping: 200}, durationInFrames: 14});
	const winScale = interpolate(intro, [0, 1], [0.965, 1]);
	const winY = interpolate(intro, [0, 1], [26, 0]);

	const entered = frame >= ENTER;

	const nChars = Math.max(0, Math.min(URL.length, Math.floor((frame - TYPE_START) / PER_CHAR)));
	const typed = URL.slice(0, nChars);
	const isTyping = frame >= TYPE_START && frame < TYPE_END;
	const caretOn = isTyping ? true : Math.floor(frame / 15) % 2 === 0;

	const contentOpacity = interpolate(frame, [ENTER, ENTER + 12], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const loadOpacity = interpolate(frame, [ENTER + 4, ENTER + 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const progress = interpolate(frame, [ENTER, ENTER + 18, durationInFrames], [0, 0.72, 0.94], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{background: 'linear-gradient(140deg, #15171c 0%, #0c0d11 55%, #14161b 100%)', fontFamily: FONT}}>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
				<div
					style={{
						width: 1640,
						height: 920,
						background: PAGE,
						borderRadius: 16,
						boxShadow: '0 40px 90px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.45)',
						overflow: 'hidden',
						transform: `translateY(${winY}px) scale(${winScale})`,
						opacity: intro,
						display: 'flex',
						flexDirection: 'column',
						border: '1px solid #000',
					}}
				>
					{/* tab strip */}
					<div style={{height: 50, background: TABSTRIP, display: 'flex', alignItems: 'flex-end', paddingLeft: 18, gap: 10}}>
						<div style={{display: 'flex', gap: 9, alignItems: 'center', paddingBottom: 16, paddingRight: 8}}>
							<span style={{width: 14, height: 14, borderRadius: '50%', background: '#ff5f57'}} />
							<span style={{width: 14, height: 14, borderRadius: '50%', background: '#febc2e'}} />
							<span style={{width: 14, height: 14, borderRadius: '50%', background: '#28c840'}} />
						</div>
						<div
							style={{
								height: 40,
								minWidth: 260,
								background: CHROME,
								borderTopLeftRadius: 12,
								borderTopRightRadius: 12,
								display: 'flex',
								alignItems: 'center',
								gap: 10,
								padding: '0 16px',
								fontSize: 15,
								color: TEXT,
							}}
						>
							{entered ? <Spinner size={17} stroke={2.4} /> : <Globe size={16} />}
							<span style={{fontWeight: 500}}>{entered ? 'jennyparia.com' : 'Nouvel onglet'}</span>
							<span style={{marginLeft: 8, color: GRAY, fontSize: 18}}>×</span>
						</div>
						<span style={{paddingBottom: 16, color: ICON, fontSize: 22}}>+</span>
					</div>

					{/* toolbar */}
					<div style={{height: 60, background: CHROME, display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px'}}>
						<NavIcon d="M15 6l-6 6 6 6" color={entered ? ICON : '#5f6368'} />
						<NavIcon d="M9 6l6 6-6 6" color="#5f6368" />
						{entered ? <Spinner size={20} stroke={2.2} color={ICON} /> : <NavIcon d="M4 12a8 8 0 108-8 8 8 0 00-7 4M4 4v4h4" color={ICON} />}
						<div style={{flex: 1, height: 38, background: ADDR, borderRadius: 20, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px'}}>
							{entered ? (
								<>
									<NavIcon d="M7 11V8a5 5 0 0110 0v3M5 11h14v9H5z" color={ICON} />
									<span style={{fontSize: 15.5, color: TEXT}}>https://{URL}</span>
								</>
							) : (
								<>
									<svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={PLACEHOLDER} strokeWidth={2}><circle cx="11" cy="11" r="7" /><path d="M16 16l4.5 4.5" strokeLinecap="round" /></svg>
									<span style={{fontSize: 15.5, color: PLACEHOLDER}}>Rechercher ou saisir une adresse web</span>
								</>
							)}
						</div>
						<NavIcon d="M12 5v.01M12 12v.01M12 19v.01" color={ICON} />
					</div>

					{/* loading progress bar */}
					{entered ? (
						<div style={{height: 3, background: 'transparent'}}>
							<div style={{height: '100%', width: `${progress * 100}%`, background: CHOCOLATE}} />
						</div>
					) : (
						<div style={{height: 3}} />
					)}

					{/* page area */}
					<div style={{flex: 1, position: 'relative', background: PAGE}}>
						{/* NEW TAB: centred typing */}
						<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: contentOpacity, flexDirection: 'column', gap: 46}}>
							<div style={{fontSize: 60, fontWeight: 700, letterSpacing: 0.5, color: CHOCOLATE}}>Jenny Paria</div>
							<div
								style={{
									width: 760,
									height: 66,
									background: '#2b2d31',
									border: '1px solid #3c4043',
									borderRadius: 33,
									boxShadow: '0 2px 12px rgba(0,0,0,0.45)',
									display: 'flex',
									alignItems: 'center',
									gap: 16,
									padding: '0 24px',
								}}
							>
								<svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={PLACEHOLDER} strokeWidth={2}><circle cx="11" cy="11" r="7" /><path d="M16 16l4.5 4.5" strokeLinecap="round" /></svg>
								<span style={{fontSize: 24, color: TEXT, whiteSpace: 'pre'}}>{typed}</span>
								<span style={{width: 2, height: 30, background: TEXT, opacity: caretOn ? 1 : 0, marginLeft: -8}} />
							</div>
						</AbsoluteFill>

						{/* LOADING view — grey spinner */}
						<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: loadOpacity}}>
							<Spinner size={64} stroke={5} color={GRAY} />
						</AbsoluteFill>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
