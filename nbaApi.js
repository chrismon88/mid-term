let url ='https://www.balldontlie.io/api/v1/players?search=("enter player name here")'
// // once player name is entered make api request
//
let playerInput = document.querySelector('#playerSearch')
let handleSubmit = document.querySelector('#submit')
let enterButton = document.querySelector('#enter')
let resultDisplay =  document.querySelector('#result')


enterButton.addEventListener('click', function(){
        //player?
        let player = playerInput.value  //todo validation

 //         let stats = targetSelected.value // to do validation

         console.log(player, stats)

    fetch(url)
        .then(res => {
        //response is all the things from the server
        console.log (res)
        //extract JSON
        let JSONPromise = res.json()
        return JSONPromise
    })
    .then( function(data) {
        console.log(data)

    this.state={
        playerName: null,
        playerStats: {}
    }


let handleSubmit = (e) => {
    e.preventDefault();
    this.getPlayerId()
    console.log(this.state.playerName)
}

let handleChange = (event) => {
    const replace = event.target.value.split(" ").join("_");
    if(replace.length > 0){
        this.setState({playerName: replace})
    } else {
        alert("Please type players name!")
    }
}

let getPlayerId = () => {
    getPlayerId().get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
        .then(async res => {
            console.log(res.data.data)
            if(res.data.data[0] === undefined){
                alert("This player is either injured or hasn't played yet!")
            } else if(res.data.data.length > 1){
                alert("Pleases specify the name more!")
            } else{
                await this.getPlayerStats(res.data.data[0].id)

            }
        }).catch(err => {
        console.log(err)
    })
}

 let getPlayerStats = (playerId) => {
     getPlayerStats(`https://www.balldontlie.io/api/v1/season_averages?season=2006&player_ids[]=${playerId}`)
         .then(async res => {
             console.log(res.data.data)
             this.setState({playerStats: res.data.data[0]})
         }).catch(err => {
         console.log(err)
     })
