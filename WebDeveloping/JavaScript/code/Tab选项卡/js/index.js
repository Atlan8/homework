/**
 * Created by Atlantic on 2018/5/25.
 */

window.onload = function()
{
    //1. 获取标签
    var allLis = $('tab_header').getElementsByTagName("li");
    var allDom = $('tab_content').getElementsByClassName("dom");

    //console.log(allLis, allDom);
    //2. 遍历监听
    for(var i = 0; i < allLis.length; i++ )
    {
        var sLi = allLis[i];
        sLi.index = i;
        sLi.onmouseover = function()
        {
            //排他，只能选中其中一个
            for(var j = 0; j < allLis.length; j++)
            {
                allLis[j].className = ''; //将所有li的className置空，实现全不选的效果
                allDom[j].style.display = 'none'; //原理与上面相同，即先将所有内容隐藏
            }

            this.className = 'selected'; //单独选中效果
            allDom[this.index].style.display = 'block'; //想要哪个，就显示哪个
        };
    }
};

function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}
