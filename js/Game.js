class Game{
    constructor(start){
        this.stats = new Statistics();
        this.wallet = new Wallet(start);

        document.getElementById('start').addEventListener('click', this.startGame.bind(this));
        this.spanWallet = document.querySelector('.panel span.wallet' );
        this.boards = [...document.querySelectorAll('div.color')];
        this.inputBid = document.getElementById('bid');
        this.spanResult = document.querySelector('.score span.result');
        this.spanGame = document.querySelector('.score span.number');
        this.spanWins = document.querySelector('.score span.win');
        this.spanLosses = document.querySelector('.score span.loss');

        this.render();
    }

    render(colors = ['url(imgs/banana.png)', 'url(imgs/cherry.png)', 'url(imgs/strawberry.png)'], money = this.wallet.getWalletValue(), result = '', stats = [0,0,0], bid = 0, wonMoney = 0){

        this.boards.forEach((board,index)=>{
            board.style.background = colors[index];
            board.style.backgroundSize = 'contain';
            board.style.backgroundRepeat = 'no-repeat';
            board.style.backgroundPosition = 'center';
        });

        this.spanWallet.textContent = money;

        if(result){
            result = `You wins ${wonMoney}$.|`
        } else if (!result && result !== ''){
            result = `You losses ${bid}$.|`
        }

        this.spanResult.textContent = result;
        this.spanGame.textContent = stats[0];
        this.spanWins.textContent = stats[1];
        this.spanLosses.textContent = stats[2];
        this.inputBid.value = '';
    }

    startGame(){
        if (this.inputBid.value < 1) return alert('Not Enough Money');
        const bid = Math.floor(this.inputBid.value);

        if (!this.wallet.checkCanPlay(bid)){
            return alert('Not Enough Money, Please Enter Correct Number ');
        }
        this.wallet.changeWallet(bid, '-');
        this.draw = new Draw();
        const colors = this.draw.getDrawResult();
        const win = Result.checkWinner(colors);
        const wonMoney = Result.moneyWinInGame(win, bid);
        this.wallet.changeWallet(wonMoney);
        this.stats.addGameToStatistics(win, bid);

        this.render(colors, this.wallet.getWalletValue(), win, this.stats.showGameStatistics(), bid, wonMoney);
    }
}