G.AddData({
	name:'Agriculture',
	author:'Owen "Ohead" Parker',
	desc:'Adds various farming units.',
	engineVersion:1,
    sheets:{'agriculture':'https://therealohead.github.io/neverending-legacy-mods/mods/agriculture/img/icons.png'},
	func:function()
	{   
        G.contextNames['grow']='Growing';

        new G.Tech({
            name:'agriculture',
            desc:'@unlocks [orchard]s, which provide [fruit] much faster than a gather can.<>@unlocks [grain farm]s, which produce [grain]',
            icon:[0,1,'agriculture',23,1],
            cost:{'insight':15},
            req:{'sedentism':true},
            effects:[
                {type:'show context',what:['orchard','grain farm']},
            ],
        });

        new G.Unit({
            name:'orchard',
            desc:'@generates [fruit]<>An [orchard] provides [fruit] much faster than a gather can.',
            icon:[1,1,'agriculture'],
            cost:{'fruit':15},
            use:{'worker':2,'land':5,'stone tools':2},
            upkeep:{'coin':0.2},
            effects:[
                {type:'gather',context:'grow',what:{'fruit':15}},
                {type:'mult',value:1.2,req:{'harvest rituals':'on'}}
            ],
            req:{'agriculture':true,'tool-making':true},
            category:'production',
        });

        new G.Unit({
            name:'farm',
            desc:'@generates various plant resources<>[grain,Grain] can be baked into [bread], a stable food source.<>[cotton,Cotton] is a great material for making cotton',
            icon:[0,1,'agriculture'],
            cost:{},
            use:{'land':10},
            upkeep:{'coin':0.5},
            modes:{
                'off':G.MODE_OFF,
                'grain':{name:'Grain farming',icon:[2,1,'agriculture'],desc:'Farm for [grain]',use:{'worker':5,'metal tools':5}},
                'cotton':{name:'Cotton farming',icon:[3,1,'agriculture'],desc:'Farm for [cotton]',use:{'worker':3,'stone tools':3}},
            },
            effects:[
                {type:'gather',context:'grow',what:{'grain':15},mode:'grain'},
                {type:'gather',context:'grow',what:{'cotton':15},mode:'cotton'},
                {type:'mult',value:1.2,req:{'harvest rituals':'on'}}
            ],
            req:{'agriculture':true},
            category:'production',
        });

        new G.Res({
            name:'grain',
            desc:'[grain,Grain] can be ground into flour and baked into [bread].',
            icon:[2,1,'agriculture'],
            turnToByContext:{'decay':{'grain':0.2,'spoiled food':0.8}},
            category:'misc',
        });

        new G.Res({
            name:'cotton',
            desc:'[cotton,Cotton] can be sewn into [basic clothes,clothes].',
            icon:[3,1,'agriculture'],
            turnToByContext:{'decay':{'grain':0.2,'spoiled food':0.8}},
            category:'misc',
        });
	}
});