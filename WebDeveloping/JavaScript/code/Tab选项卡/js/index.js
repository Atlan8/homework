/**
 * Created by Atlantic on 2018/5/25.
 */

window.onload = function()
{
    //1. ��ȡ��ǩ
    var allLis = $('tab_header').getElementsByTagName("li");
    var allDom = $('tab_content').getElementsByClassName("dom");

    //console.log(allLis, allDom);
    //2. ��������
    for(var i = 0; i < allLis.length; i++ )
    {
        var sLi = allLis[i];
        sLi.index = i;
        sLi.onmouseover = function()
        {
            //������ֻ��ѡ������һ��
            for(var j = 0; j < allLis.length; j++)
            {
                allLis[j].className = ''; //������li��className�ÿգ�ʵ��ȫ��ѡ��Ч��
                allDom[j].style.display = 'none'; //ԭ����������ͬ�����Ƚ�������������
            }

            this.className = 'selected'; //����ѡ��Ч��
            allDom[this.index].style.display = 'block'; //��Ҫ�ĸ�������ʾ�ĸ�
        };
    }
};

function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}
