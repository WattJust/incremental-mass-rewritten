const SCALE_START = {
    super: {
        rank: E(100),
		tier: E(10),
		tetr: E(7),
		pent: E(15),
		hex: E(10),
        massUpg: E(250),
		tickspeed: E(100),
		bh_condenser: E(100),
		gamma_ray: E(100),
		supernova: E(15),
		fTier: E(10),
		cosmic_str: E(15),
		prestige0: E(15),
		prestige1: E(7),
		prestige2: E(30),
		prestige3: E(8),
		prestige4: E(10),
		massUpg4: E(50),
		FSS: E(5),
		fvm: E(1e11),
		pe: E(25),
		inf_theorem: E(10),
		ascension0: E(20),
		ascension1: E(10),
		gal_prestige: E(10),
    },
	hyper: {
		rank: E(120),
		tier: E(200),
		tetr: E(60),
		pent: E(60),
		hex: E(60),
		massUpg: E(500),
		tickspeed: E(250),
		bh_condenser: E(300),
		gamma_ray: E(300),
		supernova: E(35),
		fTier: E(50),
		cosmic_str: E(90),
		prestige0: E(80),
		prestige1: E(60),
		prestige2: E(60),
		prestige3: E(55),
		massUpg4: E(250),
		FSS: E(32),
	},
	ultra: {
		rank: E(600),
		tier: E(1e5),
		tetr: E(150),
		pent: E(1200),
		hex: E(2e12),
		massUpg: E(1e11),
		tickspeed: E(700),
		bh_condenser: E(750),
		gamma_ray: E(800),
		supernova: E(60),
		fTier: E(100),
		prestige0: E(320),
		prestige1: E(200),
	},
	meta: {
		rank: E(1e4),
		tier: E(1e9),
		tetr: E(1e10),
		tickspeed: E(5e4),
		bh_condenser: E(1e7),
		gamma_ray: E(1e6),
		supernova: E(100),
		fTier: E(1.25e4),
		prestige0: E(3500),
	},
	exotic: {
		rank: E(1e16),
		tier: E(1e25),
		supernova: E(2e5),
	},
	supercritical: {
		rank: E(1e37),
		supernova: E(1e7),
	},
	instant: {
		rank: E('e400'),
		fvm: E(1e25),
	},
	mega: {
		
	},
}

const SCALE_POWER= {
    super: {
		rank: 1.5,
		tier: 1.5,
		tetr: 2,
		pent: 2,
		hex: 2.5,
		massUpg: 2.5,
		tickspeed: 2,
		bh_condenser: 2,
		gamma_ray: 2,
		supernova: 3,
		fTier: 2.5,
		cosmic_str: 2,
		prestige0: 1.5,
		prestige1: 1.5,
		prestige2: 2,
		prestige3: 2,
		prestige4: 2.5,
		massUpg4: 3,
		FSS: 2,
		fvm: 10,
		pe: 2,
		inf_theorem: 2,
		ascension0: 2,
		ascension1: 2,
		gal_prestige: 2,
    },
	hyper: {
		rank: 2.5,
		tier: 2.5,
		tetr: 3,
		pent: 3,
		hex: 3.5,
		massUpg: 5,
		tickspeed: 4,
		bh_condenser: 2,
		gamma_ray: 4,
		supernova: 3,
		fTier: 4,
		cosmic_str: 4,
		prestige0: 2,
		prestige1: 2,
		prestige2: 3,
		prestige3: 3,
		massUpg4: 8,
		FSS: 3,
	},
	ultra: {
		rank: 4,
		tier: 4,
		tetr: 6,
		pent: 6,
		hex: 8,
		massUpg: 10,
		tickspeed: 7,
		bh_condenser: 4,
		gamma_ray: 6,
		supernova: 5,
		fTier: 6,
		prestige0: 3,
		prestige1: 3,
	},
	meta: {
		rank: 1.0025,
		tier: 1.0000001,
		tetr: 1.00000001,
		tickspeed: 1.001,
		bh_condenser: 1.001,
		gamma_ray: 1.001,
		supernova: 1.025,
		fTier: 1.001,
		prestige0: 1.0025,
	},
	exotic: {
		rank: 15,
		tier: 20,
		supernova: 20,
	},
	supercritical: {
		rank: 50,
		supernova: 75,
	},
	instant: {
		rank: 3,
		fvm: 10,
	},
	mega: {

	},
}

