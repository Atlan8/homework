/**
 * Created by Atlantic on 2018/6/4.
 */

/**
 * ��ȡ������ͷ���������߾���
 * scroll().top scroll().left
 * @returns {*}
 */
function scroll()
{
    if(window.pageYOffset !== null)
    {
        //ie9+ ���������
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
 * ͨ����ǩid��ȡ
 * @param id[string]
 * @returns {Element}
 */
function $(id)
{
    return typeof id === "string" ? document.getElementById(id);
}

/**
 * ��ȡ��Ļ�Ŀ�Ⱥ͸߶�
 * client().width client().height
 * @returns {*}
 */
function client()
{
    if(window.innerWidth)
    {
        //ie9+ ���������
        return{
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    else if(document.compatMode ==="CSS1Compat")
    {
        //w3c��׼
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
    //1.1�����ʱ��
    clearInterval(obj.timer);

    //1.2 ���ö�ʱ��
    var begin = 0, target = 0, speed = 0;

    obj.timer = setInterval(function()
    {
        //�ж��Ƿ��������Զ��޸����
        var flag = true;

        for(var key in json)
        {
            //1.2.0 ��ȡ��ʼֵ
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

            //1.2.1 �������
            speed = (target - begin) *0.2;
            //1.2.2 �ж��Ƿ�����ȡ��
            speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);

            //1.2.3 ���������õ����ӵ�left��
            if("opacity" === key)
            {
                //�ı�͸����
                //w3c
                obj.style.opacity = (begin + speed) / 100;
                //ie�����
                obj.style.filter = 'alpha(opacity : '+ (begin + speed) +')';
            }
            else
            {
                //��������
                obj.style[key] = begin + speed + 'px';
            }
//                obj.innerText = begin;

            //1.2.4 �ж�
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

            //�ж��Ƿ��лص�����
            if(fn)
            {
                fn();
            }
        }
    }, 20);
}

/**
 * ��ȡcss��ʽֱ
 * @param {object}obj
 * @param {string}attr
 * @returns {*}
 */
function getCssAttrValue(obj, attr)
{
    if(obj.currentStyle)
    {
        //ie��opera
        return obj.currentStyle[attr];
    }
    else
    {
        return window.getComputedStyle(obj, null)[attr];
    }
}
