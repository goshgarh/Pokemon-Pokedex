let pokemonNames = ['pikachu', 'celebi', 'eevee'];
let abilities_array = [];
let hp, attack, defense;
let Promise_pokemon = [];
let movesPromises = [];
let moves = [];
let respons_values = []
let responsi_values = [];
let move_urls = [];
let shahdag = {
    pikachu: {
        myHp: 0
        , myAttack: 0
        , myDefense: 0
        , myAbilities: []
        , myMove: {
            myAccuracy: 0
            , myPower: 0
            , myPriority: 0
        , }
    }
    , celebi: {
        myHP: 0
        , myAttack: 0
        , myDefense: 0
        , myAbilities: []
        , myMove: {
            myAccuracy: 0
            , myPower: 0
            , myPriority: 0
        , }
    }
    , eevee: {
        myHP: 0
        , myAttack: 0
        , myDefense: 0
        , myAbilities: []
        , myMove: {
            myAccuracy: 0
            , myPower: 0
            , myPriority: 0
        , }
    }
    , get_All: function () {
        return [this.pikachu, this.celebi, this.eevee]
    }
    , get_one: function (name) {
        return this[name]
    }
};
for (i = 0; i < pokemonNames.length; i++) {
    Promise_pokemon.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNames[i]}/`));
}
$('.my_all_links').click(function () {
        Promise.all(Promise_pokemon).then(function (values) {
            let response_values = values;
            for (let k = 0; k < response_values.length; k++) {
                let pokemonName = pokemonNames[k];
                shahdag[pokemonName].myAbilities = [];
                for (let i = 0; i < response_values[k].data.abilities.length; i++) {
                    shahdag[pokemonName].myAbilities.push(response_values[k].data.abilities[i].ability.name);
                }
                shahdag[pokemonName].myDefense = response_values[k].data.stats[3].base_stat;
                shahdag[pokemonName].myAttack = response_values[k].data.stats[4].base_stat;
                shahdag[pokemonName].myHp = response_values[k].data.stats[5].base_stat;
                $(`.pok${k+1}_hp`).html(`This is <mark>${pokemonName}</mark> hp:  ${shahdag[pokemonName].myHp}`);
                $(`.pok${k+1}_attack`).html(`This is ${pokemonName} attack: ${shahdag[pokemonName].myAttack}`);
                $(`.pok${k+1}_defense`).html(`This is ${pokemonName} defense: ${ shahdag[pokemonName].myDefense}`);
                $(`.pok${k+1}_abilities`).html(`This is ${pokemonName} abilities: ${shahdag[pokemonName].myAbilities}`);
                //            move_urls.push(response_values[k].data.moves[0].move.url);
                movesPromises.push(axios.get(response_values[k].data.moves[0].move.url));
            } // for(let k=0 ...) loop closing tag
        }); // Promise_pokemon closing tag   
    }) // my_all_links closing tag
$('.div_btn').click(function (evt) {
    $(this).next().toggle();
});
$('.my_a_link').click(function () {
        pokeman_name = $(this).html().toLowerCase();
        $('.image').attr('src', `images/${pokeman_name}.jpg`);
        Promise_input = axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeman_name}/`);
        Promise_input.then(function (values) {
                shahdag[`${pokeman_name}`].myAbilities = [];
                for (i = 0; i < values.data.abilities.length; i++) {
                    shahdag[`${pokeman_name}`].myAbilities.push(values.data.abilities[i].ability.name);
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
                Promise_move_urls_input.then(function (values) {
                    let responseValues = values;
                    shahdag[`${pokeman_name}`].myMove = {};
                    shahdag[`${pokeman_name}`].myMove.myAccuracy = responseValues.data.accuracy;
                    shahdag[`${pokeman_name}`].myMove.myPower = responseValues.data.power;
                    shahdag[`${pokeman_name}`].myMove.myPriority = responseValues.data.priority;
                    $(`#pok1_accuracy`).html(`This is ${pokeman_name} accuracy: ${shahdag[pokeman_name].myMove.myAccuracy}`);
                    $(`#pok1_power`).html(`This is ${pokeman_name} power:  ${shahdag[pokeman_name].myMove.myPower}`);
                    $(`#pok1_priority`).html(`This is ${pokeman_name} priority:  ${shahdag[pokeman_name].myMove.myPriority}`);
                }); // Promise_move-urls_input.then(function(values2) pokemon moves closing tag
            }) // Promise_input.then(function(values) closing tag
    }) //my <a> tag click event function  closing brackets