const SCALE_FP = {
	tickspeed() { return [1,1,1,tmp.tickspeedFP] },
}

const QCM8_SCALES = ['rank','tier','tetr','pent','hex','massUpg','tickspeed','bh_condenser','gamma_ray','supernova','fTier']
const PreQ_SCALES = ['rank','tier','tetr','massUpg','tickspeed','bh_condenser','gamma_ray']
const SCALE_TYPE = ['super', 'hyper', 'ultra', 'meta', 'exotic', 'supercritical', 'instant', 'mega'] // super, hyper, ultra, meta, exotic
const FULL_SCALE_NAME = ['Super', 'Hyper', 'Ultra', 'Meta', 'Exotic', 'Supercritical', 'Instant', 'Mega']

const SCALING_RES = {
    rank(x=0) { return player.ranks.rank },
	tier(x=0) { return player.ranks.tier },
	tetr(x=0) { return player.ranks.tetr },
	pent(x=0) { return player.ranks.pent },
	hex(x=0) { return player.ranks.hex },
	tickspeed(x=0) { return player.build.tickspeed.amt },
    massUpg(x=1) { return player.build["mass_"+(x+1)].amt },
	bh_condenser(x=0) { return player.build.bhc.amt },
	gamma_ray(x=0) { return player.build.cosmic_ray.amt },
	supernova(x=0) { return player.supernova.times },
	fTier(x=0, y=0) { return player.supernova.fermions.tiers[x][y] },
	cosmic_str(x=0) { return player.build.cosmic_string.amt },
	prestige0() { return player.prestiges[0] },
	prestige1() { return player.prestiges[1] },
	prestige2() { return player.prestiges[2] },
	prestige3() { return player.prestiges[3] },
	prestige4() { return player.prestiges[4] },
	massUpg4() { return player.build.mass_4.amt },
	FSS() { return player.dark.matters.final },
	fvm() { return player.build.fvm.amt },
	pe() { return player.build.pe.amt },
	inf_theorem() { return player.inf.theorem },
	ascension0() { return player.ascensions[0] },
	ascension1() { return player.ascensions[1] },
	gal_prestige() { return player.gal_prestige },
}

const NAME_FROM_RES = {
	rank: "Rank",
	tier: "Tier",
	tetr: "Tetr",
	pent: "Pent",
	hex: "Hex",
	massUpg: "Mass Upgrades 1-3",
	tickspeed: "Tickspeed",
	bh_condenser: "Black Hole Condenser",
	gamma_ray: "Cosmic Ray",
	supernova: "Supernova",
	fTier: "Fermion Tier",
	cosmic_str: "Cosmic String",
	prestige0: "Prestige Level",
	prestige1: "Honor",
	prestige2: "Glory",
	prestige3: "Renown",
	prestige4: "Valor",
	massUpg4: "Overpower",
	FSS: "Final Star Shard",
	fvm: "False Vacuum Manipulator",
	pe: "Parallel Extruder",
	inf_theorem: "Infinity Theorem",
	ascension0: "Ascension",
	ascension1: "Transcension",
	gal_prestige: "Galactic Prestige",
}

const C18_SCALING = [
	'rank','tier','tetr','pent','hex','massUpg','tickspeed','bh_condenser','gamma_ray','supernova','fTier',
	'cosmic_str','prestige0','prestige1','prestige2','prestige3','massUpg4','FSS','fvm'
]

