document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container')
    const doodler = document.querySelector('.doodler')
    let doodlerLeftSpace = 50
    let startPoint = 150
    let doodlerBottomSpace = startPoint
    let isGameOver = false
    let platformCount = 5
    let platforms = []
    let upTimerId
    let downTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId
    let rightTimerId
    let score = 0


    const createDoodler = () => {
        doodlerLeftSpace = platforms[0].left
        doodler.style.left = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }


    class Platform {
        constructor (newPlatBottom) {
            this.bottom = newPlatBottom
            this.left = Math.random() * 315
            this.platformDiv = document.createElement('div')

            const platformDiv = this.platformDiv
            platformDiv.classList.add('platform')
            platformDiv.style.left = this.left + 'px'
            platformDiv.style.bottom = this.bottom + 'px'
            container.appendChild(platformDiv)
        }
    }

    const createPlatforms = () => {
        for (let i = 0; i < platformCount; i++) {
            let platGap = 600 / platformCount
            let newPlatBottom = 100 + platGap * i
            let newPlatform = new Platform(newPlatBottom)
            platforms.push(newPlatform)
            console.log(platforms)
        }
    }


    const movePlatforms = () => {
        if (doodlerBottomSpace > 200) {
            platforms.forEach((platform) => {
                platform.bottom -= 5
                let platformDiv = platform.platformDiv
                platformDiv.style.bottom = platform.bottom + 'px'

                if (platform.bottom < 10) {
                    let firstPlatform = platforms[0].platformDiv
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    score++

                    let newPlatform = new Platform(600)
                    platforms.push(newPlatform)
                }
            })
        }
    }


    const fall = () => {
        clearInterval(upTimerId)
        isJumping = false
        downTimerId = setInterval(() => {
            doodlerBottomSpace -= 4
            doodler.style.bottom = doodlerBottomSpace + 'px'

            if (doodlerBottomSpace <= 0) {
                gameOver()
                isGameOver = true
                clearInterval(upTimerId)
                clearInterval(downTimerId)
            }

            platforms.forEach((platform) => {
                if (
                    (doodlerBottomSpace >= platform.bottom) && 
                    (doodlerBottomSpace <= platform.bottom + 15) && 
                    ((doodlerLeftSpace + 60) >= platform.left) &&
                    (doodlerLeftSpace <= (platform.left + 85)) &&
                    !isJumping
                ) {
                    startPoint = doodlerBottomSpace
                    jump()
                }
            })
        }, 10)
    }        


    const gameOver = () => {
        alert(`
        Game over! :3
        Score: ${score}`)
        isGameOver = true
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
    }


    const jump = () => {
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(() => {
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + 'px'

            if (doodlerBottomSpace > startPoint + 200) {
                fall()
            }
        }, 35)
    }


    const moveLeft = () => {
        clearInterval(leftTimerId)
        if (isGoingRight) {
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId = setInterval(() => {
            if (doodlerLeftSpace >= 0) {
                doodlerLeftSpace -= 4
                doodler.style.left = doodlerLeftSpace + 'px'
            } else {
                moveRight()
            }

        }, 10)
    }


    const moveRight = () => {
        clearInterval(rightTimerId)
        if (isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true
        leftTimerId = setInterval(() => {
            if (doodlerLeftSpace <= 340) {
                doodlerLeftSpace += 4
                doodler.style.left = doodlerLeftSpace + 'px'
            } else {
                moveLeft()
            }
        }, 10)
    }


    const moveStraight = () => {
        isGoingLeft = false
        isGoingRight = false
        clearInterval(rightTimerId)
        clearInterval(leftTimerId)  
    }


    const control = (e) => {
        if (e.key === 'ArrowLeft') {
            moveLeft()
        } else if (e.key === 'ArrowRight') {
            moveRight()
        } else {
            moveStraight()
        }
    }


    const start = () => {
        if (!isGameOver) {
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms, 40)
            jump()

            document.addEventListener('keyup', control)
        }
    }

    start()


})