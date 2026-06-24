import React from 'react';
import {fontFamily} from '../theme';

export const StatusBar: React.FC<{dark?: boolean; time?: string}> = ({
	dark = false,
	time = '08:13',
}) => {
	const fg = dark ? '#fff' : '#11151f';
	return (
		<div
			style={{
				height: 54,
				display: 'flex',
				alignItems: 'flex-end',
				justifyContent: 'space-between',
				padding: '0 30px 6px',
				fontFamily,
				color: fg,
			}}
		>
			<span style={{fontSize: 17, fontWeight: 700}}>{time}</span>
			<div style={{display: 'flex', alignItems: 'center', gap: 7}}>
				{/* signal */}
				<svg width="20" height="14" viewBox="0 0 20 14">
					{[0, 1, 2, 3].map((i) => (
						<rect
							key={i}
							x={i * 5}
							y={10 - i * 3}
							width={3.4}
							height={4 + i * 3}
							rx={1}
							fill={fg}
						/>
					))}
				</svg>
				{/* wifi */}
				<svg width="18" height="14" viewBox="0 0 18 14" fill="none">
					<path d="M9 12.5l2.2-2.7a3.4 3.4 0 00-4.4 0L9 12.5z" fill={fg} />
					<path d="M3.4 7.2a8 8 0 0111.2 0" stroke={fg} strokeWidth="1.8" strokeLinecap="round" />
					<path d="M5.6 9.4a5 5 0 016.8 0" stroke={fg} strokeWidth="1.8" strokeLinecap="round" />
				</svg>
				{/* battery */}
				<div style={{display: 'flex', alignItems: 'center', gap: 3}}>
					<span style={{fontSize: 12, fontWeight: 700}}>100</span>
					<div style={{width: 24, height: 13, borderRadius: 4, border: `1.5px solid ${fg}`, padding: 2, display: 'flex', alignItems: 'center'}}>
						<div style={{flex: 1, height: '100%', borderRadius: 1.5, background: fg}} />
					</div>
				</div>
			</div>
		</div>
	);
};