function updateScalingHTML() {
	let s = SCALE_TYPE[player.scaling_ch]
	// tmp.el.scaling_name.setTxt(FULL_SCALE_NAME[player.scaling_ch])
	if (!tmp.scaling) return
	for (let x = 0; x < SCALE_TYPE.length; x++) {
		let type = SCALE_TYPE[x]
		tmp.el["scaling_div_"+x].setDisplay(player.scaling_ch == x)
		if (player.scaling_ch == x) {
			for (let key in SCALE_START[type]) {
				let have = tmp.scaling[type].includes(key)
				tmp.el['scaling_'+x+'_'+key+'_div'].setDisplay(have)
				if (have) {
					let p = tmp.scaling_power[type][key], q = Decimal.pow(SCALE_POWER[type][key],p)
					tmp.el['scaling_'+x+'_'+key+'_power'].setTxt(format(p.mul(100))+"%, "+(x%4==3?q.format()+"^":"^"+q.format()+(x>=6?" to exponent":"")))
					tmp.el['scaling_'+x+'_'+key+'_start'].setTxt(format(tmp.scaling_start[type][key],0))
				}
			}
		}
	}
}

function updateScalingTemp() {
	for (let x = 0; x < SCALE_TYPE.length; x++) {
		let st = SCALE_TYPE[x]

		tmp.scaling[st] = []
		tmp.no_scalings[st] = []

		let sp = tmp.scaling_power[st], ss = tmp.scaling_start[st], ns = tmp.no_scalings[st]
		let key = Object.keys(SCALE_START[st])

		for (let y = 0; y < key.length; y++) {
			let sn = key[y]

			sp[sn] = getScalingPower(x,sn)
			ss[sn] = getScalingStart(x,sn)
			if (noScalings(x,sn)) ns.push(sn)
			else {
				if (sn == "massUpg") for (let i = 0; i < 3; i++) {
					if (scalingActive(sn, SCALING_RES[sn](i), st)) {
						tmp.scaling[st].push(sn)
						break
					}
				}
				else if (sn == "fTier") for (let i = 0; i < 2; i++) for (let j = 0; j < 6; j++) {
					if (scalingActive(sn, SCALING_RES[sn](i,j), st)) {
						tmp.scaling[st].push(sn)
						break
					}
				}
				else if (scalingActive(sn, SCALING_RES[sn](), st)) tmp.scaling[st].push(sn)
			}
		}
	}
	let sqc8 = []
	if (!CHALS.inChal(14) && !inDarkRun() && !tmp.c16active && !CHALS.inChal(15)) {
		if (player.mainUpg.br.includes(2)) sqc8.push("massUpg","rank","tier","tetr","pent",'hex')
		if (player.md.break.active) sqc8.push("bh_condenser","gamma_ray")
	}
	tmp.scaling_qc8 = sqc8
}

function scalingActive(name, amt, type) {
	if (tmp.no_scalings[type].includes(name) || SCALE_START[type][name] === undefined) return false
	return Decimal.gte(amt, tmp.scaling_start[type][name]);
}

function scaleStart(type,name) { return tmp.scaling_start[type][name]||SCALE_START[type][name] }

function getScalingName(name, x=0, y=0) {
	if (!NAME_FROM_RES[name]) return ''

	let cap = Object.keys(SCALE_START).length;
	let current = "";
	let amt = SCALING_RES[name](x,y);
	for (let n = cap - 1; n >= 0; n--) {
		if (scalingActive(name, amt, Object.keys(SCALE_START)[n]))
			return capitalFirst(Object.keys(SCALE_START)[n]) + (n%4==3?"-":" ");
	}
	return current;
}

