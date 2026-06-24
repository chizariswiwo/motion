import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors} from '../theme';
import {Logo} from '../Logo';

// The brand splash shown on the two outer phones: a flat yellow field with
// the centered mashop wordmark.
export const SplashScreen: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				background: colors.brandYellow,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Logo size={58} />
		</AbsoluteFill>
	);
};
