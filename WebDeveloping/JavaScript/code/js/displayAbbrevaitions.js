function displayAbbrevaitions(){
    if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    //��ȡ���Դ�
    var abbreviations = document.getElementsByTagName("abbr");
    if(abbreviations.length < 1) return false;
    var defs = new Array();
    //������Щ���Դ�
    for(var i = 0; i < abbreviations.length; i++){
        var current_abbr = abbreviations[i];
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    //���������б�
    var dlist = document.createElement("dl");
    //��������
    for(key in defs){
        var definition = defs[key];
        ///�����������
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        //������������
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        //��ӵ������б���
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    //��������
    var header = document.createElement("h2");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    //�ѱ�����ӵ�����
    document.body.appendChild(header);
    //�Ѷ����б���ӵ�����
    document.body.appendChild(dlist);
}

addLoadEvent(displayAbbrevaitions);
