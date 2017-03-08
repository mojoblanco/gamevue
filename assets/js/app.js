new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function(){
            this.resetHealth();
            this.gameIsRunning = true;
            this.turns = [];
        },
        attack: function(){
            this.playerAttack(3, 10);
            this.monsterAttack(5, 12);
        },
        specialAttack: function(){
            this.playerAttack(10, 20);
            this.monsterAttack(5, 12);
        },
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
                this.monsterAttack(5, 12);
            }
        },
        giveUp: function(){
            this.gameIsRunning = false;
            this.turns = [];
            this.resetHealth();
        },
        playerAttack: function(min, max){
            var damage = this.calcDamage(min, max);
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits monster for " + damage + " points"
            });
            if (this.checkWin()) {
                return;
            }
        },
        monsterAttack: function(min, max){
            var damage = this.calcDamage(min, max);
            this.playerHealth  -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: "Player hits monster for " + damage + " points"
            });
            this.checkWin()
        },
        calcDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function(){
            if (this.monsterHealth <= 0) {
                if (confirm("Yo win! Want a rematch?")) {
                    this.startGame();
                } else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            else if (this.playerHealth <= 0)
            {
                if (confirm("Yo Lose! Want a rematch?")) {
                    this.startGame();
                } else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
        resetHealth: function(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
        }
    }
});
