import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, fontFamily} from '../theme';
import {Icon} from '../Icon';

const StatCard: React.FC<{
	value: string;
	label: string;
	sub: string;
	valueColor?: string;
	icon: React.ComponentProps<typeof Icon>['name'];
	iconBg: string;
	iconColor: string;
	rightIcon?: React.ComponentProps<typeof Icon>['name'];
}> = ({value, label, sub, valueColor = colors.textDark, icon, iconBg, iconColor, rightIcon}) => (
	<div style={{flex: 1, background: '#fff', borderRadius: 18, padding: 16, boxShadow: '0 6px 16px rgba(20,30,60,0.05)'}}>
		<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
			<div style={{width: 36, height: 36, borderRadius: 11, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<Icon name={icon} size={20} color={iconColor} strokeWidth={2} />
			</div>
			{rightIcon ? <Icon name={rightIcon} size={19} color={colors.textLight} /> : null}
		</div>
		<div style={{fontSize: 26, fontWeight: 800, color: valueColor, marginTop: 14}}>{value}</div>
		<div style={{fontSize: 14.5, fontWeight: 600, color: '#3a4150', marginTop: 2}}>{label}</div>
		<div style={{fontSize: 12.5, color: colors.textGray, marginTop: 5}}>{sub}</div>
	</div>
);

const ActionBtn: React.FC<{label: string; icon: React.ComponentProps<typeof Icon>['name']; primary?: boolean}> = ({label, icon, primary}) => (
	<div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9}}>
		<div
			style={{
				width: '100%',
				height: 74,
				borderRadius: 18,
				background: primary ? colors.orange : '#fff',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				boxShadow: primary ? '0 8px 18px rgba(240,127,26,0.35)' : '0 6px 16px rgba(20,30,60,0.05)',
			}}
		>
			<Icon name={icon} size={26} color={primary ? '#fff' : colors.navyHeader} strokeWidth={2} />
		</div>
		<span style={{fontSize: 12.5, fontWeight: 600, color: '#3a4150', textAlign: 'center'}}>{label}</span>
	</div>
);

export const DashboardScreen: React.FC = () => {
	return (
		<AbsoluteFill style={{background: colors.screenBg, fontFamily, color: colors.textDark}}>
			{/* navy header */}
			<div style={{background: colors.navyHeader, padding: '60px 24px 22px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<span style={{fontSize: 23, fontWeight: 800}}>Kwetu Shop</span>
				<Icon name="dots" size={24} color="#fff" />
			</div>

			<div style={{padding: '18px 20px 0'}}>
				{/* stat grid */}
				<div style={{display: 'flex', gap: 14}}>
					<StatCard value="$900.00" label="Chiffre d'affaires" sub="Total: $246,650.00" icon="bars" iconBg={colors.tintBlue} iconColor={colors.navyHeader} />
					<StatCard value="$325.00" label="Disponible" sub="Bénéfice: $150.00" valueColor={colors.green} icon="trending" iconBg={colors.tintGreen} iconColor={colors.green} rightIcon="eye" />
				</div>
				<div style={{display: 'flex', gap: 14, marginTop: 14}}>
					<StatCard value="$425.00" label="Total sorties" sub="Charges et coûts" icon="receipt" iconBg={colors.tintOrange} iconColor={colors.orange} />
					<StatCard value="$550.00" label="Dettes totales" sub="À recouvrer" valueColor={colors.red} icon="alert" iconBg={colors.tintRed} iconColor={colors.red} />
				</div>

				{/* actions */}
				<div style={{display: 'flex', gap: 14, marginTop: 22}}>
					<ActionBtn label="Nouvelle vente" icon="plus" primary />
					<ActionBtn label="Nouveau produit" icon="box" />
					<ActionBtn label="Publier" icon="send" />
				</div>

				{/* chart */}
				<div style={{marginTop: 26}}>
					<div style={{fontSize: 18, fontWeight: 800}}>Revenus vs Dépenses</div>
					<div style={{marginTop: 16, height: 200, display: 'flex', alignItems: 'flex-end', gap: 30, paddingLeft: 8}}>
						<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
							<span style={{fontSize: 12.5, color: colors.textGray}}>900</span>
							<div style={{width: 64, height: 170, borderRadius: 12, background: `linear-gradient(180deg, ${colors.navyHeader}, #2c3f7a)`}} />
						</div>
						<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
							<span style={{fontSize: 12.5, color: colors.textGray}}>150</span>
							<div style={{width: 64, height: 34, borderRadius: 12, background: colors.brandYellow}} />
						</div>
					</div>
				</div>
			</div>

			{/* bottom nav */}
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: 84,
					background: '#fff',
					borderTop: `1px solid ${colors.line}`,
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'flex-start',
					paddingTop: 12,
				}}
			>
				{[
					{n: 'Articles', i: 'box', a: false},
					{n: 'Ventes', i: 'cart', a: false},
					{n: 'Commandes', i: 'clipboard', a: false},
					{n: 'Plus', i: 'dots', a: false},
				].map((t) => (
					<div key={t.n} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5}}>
						<Icon name={t.i as React.ComponentProps<typeof Icon>['name']} size={23} color={colors.textLight} strokeWidth={1.8} />
						<span style={{fontSize: 11.5, fontWeight: 500, color: colors.textLight}}>{t.n}</span>
					</div>
				))}
			</div>
		</AbsoluteFill>
	);
};
