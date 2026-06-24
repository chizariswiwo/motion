import React from 'react';
import {SCREEN_W, SCREEN_H} from './theme';

// A realistic phone body wrapping a fixed-resolution screen.
// The screen content is always designed at SCREEN_W x SCREEN_H; the whole
// phone is scaled by the parent.
export const PhoneFrame: React.FC<{
	children: React.ReactNode;
	island?: boolean;
}> = ({children, island = true}) => {
	const bezel = 14;
	return (
		<div
			style={{
				width: SCREEN_W + bezel * 2,
				height: SCREEN_H + bezel * 2,
				background: 'linear-gradient(145deg, #2b2b30 0%, #050507 55%, #1a1a1e 100%)',
				borderRadius: 68,
				padding: bezel,
				boxSizing: 'border-box',
				boxShadow:
					'0 2px 4px rgba(0,0,0,0.35), inset 0 0 2px rgba(255,255,255,0.25)',
				position: 'relative',
			}}
		>
			{/* side buttons */}
			<div style={{position: 'absolute', left: -3, top: 180, width: 3, height: 64, borderRadius: 4, background: '#1c1c20'}} />
			<div style={{position: 'absolute', left: -3, top: 264, width: 3, height: 100, borderRadius: 4, background: '#1c1c20'}} />
			<div style={{position: 'absolute', right: -3, top: 230, width: 3, height: 120, borderRadius: 4, background: '#1c1c20'}} />

			<div
				style={{
					width: SCREEN_W,
					height: SCREEN_H,
					borderRadius: 54,
					overflow: 'hidden',
					position: 'relative',
					background: '#fff',
				}}
			>
				{children}
				{island ? (
					<div
						style={{
							position: 'absolute',
							top: 14,
							left: '50%',
							transform: 'translateX(-50%)',
							width: 112,
							height: 33,
							background: '#000',
							borderRadius: 20,
							zIndex: 50,
						}}
					/>
				) : (
					<div
						style={{
							position: 'absolute',
							top: 16,
							left: '50%',
							transform: 'translateX(-50%)',
							width: 12,
							height: 12,
							background: '#000',
							borderRadius: '50%',
							zIndex: 50,
						}}
					/>
				)}
			</div>
		</div>
	);
};
