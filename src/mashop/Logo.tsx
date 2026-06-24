import React from 'react';
import {colors, fontFamily} from './theme';

// The "mashop" wordmark: navy text with an orange "o" rendered as a little
// shopping/soundwave mark (ring + three bars + a handle arc on top).
export const Logo: React.FC<{size?: number}> = ({size = 56}) => {
	const ring = size * 0.92;
	const stroke = Math.max(3, size * 0.13);
	const barW = Math.max(2.5, size * 0.09);
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'flex-end',
				fontFamily,
				fontWeight: 800,
				fontSize: size,
				letterSpacing: -size * 0.03,
				color: colors.navy,
				lineHeight: 1,
			}}
		>
			<span>mash</span>
			{/* custom "o" */}
			<span
				style={{
					position: 'relative',
					width: ring,
					height: ring,
					margin: `0 ${size * 0.02}px`,
					display: 'inline-block',
				}}
			>
				{/* handle arc */}
				<span
					style={{
						position: 'absolute',
						top: -ring * 0.16,
						left: '50%',
						transform: 'translateX(-50%)',
						width: ring * 0.5,
						height: ring * 0.35,
						borderTopLeftRadius: ring,
						borderTopRightRadius: ring,
						border: `${stroke * 0.7}px solid ${colors.orange}`,
						borderBottom: 'none',
					}}
				/>
				{/* ring */}
				<span
					style={{
						position: 'absolute',
						inset: 0,
						borderRadius: '50%',
						border: `${stroke}px solid ${colors.orange}`,
						boxSizing: 'border-box',
					}}
				/>
				{/* soundwave bars */}
				<span
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: barW * 0.8,
					}}
				>
					<i style={{width: barW, height: ring * 0.28, background: colors.orange, borderRadius: barW}} />
					<i style={{width: barW, height: ring * 0.5, background: colors.orange, borderRadius: barW}} />
					<i style={{width: barW, height: ring * 0.34, background: colors.orange, borderRadius: barW}} />
				</span>
			</span>
			<span>p</span>
		</div>
	);
};
