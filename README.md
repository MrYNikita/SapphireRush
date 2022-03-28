# SapphireRush
## Описание
	SapphireRush - браузреная `JS` игра, выполненная без использования сторонних библиотек.
	Выбирая SR, вы можете использовать инстументы контроля сценария страницы, получите возможность
	изменять её состояния, создавать и использовать готовые анимации. SR не требует от вас ничего, кроме знания `JS`.

## Содержание
____
1. ### Классы
	1.1. Basic - Базовый класс;
2. ### Примеры использования
	2.1. Пример рисования звездочки; 
____
## 2. Примеры использования
	2.1. Пример рисования звездочки:

```js
	let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    
    canvas.style.marginTop = "100px";
    canvas.width = 500;
    canvas.height = 500;

    document.body.appendChild(canvas);

    context.beginPath();

	let jectWalker = new classBasicWalker({
        
        functionExecute: function() {

            const [x,y] = this.arrayNumberPointNow;

            context.lineTo(x,y);
            context.strokeStyle = "red";
            context.stroke();
            context.fill();

        },
        boolSync: true,
        boolDefenite: true,
        numberSpeed: 15,
        arrayNumberPoint: [
            [250,250],[225,250],
            [250,200],[275,250],
            [350,250],[290,275],
            [325,350],[250,300],
            [175,350],[210,275],
            [150,250],[250,250]
        ],
    
    });

    await t1.functionBegin();

    console.log("done");
```
____
## Ссылки
____
* [Автор в VK](https://vk.com/mr.y.nikita)
* [Автор в Facebook](https://www.facebook.com/profile.php?id=100069827964715)
* [Лицензия](https://creativecommons.org/licenses/by-nc-nd/4.0/)