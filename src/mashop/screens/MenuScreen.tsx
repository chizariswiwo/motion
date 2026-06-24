import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, fontFamily} from '../theme';
import {Icon} from '../Icon';

const items: {name: string; icon: React.ComponentProps<typeof Icon>['name']}[] = [
	{name: 'Clients', icon: 'users'},
	{name: 'Commandes', icon: 'clipboard'},
	{name: 'Dépenses', icon: 'receipt'},
	{name: 'Retours', icon: 'rotate'},
	{name: 'Promotions', icon: 'percent'},
	{name: 'Fidélité', icon: 'medal'},
	{name: 'Rapport', icon: 'bars'},
	{name: 'Avis', icon: 'star'},
	{name: 'Points de vente', icon: 'store'},
	{name: 'Paramètres', icon: 'gear'},
	{name: 'Équipe', icon: 'team'},
	{name: 'Tickets', icon: 'ticket'},
];

export const MenuScreen: React.FC = () => {
	return (
		<AbsoluteFill style={{background: '#fff', fontFamily}}>
			{/* navy header */}
			<div
				style={{
					background: colors.navyHeader,
					padding: '64px 24px 26px',
					color: '#fff',
					position: 'relative',
				}}
			>
				<div style={{position: 'absolute', top: 60, right: 22, opacity: 0.9}}>
					<Icon name="close" size={26} color="#fff" />
				</div>
				<div
					style={{
						width: 58,
						height: 58,
						borderRadius: '50%',
						background: 'rgba(255,255,255,0.16)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontWeight: 700,
						fontSize: 22,
						marginBottom: 16,
					}}
				>
					KS
				</div>
				<div style={{fontSize: 25, fontWeight: 700}}>Kwetu Shop</div>
				<div style={{fontSize: 15, opacity: 0.8, marginTop: 3}}>Amani Ngandu</div>
			</div>

			{/* menu list */}
			<div style={{padding: '14px 14px'}}>
				{items.map((it) => {
					const active = it.name === 'Commandes';
					return (
						<div
							key={it.name}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 16,
								padding: '15px 16px',
								borderRadius: 14,
								marginBottom: 4,
								position: 'relative',
								background: active ? colors.tintOrange : 'transparent',
								color: active ? colors.orange : '#3a4150',
							}}
						>
							{active ? (
								<div
									style={{
										position: 'absolute',
										right: 10,
										top: 12,
										bottom: 12,
										width: 4,
										borderRadius: 4,
										background: colors.orange,
									}}
								/>
							) : null}
							<Icon name={it.icon} size={23} color={active ? colors.orange : '#6b7280'} strokeWidth={1.9} />
							<span style={{fontSize: 17.5, fontWeight: active ? 700 : 500}}>{it.name}</span>
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};
