G.AddData({
	name:'Agriculture',
	author:'Owen "Ohead" Parker',
	desc:'Adds various farming units.',
	engineVersion:1,
    sheets:{'agriculture':'https://therealohead.github.io/neverending-legacy-mods/mods/agriculture/img/icons.png'},
	func:function()
	{   
        G.dict['scavenging'].req['agriculture'] = false;
        G.contextNames['grow']='Growing';

        new G.Tech({
            name:'agriculture',
            desc:'@unlocks [orchard]s, which provide [fruit] much faster than a gather can.<>@unlocks [farm]s, which produce [grain] or [cotton]<>@<span style="color:red">removes the [scavenging] trait</span>',
            icon:[0,1,'agriculture',23,1],
            cost:{'insight':15},
            req:{'sedentism':true},
            effects:[
                {type:'show context',what:['orchard','farm']},
                {type:'function',func:()=>{
                    console.log('We got agriculture');
                    G.dict['scavenging'].chance = 0;
                }}
            ],
        });

        new G.Tech({
            name:'milling',
            desc:'@unlocks [windmill]s@unlocks [water mill]s<>[windmill,Windmills] provide rotational force from wind<>[water mill,Water mills]',
            icon:[0,1,'agriculture',23,1],
            cost:{'insight':15},
            req:{'sedentism':true},
            effects:[
                {type:'show context',what:['orchard','farm']},
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
            desc:'@generates various plant resources<>[grain,Grain] can be baked into [bread], a stable food source.<>[cotton,Cotton] is a great material for making [basic clothes,clothes]',
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
            gizmos:true,
        });

        new G.Unit({
            name:'bakery',
            desc:'@bakes [grain] into [bread]',
            icon:[24,2],
            cost:{'basic building materials':100},
            use:{'land':1},
            upkeep:{'coin':0.5},
            modes:{
                'Bake bread':{name:'Bread baking',icon:[2,1,'agriculture'],desc:'Bake [bread]',use:{'worker':5,'metal tools':5}}
            },
            effects:[
                {type:'convert',from:{'grain':6,'water',3},into:{'bread':1},repeat:5,mode:'Bake bread'},
            ],
            req:{'agriculture':true,'cooking':true},
            category:'crafting',
            gizmos:true,
        });

        new G.Res({
            name:'grain',
            desc:'[grain,Grain] can be ground into flour and baked into [bread]. Nearly inedible on its own.',
            icon:[2,1,'agriculture'],
            category:'food',
            tick:function(me,tick){
                var toSpoil=me.amount*0.01;
                var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
            },
        });

        new G.Res({
            name:'cotton',
            desc:'[cotton,Cotton] can be sewn into [basic clothes,clothes].',
            icon:[3,1,'agriculture'],
            category:'build',
            tick:function(me,tick){
                var toSpoil=me.amount*0.01;
                var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
            },
        });

        G.getDict('clothier').modes['weave cotton clothes']={name:'Weave cotton clothing',desc:'Turn 40 [cotton] into [basic clothes].',req:{'agriculture':true},use:{'metal tools':1}};
        G.getDict('clothier').effects.push({type:'convert',from:{'cotton':40},into:{'basic clothes':1},every:20,mode:'weave cotton clothes'});
	}
});