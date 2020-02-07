/**
 * Query: starting troops . outcome . modifiers
 */
export const probabilityTable = {
  '[3,2]' : {
    '[2,0]' : {
      'default' : 0.2926,
      'ammoShortage' : 0.1838,
      'bunker' : 0.3524,
    },
    '[1,1]' : {
      'default' : 0.3358,
      'ammoShortage' : 0.3057,
      'bunker' : 0.4084,
    },
    '[0,2]' : {
      'default' : 0.3716,
      'ammoShortage' : 0.5105,
      'bunker' : 0.2392,
    }
  },
  '[2,2]' : {
    '[2,0]' : {
      'default' : 0.4483,
      'ammoShortage' : 0.3125,
      'bunker' : 0.5332,
    },
    '[1,1]' : {
      'default' : 0.3241,
      'ammoShortage' : 0.3750,
      'bunker' : 0.3202,
    },
    '[0,2]' : {
      'default' : 0.2276,
      'ammoShortage' : 0.3125,
      'bunker' : 0.1466,
    }
  },
  '[1,2]' : {
    '[1,0]' : {
      'default' : 0.7454,
      'ammoShortage' : 0.5787,
      'bunker' : 0.8611,
    },
    '[0,1]' : {
      'default' : 0.2546,
      'ammoShortage' : 0.4213,
      'bunker' : 0.1389,
    },
  },
  '[3,1]' : {
    '[1,0]' : {
      'default' : 0.3403,
      'ammoShortage' : 0.1736,
      'bunker' : 0.5062,
    },
    '[0,1]' : {
      'default' : 0.6597,
      'ammoShortage' : 0.8264,
      'bunker' : 0.4938,
    },
  },
  '[2,1]' : {
    '[1,0]' : {
      'default' : 0.4213,
      'ammoShortage' : 0.2546,
      'bunker' : 0.5833,
    },
    '[0,1]' : {
      'default' : 0.5787,
      'ammoShortage' : 0.7554,
      'bunker' : 0.4167,
    },
  },
  '[1,1]' : {
    '[1,0]' : {
      'default' : 0.5833,
      'ammoShortage' : 0.4167,
      'bunker' : 0.7222,
    },
    '[0,1]' : {
      'default' : 0.4167,
      'ammoShortage' : 0.5833,
      'bunker' : 0.2778,
    },
  },
};
