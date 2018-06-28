/**
 * Created by Atlantic on 2018/6/4.
 */

/**
 * 获取滚动的头部距离和左边距离
 * scroll().top scroll().left
 * @returns {*}
 */
function scroll()
{
    if(window.pageYOffset !== null)
    {
        //ie9+ 最新浏览器
        return{
            top: window.pageYOffset,
            left: window.pageXOffset
        };
    }
    else if(document.compatMode === "CSS1Compat")
    {
        //w3c
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        };
    }

    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    };
}

/**
 * 通过标签id获取
 * @param id[string]
 * @returns {Element}
 */
function $(id)
{
    return typeof id === "string" ? document.getElementById(id);
}

/**
 * 获取屏幕的宽度和高度
 * client().width client().height
 * @returns {*}
 */
function client()
{
    if(window.innerWidth)
    {
        //ie9+ 最新浏览器
        return{
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    else if(document.compatMode ==="CSS1Compat")
    {
        //w3c标准
        return{
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    }

    return{
        width: document.body.clientWidth,
        height: document.body.clientHeight
    };
}

function buffer(obj, json, fn)
{
    //1.1清除定时器
    clearInterval(obj.timer);

    //1.2 设置定时器
    var begin = 0, target = 0, speed = 0;

    obj.timer = setInterval(function()
    {
        //判断是否所有属性都修改完毕
        var flag = true;

        for(var key in json)
        {
            //1.2.0 获取初始值
            if("opacity" === key)
            {
                begin = Math.round(parseFloat(getCssAttrValue(obj, key)) * 100) || 100;
                target = parseInt(json[key] * 100);
            }
            else
            {
                begin = parseInt(getCssAttrValue(obj, key)) || 0;
                target = parseInt(json[key]);
            }

            //1.2.1 求出步长
            speed = (target - begin) *0.2;
            //1.2.2 判断是否向上取整
            speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);

            //1.2.3 将步长作用到盒子的left中
            if("opacity" === key)
            {
                //改变透明度
                //w3c
                obj.style.opacity = (begin + speed) / 100;
                //ie浏览器
                obj.style.filter = 'alpha(opacity : '+ (begin + speed) +')';
            }
            else
            {
                //其他属性
                obj.style[key] = begin + speed + 'px';
            }
//                obj.innerText = begin;

            //1.2.4 判断
            /*if(begin === target)
             {
             clearInterval(obj.timer);
             begin = target;
             }*/
            if(begin === target === 0)
            {
                flag = true;
            }
            else if(begin !== target)
            {
                flag = false;
            }
        }

        if(flag)
        {
            clearInterval(obj.timer);

            //判断是否有回调函数
            if(fn)
            {
                fn();
            }
        }
    }, 20);
}

/**
 * 获取css样式直
 * @param {object}obj
 * @param {string}attr
 * @returns {*}
 */
function getCssAttrValue(obj, attr)
{
    if(obj.currentStyle)
    {
        //ie和opera
        return obj.currentStyle[attr];
    }
    else
    {
        return window.getComputedStyle(obj, null)[attr];
    }
}