function getScalingStart(type, name) {
	let c16 = tmp.c16active

	let start = SCALE_START[SCALE_TYPE[type]][name]

	if (tmp.c18active && C18_SCALING.includes(name)) return start

	if (type==0) {
		if (name=="rank") {
			if (CHALS.inChal(1) || CHALS.inChal(10)) return E(25)
			start = start.add(tmp.chal?tmp.chal.eff[1].rank:0)
		}
		else if (name=="tier") {
			if (player.mainUpg.atom.includes(5)) start = start.add(10)
		}
		else if (name=="tetr") {
			if (player.ranks.tier.gte(100)) start = start.add(5)
		}
		else if (name=="pent") {
			if (hasElement(184)) start = start.mul(elemEffect(184))
		}
		else if (name=="hex") {
			if (hasElement(184)) start = start.mul(elemEffect(184))
		}
		else if (name=="massUpg") {
			if (CHALS.inChal(1) || CHALS.inChal(10)) return E(25)
			if (player.mainUpg.bh.includes(3)) start = start.add(tmp.upgs?tmp.upgs.main?tmp.upgs.main[2][3].effect:0:0)
		}
		else if (name=='tickspeed') {
			if (CHALS.inChal(1) || CHALS.inChal(10)) return E(50)
		}
		else if (name=="prestige0") {
			if (player.md.break.upgs[9].gte(1)) start = start.add(10)
			if (hasElement(175)) start = start.add(30)
			if (hasElement(194)) start = start.mul(2)
		}
		else if (name=="FSS") {
			if (hasBeyondRank(3,2)) start = start.add(1)
			if (hasBeyondRank(5,2)) start = start.add(beyondRankEffect(5,2,0))
			if (hasElement(246)) start = start.add(elemEffect(246))
		}
		else if (name=="pe") {
			if (hasElement(233)) start = start.add(25)
			if (hasElement(255)) start = start.add(elemEffect(255))
		}
		else if (name=="massUpg4") {
			if (hasAscension(1,3)) start = start.add(50)
		}
		else if (name=="gal_prestige") {
			if (hasElement(285)) start = start.add(1)
		}
		else if (name=='inf_theorem') {
			if (hasBeyondRank(28,1)) start = start.add(5)
		}
	}
	else if (type==1) {
		if (name=="tickspeed") {
			if (player.mainUpg.rp.includes(14)) start = start.add(50)
			if (player.ranks.tetr.gte(5)) start = start.add(RANKS.effect.tetr[5]())
		}
		else if (name=="rank") {
			if (player.mainUpg.atom.includes(10)) start = start.add(tmp.upgs?tmp.upgs.main?tmp.upgs.main[3][10].effect:0:0)
		}
		else if (name=="prestige0") {
			if (hasElement(175)) start = start.add(30)
			if (hasElement(194)) start = start.mul(2)
		}
		else if (name=="hex") {
			if (hasPrestige(0,651)) start = start.mul(4/3)
		}
		else if (name=="massUpg4") {
			if (hasAscension(1,3)) start = start.add(50)
		}
		else if (name=="FSS") {
			if (hasElement(55,1) && hasBeyondRank(5,2)) start = start.add(beyondRankEffect(5,2,0))
		}
	}
	else if (type==2) {
		if (name=="rank") {
			if (hasElement(62)) start = start.add(tmp.elements.effect[62])
		}
		else if (name=="tickspeed") {
			if (player.ranks.tetr.gte(5)) start = start.add(RANKS.effect.tetr[5]())
		}
		else if (name=="massUpg") {
			if (hasElement(189)) start = start.pow(1.5)
		}
		else if (name=="prestige0") {
			start = start.mul(exoticAEff(0,1))
		}
	}
	else if (type==3) {
		if (name=="rank") {
			if (player.ranks.pent.gte(1)) start = start.mul(1.1)
			if (player.ranks.pent.gte(5)) start = start.mul(RANKS.effect.pent[5]())
			if (hasPrestige(1,5)) start = start.mul(prestigeEff(1,5))
			start = start.mul(tmp.radiation.bs.eff[14])
			if (!hasUpgrade('br',24)) start = start.mul(tmp.bd.upgs[4].eff)
		}
		else if (name=="tickspeed") {
			if (hasElement(68)) start = start.mul(2)
			if (player.ranks.pent.gte(4)) start = start.mul(RANKS.effect.pent[4]())
			start = start.mul(tmp.fermions.effs[0][5])
			start = start.mul(getEnRewardEff(0))
			if (hasElement(158)) start = start.pow(2)
		}
		else if (name=="bh_condenser") {
			start = start.mul(getEnRewardEff(0))
		}
		else if (name=="gamma_ray") {
			start = start.mul(getEnRewardEff(0))
			if (hasPrestige(0,867)) start = start.pow(8)
		}
		else if (name == "supernova") {if (hasPrestige(1,2)) start = start.add(100)}
		else if (name=='tier') {
			if (hasElement(155)) start = start.mul(elemEffect(155))
			if (hasElement(181)) start = start.mul(10)
			if (hasElement(193)) start = start.mul(elemEffect(193))
		}
		else if (name=='tetr') {
			if (hasElement(211)) start = start.mul(elemEffect(211))
		}
		else if (name=="prestige0") {
			start = start.mul(exoticAEff(0,1))
			if (hasAscension(1,4)) start = start.mul(2)
			if (hasBeyondRank(14,1)) start = start.mul(beyondRankEffect(14,1))
		}
		else if (name=="fTier") {
			if (hasAscension(0,2)) start = start.pow(2)
		}
	} else if (type==4) {
		if (name=="rank") {
			start = start.mul(glyphUpgEff(3))
			if (hasElement(178)) start = start.mul(elemEffect(178))
			if (hasElement(193)) start = start.mul(elemEffect(193))
		}
		else if (name=="supernova") {
			if (hasPrestige(0,552)) start = start.mul(1.25)
			if (hasPrestige(3,2)) start = start.mul(prestigeEff(3,2))
			if (hasBeyondRank(2,17)) start = start.mul(beyondRankEffect(2,17)[1])
		}
	} else if (type==5) {
		if (name=="rank") {
			if (tmp.chal && hasBeyondRank(2,20)) start = start.mul(tmp.chal.eff[1].scrank)
		}
		else if (name=="supernova") {
			if (hasBeyondRank(4,1)) start = start.add(beyondRankEffect(4,1,0))
		}
	} else if (type==6) {
		if (name=="rank") {
			if (hasUpgrade('br',24)) start = start.mul(tmp.bd.upgs[4].eff)
		}
	}

	if (name=='supernova' && type < 4 && !hasUpgrade('br',22)) {
		start = start.add(tmp.prim.eff[7])
	}
	if (name=="fTier" && type < 4) {
		if (tmp.chal && hasBeyondRank(2,20)) start = start.mul(tmp.chal.eff[1].scrank)
	}
	if ((name=="bh_condenser" || name=="gamma_ray" || name=="tickspeed") && hasUpgrade('atom',14)) start = start.mul(10)
	if (QCs.active() && QCM8_SCALES.includes(name)) if (!tmp.scaling_qc8.includes(name)) start = start.pow(tmp.qu.qc_eff[7][0])
	if (hasUpgrade('br',14) && name=="fTier" && type==0) start = start.add(10)
	if (hasElement(88) && name == "tickspeed") start = start.mul(player.qu.rip.active?100:10)
	return start.floor()
}

