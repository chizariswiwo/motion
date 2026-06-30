import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const URL = 'www.jennyparia.com';
const BLUE = '#1a73e8';

const TYPE_START = 30;
const PER_CHAR = 3.4;
const TYPE_END = TYPE_START + URL.length * PER_CHAR; // ~91
const ENTER = TYPE_END + 16; // ~107

const Spinner: React.FC<{size?: number; color?: string; stroke?: number}> = ({size = 26, color = BLUE, stroke = 3}) => {
	const frame = useCurrentFrame();
	const rot = (frame * 11) % 360;
	const r = 12 - stroke;
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" style={{transform: `rotate(${rot}deg)`}}>
			<circle cx={12} cy={12} r={r} fill="none" stroke={color} strokeOpacity={0.2} strokeWidth={stroke} />
			<path d={`M12 ${12 - r} a ${r} ${r} 0 0 1 ${r} ${r}`} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
		</svg>
	);
};

const Globe: React.FC<{size?: number; color?: string}> = ({size = 18, color = '#5f6368'}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7}>
		<circle cx="12" cy="12" r="9" />
		<path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
	</svg>
);

const NavIcon: React.FC<{d: string; color?: string}> = ({d, color = '#5f6368'}) => (
	<svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d={d} />
	</svg>
);

export const BrowserType: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Window entrance.
	const intro = spring({fps, frame, config: {damping: 200}, durationInFrames: 14});
	const winScale = interpolate(intro, [0, 1], [0.965, 1]);
	const winY = interpolate(intro, [0, 1], [26, 0]);

	const entered = frame >= ENTER;

	// Typewriter.
	const nChars = Math.max(0, Math.min(URL.length, Math.floor((frame - TYPE_START) / PER_CHAR)));
	const typed = URL.slice(0, nChars);
	const isTyping = frame >= TYPE_START && frame < TYPE_END;
	const caretOn = isTyping ? true : Math.floor(frame / 15) % 2 === 0;

	// New-tab content fades out; loading view fades in after Enter.
	const contentOpacity = interpolate(frame, [ENTER, ENTER + 12], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const loadOpacity = interpolate(frame, [ENTER + 4, ENTER + 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Loading progress bar.
	const progress = interpolate(frame, [ENTER, ENTER + 18, durationInFrames], [0, 0.72, 0.93], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{background: 'linear-gradient(140deg, #dfe6f0 0%, #c9d4e6 50%, #d7dcea 100%)', fontFamily: FONT}}>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
				<div
					style={{
						width: 1640,
						height: 920,
						background: '#fff',
						borderRadius: 16,
						boxShadow: '0 40px 90px rgba(20,30,60,0.30), 0 8px 24px rgba(20,30,60,0.18)',
						overflow: 'hidden',
						transform: `translateY(${winY}px) scale(${winScale})`,
						opacity: intro,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{/* tab strip */}
					<div style={{height: 50, background: '#dee1e6', display: 'flex', alignItems: 'flex-end', paddingLeft: 18, gap: 10}}>
						<div style={{display: 'flex', gap: 9, alignItems: 'center', paddingBottom: 16, paddingRight: 8}}>
							<span style={{width: 14, height: 14, borderRadius: '50%', background: '#ff5f57'}} />
							<span style={{width: 14, height: 14, borderRadius: '50%', background: '#febc2e'}} />
							<span style={{width: 14, height: 14, borderRadius: '50%', background: '#28c840'}} />
						</div>
						<div
							style={{
								height: 40,
								minWidth: 260,
								background: '#fff',
								borderTopLeftRadius: 12,
								borderTopRightRadius: 12,
								display: 'flex',
								alignItems: 'center',
								gap: 10,
								padding: '0 16px',
								fontSize: 15,
								color: '#3c4043',
							}}
						>
							{entered ? <Spinner size={17} stroke={2.4} /> : <Globe size={16} />}
							<span style={{fontWeight: 500}}>{entered ? 'jennyparia.com' : 'Nouvel onglet'}</span>
							<span style={{marginLeft: 8, color: '#9aa0a6', fontSize: 18}}>×</span>
						</div>
						<span style={{paddingBottom: 16, color: '#5f6368', fontSize: 22}}>+</span>
					</div>

					{/* toolbar */}
					<div style={{height: 60, background: '#f1f3f4', display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px'}}>
						<NavIcon d="M15 6l-6 6 6 6" color={entered ? '#5f6368' : '#bdc1c6'} />
						<NavIcon d="M9 6l6 6-6 6" color="#bdc1c6" />
						{entered ? <Spinner size={20} stroke={2.2} color="#5f6368" /> : <NavIcon d="M4 12a8 8 0 108-8 8 8 0 00-7 4M4 4v4h4" color="#5f6368" />}
						{/* address bar */}
						<div style={{flex: 1, height: 38, background: '#fff', border: '1px solid #e0e2e6', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px'}}>
							{entered ? (
								<>
									<NavIcon d="M7 11V8a5 5 0 0110 0v3M5 11h14v9H5z" color="#5f6368" />
									<span style={{fontSize: 15.5, color: '#202124'}}>https://{URL}</span>
								</>
							) : (
								<>
									<svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth={2}><circle cx="11" cy="11" r="7" /><path d="M16 16l4.5 4.5" strokeLinecap="round" /></svg>
									<span style={{fontSize: 15.5, color: '#9aa0a6'}}>Rechercher ou saisir une adresse web</span>
								</>
							)}
						</div>
						<NavIcon d="M12 5v.01M12 12v.01M12 19v.01" color="#5f6368" />
					</div>

					{/* loading progress bar */}
					{entered ? (
						<div style={{height: 3, background: 'transparent'}}>
							<div style={{height: '100%', width: `${progress * 100}%`, background: BLUE}} />
						</div>
					) : (
						<div style={{height: 3}} />
					)}

					{/* page area */}
					<div style={{flex: 1, position: 'relative', background: '#fff'}}>
						{/* NEW TAB: centred typing */}
						<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: contentOpacity, flexDirection: 'column', gap: 46}}>
							<div style={{fontSize: 58, fontWeight: 700, letterSpacing: -0.5, color: '#202124'}}>
								jenny<span style={{color: '#E0457B'}}>paria</span>
							</div>
							<div
								style={{
									width: 760,
									height: 66,
									border: '1px solid #dfe1e5',
									borderRadius: 33,
									boxShadow: '0 1px 8px rgba(32,33,36,0.16)',
									display: 'flex',
									alignItems: 'center',
									gap: 16,
									padding: '0 24px',
								}}
							>
								<svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth={2}><circle cx="11" cy="11" r="7" /><path d="M16 16l4.5 4.5" strokeLinecap="round" /></svg>
								<span style={{fontSize: 24, color: '#202124', whiteSpace: 'pre'}}>{typed}</span>
								<span style={{width: 2, height: 30, background: '#202124', opacity: caretOn ? 1 : 0, marginLeft: -8}} />
							</div>
						</AbsoluteFill>

						{/* LOADING view */}
						<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: loadOpacity}}>
							<Spinner size={64} stroke={5} />
						</AbsoluteFill>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
