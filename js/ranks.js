const RANKS = {
    names: ['rank', 'tier', 'tetr', 'pent', 'hex'],
    fullNames: ['Rank', 'Tier', 'Tetr', 'Pent', 'Hex'],
    reset(type) {
        if (tmp.ranks[type].can) {
            player.ranks[type] = player.ranks[type].add(1)
            let reset = true
            if (tmp.chal14comp || tmp.inf_unl) reset = false
            else if (type == "rank" && player.ranks.tetr.gte(3) || type == "rank" && hasPrestige(0,1) || type == "rank" && hasPrestige(1,1)) reset = false
            else if (type == "tier" && player.mainUpg.bh.includes(4) || type == "tier" && hasPrestige(0,4) || type == "tier" && hasPrestige(1,1)) reset = false
            else if (type == "tetr" && hasTree("qol5") || type == "tetr" && hasPrestige(1,4)) reset = false
            else if (type == "pent" && hasTree("qol8")) reset = false
            if (reset) this.doReset[type]()
            updateRanksTemp()

            addQuote(1)
        }
    },
    bulk(type) {
        if (tmp.ranks[type].can) {
            player.ranks[type] = player.ranks[type].max(tmp.ranks[type].bulk.max(player.ranks[type].add(1)))
            let reset = true
            if (tmp.chal14comp || tmp.inf_unl) reset = false
            if (type == "rank" && player.ranks.tetr.gte(3) || type == "rank" && hasPrestige(0,1) || type == "rank" && hasPrestige(1,1)) reset = false
            else if (type == "tier" && player.mainUpg.bh.includes(4) || type == "tier" && hasPrestige(0,4) || type == "tier" && hasPrestige(1,1)) reset = false
            else if (type == "tetr" && hasTree("qol5") || type == "tetr" && hasPrestige(1,4)) reset = false
            else if (type == "pent" && hasTree("qol8")) reset = false
            if (reset) this.doReset[type]()
            updateRanksTemp()
        }
    },
    unl: {
        tier() { return player.ranks.rank.gte(3) || player.ranks.tier.gte(1) ||
player.ranks.tetr.gte(1)  || hasPrestige(0,1) || hasPrestige(1,1) ||       
player.mainUpg.atom.includes(3) || tmp.radiation.unl || tmp.inf_unl },
        tetr() { return player.ranks.rank.gte(67) ||
player.ranks.tetr.gte(1)  || hasPrestige(0,1) || hasPrestige(1,1) ||
tmp.radiation.unl || 
tmp.inf_unl },
        pent() { return tmp.radiation.unl || tmp.inf_unl },
        hex() { return tmp.chal13comp || tmp.inf_unl },
    },
    doReset: {
        rank() {
            player.mass = E(0)
            for (let x = 1; x <= UPGS.mass.cols; x++) BUILDINGS.reset("mass_"+x)
        },
        tier() {
            player.ranks.rank = E(0)
            this.rank()
        },
        tetr() {
            player.ranks.tier = E(0)
            BUILDINGS.reset('tickspeed')
            this.tier()
        },
        pent() {
            player.ranks.tetr = E(0)
            this.tetr()
        },
        hex() {
            player.ranks.pent = E(0)
            this.pent()
        },
    },
    autoSwitch(rn) { player.auto_ranks[rn] = !player.auto_ranks[rn] },
    autoUnl: {
        rank() { return player.ranks.tier.gte(8) || player.ranks.tetr.gte(2) || hasPrestige(0,1) || hasPrestige(1,1) ||tmp.inf_unl },
        tier() { return hasPrestige(0,4) || hasPrestige(1,1) || tmp.inf_unl },
        tetr() { return player.mainUpg.atom.includes(5) || hasPrestige(1,4) || tmp.inf_unl },
        pent() { return hasTree("qol8") || tmp.inf_unl },
        hex() { return true },
    },
    desc: {
        rank: {
            '1': "unlock mass upgrade 1.",
            '2': "unlock mass upgrade 2, reduce mass upgrade 1 scaling by 20%.",
            '3': "reduce mass upgrade 2 scaling by 20% and mass upgrade 1 boosts itself.",
            '4': "unlock mass upgrade 3.",
            '5': "reduce mass upgrade 3 scaling by 20% and mass upgrade 2 boosts itself.",
            '6': "boost mass gain by x+1, where x is rank.",
            '13': "triple mass gain.",
            '14': "Rank 6 reward effect is better. [x+1 -> (x+1)^2]",
            '20': "reduce tier requirements by 15%",
            '25': "Unlock Tickspeed.",
            '35': "adds tickspeed power based on ranks.",
            '45': "rank boosts mass gain.",
            '60': "rank 35 reward is stronger.",
            '67': "You can tetr up.",
            '160': "Unlock more Challenges.",
            '170': "Challenge 1 reward affects super rank and mass upgrades at increased rate(permanently in challenges).",
            '180': "mass gain is raised by 1.0275.",
            '210': "Challenge 1 reward is stronger.", 
            '267': "reduce tetr scaling", 
            '278': "unlock mass upgrade 4 and ranks reduce super tier and mass upgrades scaling.", 
            '290': "Unlock more Challenges.",
            '320': "Tier 14's reward nerf is 2 instead of 3.", 
            '340': "Rank reduces tetr cost.",
            '368': "Challenge 5 reward affects tetr at increased rate.",              
            '380': "rank multiplies mass gain.",
            '565': "log10 mass boost prestige base based on Prestige Level.",
            '595': "Challenge 4 reward is overpowered and rank 565 reward is raised to 1.3.", 
            '615': "rank 340 reward is stronger.",            
            '710': "make mass gain, Stronger Effect's softcap and mass softcap^2 0.667% weaker based on rank, hardcaps at 33.3%.",
        },
        tier: {
            '1': "reduce rank requirements by 20%.",
            '2': "boost mass gain by x+1, where x is tier and raise mass gain by 1.1",
            '3': "reduce all mass upgrade scalings by 20%.",
            '4': "You can automatically buy mass upgrades and Tier 2 reward is better. [x+1 -> (x+1)^(x+1)]",
            '6': "adds tickspeed power based on tiers.",
            '8': "Mass Upgardes no longer spend mass and You can automatically rank up.",
            '14': "Tier 6's reward is squared but divided by 3.",
            '16': "rank 35 reward is multiplicative and it is stronger.",
            '19': "Super and Hyper tickspeed scaling is weaker based on tier and Stronger effect's softcap is 11.11% weaker.", 
            '26': "Challenge 7 reward is stronger and Overpower scales slower.",      
            '30': "stronger effect's softcap is 10% weaker.",
            '55': "make rank 380's effect stronger based on tier.",
            '100': "Super Tetr scales 5 later.",
        },
        tetr: {
            '1': "reduce tier and rank requirements by 25% and You can automatically buy mass upgrades also each tetr multiplies mass gain by 10x.",
            '2': "mass upgrade 3 boosts itself and tickspeed also You can automatically rank up.",
            '3': "Mass Upgardes no longer spend mass, Ranks no longer reset anything.",
            '4': "Super rank scaling is weaker based on tier, and super tier scales 25% weaker also tickspeed counts in tetr'2 reward.",
            '5': "Super/Hyper Tickspeed/Mass upgrades starts later based on tier and tetr.",
            '8': "Mass gain softcap^2 starts ^1.05 later and multiply challenges 1-8 cap based on prestige base.",
        },
        pent: {
            '1': "reduce tetr requirements by 15%, and Meta-Rank starts 1.1x later.",
            '2': "tetr boosts all radiations gain.",
            '4': "Meta-Tickspeeds start later based on Supernovas.",
            '5': "Meta-Ranks start later based on Pent.",
            '8': "Mass gain softcap^4 starts later based on Pent.",
            '15': "remove 3rd softcap of Stronger's effect.",
        },
        hex: {
            '1': "reduce pent reqirements by 20%.",
            '4': "increase dark ray gain by +20% per hex.",
            '6': "remove first softcap of normal mass gain.",
            '10': "remove second softcap of normal mass gain.",
            '13': "remove third softcap of normal mass gain.",
            '17': "remove fourth softcap of normal mass gain.",
            '36': "remove fifth softcap of normal mass gain.",
            '43': "hex 4's effect is overpowered.",
            '48': "remove sixth softcap of normal mass gain.",
            '62': "remove seventh softcap of normal mass gain.",
            '91': "+0.15 to matter exponents.",
            '157': "remove eighth softcap of normal mass gain.",
        },
    },
    effect: {
        rank: {
            '3'() {
                let ret = player.build.mass_1.amt.div(20)
                return ret
            },
            '5'() {
                let ret = player.build.mass_2.amt.div(40)
                return ret
            },
            '6'() {
                let ret = player.ranks.rank.mul(tmp.chal.eff[8]).add(1).pow(player.ranks.rank.gte(14)?2:1)
                return ret
            },
            '35'() {
                let ret = player.ranks.rank.mul(tmp.chal.eff[8]).root(3).div(100)
                if (player.ranks.rank.gte(60)) ret = player.ranks.rank.mul(tmp.chal.eff[8]).root(2).div(100)
                if (player.ranks.tier.gte(16)) ret = player.ranks.rank.mul(tmp.chal.eff[8]).root(2).div(50).add(1)
                return ret
            },
            '45'() {
                let ret = player.ranks.rank.mul(tmp.chal.eff[8]).add(1).pow(2.5)
                return ret
            },
            '278'() {
                let ret = E(0.95).pow(player.ranks.rank.mul(tmp.chal.eff[8]).sub(200).pow(1/3))
                return ret
            },
            '300'() {
                let ret = player.ranks.rank.add(1)
                return ret
            },
            '340'() {
                let ret = player.ranks.rank.mul(tmp.chal.eff[8]).max(1).pow(player.ranks.rank.gte(615)?2.3:1).log(2).floor()
                return ret
            },
            '380'() {
                let ret = E(10).pow(player.ranks.rank.mul(tmp.chal.eff[8]).sub(379).pow(1.5).pow(player.ranks.tier.gte(55)?RANKS.effect.tier[55]():1).softcap(1000,0.5,0))
                return ret
            },
           '565'() {
                let ret = player.prestiges[0].add(hasPrestige(1,3) ? player.prestiges[1] : new Decimal(0)).add((hasPrestige(0,21) ? player.ranks.tetr : new Decimal(0)).mul(tmp.chal.eff[8])).mul(new Decimal(0.01))
                return ret;
            },
            '710'() {
                let ret = E(1).sub(player.ranks.rank.sub(700).mul(0.00667).add(1).softcap(1.25,0.5,0).sub(1)).max(0.667)
                return ret
            },
        },
        tier: {
            '2'() {
                let ret = player.ranks.tier.mul(tmp.chal.eff[8]).add(1).pow(player.ranks.tier.gte(4)?(player.ranks.tier.mul(tmp.chal.eff[8]).add(1)):1)
                return ret
            },
            '6'() {
            let ret; 
            if (player.ranks.tier.gte(14)) { ret = player.ranks.tier.mul(tmp.chal.eff[8]).pow(2).div(player.ranks.rank.gte(320)?200:300); } 
            else 
            { ret = player.ranks.tier.mul(tmp.chal.eff[8]).div(100); } return ret;
            },
             '19'() {
                let ret = E(0.925).pow(player.ranks.tier.mul(1.5).mul(tmp.chal.eff[8]).pow(0.4))
                return ret
            },
            '55'() {
                let ret = player.ranks.tier.mul(tmp.chal.eff[8]).max(1).log10().add(1).root(4)
                return ret
            },
        },
        tetr: {
            '1'() {
        let ret = E(10).pow(CHALS.inChal(8)?0:player.ranks.tetr.mul(tmp.chal.eff[8]))
        return ret
        },            
            '2'() {
                let ret = player.build.mass_3.amt.add(player.build.tickspeed.amt.mul(player.ranks.tetr.gte(4)?1:0)).mul(CHALS.inChal(8)?0:0.001)
                if (ret.gte(1) && hasPrestige(0,15)) ret = ret.pow(1)
                return ret
            },
            '4'() {
                let ret = E(0.925).pow(CHALS.inChal(8)?0:player.ranks.tier.mul(tmp.chal.eff[8]).pow(1/3))
                return ret
            },
            '5'() {
                let ret = player.ranks.tetr.mul(tmp.chal.eff[8]).pow(2).mul(player.ranks.tier.mul(tmp.chal.eff[8])).pow(CHALS.inChal(8)?0:0.7).floor().softcap(1000,0.25,0)
                return ret
            },
            '8'() {
                let ret = tmp.prestiges.base.max(1).log(10).add(1)
                return ret
            },
        },
        pent: {
            '2'() {
                let ret = E(1.3).pow(player.ranks.tetr.softcap(12e10,0.1,0))
                return ret
            },
            '4'() {
                let ret = player.supernova.times.add(1).root(5)
                return ret
            },
            '5'() {
                let ret = E(1.05).pow(player.ranks.pent.min(1500))
                return ret
            },
            '8'() {
                let ret = E(1.1).pow(player.ranks.pent)
                return ret
            },
        },
        hex: {
            '4'() {
                let hex = player.ranks.hex
                let ret = hex.mul(.2).add(1)
                if (hex.gte(43)) ret = ret.pow(hex.min(1e18).div(10).add(1).root(2))
                return overflow(ret,1e11,0.5)
            },
        },
    },
    effDesc: {
        rank: {
            3(x) { return "+"+format(x) },
            5(x) { return "+"+format(x) },
            6(x) { return format(x)+"x" },
            35(x) {  return player.ranks.tier.gte(16)?"x"+format(x):"+"+format(x.mul(100))+"%" },
            45(x) { return format(x)+"x" },
            278(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            300(x) { return format(x)+"x" },
            340(x) { return "-"+format(x.floor()) },
            380(x) { return format(x)+"x" },
            565(x) { return format(player.mass.log(10).pow(player.ranks.rank.gte(595)?1.3:1))+"^"+format(x)+" ("+format(player.mass.log(10).pow(player.ranks.rank.gte(595)?1.3:1).pow(RANKS.effect.rank[565]()))+")"},
            710(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
        },
        tier: {
            2(x) { return format(x)+"x" },
            6(x) {  return "+"+format(x.mul(100))+"%" },
            19(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            55(x) { return "^"+format(x) },
        },
        tetr: {
            1(x) { return "x"+format(x) },
            2(x) { return "+"+format(x) },
            4(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            5(x) { return "+"+format(x,0)+" later" },
            8(x) { return "x"+format(x) },
        },
        pent: {
            2(x) { return format(x)+"x" },
            4(x) { return format(x)+"x later" },
            5(x) { return format(x)+"x later" },
            8(x) { return "^"+format(x)+" later" },
        },
        hex: {
            4(x) { return format(x,1)+"x" },
        },
    },
    fp: {
        rank() {
            let f = E(1)
            if (player.ranks.tier.gte(1)) f = f.mul(1/0.8)
            if (player.ranks.tetr.gte(1)) f = f.mul(CHALS.inChal(8)?1:1/0.75)
            if (hasPrestige(0,1)) f = f.mul(1/0.8) 
            if (hasPrestige(1,1)) f = f.mul(1/0.8)       
            if (!hasCharger(3)) f = f.mul(tmp.chal.eff[5].pow(-1))
            return f
        },
        tier() {
            let f = E(1)
            f = f.mul(tmp.fermions.effs[1][3])
            if (player.ranks.rank.gte(20)) f = f.mul(1/0.85)
            if (player.ranks.tetr.gte(1)) f = f.mul(CHALS.inChal(8)?1:1/0.75)
            if (hasPrestige(0,1)) f = f.mul(1/0.8) 
            if (hasPrestige(1,1)) f = f.mul(1/0.8)         
            if (player.mainUpg.atom.includes(10)) f = f.mul(2)
            if (!hasCharger(3)) f = f.mul(tmp.chal.eff[5].pow(-1))
            return f
        },
        tetr() {
            let f = E(1)
            if (hasPrestige(0,1)) f = f.mul(1/0.8)   
            if (hasPrestige(1,1)) f = f.mul(1/0.8)       
            return f
    },
  }
}

const CORRUPTED_PRES = [
    [10,40],
]

const PRESTIGES = {
    names: ['prestige','honor','glory','renown','valor'],
    fullNames: ["Prestige Level", "Honor", 'Glory', 'Renown', 'Valor'],
    baseExponent() {
        let x = E(0)

        if (hasElement(100)) x = x.add(tmp.elements.effect[100])
        if (hasPrestige(0,31)) x = x.add(prestigeEff(0,31,0))
        x = x.add(tmp.fermions.effs[1][6]||0).add(glyphUpgEff(10,0))
        if (tmp.inf_unl) x = x.add(theoremEff('mass',3,0))

        x = x.add(1)

        if (hasBeyondRank(4,2)) x = x.mul(beyondRankEffect(4,2))
        if (hasAscension(1,1)) x = x.mul(2)

        if (tmp.c16active || inDarkRun()) x = x.div(mgEff(5))

        return x.overflow(2e4,0.5)
    },
    base() {
        let x = E(1)

        for (let i = 0; i < RANKS.names.length; i++) {
            let r = player.ranks[RANKS.names[i]]
            if (hasPrestige(0,18) && i == 0) r = r.mul(2)
            x = x.mul(r.add(1))
        }
        if (player.ranks.rank.gte(565)) x = x.mul(player.mass.max(10).log(10).pow(player.ranks.rank.gte(595)?1.3:1).pow(RANKS.effect.rank[565]()))
        if (tmp.dark.abEff.pb) x = x.mul(tmp.dark.abEff.pb)

        if (hasBeyondRank(2,1)) x = x.mul(beyondRankEffect(2,1))

        return x.sub(1)
    },
    req(i) {
        let x = EINF, fp = this.fp(i), y = player.prestiges[i]
        switch (i) {
            case 0:
                x = Decimal.pow(1.25,y.scaleEvery('prestige0',false,[0,0,0,fp]).pow(1.1)).mul(92500)
                break;
            case 1:
                x = y.div(fp).scaleEvery('prestige1',false).pow(1.25).mul(4).add(10)
                break;
            case 2:
                x = hasElement(167)?y.div(fp).scaleEvery('prestige2',false).pow(1.25).mul(3.5).add(5):y.pow(1.3).mul(4).add(6)
                break;
            case 3:
                x = y.scaleEvery('prestige3',false,[0,fp]).pow(1.25).mul(3).add(9)
                break;
            case 4:
                x = y.div(fp).scaleEvery('prestige4',false).pow(1.25).mul(4).add(20)
                break;
            default:
                x = EINF
                break;
        }
        return x.ceil()
    },
    bulk(i) {
        let x = E(0), y = i==0?tmp.prestiges.base:player.prestiges[i-1], fp = this.fp(i)
        switch (i) {
            case 0:
                if (y.gte(92500)) x = y.div(92500).max(1).log(1.25).max(0).root(1.1).scaleEvery('prestige0',true,[0,0,0,fp]).add(1)
                break;
            case 1:
                if (y.gte(10)) x = y.sub(10).div(4).max(0).root(1.25).scaleEvery('prestige1',true).mul(fp).add(1)
                break
            case 2:
                if (y.gte(6)) x = hasElement(167)?y.sub(5).div(3.5).max(0).root(1.25).scaleEvery('prestige2',true).mul(fp).add(1):y.sub(6).div(4).max(0).root(1.3).mul(fp).add(1)
                break
            case 3:
                if (y.gte(9)) x = y.sub(9).div(3).max(0).root(1.25).scaleEvery('prestige3',true,[0,fp]).add(1)
                break 
            case 4:
                if (y.gte(12)) x = y.sub(20).div(4).max(0).root(1.25).scaleEvery('prestige4',true).mul(fp).add(1)
                break 
            default:
                x = E(0)
                break;
        }
        return x.floor()
    },
    fp(i) {
        let fp = E(1)
        if (player.prestiges[2].gte(1) && i < 2) fp = fp.mul(1.15)
        if (player.prestiges[3].gte(1) && i < 3) fp = fp.mul(1.1)
        if (hasUpgrade('br',19) && i < (hasAscension(1,1) ? 4 : 3)) fp = fp.mul(upgEffect(4,19))
        return fp
    },
    unl: [
        ()=>true,
        ()=>true,
        ()=>tmp.chal14comp||tmp.inf_unl,
        ()=>tmp.brUnl||tmp.inf_unl,
        ()=>hasElement(267),
    ],
    noReset: [
        ()=>hasUpgrade('br',11)||tmp.inf_unl,
        ()=>tmp.chal13comp||tmp.inf_unl,
        ()=>tmp.chal15comp||tmp.inf_unl,
        ()=>tmp.inf_unl,
        ()=>hasElement(267),
    ],
    autoUnl: [
        ()=>tmp.chal13comp||tmp.inf_unl,
        ()=>tmp.chal14comp||tmp.inf_unl,
        ()=>tmp.chal15comp||tmp.inf_unl,
        ()=>tmp.inf_unl,
        ()=>hasElement(267),
    ],
    autoSwitch(x) { player.auto_pres[x] = !player.auto_pres[x] },
    rewards: [
        {
            "1": `You can automatically buy mass upgrades and tickspeed, Mass Upgardes and Tickspeed no longer spend mass, You can automatically rank up, Ranks no longer reset anything also reduce tetr, tier and rank requirements by 20%.`,
            "2": `Mass upgrades 1-3 and tickspeed are boosted by prestige base.`,
            "3": `Divide and root the price of rank, tier and tetr based on prestige base.`,
            "4": `You can automatically tier up, Tiers no longer reset anything`,
            "5": `Challenges 1-8 are boosted by prestige base.`,
            "6": `Mass, Mass upgrade 1 are multiplied by prestige base also Mass softcap and Mass softcap^2 starts later based on prestige base.`,
            "7": `Prestige Level 3 also applies to Mass upgrades and tickspeed, Prestige Level 2 also applies to Mass gain and Prestige Level 6 is stronger based on prestige base.`,
            "8": `Mass softcap and Mass softcap^2 starts later based on Prestige Levels and keep Challenges on reset.`,
            "9": `Prestige Level 2, 3 and 5 are stronger.`,
            "12": `Stronger Effect's, Mass softcap and Mass softcap^2 are 10% weaker.`,
            "18": `Rank’s effect on Prestige Base is doubled.`,
            "21": `Rank reward 565 also uses Tetr.`,
            "31": `Prestige Base’s exponent is increased based on Prestige Level.`,
            "40": `Chromium-24 is slightly stronger.`,
            "70": `Lawrencium-103 is slightly stronger.`,
            "110": `Ununennium-119 is slightly stronger.`,
            "190": `Zirconium-40 is slightly stronger.`,
            "218": `Unquadpentium-145 is slightly stronger.`,
            "233": `Red Matter boosts Dark Ray.`,
            "382": `Matter exponent is increased by prestige level. Collapsed star's effect is overpowered.`,
            "388": `Hybridized Uran-Astatine also applies to pre-Meta pre-Glory at a reduced rate.`,
            "552": `Exotic supernova starts x1.25 later.`,
            "607": `Chromas gain is increased by prestige base.`,
            "651": `Hyper Hex starts x1.33 later.`,
            "867": `Lithium-3 now provides an exponential boost. Meta-Cosmic Ray scaling starts ^8 later.`,
            "1337": `Pre-Quantum Global Speed boosts matter exponent at a reduced rate. Prestige Level 382 is stronger.`,
        },
        {
            "1": `Prestige Levels 1, 4 and 8 are applied on more time.`,
            "2": `Pre Ultra Rank-Tetr, mass upgrades 1-3, tickspeed scales 20% weaker.`,
            "3": `Tickspeed is stronger based on Prestige Base and rank reward 565 also uses Honor.`,
            "4": `You can automatically tetr up, Tetrs no longer reset anything.`,
            "5": `Pent 5's reward is stronger based on Prestige Base.`,
            "7": `Quarks are boosted based on Honor.`,
            "15": `Super & Hyper cosmic strings scale weaker based on Honor.`,
            "22": `Raise dark shadow gain by 1.1.`,
            "33": `Hybridized Uran-Astatine applies to pre-Meta Pent requirements at a reduced rate.`,
            "46": `Add 500 more C13-15 max completions.`,
            "66": `All Fermions' scaling is 20% weaker.`,
            "91": `FSS base is raised to the 1.05th power.`,
            "127": `Remove all pre-Exotic scalings from Rank & Tier, but nullify C5's reward and Hybridized Uran-Astatine’s first effect for Rank & Tier.`,
            "139": `Matters' production is tripled every FSS. FV Manipulator's cost is slightly weaker.`,
            "167": `Abyssal Blot's fourth reward is raised by FSS.`,
            "247": `Muon's production is increased by MCF tier.`,
            "300": `Softcaps of Meta-Quark and Meta-Lepton are slightly weaker.`,
            400: `Each particle power's 1st effect is stronger.`,
            510: `Raise Kaon & Pion gains to the 1.1th power.`,
        },
        {
            "1": `The requirement for prestige levels & honors are 15% lower.`,
            "3": `Break dilation upgrade 12 is cheaper.`,
            "4": `Unlock new effect for Hybridized Uran-Astatine.`,
            "5": `Glory boosts glyphic mass.`,
            "8": `Glory reduces Black Hole Overflow nerf.`,
            "22": `Glory boosts all matters gain.`,
            "25": `Uncap pre-darkness challenges' completion cap. C7's reward is changed.`,
            "28": `FV Manipulator Power is boosted by Honor.`,
            "34": `Pions boost Kaons gain at a reduced rate.`,
            "40": `[ct4]'s effect is better.`,
            45: `Unstable BH affects mass of black hole overflow^2 starting.`,
            58: `Exotic Atom's reward strength is increased by +5% per beyond-ranks' maximum tier.`,
            121: `Oct 1's reward is raised by 4.`,
        },
        {
            "1": `The requirements for previous prestiges are 10% lower.`,
            "2": `Exotic Supernova starts x1.25 later every Renown.`,
            "4": `Corrupted shard gain is increased by +50% per Renown.`,
            "6": `Exotic Atoms boost their other resources.`,
            10: `Prestige Level 388 also applies to Glory scaling.`,
        },
        {
            1: `Super Renown is 25% weaker.`,
            7: `Corrupted Star upgrade 1 and 2 costs are divided by 1e10.`,
            12: `Oct 7's reward is overpowered.`,
        },
    ],
    rewardEff: [
        {
            
            "2": [()=>{
                let x = tmp.prestiges.base.max(1).log(10).mul(0.01).add(1).pow(hasPrestige(0,9)?1.3:1)
                return x
            },x=>"^"+x.format()],
            "3": [()=>{
                let x = tmp.prestiges.base.max(1).log(10).mul(0.01).add(1).pow(hasPrestige(0,9)?1.3:1)
                return x
            },x=>"/"+x.format()+" and "+x.format()+"th root"],
            "5": [()=>{
                let x = tmp.prestiges.base.max(1).log(10).mul(0.025).add(1).pow(hasPrestige(0,9)?1.3:1)
                return x
            },x=>"+"+formatPercent(x.sub(1))],
            "6": [()=>{
                let x = tmp.prestiges.base.max(1).pow(hasPrestige(0,7)?prestigeEff(0,7,0):1)
                return x
            },x=>"x"+x.format()],
            "7": [()=>{
                let x = tmp.prestiges.base.max(1).log(10).pow(2.5).add(1)
                return x
            },x=>"^"+x.format()],
            "8": [()=>{
                let x = player.prestiges[0].root(4).div(2).add(1)
                return x
            },x=>"^"+x.format()+" later"],
            "31": [()=>{
                let x = player.prestiges[0].div(5e3)
                return x
            },x=>"+^"+format(x)],
            "233": [()=>{
                let x = player.dark.matters.amt[0].add(1).log10().add(1).log10().add(1).pow(2)
                return x
            },x=>"x"+format(x)],
            "382": [()=>{
                let x = player.prestiges[0].max(0).root(2).div(1e3)
                if (hasPrestige(0,1337)) x = x.mul(10)
                return x
            },x=>"+"+format(x)],
            "388": [()=>{
                let x = tmp.qu.chroma_eff[1][1].root(2)
                return x
            },x=>formatReduction(x)+" weaker"],
            "607": [()=>{
                let x = tmp.prestiges.base.max(1).pow(1.5).softcap('e7500',0.1,0).min('e50000')
                return x
            },x=>"x"+format(x)+softcapHTML(x,'e7500')],
            "1337": [()=>{
                let x = tmp.preQUGlobalSpeed.max(1).log10().add(1).log10().div(10)
                return x
            },x=>"+"+format(x)],
            /*
            "1": [()=>{
                let x = E(1)
                return x
            },x=>{
                return x.format()+"x"
            }],
            */
        },
        {
            "3": [()=>{
                let x = tmp.prestiges.base.max(1).log10().add(1).pow(2)
                return x
            },x=>"^"+x.format()],
            "5": [()=>{
                let x = tmp.prestiges.base.max(1).log10().div(10).add(1).root(3)
                return x
            },x=>"x"+x.format()],
            "7": [()=>{
                let x = player.prestiges[1].add(1).root(3)
                return x
            },x=>"^"+x.format()],
            "15": [()=>{
                let x = player.prestiges[1].root(1.5).div(10).add(1).pow(-1)
                return x
            },x=>formatReduction(x)+" weaker"],
            "33": [()=>{
                let x = tmp.qu.chroma_eff[1][0].max(1).log10().add(1).pow(2)
                return x
            },x=>"x"+x.format()+" later"],
            "139": [()=>{
                let x = Decimal.pow(3,player.dark.matters.final)
                return x
            },x=>"x"+x.format(0)],
            "247": [()=>{
                let x = Decimal.pow(player.dark.exotic_atom.tier.add(1),1.5)
                return x
            },x=>"x"+x.format()],
        },
        {
            "5": [()=>{
                let x = player.prestiges[2].root(2).div(10).add(1)
                return x
            },x=>"x"+format(x,2)],
            "8": [()=>{
                let x = player.prestiges[2].root(3).div(10).add(1).pow(-1)
                return x
            },x=>formatReduction(x)+" weaker"],
            "22": [()=>{
                let x = Decimal.pow(2,player.prestiges[2].pow(.5))
                return x
            },x=>"x"+format(x)],
            "28": [()=>{
                let x = player.prestiges[1].root(2).div(10).add(1)
                return x
            },x=>"x"+format(x)],
            "34": [()=>{
                let x = player.dark.exotic_atom.amount[1].add(1).log10().add(1).pow(1.5)
                return x
            },x=>"x"+format(x)],
            45: [()=>{
                let y = player.bh.unstable//.overflow(1e24,0.5,0)
                let x = hasElement(224) ? Decimal.pow(1.1,y.root(4)) : y.add(1)
                if (tmp.c16active) x = overflow(x.log10().add(1).root(2),10,0.5)
                return overflow(x,1e100,0.5).min('e1750')
            },x=>"^"+format(x)+" later"],
            58: [()=>{
                let x = tmp.beyond_ranks.max_tier.mul(.05)
                return x
            },x=>"+"+formatPercent(x)],
        },
        {
            "2": [()=>{
                let x = Decimal.pow(1.25,player.prestiges[3])
                return x
            },x=>"x"+x.format()+" later"],
            "4": [()=>{
                let x = player.prestiges[3].div(2).add(1)
                return x
            },x=>"x"+x.format()],
            "6": [()=>{
                let x = tmp.exotic_atom.amount.add(1).log10().add(1)
                return x
            },x=>"x"+x.format()],
        },
        {

        },
    ],
    reset(i, bulk = false) {
        let b = this.bulk(i)
        if (i==0?tmp.prestiges.base.gte(tmp.prestiges.req[i]):player.prestiges[i-1].gte(tmp.prestiges.req[i])) if (!bulk || b.gt(player.prestiges[i]) ) {
            if (bulk) player.prestiges[i] = b
            else player.prestiges[i] = player.prestiges[i].add(1)

            if (!this.noReset[i]()) {
                for (let j = i-1; j >= 0; j--) {
                    player.prestiges[j] = E(0)
                }
                        player.mass = E(0)
            player.ranks.rank = E(0)
            for (let x = 1; x <= UPGS.mass.cols; x++) BUILDINGS.reset("mass_"+x) 
            player.ranks.tier = E(0)
            BUILDINGS.reset('tickspeed')
            BUILDINGS.reset('accelerator')
            player.ranks.tetr = E(0)
            if(chal_reset && !hasAscension(0,8) && !hasPrestige(1,1)) for (let x = 1; x <= 8; x++) player.chal.comps[x] = E(0)  
            }
            
            updateRanksTemp()
        }
    },
}

const PRES_LEN = PRESTIGES.fullNames.length

function hasPrestige(x,y) { return player.prestiges[x].gte(y) && !(tmp.c16active && CORRUPTED_PRES[x] && CORRUPTED_PRES[x].includes(y)) }

function prestigeEff(x,y,def=E(1)) { return tmp.prestiges.eff[x][y] || def }

function updateRanksTemp() {
    if (!tmp.ranks) tmp.ranks = {}
    for (let x = 0; x < RANKS.names.length; x++) if (!tmp.ranks[RANKS.names[x]]) tmp.ranks[RANKS.names[x]] = {}
    let ifp = E(1)
    if (tmp.inf_unl) ifp = ifp.mul(theoremEff('mass',2))
    let fp2 = tmp.qu.chroma_eff[1][0]

    let tetr_fp2 = !hasElement(243) && hasCharger(8) ? 1 : fp2

    let rt_fp2 = !hasElement(243) && hasPrestige(1,127) ? tmp.c16active ? 5e2 : 1 : fp2
    let ffp = E(1)
    let ffp2 = 1
    if (tmp.c16active || inDarkRun()) ffp2 /= mgEff(5)

    let rooted_fp = GPEffect(3)

    let fp = RANKS.fp.rank().mul(ffp)
    tmp.ranks.rank.req = E(10).pow(player.ranks.rank.div(ffp2).scaleEvery('rank',false,[1,1,1,1,rt_fp2,1,ifp]).pow(rooted_fp).div(fp).pow(1.1)).mul(10).root(hasPrestige(0,3)?(prestigeEff(0,3,0)):1).div((hasPrestige(0,3))?(prestigeEff(0,3,0)):1)
    tmp.ranks.rank.bulk = E(0)
    if (player.mass.gte(10)) tmp.ranks.rank.bulk = player.mass.mul((hasPrestige(0,3))?(prestigeEff(0,3,0)):1).pow(hasPrestige(0,3)?(prestigeEff(0,3,0)):1).div(10).max(1).log10().root(1.1).mul(fp).root(rooted_fp).scaleEvery('rank',true,[1,1,1,1,rt_fp2,1,ifp]).mul(ffp2).add(1).floor();
    tmp.ranks.rank.can = player.mass.gte(tmp.ranks.rank.req)

    fp = RANKS.fp.tier().mul(ffp)
    tmp.ranks.tier.req = player.ranks.tier.div(ifp).div(ffp2).scaleEvery('tier',false,[1,1,1,rt_fp2]).div(fp).add(2).pow(2).add(1).root(hasPrestige(0,3)?(prestigeEff(0,3,0)):1).div((hasPrestige(0,3))?(prestigeEff(0,3,0)):1).floor()
    tmp.ranks.tier.bulk = player.ranks.rank.max(0).mul((hasPrestige(0,3))?(prestigeEff(0,3,0)):1).pow(hasPrestige(0,3)?(prestigeEff(0,3,0)):1).sub(1).root(2).sub(2).mul(fp).scaleEvery('tier',true,[1,1,1,rt_fp2]).mul(ffp2).mul(ifp).add(1).floor();

    fp = E(1).mul(ffp)
    let pow = 2
    if (hasElement(44)) pow = 1.75
    if (hasElement(9)) fp = fp.mul(1/0.85)
    if (player.ranks.pent.gte(1)) fp = fp.mul(1/0.85)
    if (hasElement(72)) fp = fp.mul(1/0.85)
    if (!hasCharger(3)) fp = fp.mul(tmp.chal.eff[5].pow(player.ranks.rank.gte(368)?-1.15:0))

    let tps = player.ranks.rank.gte(340)?(RANKS.effect.rank[340]()):
0
    tmp.ranks.tetr.req = player.ranks.tetr.div(ifp).div(ffp2).scaleEvery('tetr',false,[1,1,1,tetr_fp2]).div(fp).pow(pow).mul(player.ranks.rank.gte(267)?2.5:4).add(8-tps).root(hasPrestige(0,3)?(prestigeEff(0,3,0)):1).div((hasPrestige(0,3))?(prestigeEff(0,3,0)):1).floor()
    tmp.ranks.tetr.bulk = player.ranks.tier.mul((hasPrestige(0,3))?(prestigeEff(0,3,0)):1).pow(hasPrestige(0,3)?(prestigeEff(0,3,0)):1).sub(8-tps).div(player.ranks.rank.gte(267)?2.5:4).max(0).root(pow).mul(fp).scaleEvery('tetr',true,[1,1,1,tetr_fp2]).mul(ffp2).mul(ifp).add(1).floor();

    fp = E(1).mul(ffp)
    let fpa = hasPrestige(1,33) ? [1,1,1,prestigeEff(1,33,1)] : []
    if (player.ranks.hex.gte(1)) fp = fp.div(0.8)
    pow = 1.333
    tmp.ranks.pent.req = player.ranks.pent.div(ifp).div(ffp2).scaleEvery('pent',false,fpa).div(fp).pow(pow).add(15-tps).floor()
    tmp.ranks.pent.bulk = player.ranks.tetr.sub(15-tps).gte(0)?player.ranks.tetr.sub(15-tps).max(0).root(pow).mul(fp).scaleEvery('pent',true,fpa).mul(ffp2).mul(ifp).add(1).floor():E(0);

    fp = E(1)
    pow = 1.8
    let s = 20
    if (hasElement(167)) {
        s /= 2
        pow *= 0.9
    }
    tmp.ranks.hex.req = player.ranks.hex.div(ifp).div(ffp2).div(fp).scaleEvery('hex',false).pow(pow).add(s-tps).floor()
    tmp.ranks.hex.bulk = player.ranks.pent.sub(s-tps).gte(0)?player.ranks.pent.sub(s-tps).max(0).root(pow).scaleEvery('hex',true).mul(fp).mul(ffp2).mul(ifp).add(1).floor():E(0);

    for (let x = 0; x < RANKS.names.length; x++) {
        let rn = RANKS.names[x]
        if (x > 0) {
            tmp.ranks[rn].can = player.ranks[RANKS.names[x-1]].gte(tmp.ranks[rn].req)
        }
    }

    // Prestige

    tmp.prestiges.baseMul = PRESTIGES.base()
    tmp.prestiges.baseExp = PRESTIGES.baseExponent()
    tmp.prestiges.base = tmp.prestiges.baseMul.pow(tmp.prestiges.baseExp)
    for (let x = 0; x < PRES_LEN; x++) {
        tmp.prestiges.req[x] = PRESTIGES.req(x)
        for (let y in PRESTIGES.rewardEff[x]) {
            if (PRESTIGES.rewardEff[x][y]) tmp.prestiges.eff[x][y] = PRESTIGES.rewardEff[x][y][0]()
        }
    }

    // Ascension

    updateAscensionsTemp()

    // Beyond

    let p = 1

    if (hasElement(221)) p /= 0.95
    p /= getFragmentEffect('time')

    tmp.beyond_ranks.tier_power = p

    let rcs = E(1e14)

    if (hasUpgrade('rp',22)) rcs = rcs.mul(upgEffect(1,22))
    if (hasElement(287)) rcs = rcs.mul(elemEffect(287))

    tmp.rank_collapse.start = rcs

    tmp.beyond_ranks.scale_start = 24
    tmp.beyond_ranks.scale_pow = 1.6

    tmp.beyond_ranks.max_tier = BEYOND_RANKS.getTier()
    tmp.beyond_ranks.latestRank = BEYOND_RANKS.getRankFromTier(tmp.beyond_ranks.max_tier)

    tmp.beyond_ranks.req = BEYOND_RANKS.req()
    tmp.beyond_ranks.bulk = BEYOND_RANKS.bulk()

    for (let x in BEYOND_RANKS.rewardEff) {
        for (let y in BEYOND_RANKS.rewardEff[x]) {
            if (BEYOND_RANKS.rewardEff[x][y]) tmp.beyond_ranks.eff[x][y] = BEYOND_RANKS.rewardEff[x][y][0]()
        }
    }
}

const BEYOND_RANKS = {
    req() {
        let p = player.ranks.beyond, rc = tmp.rank_collapse

        let x = p.scale(rc.start,rc.power,2).pow(1.25).mul(10).add(180)

        rc.reduction = p.gte(rc.start) ? x.log(p.pow(1.25).mul(10).add(180)) : E(1)

        return x.ceil()
    },
    bulk() {
        let rc = tmp.rank_collapse

        let x = player.ranks.hex.gte(180)?player.ranks.hex.sub(180).div(10).max(0).root(1.25).scale(rc.start,rc.power,2,true).add(1).floor():E(0)

        return x
    },
    getTier(r=player.ranks.beyond) {
        let x = r.gt(0)?r.log10().max(0).pow(.8).mul(tmp.beyond_ranks.tier_power).add(1).scale(tmp.beyond_ranks.scale_start,tmp.beyond_ranks.scale_pow,0,true).floor():E(1)
        return x
    },
    getRankFromTier(i,r=player.ranks.beyond) {
        let hp = Decimal.pow(10,Decimal.pow(Decimal.sub(i.scale(tmp.beyond_ranks.scale_start,tmp.beyond_ranks.scale_pow,0),1).div(tmp.beyond_ranks.tier_power),1/.8)).ceil()

        return r.div(hp).floor()
    },
    getRequirementFromTier(i,t=tmp.beyond_ranks.latestRank,mt=tmp.beyond_ranks.max_tier) {
        let s = tmp.beyond_ranks.scale_start, p = tmp.beyond_ranks.scale_pow
        return Decimal.pow(10,Decimal.pow(Decimal.div(mt.add(1).scale(s,p,0).sub(1),tmp.beyond_ranks.tier_power),1/.8).sub(Decimal.pow(Decimal.sub(mt,i).add(1).scale(s,p,0).sub(1).div(tmp.beyond_ranks.tier_power),1/.8))).mul(Decimal.add(t,1)).ceil()
        // Decimal.pow(10,Math.pow(mt/tmp.beyond_ranks.tier_power,1/.8)-Math.pow((mt-i)/tmp.beyond_ranks.tier_power,1/.8)).mul(Decimal.add(t,1)).ceil()
    },
    getRankDisplayFromValue(r) {
        let tier = this.getTier(r), current = this.getRankFromTier(tier,r);

        return getRankTierName(tier.add(5)) + ' ' + current.format(0)
    },

    reset(auto=false) {
        if (player.ranks.hex.gte(tmp.beyond_ranks.req) && (!auto || tmp.beyond_ranks.bulk.gt(player.ranks.beyond))) {
            player.ranks.beyond = auto ? player.ranks.beyond.max(tmp.beyond_ranks.bulk) : player.ranks.beyond.add(1)

            if (hasBeyondRank(2,2)||hasInfUpgrade(10)) return;

            player.ranks.hex = E(0)
            DARK.doReset()
        }
    },

    rewards: {
        1: {
            1: `Add 0.5 to matter exponents.`,
            2: `All matter upgrades are stronger based on dark ray.`,
            4: `Hybridized Uran-Astatine's second effect is stronger based on FSS.`,
            7: `Matters gain is boosted by Hept.`,
        },
        2: {
            1: `Automate Beyond-Ranks. Beyond-Ranks now affect prestige base.`,
            2: `Beyond-Ranks will no longer reset anything. [Meta-Lepton]'s effect is multiplied by 8.`,
            4: `Accelerator's effect affects tickspeed, BHC & cosmic ray powers. Chromas gain is raised to the 1.1th power.`,
            7: `Gain more fermions based on Hept, except Meta-Fermions.`,
            10: `Raise mass of black hole to the 1.2th power.`,
            15: `Remove all scalings from mass upgrades 1-3.`,
            17: `[qu9] is more effective based on mass of black hole. Exotic Supernova starts later based on Quantizes.`,
            20: `C1's reward is changed.`,
        },
        3: {
            1: `Mass & Stronger Overflow is weaker based on archverse tier of normal mass.`,
            2: `Super FSS starts +1 later.`,
            4: `Beyond Rank boosts Kaon & Pion gain.`,
            12: `Remove the softcap of dark ray's fourth reward.`,
            18: `Super FSS scales +2.5% weaker per beyond-ranks' maximum tier (capped at 50%).`,
            32: `Argon-18 affects tickspeed's power.`,
        },
        4: {
            1: `Beta Particles affect supercritical supernova starting at a reduced rate.`,
            2: `Prestige base's exponent is increased by beyond-ranks' maximum tier, starting at Dec.`,
            40: `[Tau]'s reward is cubed.`,
        },
        5: {
            2: `Super FSS starts +1 later per beyond-ranks' maximum tier, starting at Dec.`,
            7: `Remove pre-meta scalings from Prestige Level.`,
        },
        6: {
            1: `'Self-Infinity' and 'Exotic Speed' upgrades use a formula with base 3 instead of base 2.`,
            12: `Bitriunium-231 is cubed.`,
        },
        8: {
            1: `Infinity Points gain is doubled every highest beyond-rank tier you reached.`,
        },
        11: {
            1: `Remove all scalings from Honor & Glory.`,
        },
        12: {
            1: `Neutronium-0 now affects C16's reward at an extremely reduced rate.`,
        },
        14: {
            1: `The formula of Dec 2's effect is better. Meta-Prestige Level starts later based on beyond-ranks' maximum tier, starting at Icos.`,
        },
        16: {
            1: `Ascension Base's exponent is increased by beyond-ranks' maximum tier, starting at Icos.`,
        },
        20: {
            1: `The second softcap of Accelerator's Effect is slightly weaker.`,
        },
        28: {
            1: `Super Infinity Theorem starts +5 later.`,
        },
    },

    rewardEff: {
        1: {
            2: [
                ()=>{
                    let x = player.dark.rays.add(1).log10().root(2).softcap(10,0.25,0).div(100).add(1)

                    return x
                },
                x=>formatPercent(x-1)+" stronger"+softcapHTML(x,1.1),
            ],
            4: [
                ()=>{
                    let x = player.dark.matters.final.pow(.75).div(10).add(1)

                    return x
                },
                x=>formatPercent(x-1)+" stronger",
            ],
            7: [
                ()=>{
                    let x = player.ranks.beyond.add(1).root(2)

                    return x
                },
                x=>"^"+format(x),
            ],
        },
        2: {
            1: [
                ()=>{
                    let x = player.ranks.beyond.pow(3)

                    if (hasPrestige(2,121)) x = x.pow(4)

                    return x.add(1)
                },
                x=>"x"+format(x),
            ],
            7: [
                ()=>{
                    let x = hasPrestige(4,12) ? player.ranks.beyond.add(1).pow(0.4) : player.ranks.beyond.add(1).log10().add(1).pow(2).overflow(10,0.5)

                    return x
                },
                x=>"x"+format(x),
            ],
            17: [
                ()=>{
                    let x = player.bh.mass.add(1).log10().add(1).log10().add(1).pow(2)
                    
                    let y = player.qu.times.add(1).log10().root(2).div(8).add(1)

                    return [x,y]
                },
                x=>"x"+format(x[0])+" effective; x"+format(x[1])+" later",
            ],
        },
        3: {
            1: [
                ()=>{
                    let x = Decimal.pow(0.99,player.mass.div(1.5e56).max(1).log10().div(1e9).max(1).log10().div(15).root(3))

                    return x
                },
                x=>formatReduction(x)+" weaker",
            ],
            4: [
                ()=>{
                    let x = player.ranks.beyond.add(1).log10().add(1).pow(2)

                    return x
                },
                x=>"x"+format(x),
            ],
            18: [
                ()=>{
                    let x = Decimal.sub(1,tmp.beyond_ranks.max_tier.mul(0.025))

                    return Decimal.max(0.5,x)
                },
                x=>formatReduction(x)+" weaker",
            ],
        },
        4: {
            1: [
                ()=>{
                    let x = overflow(tmp.prim.eff[7].div(5),1e6,0.5).softcap(1e7,1/3,0)

                    return x
                },
                x=>"+"+format(x)+" later",
            ],
            2: [
                ()=>{
                    let x = tmp.beyond_ranks.max_tier.sub(3).pow(hasBeyondRank(14,1) ? 1 : .2).mul(.2).add(1) // (tmp.beyond_ranks.max_tier-3)**0.2*0.2+1

                    return Decimal.max(1,x)
                },
                x=>"x"+format(x),
            ],
        },
        5: {
            2: [
                ()=>{
                    let x = tmp.beyond_ranks.max_tier.sub(1)

                    return Decimal.max(1,x)
                },
                x=>"+"+format(x,0)+" later",
            ],
        },
        8: {
            1: [
                ()=>{
                    let x = Decimal.pow(2,tmp.beyond_ranks.max_tier)

                    return x
                },
                x=>formatMult(x),
            ],
        },
        12: {
            1: [
                ()=>{
                    let x = tmp.qu.chroma_eff[2].max(1).log10().add(1).root(3)

                    return x
                },
                x=>formatMult(x),
            ],
        },
        14: {
            1: [
                ()=>{
                    let x = Decimal.pow(1.25,tmp.beyond_ranks.max_tier.sub(13).max(0).root(2))

                    return x
                },
                x=>formatMult(x)+" later",
            ],
        },
        16: {
            1: [
                ()=>{
                    let x = tmp.beyond_ranks.max_tier.sub(13).max(0).div(50)

                    return x
                },
                x=>"+"+format(x),
            ],
        },
    },
}

const RTNS = [
    ['','Rank','Tier','Tetr','Pent','Hex','Hept','Oct','Enne'],
    ['','dec','icos'], // d>2 -> cont
    ['','hect'], // h>1 -> ct
]

const RTNS2 = [
    ['','un','do','tri','tetra','penta','hexa','hepta','octa','nona'], // d < 3
    ['','un','du','tria','tetra','penta','hexa','hepta','octa','nona'],
    ['','un','di','tri','tetra','penta','hexa','hepta','octa','nona'], // h
]

function getRankTierName(i) {
    if (Decimal.gte(i,999)) return '['+format(i,0,9,'sc')+']'
    else {
        i = Number(i)

        if (i < 9) return RTNS[0][i]
        i += 1
        let m = ''
        let h = Math.floor(i / 100), d = Math.floor(i / 10) % 10, o = i % 10

        if (d > 1 && o == 1) m += 'hen' 
        else if (d == 2 && o == 3) m += 'tr' 
        else m += RTNS2[0][o]
        if (d > 2) m += RTNS2[1][d] + 'cont'
        else m += RTNS[1][d]
        if (h > 0 && d > 0) m += 'a'
        if (h > 0) m += (h > 1 ? RTNS2[2][h] + 'ct' : 'hect')

        return capitalFirst(m)
    }
}

function hasBeyondRank(x,y) {
    let t = tmp.beyond_ranks.max_tier, lt = tmp.beyond_ranks.latestRank||E(0)
    return t.gt(x) || t.eq(x) && lt.gte(y)
}

function beyondRankEffect(x,y,def=1) {
    let e = tmp.beyond_ranks.eff[x]
    return e?e[y]||def:def
}

function updateRanksHTML() {
    tmp.el.rank_tabs.setDisplay(player.chal.comps[8].gte(8) || hasPrestige(0,1) || (hasPrestige(1,1)))
    tmp.el.asc_btn.setDisplay(tmp.ascensions_unl)
    for (let x = 0; x < 3; x++) {
        tmp.el["rank_tab"+x].setDisplay(tmp.rank_tab == x)
    }

    if (tmp.rank_tab == 0) {
        for (let x = 0; x < RANKS.names.length; x++) {
            let rn = RANKS.names[x]
            let unl = (!tmp.brUnl || x > 3)&&(RANKS.unl[rn]?RANKS.unl[rn]():true)
            tmp.el["ranks_div_"+x].setDisplay(unl)
            if (unl) {
                let keys = Object.keys(RANKS.desc[rn])
                let desc = ""
                for (let i = 0; i < keys.length; i++) {
                    if (player.ranks[rn].lt(keys[i])) {
                        desc = ` At ${RANKS.fullNames[x]} ${format(keys[i],0)} - ${RANKS.desc[rn][keys[i]]}`
                        break
                    }
                }
    
                tmp.el["ranks_scale_"+x].setTxt(getScalingName(rn))
                tmp.el["ranks_amt_"+x].setTxt(format(player.ranks[rn],0))
                tmp.el["ranks_"+x].setClasses({btn: true, reset: true, locked: !tmp.ranks[rn].can})
                tmp.el["ranks_desc_"+x].setTxt(desc)
                tmp.el["ranks_req_"+x].setTxt(x==0?formatMass(tmp.ranks[rn].req):RANKS.fullNames[x-1]+" "+format(tmp.ranks[rn].req,0))
                tmp.el["ranks_auto_"+x].setDisplay(RANKS.autoUnl[rn]())
                tmp.el["ranks_auto_"+x].setTxt(player.auto_ranks[rn]?"ON":"OFF")
            }
        }

        let unl = tmp.brUnl

        tmp.el.pre_beyond_ranks.setDisplay(unl)
        tmp.el.beyond_ranks.setDisplay(unl)
        if (unl) {
            let h = ''
            for (let x = 0; x < 4; x++) {
                let rn = RANKS.names[x]
                h += '<div>' + getScalingName(rn) + RANKS.fullNames[x] + ' <h4>' + format(player.ranks[rn],0) + '</h4></div>'
            }
            tmp.el.pre_beyond_ranks.setHTML(h)

            // Beyond Rank

            tmp.el.br_auto.setDisplay(hasBeyondRank(2,1)||hasInfUpgrade(10))
            tmp.el.br_auto.setTxt(player.auto_ranks.beyond?"ON":"OFF")

            let t = tmp.beyond_ranks.max_tier
            h = ''

            for (let x = Math.min(3,t.toNumber())-1; x >= 0; x--) {
                h += getRankTierName(t.add(5).sub(x)) + " <h4>" + (x == 0 ? tmp.beyond_ranks.latestRank.format(0) : BEYOND_RANKS.getRankFromTier(t.sub(x)).format(0)) + '</h4>' + (x>0?'<br>':"")
            }

            tmp.el.br_amt.setHTML(h)

            let r = '', b = false

            for (tt in BEYOND_RANKS.rewards) {
                b = false
                for (tr in BEYOND_RANKS.rewards[tt]) {
                    tt = Number(tt)
                    if (t.lt(tt) || (tmp.beyond_ranks.latestRank.lt(tr) && t.eq(tt))) {
                        r = "At "+getRankTierName(tt+5)+" "+format(tr,0)+" - "+BEYOND_RANKS.rewards[tt][tr]
                        b = true
                        break
                    }
                }
                if (b) break;
            }

            h = `
                Reset your Hexes (and force a darkness reset) but hept/oct/enne etc. up. ${r}<br>
                To ${getRankTierName(t.add(5))} up, require ${getRankTierName(t.add(4))} ${
                    t == 1
                    ? tmp.beyond_ranks.req.format(0)
                    : BEYOND_RANKS.getRequirementFromTier(1,tmp.beyond_ranks.latestRank,t.sub(1)).format(0)
                }.<br>
                To ${getRankTierName(t.add(6))} up, require ${getRankTierName(t.add(5))} ${BEYOND_RANKS.getRequirementFromTier(1,0).format(0)}.
            `

            tmp.el.br_desc.setHTML(h)
            tmp.el.br_desc.setClasses({btn: true, reset: true, locked: player.ranks.hex.lt(tmp.beyond_ranks.req)})
        }

        let rc = tmp.rank_collapse

        tmp.el.rankCollapse.setDisplay(player.ranks.beyond.gte(rc.start))
        tmp.el.rankCollapse.setHTML(`Because of Rank Collapse at <b>${BEYOND_RANKS.getRankDisplayFromValue(rc.start)}</b>, Hept's requirement is raised by <b>${rc.reduction.format()}</b>!`)
    }
    else if (tmp.rank_tab == 1) {
        tmp.el.pres_base.setHTML(`${tmp.prestiges.baseMul.format(0)}<sup>${format(tmp.prestiges.baseExp)}</sup> = ${tmp.prestiges.base.format(0)}`)

        for (let x = 0; x < PRES_LEN; x++) {
            let unl = PRESTIGES.unl[x]?PRESTIGES.unl[x]():true

            tmp.el["pres_div_"+x].setDisplay(unl)

            if (unl) {
                let p = player.prestiges[x] || E(0)
                let keys = Object.keys(PRESTIGES.rewards[x])
                let desc = ""
                for (let i = 0; i < keys.length; i++) {
                    if (p.lt(keys[i]) && (player.chal.comps[8].gte(8) || p.lte(PRES_BEFOREC13[x]||Infinity))) {
                        desc = ` At ${PRESTIGES.fullNames[x]} ${format(keys[i],0)} - ${PRESTIGES.rewards[x][keys[i]]}`
                        break
                    }
                }

                tmp.el["pres_scale_"+x].setTxt(getScalingName("prestige"+x))
                tmp.el["pres_amt_"+x].setTxt(format(p,0))
                tmp.el["pres_"+x].setClasses({btn: true, reset: true, locked: x==0?tmp.prestiges.base.lt(tmp.prestiges.req[x]):player.prestiges[x-1].lt(tmp.prestiges.req[x])})
                tmp.el["pres_desc_"+x].setTxt(desc)
                tmp.el["pres_req_"+x].setTxt(x==0?format(tmp.prestiges.req[x],0)+" of Prestige Base":PRESTIGES.fullNames[x-1]+" "+format(tmp.prestiges.req[x],0))
                tmp.el["pres_auto_"+x].setDisplay(PRESTIGES.autoUnl[x]())
                tmp.el["pres_auto_"+x].setTxt(player.auto_pres[x]?"ON":"OFF")
            }
        }

        updateGPHTML()
    }
    else if (tmp.rank_tab == 2) {
        updateAscensionsHTML()
    }
}

const PRES_BEFOREC13 = [40,7]

const GAL_PRESTIGE = {
    req() {
        let x = Decimal.pow(10,player.gal_prestige.scaleEvery('gal_prestige').pow(1.5)).mul(1e17)

        return x
    },
    reset() {
        if (player.supernova.times.gte(tmp.gp.req)) {
            player.gal_prestige = player.gal_prestige.add(1)

            INF.doReset()
        }
    },
    gain(i) {
        let x = E(0), gp = player.gal_prestige

        switch (i) {
            case 0:
                if (gp.gte(1)) {
                    x = player.stars.points.add(1).log10().add(1).log10().add(1).pow(gp.root(1.5)).sub(1)
                }
            break;
            case 1:
                if (gp.gte(2)) {
                    x = tmp.prestiges.base.add(1).log10().add(1).pow(gp.sub(1).root(1.5)).sub(1)
                }
            break;
            case 2:
                if (gp.gte(4)) {
                    x = player.dark.matters.amt[12].add(1).log10().add(1).log10().add(1).pow(2).pow(gp.sub(3).root(1.5)).sub(1)
                }
            break;
            case 3:
                if (gp.gte(6)) {
                    x = player.supernova.radiation.hz.add(1).log10().add(1).log10().add(1).pow(2).pow(gp.sub(5).root(1.5)).sub(1)
                }
            break;
            case 4:
                if (gp.gte(9)) {
                    x = player.inf.cs_amount.add(1).log10().add(1).pow(2).pow(gp.sub(8).root(1.5)).sub(1)
                }
            break;
            case 5:
                if (gp.gte(14)) {
                    x = player.supernova.bosons.hb.add(10).log10().log10().add(1).pow(gp.sub(13).root(1.5)).sub(1)
                }
            break;
        }

        if (hasElement(263)) x = x.mul(elemEffect(263))
        if (hasElement(281)) x = x.mul(elemEffect(281))

        return x
    },
    effect(i) {
        let x, res = player.gp_resources[i]

        switch (i) {
            case 0:
                x = res.add(1).log10().root(2).div(20).add(1)
            break;
            case 1:
                x = Decimal.pow(0.97,res.add(1).log10().overflow(10,0.5).root(2))
            break;
            case 2:
                x = res.add(1).log10().root(3).div(2)
            break;
            case 3:
                x = Decimal.pow(0.9,res.add(10).log10().log10().add(1).pow(2).sub(1))
            break;
            case 4:
                x = Decimal.pow(0.95,res.add(1).slog(10))
            break;
            case 5:
                x = expMult(res.add(1),0.5)
            break;
        }

        return x
    },
    res_length: 6,
}

function GPEffect(i,def=1) { return tmp.gp.res_effect[i]||def }

function updateGPTemp() {
    tmp.gp.req = GAL_PRESTIGE.req()

    for (let i = 0; i < GAL_PRESTIGE.res_length; i++) {
        tmp.gp.res_gain[i] = GAL_PRESTIGE.gain(i)
        tmp.gp.res_effect[i] = GAL_PRESTIGE.effect(i)
    }
}

function updateGPHTML() {
    let unl = hasElement(262)

    tmp.el.galactic_prestige_div.setDisplay(unl)

    if (unl) {
        let gp = player.gal_prestige

        tmp.el.gal_prestige.setHTML(gp.format(0))
        tmp.el.gal_prestige_scale.setHTML(getScalingName('gal_prestige'))
        tmp.el.gp_btn.setHTML(`
        Reset Supernovas (force an Infinity reset), but Galactic Prestige up. Next Galactic Prestige reveals its treasure or happens nothing.<br><br>
        Require: <b>${tmp.gp.req.format()}</b> Supernovas
        `)
        tmp.el.gp_btn.setClasses({btn: true, galactic: true, locked: player.supernova.times.lt(tmp.gp.req)})

        let h = '', res = player.gp_resources, res_gain = tmp.gp.res_gain, res_effect = tmp.gp.res_effect

        if (gp.gte(1)) h += `You have <h4>${res[0].format(0)}</h4> ${res[0].formatGain(res_gain[0])} Galactic Stars (based on collapsed stars and galactic prestige), 
        which strengthens star generators by <h4>${formatPercent(res_effect[0].sub(1))}</h4> exponentially.<br>`

        if (gp.gte(2)) h += `You have <h4>${formatMass(res[1])}</h4> ${res[1].formatGain(res_gain[1],true)} of Prestige Mass (based on prestige base and galactic prestige), 
        which weakens mass overflow^1-2 by <h4>${formatReduction(res_effect[1])}</h4>.<br>`

        if (gp.gte(4)) h += `You have <h4>${res[2].format(0)}</h4> ${res[2].formatGain(res_gain[2])} Galactic Matter (based on fading matter and galactic prestige), 
        which increases to the base of all Matter upgrades by <h4>+${format(res_effect[2])}</h4>.<br>`

        if (gp.gte(6)) h += `You have <h4>${res[3].format(0)}</h4> ${res[3].formatGain(res_gain[3])} Redshift (based on frequency and galactic prestige), 
        which reduces Rank requirement by <h4>^${format(res_effect[3],5)}</h4>.<br>`

        if (gp.gte(9)) h += `You have <h4>${res[4].format(0)}</h4> ${res[4].formatGain(res_gain[4])} Normal Energy (based on corrupted star and galactic prestige), 
        which weaken corrupted star reduction by <h4>${formatReduction(res_effect[4])}</h4>.<br>`

        if (gp.gte(14)) h += `You have <h4>${res[5].format(0)}</h4> ${res[5].formatGain(res_gain[5])} Dilatons (based on higgs bosons and galactic prestige), 
        which increases Pre-Infinity Global Speed by <h4>${formatMult(res_effect[5])}</h4>.<br>`

        tmp.el.gp_rewards.setHTML(h)
    }
}
