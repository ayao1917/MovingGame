/**
 * Created by chihyaohsu on 2016/2/2.
 */
(function () {
    var playerCount = prompt("please enter player count");

    if (playerCount > 4 || playerCount < 1) {
        alert("error");
    } else {
        var toStart = 5;
        ready();
    }

    function ready() {
        if (toStart > 0) {
            document.getElementById('time').innerHTML = toStart.toString();
            toStart --;
            setTimeout(function () {
                ready();
            }, 1000);
        } else {
            new Game(playerCount);
        }
    }

    function Game(players) {
        var keyMap = {
            38: {action: 'up', player: 1},
            37: {action: 'left', player: 1},
            40: {action: 'down', player: 1},
            39: {action: 'right', player: 1},
            101: {action: 'up', player: 2},
            97: {action: 'left', player: 2},
            98: {action: 'down', player: 2},
            99: {action: 'right', player: 2},
            73: {action: 'up', player: 3},
            74: {action: 'left', player: 3},
            75: {action: 'down', player: 3},
            76: {action: 'right', player: 3},
            87: {action: 'up', player: 4},
            65: {action: 'left', player: 4},
            83: {action: 'down', player: 4},
            68: {action: 'right', player: 4}
        };

        var playerList = [];

        var timer = 61;
        var next = 1000;

        countdown();

        for (var i = 0; i < players; i++) {
            var player = new Player(i + 1);
            document.getElementById('player' + (i + 1)).style.display ="block";
            playerList.push(player);
        }

        function Player(index) {
            var blockList = [];
            var playerIndex = index;
            var actionList = ['up', 'down', 'left', 'right'];
            var count = 0;

            run(index);

            function run(position) {
                if (timer > 0) {
                    createObj(position);
                    setTimeout(function () {
                        run(position);
                    }, next);
                }
            }

            function createObj(position) {
                var id = playerIndex + new Date().getTime().toString();
                var randomNum = Math.floor((Math.random() * actionList.length));
                var blockObj = document.createElement("DIV");
                blockObj.id = id.toString();
                blockObj.className = "block-obj block-animate";
                blockObj.style.left = position * 15 + "vw";
                blockObj.style.backgroundImage = "url('images/" + actionList[randomNum] + ".png')";
                blockObj.addEventListener("animationend", animationListener, false);
                document.getElementById("mainBox").appendChild(blockObj);
                blockList.push({id: id, action: actionList[randomNum], player: playerIndex});
            }

            function animationListener(e) {
                var obj = e.target;
                var id = obj.id;
                obj.parentElement.removeChild(obj);

                for (var index in blockList) {
                    if (blockList[index].id == id) {
                        blockList.splice(index, 1);
                        delete obj;
                        return;
                    }
                }
            }

            this.doHit = function (action) {
                var block = blockList.shift();
                var blockDiv = document.getElementById(block.id);
                if (block.action == action) {
                    blockDiv.style.backgroundImage = "url('images/" + action + "-hit.png')";
                    count++;
                    document.getElementById('score' + playerIndex).innerHTML = count.toString();
                } else {
                    blockDiv.style.backgroundImage = "url('images/" + block.action + "-miss.png')";
                }
            }
        }

        window.onkeydown = function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            var command = keyMap[key];
            var player = playerList[command.player - 1];
            player.doHit(command.action);
        };

        function countdown() {
            if (timer > 0) {
                next = next > 200 ? next - 20 : next;
                timer --;
                document.getElementById('time').innerHTML = timer.toString();
                setTimeout(function () {
                    countdown();
                }, 1000);
            }
        }
    }
})();