$('#inp_btn').click(function () {
        let pokeman_name = $("#inp").val().toLowerCase();
        $('.image').attr('src', `images/default_pokemon.jpg`);
        $(`.pok1_hp`).html(`This is <mark>${pokeman_name}</mark> hp:  N/A`);
        $(`.pok1_attack`).html(`This is ${pokeman_name} attack: N/A`);
        $(`.pok1_defense`).html(`This is ${pokeman_name} defense: N/A`);
        $(`.pok1_abilities`).html(`This is ${pokeman_name} abilities: N/A`);
        $(`#pok1_accuracy`).html(`This is ${pokeman_name} accuracy: N/A`);
        $(`#pok1_power`).html(`This is ${pokeman_name} power:  N/A`);
        $(`#pok1_priority`).html(`This is ${pokeman_name} priority:  N/A`);
        Promise_inp = axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeman_name}/`);
        Promise_inp.then(function (values) {
                let responsi_values = values;
                shahdag[pokeman_name] = {};
                shahdag[pokeman_name].myAbilities = [];
                for (i = 0; i < responsi_values.data.abilities.length; i++) {
                    shahdag[pokeman_name].myAbilities.push(responsi_values.data.abilities[i].ability.name);
                }
                shahdag[pokeman_name].myDefense = responsi_values.data.stats[3].base_stat;
                shahdag[pokeman_name].myAttack = responsi_values.data.stats[4].base_stat;
                shahdag[pokeman_name].myHp = responsi_values.data.stats[5].base_stat;
                $(`.pok1_hp`).html(`This is <mark>${pokeman_name}</mark> hp:  ${responsi_values.data.stats[5].base_stat}`);
                $(`.pok1_attack`).html(`This is ${pokeman_name} attack: ${responsi_values.data.stats[4].base_stat}`);
                $(`.pok1_defense`).html(`This is ${pokeman_name} defense: ${responsi_values.data.stats[3].base_stat}`);
                $(`.pok1_abilities`).html(`This is ${pokeman_name} abilities: ${shahdag[pokeman_name].myAbilities}`);
                move_urls_a = responsi_values.data.moves[0].move.url;
                Promise_move_urls_input = axios.get(move_urls_a);
                Promise_move_urls_input.then(function (values) {
                    let respons_values = values;
                    moves_a = [respons_values.data.accuracy, respons_values.data.power, respons_values.data.priority];
                    shahdag[pokeman_name].myMove = {};
                    shahdag[pokeman_name].myMove.myAccuracy = respons_values.data.accuracy;
                    shahdag[pokeman_name].myMove.myPower = respons_values.data.power;
                    shahdag[pokeman_name].myMove.myPriority = respons_values.data.priority;
                    $(`#pok1_accuracy`).html(`This is ${pokeman_name} accuracy: ${shahdag[pokeman_name].myMove.myAccuracy}`);
                    $(`#pok1_power`).html(`This is ${pokeman_name} power:  ${shahdag[pokeman_name].myMove.myPower}`);
                    $(`#pok1_priority`).html(`This is ${pokeman_name} priority:  ${shahdag[pokeman_name].myMove.myPriority}`);
                }); // Promise_move-urls_input.then(function(values2) pokemon moves closing tag
            }) // MyPromise_a.then(function(values) closing tag
    }) //input button closing bracket