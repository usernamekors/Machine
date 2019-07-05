class Statistics{

    constructor(){
        this.gameResults = [];
    }

    addGameToStatistics(win, bid){
        let gameResult = {
            win: win,
            bid: bid,
        }
        this.gameResults.push(gameResult);
    }

    showGameStatistics(){
        let numberGames = this.gameResults.length;
        let numberWins = this.gameResults.filter(result => result.win).length;
        let numberLosses = this.gameResults.filter(result => !result.win).length;
        return [numberGames, numberWins, numberLosses];
    }

}
const stats = new Statistics();