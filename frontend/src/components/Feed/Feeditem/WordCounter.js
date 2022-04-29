const WordCounter = (props) => {
    //Words = $('#storyContent').val();
    let Words = props.value
    // 标点和中文
    let sTotal = 0;
    // 中文字判断
    let iTotal = 0;
    // 英文字母
    let eTotal = 0;
    // 数字判断
    let inum = 0;

    for (let i = 0; i < Words.length; i++) {
        let c = Words.charAt(i);
        //基本汉字
        if (c.match(/[\u4e00-\u9fa5]/)) {
            iTotal++;
        }
        //基本汉字补充
        else if (c.match(/[\u9FA6-\u9fcb]/)) {
            iTotal++;
        }
    }

    for (let i = 0; i < Words.length; i++) {
        let c = Words.charAt(i);
        if (c.match(/[^\x00-\xff]/)) {
            sTotal++;
        }
        else {
            eTotal++;
        }
        if (c.match(/[0-9]/)) {
            inum++;
        }
    }
    let hanzi, zishu, biaodian, zimu, shuzi, zifu;
    //汉字
    hanzi = iTotal;
    //字数
    zishu = (inum + iTotal);
    //标点
    biaodian = sTotal - iTotal;
    //字母
    zimu = (eTotal - inum);
    //数字
    shuzi = inum;
    //字符
    zifu = (iTotal * 2 + (sTotal - iTotal) * 2 + eTotal);

    return zishu;
};
export default WordCounter;