function getScalingPower(type, name) {
	if (tmp.c18active && C18_SCALING.includes(name)) return E(1)

	let power = E(1)
	if (name == "supernova" && (hasCharger(3)?type<5:type<3)) {
		power = power.mul(tmp.fermions.effs[1][4])
	}
	if (name == "fTier" && type<4) {
		if (hasTree("fn12")) power = power.mul(0.9)
	}
	if (name == "massUpg" && type<2 && hasElement(84)) power = power.mul(tmp.elements.effect[84])
	if (type==0) {
		if (name=="rank") {
			if (player.mainUpg.rp.includes(10)) power = power.mul(0.8)
			if (player.ranks.tetr.gte(4)) power = power.mul(RANKS.effect.tetr[4]())
		}
		else if (name=="tier") {
			if (player.ranks.tetr.gte(4)) power = power.mul(0.8)
			if (hasElement(37)) power = power.mul(tmp.elements.effect[37])
		}
		else if (name=="tetr") {
			if (hasElement(74)) power = power.mul(0.75)
		}
		else if (name=="massUpg") {
			if (player.mainUpg.rp.includes(8)) power = power.mul(tmp.upgs.main?tmp.upgs.main[1][8].effect:1)
		}
		else if (name=='tickspeed') {
			power = power.mul(tmp.chal?tmp.chal.eff[1].tick:1)
		}
		else if (name=='bh_condenser') {
			if (hasElement(15)) power = power.mul(0.8)
		}
		else if (name=='gamma_ray') {
			if (hasElement(15)) power = power.mul(0.8)
		}
		else if (name=="fTier") {
			if (hasTree("fn3")) power = power.mul(0.925)
		}
		else if (name=="cosmic_str") {
			if (hasPrestige(0,24)) power = power.mul(0.8)
			if (hasElement(137)) power = power.mul(0.75)
			if (hasPrestige(1,15)) power = power.mul(prestigeEff(1,15,1))
		}
		else if (name=="prestige0" || name=="prestige1") {
			if (hasElement(134)) power = power.mul(0.95)
		}
		else if (name=="massUpg4") {
			if (tmp.chal && hasBeyondRank(2,20)) power = power.mul(tmp.chal.eff[1].over)
		}
		else if (name=='FSS') {
			if (hasBeyondRank(3,18)) power = power.mul(beyondRankEffect(3,18))
		}
		else if (name=='inf_theorem') {
			if (hasAscension(1,2)) power = power.mul(0.9)
		}
		else if (name=="prestige3") {
			if (hasPrestige(4,1)) power = power.mul(0.75)
		}
		else if (name=="fvm") {
			if (hasElement(275)) power = power.mul(0.5)
		}
	}
	else if (type==1) {
		if (name=="rank") {
			if (player.ranks.tetr.gte(1)) power = power.mul(0.85)
			if (hasElement(27)) power = power.mul(0.75)
		}
		else if (name=="tier") {
			if (player.ranks.tetr.gte(4)) power = power.mul(0.8)
			if (hasElement(37)) power = power.mul(tmp.elements.effect[37])
		}
		else if (name=="massUpg") {
			if (player.mainUpg.rp.includes(8)) power = power.mul(tmp.upgs.main?tmp.upgs.main[1][8].effect:1)
		}
		else if (name=='tickspeed') {
			if (player.mainUpg.bh.includes(12)) power = power.mul(0.85)
			if (hasElement(27)) power = power.mul(0.75)
		}
		else if (name=='bh_condenser') {
			if (hasElement(55)) power = power.mul(0.75)
		}
		else if (name=='gamma_ray') {
			if (hasElement(55)) power = power.mul(0.75)
		}
		else if (name=='cosmic_str') {
			if (hasElement(137)) power = power.mul(0.75)
			if (hasPrestige(1,15)) power = power.mul(prestigeEff(1,15,1))
		}
		else if (name=="prestige0") {
			if (hasElement(154)) power = power.mul(0.9)
		}
		else if (name=="tetr") {
			if (hasElement(154)) power = power.mul(0.9)
		}
		else if (name=="pent") {
			if (hasElement(154)) power = power.mul(0.9)
		}
	}
	else if (type==2) {
		if (name=="rank") {
			if (hasElement(27)) power = power.mul(0.75)
			if (hasElement(58)) power = power.mul(tmp.elements.effect[58])
		}
		if (name=="hex") {
			if (tmp.chal && hasAscension(0,22)) power = power.mul(tmp.chal.eff[5])
		}
		else if (name=='tickspeed') {
			if (hasElement(27)) power = power.mul(0.75)
			if (hasElement(58)) power = power.mul(tmp.elements.effect[58])
		}
		else if (name=='bh_condenser') {
			if (hasElement(55)) power = power.mul(0.75)
		}
		else if (name=='gamma_ray') {
			if (hasElement(55)) power = power.mul(0.75)
		}
		else if (name=='prestige0') {
			if (hasElement(197)) power = power.mul(0.9)
			if (!hasAscension(0,22) && tmp.chal && hasCharger(3)) power = power.mul(tmp.chal.eff[5])
		}
	}
	else if (type==3) {
		if (name=='supernova') {
			if (hasElement(78)) power = power.mul(0.8)
		}
	}
	else if (type==4) {
		if (name=='rank') {
			if (hasElement(197)) power = power.mul(0.9)
			if (!hasAscension(0,22) && tmp.chal && hasCharger(3)) power = power.mul(tmp.chal.eff[5])
		}
		else if (name=="tier") {
			if (!hasAscension(0,22) && tmp.chal && hasCharger(3)) power = power.mul(tmp.chal.eff[5])
		}
		else if (name=="supernova") {
			if (hasElement(212)) power = power.mul(0.75)
		}
	}
	else if (type==5) {
		if (name=='rank') {
			if (tmp.chal && hasAscension(0,22)) power = power.mul(tmp.chal.eff[5])
		}
	}
	if (hasUpgrade("atom",15) && name == "gamma_ray") power = power.mul(0.8)
	if (hasElement(108) && ["rank","tier","tetr","pent"].includes(name) && type<4) power = power.mul(player.qu.rip.active?0.98:0.9)

	let rps = ['rank','tier','tetr','pent']
	if (hasElement(207)) rps.push('hex')
	if (hasPrestige(2,4) && rps.includes(name) && (name=='hex'?type<2:player.chal.comps[18].gte(1)?type<5:type<4)) power = power.mul(tmp.qu.chroma_eff[1][1])

	let qf = tmp.qu.qc_eff[7][1]
	if (!tmp.c16active) if (player.dark.run.upg[4] && inDarkRun() && ['rank','tier','tetr','pent','hex'].includes(name)) qf **= 0.75 
	if (QCs.active() && QCM8_SCALES.includes(name)) if (!tmp.scaling_qc8.includes(name)) power = power.mul(qf)
	if (PreQ_SCALES.includes(name) && type<3) power = power.mul(getEnRewardEff(5))

	let p = ['prestige0','prestige1']
	if (hasPrestige(3,10)) p.push('prestige2')
	if (hasPrestige(0,388) && p.includes(name) && type<3) power = power.mul(prestigeEff(0,388,1))

	if (hasPrestige(1,66) && name=="fTier") power = power.mul(0.8)

	return power.max(type==3?0.5:0)
}

