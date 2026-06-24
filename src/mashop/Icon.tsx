import React from 'react';

type IconName =
	| 'users'
	| 'clipboard'
	| 'receipt'
	| 'rotate'
	| 'percent'
	| 'medal'
	| 'bars'
	| 'star'
	| 'store'
	| 'gear'
	| 'team'
	| 'ticket'
	| 'close'
	| 'search'
	| 'chat'
	| 'utensils'
	| 'scissors'
	| 'home'
	| 'wrench'
	| 'cart'
	| 'user'
	| 'tag'
	| 'sparkle'
	| 'trending'
	| 'eye'
	| 'alert'
	| 'plus'
	| 'box'
	| 'send'
	| 'dots'
	| 'chevron';

// Minimal stroke icon set. All icons drawn on a 24x24 grid.
const paths: Record<IconName, React.ReactNode> = {
	users: <><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19a5.5 5.5 0 0111 0" /><path d="M16 5.2a3.2 3.2 0 010 5.6" /><path d="M16.5 14.2A5.5 5.5 0 0120.5 19" /></>,
	clipboard: <><rect x="6" y="4.5" width="12" height="16" rx="2" /><path d="M9 4.5V3.5h6v1" /><path d="M9 9h6M9 12.5h6M9 16h4" /></>,
	receipt: <><path d="M6 3.5h12v17l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3z" /><path d="M9 8h6M9 11.5h6" /></>,
	rotate: <><path d="M5 5v4h4" /><path d="M5.5 9A7 7 0 1119 12" /></>,
	percent: <><circle cx="8" cy="8" r="2" /><circle cx="16" cy="16" r="2" /><path d="M7 17L17 7" /></>,
	medal: <><circle cx="12" cy="14" r="4.2" /><path d="M9 10.5L6.5 4M15 10.5L17.5 4" /><path d="M12 12.6v2.4M10.7 14.4l2.6 0" /></>,
	bars: <><path d="M5 20V4" /><rect x="7.5" y="12" width="3.2" height="6.5" /><rect x="12.5" y="8" width="3.2" height="10.5" /><rect x="17.5" y="5" width="3.2" height="13.5" /></>,
	star: <><path d="M12 4l2.3 4.8 5.2.7-3.8 3.6.9 5.1-4.6-2.5-4.6 2.5.9-5.1L4.5 9.5l5.2-.7z" /></>,
	store: <><path d="M5 9.5V19h14V9.5" /><path d="M4 5.5h16l1 4a3 3 0 01-6 0 3 3 0 01-6 0 3 3 0 01-6 0z" /><rect x="10" y="13" width="4" height="6" /></>,
	gear: <><circle cx="12" cy="12" r="3" /><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" /></>,
	team: <><circle cx="8" cy="9" r="2.6" /><circle cx="16" cy="9" r="2.6" /><path d="M3.5 19a4.5 4.5 0 019 0M11.5 19a4.5 4.5 0 019 0" /></>,
	ticket: <><path d="M4 8a2 2 0 012-2h12a2 2 0 012 2 2 2 0 000 4 2 2 0 010 4H6a2 2 0 01-2-2 2 2 0 000-4z" /><path d="M14 6.5v11" strokeDasharray="2 2" /></>,
	close: <><path d="M6 6l12 12M18 6L6 18" /></>,
	search: <><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>,
	chat: <><path d="M4.5 6.5a2 2 0 012-2h11a2 2 0 012 2v7a2 2 0 01-2 2H9l-4 3.5V6.5z" /></>,
	utensils: <><path d="M7 3v8M5 3v4.5a2 2 0 004 0V3M7 11v10" /><path d="M16 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9" /></>,
	scissors: <><circle cx="7" cy="7" r="2.4" /><circle cx="7" cy="17" r="2.4" /><path d="M9 8.5L20 18M9 15.5L20 6" /></>,
	home: <><path d="M4 11l8-6.5 8 6.5" /><path d="M6 9.8V20h12V9.8" /><rect x="10" y="14" width="4" height="6" /></>,
	wrench: <><path d="M15.5 7.5a3.8 3.8 0 01-4.9 4.9L5 18l1.5 1.5 5.6-5.6a3.8 3.8 0 004.9-4.9l-2.2 2.2-1.8-.4-.4-1.8z" /></>,
	cart: <><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2l2 11h11l2-7H6.5" /></>,
	user: <><circle cx="12" cy="8" r="3.4" /><path d="M5.5 20a6.5 6.5 0 0113 0" /></>,
	tag: <><path d="M4 12.5V4.5h8L20 12l-7.5 7.5z" /><circle cx="8.5" cy="8.5" r="1.3" /></>,
	sparkle: <><path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z" /><path d="M18 4l.7 1.8L20.5 6.5l-1.8.7L18 9l-.7-1.8L15.5 6.5l1.8-.7z" /></>,
	trending: <><path d="M4 15l5-5 3 3 7-7" /><path d="M16 6h4v4" /></>,
	eye: <><path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" /><circle cx="12" cy="12" r="2.6" /></>,
	alert: <><path d="M12 4L2.5 20h19z" /><path d="M12 10v5M12 17.5v.5" /></>,
	plus: <><path d="M12 5v14M5 12h14" /></>,
	box: <><path d="M4 8l8-4 8 4-8 4-8-4z" /><path d="M4 8v8l8 4 8-4V8" /><path d="M12 12v8" /></>,
	send: <><path d="M21 4L3 11l7 2.5L13 21l8-17z" /><path d="M10 13.5L21 4" /></>,
	dots: <><circle cx="12" cy="5" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="12" cy="19" r="1.4" /></>,
	chevron: <><path d="M9 6l6 6-6 6" /></>,
};

export const Icon: React.FC<{
	name: IconName;
	size?: number;
	color?: string;
	strokeWidth?: number;
	fill?: boolean;
}> = ({name, size = 22, color = 'currentColor', strokeWidth = 1.8, fill = false}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill={fill ? color : 'none'}
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			{paths[name]}
		</svg>
	);
};
