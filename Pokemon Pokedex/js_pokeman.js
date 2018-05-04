      
let pokemons = ['pikachu', 'celebi', 'eevee'];
let abilities_array = [];
let hp, attack, defense;
  
    
let Promise_pokemon =[];
let Promise_move_urls =[];
let moves=[];

let r2_values=[], r1_values=[];

//let move_names=[]; 
let move_urls=[];

let shahdag = { 
    pikachu: {  
        myHp: 0,
        myAttack: 0,
        myDefense: 0,
        myAbilities: [],
        myMove: {
            myAccuracy: 0,
            myPower: 0,
            myPriority: 0,
        },
    },
    celebi: {  
        myHP: 0,
        myAttack: 0,
        myDefense: 0,
        myAbilities: [],
        myMove: {
            myAccuracy: 0,
            myPower: 0,
            myPriority: 0,
        },
    },
    eevee:  {   
          
        myHP: 0,
        myAttack: 0,
        myDefense: 0,
        myAbilities: [],
        myMove: {
            myAccuracy: 0,
            myPower: 0,
            myPriority: 0,
        },
        },
                 
    get_All: function() { return [this.pikachu, this.celebi, this.eevee] },
    get_one: function(name) { return this[name]}   
            
             };


  
     for ( i=0; i<pokemons.length; i++)  {   
         Promise_pokemon.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemons[i]}/`));
          
     }

      $('.my_all_links').click(function() {       
     Promise.all(Promise_pokemon).then(function(values) {
         let r1_values=values;
          
        for ( let k=0; k<r1_values.length; k++)  { 
            
                 shahdag[`${pokemons[k]}`].myAbilities=[];
                 for (let i=0; i<r1_values[k].data.abilities.length; i++) {                  shahdag[`${pokemons[k]}`].myAbilities.push(r1_values[k].data.abilities[i].ability.name);
                       
                }
            
            shahdag[`${pokemons[k]}`].myDefense = r1_values[k].data.stats[3].base_stat;
           
            
            shahdag[`${pokemons[k]}`].myAttack = r1_values[k].data.stats[4].base_stat;
          
            
            shahdag[`${pokemons[k]}`].myHp = r1_values[k].data.stats[5].base_stat;
          
            
            $(`.pok${k+1}_hp`).html(`This is <mark>${pokemons[k]}</mark> hp:  ${shahdag[pokemons[k]].myHp}`);
           
            
            
            $(`.pok${k+1}_attack`).html(`This is ${pokemons[k]} attack: ${shahdag[pokemons[k]].myAttack}`);
            
            $(`.pok${k+1}_defense`).html(`This is ${pokemons[k]} defense: ${ shahdag[pokemons[k]].myDefense}`);
            
            $(`.pok${k+1}_abilities`).html(`This is ${pokemons[k]} abilities: ${shahdag[pokemons[k]].myAbilities}`);
            
//            move_names.push(r1_values[k].data.moves[0].move.name);
            move_urls.push(r1_values[k].data.moves[0].move.url);
            
            
            Promise_move_urls.push(axios.get(move_urls[k]));
            
            
        } // for(let k ...) loop closing tag
          

           
               
          }); // Promise_pokemon closing tag   
        
      }) // my_all_links closing tag
    

    $('.div_btn').click(function(evt) {
      $(this).next().toggle();
    
     });
    
  
    $('.my_a_link').click(function() {  
        pokeman_name = $(this).html().toLowerCase();
        
                              
        $('.image').attr('src', `images/${pokeman_name}.jpg`);
                                
        Promise_input=axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeman_name}/`);
               
        Promise_input.then(function(values) {

            shahdag[`${pokeman_name}`].myAbilities=[];
            for (i=0; i<values.data.abilities.length; i++) {                     shahdag[`${pokeman_name}`].myAbilities.push(values.data.abilities[i].ability.name);
                      
                }     
                  
            shahdag[`${pokeman_name}`].myDefense = values.data.stats[3].base_stat;
           
            
            shahdag[`${pokeman_name}`].myAttack = values.data.stats[4].base_stat;
          
            
            shahdag[`${pokeman_name}`].myHp = values.data.stats[5].base_stat;
          
            
            $(`.pok1_hp`).html(`This is <mark>${pokeman_name}</mark> hp:  ${values.data.stats[5].base_stat}`);
            
            
            $(`.pok1_attack`).html(`This is ${pokeman_name} attack: ${values.data.stats[4].base_stat}`);
            
            $(`.pok1_defense`).html(`This is ${pokeman_name} defense: ${values.data.stats[3].base_stat}`);
            
            $(`.pok1_abilities`).html(`This is ${pokeman_name} abilities: ${shahdag[pokeman_name].myAbilities}`);
                  

            move_urls_a = values.data.moves[0].move.url;
            
            Promise_move_urls_input = axios.get(move_urls_a);
            
            Promise_move_urls_input.then(function(values2) {
                let r2_values=values2;


                shahdag[`${pokeman_name}`].myMove={};
                shahdag[`${pokeman_name}`].myMove.myAccuracy=r2_values.data.accuracy;
                shahdag[`${pokeman_name}`].myMove.myPower=r2_values.data.power;
                shahdag[`${pokeman_name}`].myMove.myPriority=r2_values.data.priority;
                
                $(`#pok1_accuracy`).html(`This is ${pokeman_name} accuracy: ${shahdag[pokeman_name].myMove.myAccuracy}`);
                $(`#pok1_power`).html(`This is ${pokeman_name} power:  ${shahdag[pokeman_name].myMove.myPower}`);
                $(`#pok1_priority`).html(`This is ${pokeman_name} priority:  ${shahdag[pokeman_name].myMove.myPriority}`);
                
                

                    
                
                
                
            });  // Promise_move-urls_input.then(function(values2) pokemon moves closing tag
            
            
          })  // Promise_input.then(function(values) closing tag
                               
                               
                               
    }) //my <a> tag click event function  closing brackets
    
     $('#inp_btn').click(function() {  
         
              pokeman_name1 = $("#inp").val().toLowerCase();
                             
                              
              $('.image').attr('src', `images/default_pokemon.jpg`);

              $(`.pok1_hp`).html(`This is <mark>${pokeman_name1}</mark> hp:  N/A`);
              $(`.pok1_attack`).html(`This is ${pokeman_name1} attack: N/A`);
              $(`.pok1_defense`).html(`This is ${pokeman_name1} defense: N/A`);
              $(`.pok1_abilities`).html(`This is ${pokeman_name1} abilities: N/A`);
              
              $(`#pok1_accuracy`).html(`This is ${pokeman_name1} accuracy: N/A`);
              $(`#pok1_power`).html(`This is ${pokeman_name1} power:  N/A`);
              $(`#pok1_priority`).html(`This is ${pokeman_name1} priority:  N/A`);
         
              Promise_inp=axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeman_name1}/`);
               
              Promise_inp.then(function(values) {
                   let r1_values=values;

                    shahdag[pokeman_name1]={};
                    shahdag[pokeman_name1].myAbilities=[];
                    for (i=0; i<r1_values.data.abilities.length; i++) {                     shahdag[pokeman_name1].myAbilities.push(r1_values.data.abilities[i].ability.name);
                               
                        }     

                    shahdag[pokeman_name1].myDefense = r1_values.data.stats[3].base_stat;
                    r1_values.data.stats[3].stat.name;

                    shahdag[pokeman_name1].myAttack = r1_values.data.stats[4].base_stat;
                    r1_values.data.stats[4].stat.name;

                    shahdag[pokeman_name1].myHp = r1_values.data.stats[5].base_stat;
                    r1_values.data.stats[5].stat.name;
                    
                    
                    $(`.pok1_hp`).html(`This is <mark>${pokeman_name1}</mark> hp:  ${r1_values.data.stats[5].base_stat}`);

                 
                    $(`.pok1_attack`).html(`This is ${pokeman_name1} attack: ${r1_values.data.stats[4].base_stat}`);
                    
                   
                    $(`.pok1_defense`).html(`This is ${pokeman_name1} defense: ${r1_values.data.stats[3].base_stat}`);
                    
                    
                    $(`.pok1_abilities`).html(`This is ${pokeman_name1} abilities: ${shahdag[pokeman_name1].myAbilities}`);


                    move_urls_a = r1_values.data.moves[0].move.url;

                    Promise_move_urls_input = axios.get(move_urls_a);

                    Promise_move_urls_input.then(function(values2) {
                        let r2_values=values2;
       
                        moves_a= [r2_values.data.accuracy,r2_values.data.power,r2_values.data.priority]; 

        
                        shahdag[pokeman_name1].myMove={};
                        shahdag[pokeman_name1].myMove.myAccuracy=r2_values.data.accuracy;
                        shahdag[pokeman_name1].myMove.myPower=r2_values.data.power;
                        shahdag[pokeman_name1].myMove.myPriority=r2_values.data.priority;

                        $(`#pok1_accuracy`).html(`This is ${pokeman_name1} accuracy: ${shahdag[pokeman_name1].myMove.myAccuracy}`);
                        $(`#pok1_power`).html(`This is ${pokeman_name1} power:  ${shahdag[pokeman_name1].myMove.myPower}`);
                        $(`#pok1_priority`).html(`This is ${pokeman_name1} priority:  ${shahdag[pokeman_name1].myMove.myPriority}`);

              
                
            });  // Promise_move-urls_input.then(function(values2) pokemon moves closing tag
            
            
        })  // MyPromise_a.then(function(values) closing tag
                               
                               
                               
    }) //input button closing bracket
        
    