function noScalings(type,name) {
	if (tmp.c18active && C18_SCALING.includes(name)) return false

	if (name=="rank") {
		if (type<4 && hasPrestige(1,127)) return true
		else if (type == 4 && hasAscension(0,15)) return true
	}
	else if (name=="tier") {
		if (type<4 && hasPrestige(1,127)) return true
		else if (type == 4 && hasAscension(0,15)) return true
	}
	else if (name=="tetr") {
		return hasCharger(8)
	}
	else if (name=="pent") {
		return hasElement(243)
	}
	else if (name=="hex") {
		if (type<2 && hasAscension(0,15)) return true
	}
	else if (name=="massUpg") {
		if (hasBeyondRank(2,15)) return true
	}
	else if (name=="supernova") {
		return tmp.SN_passive || type<3 && hasCharger(3)
	}
	else if (name=="tickspeed") {
		if (hasCharger(4)) return true
	}
	else if (name=="fTier") {
		if (type < 3 && hasElement(2,1)) return true
	}
	else if (name=="bh_condenser") {
		if (hasCharger(6)) return true
	}
	else if (name=="gamma_ray") {
		if (hasCharger(7)) return true
	}
	else if (name=="prestige0") {
		if (type < 3 && hasBeyondRank(5,7)) return true
	}
	else if (name=="prestige1" || name=="prestige2") {
		if (type < 3 && hasBeyondRank(11,1)) return true
	}

	return false
}